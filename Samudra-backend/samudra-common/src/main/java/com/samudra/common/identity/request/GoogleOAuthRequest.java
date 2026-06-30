package com.samudra.common.identity.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record GoogleOAuthRequest(
        @NotBlank String idToken,
        @Size(min = 8, max = 100) String password
) {}
