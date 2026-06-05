package com.samudra.community.dal;

import com.samudra.community.entity.CommunityListing;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommunityListingDal {

    CommunityListing save(CommunityListing communityListing);

    Optional<CommunityListing> findById(UUID id);

    Optional<CommunityListing> findByCommunityIdAndListingId(UUID communityId, UUID listingId);

    boolean existsByCommunityIdAndListingId(UUID communityId, UUID listingId);

    List<CommunityListing> findApprovedByCommunityId(UUID communityId);

    List<CommunityListing> findByListingId(UUID listingId);
}
