package com.samudra.common.events;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record BidPlacedEvent(
        UUID listingId,
        UUID bidId,
        UUID bidderId,
        UUID sellerId,
        BigDecimal amount,
        Instant placedAt
) {
}
