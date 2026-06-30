package com.samudra.common.listing.response;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record ListingSummaryResponse(
        UUID id,
        UUID userId,
        String title,
        String description,
        CategoryType categoryType,
        ListingType listingType,
        ListingStatus status,
        SaleType saleType,
        BigDecimal price,
        BigDecimal startingPrice,
        BigDecimal currentBidAmount,
        String currency,
        String city,
        String state,
        String locality,
        String coverImageUrl,
        Instant createdAt,
        Instant auctionEndsAt
) {}
