package com.samudra.common.events;

public final class NoOpMarketplaceEventPublisher implements MarketplaceEventPublisher {

    public static final MarketplaceEventPublisher INSTANCE = new NoOpMarketplaceEventPublisher();

    private NoOpMarketplaceEventPublisher() {
    }

    @Override
    public void onListingPublished(ListingPublishedEvent event) {
    }

    @Override
    public void onBidPlaced(BidPlacedEvent event) {
    }

    @Override
    public void onListingClosed(ListingClosedEvent event) {
    }
}
