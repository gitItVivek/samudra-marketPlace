package com.samudra.common.identity.request;

import jakarta.validation.constraints.Size;

public record UpdateMarketplaceProfileRequest(
        @Size(max = 2000) String bio,
        @Size(max = 100) String city,
        @Size(max = 100) String state,
        @Size(max = 500) String avatarUrl
) {}
