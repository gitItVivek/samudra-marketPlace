package com.samudra.identity.controller;

import com.samudra.common.identity.request.EmailVerifyConfirmRequest;
import com.samudra.common.identity.response.VerificationStatusResponse;
import com.samudra.identity.security.SamudraUserPrincipal;
import com.samudra.identity.service.VerificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth/verification")
@RequiredArgsConstructor
public class VerificationController {

    private final VerificationService verificationService;

    @PostMapping("/email/send")
    public ResponseEntity<Void> sendEmailOtp(
            @AuthenticationPrincipal SamudraUserPrincipal principal) {
        verificationService.requestEmailVerification(principal.userId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email/confirm")
    public ResponseEntity<VerificationStatusResponse> confirm(
            @AuthenticationPrincipal SamudraUserPrincipal principal,
            @Valid @RequestBody EmailVerifyConfirmRequest req) {
        return ResponseEntity.ok(
                verificationService.confirmEmailVerification(principal.userId(), req.code()));
    }

    @GetMapping("/status")
    public ResponseEntity<VerificationStatusResponse> status(
            @AuthenticationPrincipal SamudraUserPrincipal principal) {
        return ResponseEntity.ok(verificationService.getStatus(principal.userId()));
    }
}
