package com.samudra.common.auction.response;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record AuctionAlertResponse(
        UUID listingId,
        String title,
        BigDecimal currentBidAmount,
        long unreadBidCount,
        Instant latestBidAt
) {}
