package com.samudra.common.community.response;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.CommunityStatus;

import java.time.Instant;
import java.util.UUID;

public record CommunitySummaryResponse(
        UUID id,
        String name,
        String slug,
        String description,
        CategoryType categoryType,
        String city,
        String state,
        CommunityStatus status,
        int memberCount,
        int listingCount,
        Instant createdAt
) {}
