package com.samudra.listing.controller;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;
import com.samudra.common.listing.response.ListingSummaryResponse;
import com.samudra.common.response.PagedResponse;
import com.samudra.identity.security.SamudraUserPrincipal;
import com.samudra.listing.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
public class SearchAndMeListingController {

    private final ListingService listingService;

    @GetMapping("/v1/search/listings")
    public ResponseEntity<PagedResponse<ListingSummaryResponse>> search(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) CategoryType categoryType,
            @RequestParam(required = false) ListingType listingType,
            @RequestParam(required = false) SaleType saleType,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "recent") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(listingService.search(
                city, state, categoryType, listingType, saleType, q, minPrice, maxPrice, sort, page, size));
    }

    @GetMapping("/v1/users/me/listings")
    public ResponseEntity<PagedResponse<ListingSummaryResponse>> myListings(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(listingService.getMyListings(principal.userId(), page, size));
    }
}
