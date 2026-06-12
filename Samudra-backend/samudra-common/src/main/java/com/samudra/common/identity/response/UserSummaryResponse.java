package com.samudra.common.identity.response;

import java.util.UUID;

public record UserSummaryResponse(
        UUID id,
        String email,
        String displayName,
        boolean isVerified
) {}
