package com.samudra.common.identity.response;

public record VerificationStatusResponse(
        boolean isVerified,
        String email
) {}
