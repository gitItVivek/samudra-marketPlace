package com.samudra.identity.security;

import java.util.UUID;

public record SamudraUserPrincipal(
        UUID userId,
        String email,
        String role,
        boolean verified) {}
