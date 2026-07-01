package com.samudra.common.identity.response;

import java.util.UUID;

public record UserContactResponse(
        UUID userId,
        String email,
        String displayName
) {
}
