package com.samudra.listing.interest.cache;

import com.samudra.listing.interest.InterestFingerprint;

import java.util.UUID;

public interface InterestRegistrationCache {

    boolean isRegistered(UUID userId, InterestFingerprint fingerprint);

    void markRegistered(UUID userId, InterestFingerprint fingerprint);
}
