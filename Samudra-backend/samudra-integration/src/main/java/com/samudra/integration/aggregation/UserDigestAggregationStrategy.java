package com.samudra.integration.aggregation;

import com.samudra.integration.model.UserDigestPayload;
import com.samudra.integration.service.ListingDigestProcessor;
import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

public class UserDigestAggregationStrategy implements AggregationStrategy {

    @Override
    public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {
        ListingDigestProcessor.UserListingPair pair = newExchange.getIn().getBody(ListingDigestProcessor.UserListingPair.class);
        if (pair == null) {
            return oldExchange;
        }
        if (oldExchange == null) {
            UserDigestPayload payload = new UserDigestPayload(pair.userId());
            payload.addListing(pair.toDigestItem());
            newExchange.getIn().setBody(payload);
            newExchange.getIn().setHeader("userId", pair.userId().toString());
            return newExchange;
        }
        UserDigestPayload payload = oldExchange.getIn().getBody(UserDigestPayload.class);
        payload.addListing(pair.toDigestItem());
        oldExchange.getIn().setBody(payload);
        return oldExchange;
    }
}
