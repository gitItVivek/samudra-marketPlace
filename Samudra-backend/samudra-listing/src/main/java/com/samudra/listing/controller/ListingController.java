package com.samudra.listing.controller;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;
import com.samudra.common.listing.request.CreateListingRequest;
import com.samudra.common.listing.request.UpdateListingRequest;
import com.samudra.common.listing.response.ListingDetailResponse;
import com.samudra.common.listing.response.ListingSummaryResponse;
import com.samudra.common.response.PagedResponse;
import com.samudra.identity.security.SamudraUserPrincipal;
import com.samudra.listing.service.ListingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/v1/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @PostMapping
    public ResponseEntity<ListingDetailResponse> create(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @Valid @RequestBody CreateListingRequest request) {
        ListingDetailResponse response = listingService.create(principal.userId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<PagedResponse<ListingSummaryResponse>> list(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) CategoryType categoryType,
            @RequestParam(required = false) ListingType listingType,
            @RequestParam(required = false) SaleType saleType,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(listingService.search(
                city, state, categoryType, listingType, saleType, q, null, null, "recent", page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingDetailResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(listingService.getById(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ListingDetailResponse> update(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateListingRequest request) {
        return ResponseEntity.ok(listingService.update(principal.userId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID id) {
        listingService.delete(principal.userId(), id);
        return ResponseEntity.noContent().build();
    }
}
