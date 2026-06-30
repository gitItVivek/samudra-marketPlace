package com.samudra.common.community.response;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.CommunityStatus;

import java.time.Instant;
import java.util.UUID;

public record CommunityDetailResponse(
        UUID id,
        UUID createdBy,
        String name,
        String slug,
        String description,
        CategoryType categoryType,
        String city,
        String state,
        String coverImageUrl,
        CommunityStatus status,
        boolean isPrivate,
        int memberCount,
        int listingCount,
        Instant createdAt
) {}
