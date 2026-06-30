package com.samudra.integration.routes;

import com.samudra.common.events.ListingPublishedEvent;
import com.samudra.common.events.SamudraTopics;
import com.samudra.common.enums.SaleType;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.stereotype.Component;

@Component
public class ListingPublishedRoute extends RouteBuilder {

    @Override
    public void configure() {
        onException(Exception.class)
                .handled(true)
                .log("listing.published failed: ${exception.message}")
                .to("kafka:" + SamudraTopics.LISTING_PUBLISHED_DLQ);

        from("kafka:" + SamudraTopics.LISTING_PUBLISHED + "?groupId=samudra-integration-listing-published")
                .routeId("listing-published")
                .log("Received listing.published: ${body}")
                .unmarshal().json(JsonLibrary.Jackson, ListingPublishedEvent.class)
                .choice()
                    .when(simple("${body.saleType} == '" + SaleType.AUCTION.name() + "'"))
                        .log("Auction listing published listingId=${body.listingId} city=${body.city}")
                    .otherwise()
                        .log("Fixed-price listing published listingId=${body.listingId} city=${body.city}")
                .end();
    }
}
