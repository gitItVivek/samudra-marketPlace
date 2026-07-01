package com.samudra.common.listing.response;

import java.time.Instant;
import java.util.UUID;

public record ListingAlertNotificationResponse(
        UUID id,
        UUID listingId,
        String listingTitle,
        String listingCity,
        Instant deliveredAt
) {
}
