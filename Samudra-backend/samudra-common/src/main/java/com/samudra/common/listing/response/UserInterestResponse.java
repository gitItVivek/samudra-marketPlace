package com.samudra.common.listing.response;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.InterestSource;
import com.samudra.common.enums.ListingType;

import java.time.Instant;
import java.util.UUID;

public record UserInterestResponse(
        UUID id,
        String city,
        String state,
        CategoryType categoryType,
        ListingType listingType,
        String keywords,
        String customTag,
        InterestSource source,
        boolean notifyEnabled,
        Instant lastNotifiedAt,
        Instant createdAt
) {
}
