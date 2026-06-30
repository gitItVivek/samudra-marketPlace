package com.samudra.community.repository;

import com.samudra.community.entity.CommunityListing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommunityListingRepository extends JpaRepository<CommunityListing, UUID> {

    Optional<CommunityListing> findByCommunityIdAndListingId(UUID communityId, UUID listingId);

    boolean existsByCommunityIdAndListingId(UUID communityId, UUID listingId);

    List<CommunityListing> findByCommunityIdAndIsApprovedTrueOrderByCreatedAtDesc(UUID communityId);

    List<CommunityListing> findByListingId(UUID listingId);
}
