package com.samudra.community.controller;

import com.samudra.common.community.request.CreateCommunityRequest;
import com.samudra.common.community.response.CommunityDetailResponse;
import com.samudra.common.community.response.CommunityMemberResponse;
import com.samudra.common.community.response.CommunitySummaryResponse;
import com.samudra.common.enums.CategoryType;
import com.samudra.common.listing.request.CreateListingRequest;
import com.samudra.common.listing.response.ListingDetailResponse;
import com.samudra.common.listing.response.ListingSummaryResponse;
import com.samudra.common.response.PagedResponse;
import com.samudra.community.service.CommunityListingService;
import com.samudra.community.service.CommunityService;
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
@RequestMapping("/v1/communities")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;
    private final CommunityListingService communityListingService;

    @PostMapping
    public ResponseEntity<CommunityDetailResponse> create(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @Valid @RequestBody CreateCommunityRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(communityService.create(principal.userId(), request));
    }

    @GetMapping
    public ResponseEntity<PagedResponse<CommunitySummaryResponse>> list(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) CategoryType categoryType,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(communityService.search(city, categoryType, q, page, size));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<CommunityDetailResponse> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(communityService.getBySlug(slug));
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<Void> join(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID id) {
        communityService.join(principal.userId(), id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<CommunityMemberResponse>> members(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID id) {
        return ResponseEntity.ok(communityService.getMembers(principal.userId(), id));
    }

    @PostMapping("/{id}/listings")
    public ResponseEntity<ListingDetailResponse> postListing(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody CreateListingRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(communityListingService.postListing(principal.userId(), id, request));
    }

    @GetMapping("/{id}/listings")
    public ResponseEntity<PagedResponse<ListingSummaryResponse>> communityListings(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(communityListingService.getCommunityListings(id, page, size));
    }
}
