package com.samudra.identity.controller;

import com.samudra.common.notifications.ListingDigestNotificationRequest;
import com.samudra.identity.service.ListingDigestEmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/internal/notifications")
@RequiredArgsConstructor
public class InternalNotificationController {

    private final ListingDigestEmailService listingDigestEmailService;

    @PostMapping("/listing-digest")
    public ResponseEntity<Void> sendListingDigest(@Valid @RequestBody ListingDigestNotificationRequest request) {
        listingDigestEmailService.sendDigest(request);
        return ResponseEntity.noContent().build();
    }
}
