package com.samudra.common.events;

public final class SamudraTopics {

    public static final String LISTING_PUBLISHED = "samudra.listing.published";
    public static final String AUCTION_BID_PLACED = "samudra.auction.bid.placed";
    public static final String LISTING_CLOSED = "samudra.listing.closed";

    public static final String LISTING_PUBLISHED_DLQ = "samudra.listing.published.dlq";
    public static final String AUCTION_BID_PLACED_DLQ = "samudra.auction.bid.placed.dlq";
    public static final String LISTING_CLOSED_DLQ = "samudra.listing.closed.dlq";

    private SamudraTopics() {
    }
}
