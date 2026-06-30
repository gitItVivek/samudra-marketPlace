package com.samudra.common.events;

public interface MarketplaceEventPublisher {

    void onListingPublished(ListingPublishedEvent event);

    void onBidPlaced(BidPlacedEvent event);

    void onListingClosed(ListingClosedEvent event);
}
