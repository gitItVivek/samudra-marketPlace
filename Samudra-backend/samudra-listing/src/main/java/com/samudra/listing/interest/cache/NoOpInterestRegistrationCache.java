package com.samudra.listing.interest.cache;

import com.samudra.listing.interest.InterestFingerprint;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@ConditionalOnProperty(name = "samudra.cache.redis.enabled", havingValue = "false")
public class NoOpInterestRegistrationCache implements InterestRegistrationCache {

    @Override
    public boolean isRegistered(UUID userId, InterestFingerprint fingerprint) {
        return false;
    }

    @Override
    public void markRegistered(UUID userId, InterestFingerprint fingerprint) {
        // no-op
    }
}
