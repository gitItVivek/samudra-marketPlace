package com.samudra.integration.routes;

import com.samudra.common.events.BidPlacedEvent;
import com.samudra.common.events.SamudraTopics;
import com.samudra.integration.service.NotificationSender;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.stereotype.Component;

@Component
public class BidPlacedRoute extends RouteBuilder {

    @Override
    public void configure() {
        onException(Exception.class)
                .handled(true)
                .log("auction.bid.placed failed: ${exception.message}")
                .to("kafka:" + SamudraTopics.AUCTION_BID_PLACED_DLQ);

        from("kafka:" + SamudraTopics.AUCTION_BID_PLACED + "?groupId=samudra-integration-bid-placed")
                .routeId("bid-placed")
                .log("Received auction.bid.placed: ${body}")
                .unmarshal().json(JsonLibrary.Jackson, BidPlacedEvent.class)
                .bean(NotificationSender.class, "notifySellerOfBid");
    }
}
