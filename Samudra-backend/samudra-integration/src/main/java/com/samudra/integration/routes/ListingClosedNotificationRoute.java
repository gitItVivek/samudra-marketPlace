package com.samudra.integration.routes;

import com.samudra.common.events.ListingClosedEvent;
import com.samudra.common.events.SamudraTopics;
import com.samudra.integration.service.NotificationSender;
import com.samudra.integration.service.WatcherResolver;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class ListingClosedNotificationRoute extends RouteBuilder {

    @Override
    public void configure() {
        onException(Exception.class)
                .handled(true)
                .log("listing.closed failed: ${exception.message}")
                .to("kafka:" + SamudraTopics.LISTING_CLOSED_DLQ);

        from("kafka:" + SamudraTopics.LISTING_CLOSED + "?groupId=samudra-integration-listing-closed")
                .routeId("listing-closed-notifications")
                .log("Received listing.closed: ${body}")
                .unmarshal().json(JsonLibrary.Jackson, ListingClosedEvent.class)
                .setProperty("closedEvent", body())
                .process(exchange -> {
                    ListingClosedEvent event = exchange.getProperty("closedEvent", ListingClosedEvent.class);
                    WatcherResolver resolver = exchange.getContext()
                            .getRegistry()
                            .lookupByNameAndType("watcherResolver", WatcherResolver.class);
                    List<UUID> watchers = resolver.resolveWatcherIds(event.listingId());
                    exchange.getIn().setBody(watchers);
                    exchange.getIn().setHeader("watcherCount", watchers.size());
                })
                .bean(NotificationSender.class,
                        "notifyWatcherBatch(${exchangeProperty.closedEvent.listingId}, ${header.watcherCount}, ${exchangeProperty.closedEvent})")
                .split(body()).streaming()
                    .throttle(5).timePeriodMillis(1000)
                    .process(exchange -> {
                        UUID watcherId = exchange.getIn().getBody(UUID.class);
                        ListingClosedEvent event = exchange.getProperty("closedEvent", ListingClosedEvent.class);
                        NotificationSender sender = exchange.getContext()
                                .getRegistry()
                                .lookupByNameAndType("notificationSender", NotificationSender.class);
                        sender.notifyWatcherListingClosed(watcherId, event);
                    })
                .end();
    }
}
