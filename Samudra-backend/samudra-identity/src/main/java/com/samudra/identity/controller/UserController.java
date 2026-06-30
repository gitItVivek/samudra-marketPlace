package com.samudra.identity.controller;

import com.samudra.common.identity.request.UpdateMarketplaceProfileRequest;
import com.samudra.common.identity.response.MarketplaceProfileResponse;
import com.samudra.common.identity.response.UserSummaryResponse;
import com.samudra.identity.dal.UserDal;
import com.samudra.identity.entity.User;
import com.samudra.identity.security.SamudraUserPrincipal;
import com.samudra.identity.service.MarketplaceProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserDal userDal;
    private final MarketplaceProfileService marketplaceProfileService;

    @GetMapping("/me")
    public ResponseEntity<UserSummaryResponse> me(
            @AuthenticationPrincipal SamudraUserPrincipal principal) {
        User user = userDal.findById(principal.userId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(new UserSummaryResponse(
                user.getId(), user.getEmail(), user.getDisplayName(), user.getIsVerified()
        ));
    }

    @GetMapping("/me/marketplace-profile")
    public ResponseEntity<MarketplaceProfileResponse> myMarketplaceProfile(
            @AuthenticationPrincipal SamudraUserPrincipal principal) {
        return ResponseEntity.ok(marketplaceProfileService.getMyProfile(principal.userId()));
    }

    @PutMapping("/me/marketplace-profile")
    public ResponseEntity<MarketplaceProfileResponse> updateMyMarketplaceProfile(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @Valid @RequestBody UpdateMarketplaceProfileRequest request) {
        return ResponseEntity.ok(marketplaceProfileService.updateMyProfile(principal.userId(), request));
    }

    @GetMapping("/{userId}/marketplace-profile")
    public ResponseEntity<MarketplaceProfileResponse> publicMarketplaceProfile(@PathVariable UUID userId) {
        try {
            return ResponseEntity.ok(marketplaceProfileService.getPublicProfile(userId));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}
