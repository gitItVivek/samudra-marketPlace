package com.samudra.identity.service;

import com.samudra.common.identity.request.UpdateMarketplaceProfileRequest;
import com.samudra.common.identity.response.MarketplaceProfileResponse;
import com.samudra.identity.dal.MarketplaceProfileDal;
import com.samudra.identity.dal.UserDal;
import com.samudra.identity.entity.MarketplaceProfile;
import com.samudra.identity.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MarketplaceProfileService {

    private final MarketplaceProfileDal profileDal;
    private final UserDal userDal;

    @Transactional(readOnly = true)
    public MarketplaceProfileResponse getPublicProfile(UUID userId) {
        User user = userDal.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        MarketplaceProfile profile = profileDal.findByUserId(userId).orElse(null);
        return toResponse(user, profile);
    }

    @Transactional(readOnly = true)
    public MarketplaceProfileResponse getMyProfile(UUID userId) {
        return getPublicProfile(userId);
    }

    @Transactional
    public MarketplaceProfileResponse updateMyProfile(UUID userId, UpdateMarketplaceProfileRequest request) {
        User user = userDal.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        MarketplaceProfile profile = profileDal.findByUserId(userId)
                .orElseGet(() -> MarketplaceProfile.builder().userId(userId).build());

        if (request.bio() != null) {
            profile.setBio(request.bio());
        }
        if (request.city() != null) {
            profile.setCity(request.city().trim());
        }
        if (request.state() != null) {
            profile.setState(request.state().trim());
        }
        if (request.avatarUrl() != null) {
            profile.setAvatarUrl(request.avatarUrl().trim());
        }

        profile = profileDal.save(profile);
        return toResponse(user, profile);
    }

    private MarketplaceProfileResponse toResponse(User user, MarketplaceProfile profile) {
        boolean setupComplete = profile != null
                && profile.getCity() != null
                && !profile.getCity().isBlank();
        return new MarketplaceProfileResponse(
                user.getId(),
                user.getDisplayName(),
                profile != null ? profile.getBio() : null,
                profile != null ? profile.getCity() : null,
                profile != null ? profile.getState() : null,
                profile != null ? profile.getAvatarUrl() : null,
                profile != null ? profile.getTotalListings() : 0,
                setupComplete
        );
    }
}
