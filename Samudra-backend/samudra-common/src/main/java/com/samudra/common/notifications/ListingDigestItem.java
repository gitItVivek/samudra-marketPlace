package com.samudra.common.notifications;

import java.util.List;
import java.util.UUID;

public record ListingDigestItem(
        UUID listingId,
        String title,
        String city
) {
}
