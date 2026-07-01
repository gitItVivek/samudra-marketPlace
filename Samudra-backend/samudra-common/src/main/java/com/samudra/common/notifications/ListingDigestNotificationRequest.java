package com.samudra.common.notifications;

import java.util.List;
import java.util.UUID;

public record ListingDigestNotificationRequest(
        UUID userId,
        String email,
        String displayName,
        List<ListingDigestItem> listings
) {
}
