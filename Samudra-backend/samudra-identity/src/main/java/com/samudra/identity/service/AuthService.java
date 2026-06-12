package com.samudra.identity.service;

import com.samudra.common.enums.UserStatus;
import com.samudra.common.identity.request.LoginEmailRequest;
import com.samudra.common.identity.request.RegisterEmailRequest;
import com.samudra.common.identity.response.AuthResponse;
import com.samudra.common.identity.response.UserSummaryResponse;
import com.samudra.identity.config.JwtProperties;
import com.samudra.identity.dal.MarketplaceProfileDal;
import com.samudra.identity.dal.RevokedTokenDal;
import com.samudra.identity.dal.UserDal;
import com.samudra.identity.entity.MarketplaceProfile;
import com.samudra.identity.entity.RevokedToken;
import com.samudra.identity.entity.User;
import com.samudra.identity.exception.AccountNotActiveException;
import com.samudra.identity.exception.EmailAlreadyExistsException;
import com.samudra.identity.exception.InvalidCredentialsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserDal userDal;
    private final MarketplaceProfileDal profileDal;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final JwtProperties jwtProperties;
    private final RevokedTokenDal revokedTokenDal;

    @Transactional
    public AuthResponse registerWithEmail(RegisterEmailRequest req) {
        String email = req.email().trim().toLowerCase();
        if(userDal.existsByEmail(email)) {
            throw new EmailAlreadyExistsException(email);
        }
        User user = User.builder()
                        .email(email)
                        .passwordHash(passwordEncoder.encode(req.password()))
                        .displayName(req.displayName().trim())
                        .isVerified(false)
                        .build();
        user = userDal.save(user);

        profileDal.save(
                MarketplaceProfile.builder()
                        .userId(user.getId())
                        .build()
        );
        return buildAuthResponse(user);
    }

    public AuthResponse loginWithEmail(LoginEmailRequest req) {
        String email = req.email().trim().toLowerCase();
        User user = userDal.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);


        if(user.getPasswordHash()==null || !passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new InvalidCredentialsException();
        }
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new AccountNotActiveException();
        }
        return buildAuthResponse(user);
    }

    private  AuthResponse buildAuthResponse(User user) {
        return  new  AuthResponse(
                tokenService.generateToken(user),
                "Bearer",
                jwtProperties.getExpirySeconds(),
                toSummary(user)
        );
    }

    public void logoutAndTokenBlackListing(String rawJwt) {
        if (rawJwt == null || rawJwt.isBlank()) {
            throw new InvalidCredentialsException();
        }
        String token = rawJwt.trim();
        String hash = tokenService.hashToken(token);
        if (revokedTokenDal.existsByTokenHash(hash)) {
            return;
        }
        Instant expiresAt = tokenService.getTokenExpiration(token);
        revokedTokenDal.save(
                RevokedToken.builder()
                        .tokenHash(hash)
                        .expiresAt(expiresAt)
                        .build()
        );
    }

    private UserSummaryResponse toSummary(User user) {
        return new UserSummaryResponse(
                user.getId(), user.getEmail(), user.getDisplayName(), user.getIsVerified()
        );
    }

}
