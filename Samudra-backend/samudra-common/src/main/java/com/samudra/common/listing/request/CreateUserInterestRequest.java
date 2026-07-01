package com.samudra.common.listing.request;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.InterestSource;
import com.samudra.common.enums.ListingType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateUserInterestRequest(
        @NotBlank @Size(max = 100) String city,
        @Size(max = 100) String state,
        CategoryType categoryType,
        ListingType listingType,
        @Size(max = 500) String keywords,
        @Size(max = 100) String customTag,
        @NotNull InterestSource source
) {
}
