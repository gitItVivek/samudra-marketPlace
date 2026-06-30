package com.samudra.integration.service;

import com.samudra.common.events.BidPlacedEvent;
import com.samudra.common.events.ListingClosedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
public class NotificationSender {

    public void notifySellerOfBid(BidPlacedEvent event) {
        log.info(
                "Seller alert: listingId={} sellerId={} bidId={} amount={} bidderId={}",
                event.listingId(),
                event.sellerId(),
                event.bidId(),
                event.amount(),
                event.bidderId());
    }

    public void notifyWatcherListingClosed(UUID watcherId, ListingClosedEvent event) {
        log.info(
                "Watcher alert: watcherId={} listingId={} reason={}",
                watcherId,
                event.listingId(),
                event.closeReason());
    }

    public void notifyWatcherBatch(UUID listingId, int watcherCount, ListingClosedEvent event) {
        log.info(
                "Aggregated listing.closed notifications: listingId={} watchers={} reason={}",
                listingId,
                watcherCount,
                event.closeReason());
    }
}
