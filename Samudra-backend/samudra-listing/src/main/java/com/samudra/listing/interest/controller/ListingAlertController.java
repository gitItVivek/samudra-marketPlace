package com.samudra.listing.interest.controller;

import com.samudra.common.listing.response.ListingAlertNotificationResponse;
import com.samudra.identity.security.SamudraUserPrincipal;
import com.samudra.listing.interest.service.ListingAlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/me/notifications")
@RequiredArgsConstructor
public class ListingAlertController {

    private final ListingAlertService listingAlertService;

    @GetMapping
    public ResponseEntity<List<ListingAlertNotificationResponse>> list(
            @AuthenticationPrincipal SamudraUserPrincipal principal) {
        return ResponseEntity.ok(listingAlertService.listForUser(principal.userId()));
    }
}
