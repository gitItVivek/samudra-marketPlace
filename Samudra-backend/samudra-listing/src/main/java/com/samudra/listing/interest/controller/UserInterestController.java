package com.samudra.listing.interest.controller;

import com.samudra.common.listing.request.CreateUserInterestRequest;
import com.samudra.common.listing.request.UpdateUserInterestRequest;
import com.samudra.common.listing.response.UserInterestResponse;
import com.samudra.identity.security.SamudraUserPrincipal;
import com.samudra.listing.interest.service.UserInterestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/me/interests")
@RequiredArgsConstructor
public class UserInterestController {

    private final UserInterestService userInterestService;

    @PostMapping
    public ResponseEntity<UserInterestResponse> create(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @Valid @RequestBody CreateUserInterestRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userInterestService.create(principal.userId(), request));
    }

    @GetMapping
    public ResponseEntity<List<UserInterestResponse>> list(
            @AuthenticationPrincipal SamudraUserPrincipal principal) {
        return ResponseEntity.ok(userInterestService.listForUser(principal.userId()));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserInterestResponse> update(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateUserInterestRequest request) {
        return ResponseEntity.ok(userInterestService.update(principal.userId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @PathVariable UUID id) {
        userInterestService.delete(principal.userId(), id);
        return ResponseEntity.noContent().build();
    }
}
