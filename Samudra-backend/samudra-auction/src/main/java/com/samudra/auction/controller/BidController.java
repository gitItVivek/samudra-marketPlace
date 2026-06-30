package com.samudra.auction.controller;

import com.samudra.auction.service.BidService;
import com.samudra.common.auction.request.PlaceBidRequest;
import com.samudra.common.auction.response.AuctionAlertResponse;
import com.samudra.common.auction.response.BidAnalyticsResponse;
import com.samudra.common.auction.response.BidResponse;
import com.samudra.identity.security.SamudraUserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class BidController {

    private final BidService bidService;

    @PostMapping("/v1/listings/{listingId}/bids")
    public ResponseEntity<BidResponse> placeBid(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID listingId,
            @Valid @RequestBody PlaceBidRequest request) {
        BidResponse response = bidService.placeBid(principal.userId(), listingId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/v1/listings/{listingId}/bids")
    public ResponseEntity<List<BidResponse>> bidHistory(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID listingId) {
        return ResponseEntity.ok(bidService.getBidHistoryForSeller(principal.userId(), listingId));
    }

    @GetMapping("/v1/listings/{listingId}/bids/analytics")
    public ResponseEntity<BidAnalyticsResponse> analytics(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID listingId) {
        return ResponseEntity.ok(bidService.getAnalyticsForSeller(principal.userId(), listingId));
    }

    @PostMapping("/v1/listings/{listingId}/bids/mark-seen")
    public ResponseEntity<Void> markSeen(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID listingId) {
        bidService.markBidsSeen(principal.userId(), listingId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/v1/users/me/auction-alerts")
    public ResponseEntity<List<AuctionAlertResponse>> auctionAlerts(
            @AuthenticationPrincipal SamudraUserPrincipal principal) {
        return ResponseEntity.ok(bidService.getAuctionAlerts(principal.userId()));
    }
}
