package com.samudra.listing.interest.controller;

import com.samudra.common.events.ListingCreatedEvent;
import com.samudra.common.listing.request.RecordListingAlertsRequest;
import com.samudra.common.listing.response.MatchingUserIdsResponse;
import com.samudra.listing.interest.service.ListingAlertService;
import com.samudra.listing.interest.service.UserInterestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/v1/internal/interests")
@RequiredArgsConstructor
public class InternalInterestController {

    private final UserInterestService userInterestService;
    private final ListingAlertService listingAlertService;

    @PostMapping("/matching")
    public ResponseEntity<MatchingUserIdsResponse> matching(@RequestBody ListingCreatedEvent event) {
        return ResponseEntity.ok(new MatchingUserIdsResponse(userInterestService.findMatchingUserIds(event)));
    }

    @PostMapping("/{userId}/alerts")
    public ResponseEntity<Void> recordAlerts(
            @PathVariable UUID userId,
            @Valid @RequestBody RecordListingAlertsRequest request) {
        listingAlertService.recordDeliveries(userId, request.listings());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{userId}/notified")
    public ResponseEntity<Void> markNotified(@PathVariable UUID userId) {
        userInterestService.markNotified(userId);
        return ResponseEntity.noContent().build();
    }
}
