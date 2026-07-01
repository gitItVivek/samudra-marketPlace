package com.samudra.integration.routes;

import com.samudra.common.events.ListingCreatedEvent;
import com.samudra.common.events.SamudraTopics;
import com.samudra.integration.aggregation.UserDigestAggregationStrategy;
import com.samudra.integration.service.ListingDigestProcessor;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ListingInterestDigestRoute extends RouteBuilder {

    @Value("${samudra.digest.aggregation-ms:900000}")
    private long aggregationMs;

    @Value("${samudra.digest.max-listings-per-digest:10}")
    private int maxListingsPerDigest;

    @Value("${samudra.digest.throttle-per-hour:2}")
    private int throttlePerHour;

    @Override
    public void configure() {
        onException(Exception.class)
                .handled(true)
                .log("listing digest route failed: ${exception.message}")
                .to("kafka:" + SamudraTopics.NOTIFICATIONS_DLQ);

        from("kafka:" + SamudraTopics.LISTING_CREATED + "?groupId=samudra-integration-listing-digest")
                .routeId("listing-interest-digest")
                .log("Received listing.created: ${body}")
                .unmarshal().json(JsonLibrary.Jackson, ListingCreatedEvent.class)
                .bean(ListingDigestProcessor.class, "expandToUserListingPairs")
                .split(body()).streaming()
                    .setHeader("userId", simple("${body.userId}"))
                    .aggregate(header("userId"), new UserDigestAggregationStrategy())
                        .completionTimeout("{{samudra.digest.aggregation-ms:900000}}")
                        .completionSize("{{samudra.digest.max-listings-per-digest:10}}")
                        .throttle(throttlePerHour).timePeriodMillis(3_600_000)
                        .bean(ListingDigestProcessor.class, "sendAggregatedDigest")
                    .end()
                .end();
    }
}
