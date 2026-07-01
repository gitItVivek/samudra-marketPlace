package com.samudra.common.listing.response;

import java.util.List;
import java.util.UUID;

public record MatchingUserIdsResponse(
        List<UUID> userIds
) {
}
