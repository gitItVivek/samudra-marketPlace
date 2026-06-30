package com.samudra.common.listing.response;

public record ListingImageResponse(
        String url,
        int displayOrder,
        boolean cover
) {}
