package com.samudra.common.listing.request;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingCondition;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record CreateListingRequest(
        @NotBlank @Size(max = 255) String title,
        @Size(max = 10000) String description,
        @NotNull CategoryType categoryType,
        @NotNull ListingType listingType,
        ListingCondition condition,
        SaleType saleType,
        @DecimalMin("0.00") BigDecimal price,
        @DecimalMin("0.01") BigDecimal startingPrice,
        Instant auctionEndsAt,
        String currency,
        @NotBlank @Size(max = 100) String city,
        @NotBlank @Size(max = 100) String state,
        @Size(max = 100) String locality,
        BigDecimal latitude,
        BigDecimal longitude,
        List<@NotBlank @Size(max = 500) String> imageUrls,
        @Size(max = 100) String customTag
) {
    public SaleType resolvedSaleType() {
        return saleType != null ? saleType : SaleType.FIXED_PRICE;
    }
}
