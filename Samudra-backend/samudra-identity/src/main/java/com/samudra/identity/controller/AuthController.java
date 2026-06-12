package com.samudra.identity.controller;

import com.samudra.common.identity.request.GoogleOAuthRequest;
import com.samudra.common.identity.request.LoginEmailRequest;
import com.samudra.common.identity.request.RegisterEmailRequest;
import com.samudra.common.identity.response.AuthResponse;
import com.samudra.identity.exception.InvalidCredentialsException;
import com.samudra.identity.service.AuthService;
import com.samudra.identity.service.GoogleOAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final GoogleOAuthService googleOAuthService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterEmailRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerWithEmail(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginEmailRequest req) {
        return ResponseEntity.ok(authService.loginWithEmail(req));
    }

    @PostMapping("/oauth/google")
    public ResponseEntity<AuthResponse> googleOAuth(@Valid @RequestBody GoogleOAuthRequest req) {
        return ResponseEntity.ok(googleOAuthService.authenticateWithGoogle(req));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new InvalidCredentialsException();
        }
        authService.logoutAndTokenBlackListing(authorization.substring(7));
        return ResponseEntity.noContent().build();
    }
}
