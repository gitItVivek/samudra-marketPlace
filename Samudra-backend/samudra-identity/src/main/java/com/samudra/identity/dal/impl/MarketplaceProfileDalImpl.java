package com.samudra.identity.dal.impl;

import com.samudra.identity.dal.MarketplaceProfileDal;
import com.samudra.identity.entity.MarketplaceProfile;
import com.samudra.identity.repository.MarketplaceProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class MarketplaceProfileDalImpl implements MarketplaceProfileDal {

    private final MarketplaceProfileRepository marketplaceProfileRepository;

    @Override
    public MarketplaceProfile save(MarketplaceProfile profile) {
        return marketplaceProfileRepository.save(profile);
    }

    @Override
    public Optional<MarketplaceProfile> findById(UUID id) {
        return marketplaceProfileRepository.findById(id);
    }

    @Override
    public Optional<MarketplaceProfile> findByUserId(UUID userId) {
        return marketplaceProfileRepository.findByUserIdAndDeletedAtIsNull(userId);
    }

    @Override
    public boolean existsByUserId(UUID userId) {
        return marketplaceProfileRepository.existsByUserId(userId);
    }
}
