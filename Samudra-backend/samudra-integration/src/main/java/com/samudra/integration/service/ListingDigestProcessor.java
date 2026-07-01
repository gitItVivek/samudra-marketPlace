package com.samudra.integration.service;

import com.samudra.common.events.ListingCreatedEvent;
import com.samudra.common.identity.response.UserContactResponse;
import com.samudra.common.notifications.ListingDigestItem;
import com.samudra.integration.model.UserDigestPayload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.camel.Exchange;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class ListingDigestProcessor {

    private final CoreApiClient coreApiClient;

    public void expandToUserListingPairs(Exchange exchange) {
        ListingCreatedEvent event = exchange.getIn().getBody(ListingCreatedEvent.class);
        List<UUID> userIds = coreApiClient.findMatchingUsers(event);
        List<UserListingPair> pairs = new ArrayList<>();
        for (UUID userId : userIds) {
            pairs.add(new UserListingPair(userId, event));
        }
        exchange.getIn().setBody(pairs);
        log.info("listing.created listingId={} matchedUsers={}", event.listingId(), userIds.size());
    }

    public void sendAggregatedDigest(Exchange exchange) {
        UserDigestPayload payload = exchange.getIn().getBody(UserDigestPayload.class);
        if (payload == null || payload.getUserId() == null || payload.getListings().isEmpty()) {
            return;
        }
        coreApiClient.recordInAppAlerts(payload.getUserId(), payload.getListings());
        UserContactResponse contact = coreApiClient.fetchContact(payload.getUserId());
        if (contact == null || contact.email() == null || contact.email().isBlank()) {
            log.warn("No email for userId={}, skipping digest email", payload.getUserId());
            coreApiClient.markNotified(payload.getUserId());
            return;
        }
        try {
            coreApiClient.sendDigest(
                    payload.getUserId(),
                    contact.email(),
                    contact.displayName(),
                    payload.getListings());
            coreApiClient.markNotified(payload.getUserId());
            log.info("Digest sent userId={} listings={}", payload.getUserId(), payload.getListings().size());
        } catch (RuntimeException ex) {
            log.warn("Digest email failed userId={} — in-app alert still recorded: {}",
                    payload.getUserId(), ex.getMessage());
        }
    }

    public record UserListingPair(UUID userId, ListingCreatedEvent listing) {
        public ListingDigestItem toDigestItem() {
            return new ListingDigestItem(
                    listing.listingId(),
                    listing.title(),
                    listing.city());
        }
    }
}
