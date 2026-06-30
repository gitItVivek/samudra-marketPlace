package com.samudra.common.listing.request;

import com.samudra.common.enums.ListingStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record UpdateListingRequest(
        @Size(max = 255) String title,
        @Size(max = 10000) String description,
        @DecimalMin("0.00") BigDecimal price,
        ListingStatus status
) {}
