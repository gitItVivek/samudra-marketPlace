package com.samudra.common.events;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingType;

import java.time.Instant;
import java.util.UUID;

public record ListingCreatedEvent(
        UUID listingId,
        UUID sellerId,
        String city,
        String state,
        CategoryType categoryType,
        ListingType listingType,
        String title,
        String description,
        String customTag,
        Instant postedAt
) {
}
