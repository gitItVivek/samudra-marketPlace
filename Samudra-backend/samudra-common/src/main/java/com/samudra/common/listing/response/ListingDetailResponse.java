package com.samudra.common.listing.response;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingCondition;
import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ListingDetailResponse(
        UUID id,
        UUID userId,
        UUID categoryId,
        String title,
        String description,
        CategoryType categoryType,
        ListingType listingType,
        ListingCondition condition,
        ListingStatus status,
        SaleType saleType,
        BigDecimal price,
        BigDecimal startingPrice,
        BigDecimal currentBidAmount,
        String currency,
        String city,
        String state,
        String locality,
        BigDecimal latitude,
        BigDecimal longitude,
        List<ListingImageResponse> images,
        Instant createdAt,
        Instant updatedAt,
        Instant auctionEndsAt
) {}
