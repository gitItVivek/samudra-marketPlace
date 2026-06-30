package com.samudra.common.auction.response;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record BidAnalyticsResponse(
        UUID listingId,
        long totalBids,
        long uniqueBidders,
        BigDecimal highestBid,
        BigDecimal lowestBid,
        BigDecimal averageBid,
        Instant latestBidAt,
        long bidsLast24h
) {}
