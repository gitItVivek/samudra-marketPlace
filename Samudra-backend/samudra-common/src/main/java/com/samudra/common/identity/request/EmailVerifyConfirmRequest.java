package com.samudra.common.identity.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EmailVerifyConfirmRequest(
        @NotBlank @Size(min = 6, max = 6) String code
) {}
