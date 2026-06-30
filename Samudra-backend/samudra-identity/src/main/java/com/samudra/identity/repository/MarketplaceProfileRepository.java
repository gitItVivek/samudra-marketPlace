package com.samudra.identity.repository;

import com.samudra.identity.entity.MarketplaceProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MarketplaceProfileRepository extends JpaRepository<MarketplaceProfile, UUID> {

    Optional<MarketplaceProfile> findByUserIdAndDeletedAtIsNull(UUID userId);

    boolean existsByUserId(UUID userId);
}
