package com.samudra.common.auction.response;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record BidResponse(
        UUID bidId,
        UUID listingId,
        UUID bidderId,
        BigDecimal amount,
        Instant createdAt
) {}
