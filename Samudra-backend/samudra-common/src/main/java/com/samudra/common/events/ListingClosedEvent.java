package com.samudra.common.events;

import java.time.Instant;
import java.util.UUID;

public record ListingClosedEvent(
        UUID listingId,
        UUID sellerId,
        ListingCloseReason closeReason,
        UUID winningBidId,
        Instant closedAt
) {
}
