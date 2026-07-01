package com.samudra.common.listing.request;

import com.samudra.common.notifications.ListingDigestItem;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record RecordListingAlertsRequest(
        @NotNull List<ListingDigestItem> listings
) {
}
