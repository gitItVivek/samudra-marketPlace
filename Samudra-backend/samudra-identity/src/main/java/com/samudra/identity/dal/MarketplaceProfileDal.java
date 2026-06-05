package com.samudra.identity.dal;

import com.samudra.identity.entity.MarketplaceProfile;

import java.util.Optional;
import java.util.UUID;

public interface MarketplaceProfileDal {

    MarketplaceProfile save(MarketplaceProfile profile);

    Optional<MarketplaceProfile> findById(UUID id);

    Optional<MarketplaceProfile> findByUserId(UUID userId);

    boolean existsByUserId(UUID userId);
}
