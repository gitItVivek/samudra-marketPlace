package com.samudra.identity.service;

import com.samudra.common.enums.UserStatus;
import com.samudra.common.identity.request.GoogleOAuthRequest;
import com.samudra.common.identity.response.AuthResponse;
import com.samudra.common.identity.response.UserSummaryResponse;
import com.samudra.identity.config.JwtProperties;
import com.samudra.identity.dal.MarketplaceProfileDal;
import com.samudra.identity.dal.UserDal;
import com.samudra.identity.entity.MarketplaceProfile;
import com.samudra.identity.entity.User;
import com.samudra.identity.exception.AccountNotActiveException;
import com.samudra.identity.exception.OAuthAccountConflictException;
import com.samudra.identity.exception.OAuthEmailRequiredException;
import com.samudra.identity.port.GoogleTokenVerifierPort;
import com.samudra.identity.port.model.GoogleUserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class GoogleOAuthService {

    private final GoogleTokenVerifierPort googleTokenVerifierPort;
    private final UserDal userDal;
    private final MarketplaceProfileDal profileDal;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final JwtProperties jwtProperties;

    @Transactional
    public AuthResponse authenticateWithGoogle(GoogleOAuthRequest req) {
        GoogleUserInfo googleUser = googleTokenVerifierPort.verifyIdToken(req.idToken());

        return userDal.findByGoogleId(googleUser.googleId())
                .map(this::loginExistingUser)
                .orElseGet(() -> loginOrRegisterByEmail(googleUser, req.password()));
    }

    private AuthResponse loginOrRegisterByEmail(GoogleUserInfo googleUser, String password) {
        if (!StringUtils.hasText(googleUser.email())) {
            throw new OAuthEmailRequiredException();
        }

        return userDal.findByEmail(googleUser.email())
                .map(user -> linkGoogleAndLogin(user, googleUser))
                .orElseGet(() -> registerNewGoogleUser(googleUser, password));
    }

    private AuthResponse linkGoogleAndLogin(User user, GoogleUserInfo googleUser) {
        if (user.getGoogleId() != null && !user.getGoogleId().equals(googleUser.googleId())) {
            throw new OAuthAccountConflictException();
        }
        if (user.getGoogleId() == null) {
            user.setGoogleId(googleUser.googleId());
        }
        if (googleUser.emailVerified()) {
            user.setIsVerified(true);
        }
        userDal.save(user);
        return loginExistingUser(user);
    }

    private AuthResponse registerNewGoogleUser(GoogleUserInfo googleUser, String password) {

        String displayName = StringUtils.hasText(googleUser.displayName())
                ? googleUser.displayName()
                : googleUser.email().substring(0, googleUser.email().indexOf('@'));

        User.UserBuilder builder = User.builder()
                .googleId(googleUser.googleId())
                .email(googleUser.email())
                .displayName(displayName)
                .isVerified(googleUser.emailVerified());
        if (StringUtils.hasText(password) && password.length() >= 8) {
            builder.passwordHash(passwordEncoder.encode(password));
        }
// if password null/short → skip passwordHash (null in DB — same as OAuth-only user)
        User user = userDal.save(builder.build());

        profileDal.save(
                MarketplaceProfile.builder()
                        .userId(user.getId())
                        .build()
        );
        return buildAuthResponse(user);
    }

    private AuthResponse loginExistingUser(User user) {
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new AccountNotActiveException();
        }
        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        return new AuthResponse(
                tokenService.generateToken(user),
                "Bearer",
                jwtProperties.getExpirySeconds(),
                new UserSummaryResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getDisplayName(),
                        user.getIsVerified()
                )
        );
    }
}
