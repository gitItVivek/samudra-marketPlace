package com.samudra.community.controller;

import com.samudra.community.service.CommunityWatchService;
import com.samudra.identity.security.SamudraUserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/v1/listings")
@RequiredArgsConstructor
public class ListingWatchController {

    private final CommunityWatchService communityWatchService;

    @PostMapping("/{id}/watch")
    public ResponseEntity<Void> watchListing(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID id) {
        communityWatchService.addWatcher(principal.userId(), id);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
