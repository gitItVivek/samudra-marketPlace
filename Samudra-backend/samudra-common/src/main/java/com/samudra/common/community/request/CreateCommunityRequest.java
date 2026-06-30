package com.samudra.common.community.request;

import com.samudra.common.enums.CategoryType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateCommunityRequest(
        @NotBlank @Size(max = 150) String name,
        @NotBlank @Size(max = 150) String slug,
        @Size(max = 5000) String description,
        @NotNull CategoryType categoryType,
        @NotBlank @Size(max = 100) String city,
        @NotBlank @Size(max = 100) String state
) {}
