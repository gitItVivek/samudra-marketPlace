package com.samudra.common.identity.response;

import java.util.UUID;

public record MarketplaceProfileResponse(
        UUID userId,
        String displayName,
        String bio,
        String city,
        String state,
        String avatarUrl,
        int totalListings,
        boolean setupComplete
) {}
