package com.samudra.common.events;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.SaleType;

import java.time.Instant;
import java.util.UUID;

public record ListingPublishedEvent(
        UUID listingId,
        UUID userId,
        SaleType saleType,
        String city,
        CategoryType categoryType,
        Instant publishedAt
) {
}
