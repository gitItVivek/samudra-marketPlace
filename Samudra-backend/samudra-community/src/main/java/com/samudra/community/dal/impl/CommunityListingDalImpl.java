package com.samudra.community.dal.impl;

import com.samudra.community.dal.CommunityListingDal;
import com.samudra.community.entity.CommunityListing;
import com.samudra.community.repository.CommunityListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CommunityListingDalImpl implements CommunityListingDal {

    private final CommunityListingRepository communityListingRepository;

    @Override
    public CommunityListing save(CommunityListing communityListing) {
        return communityListingRepository.save(communityListing);
    }

    @Override
    public Optional<CommunityListing> findById(UUID id) {
        return communityListingRepository.findById(id);
    }

    @Override
    public Optional<CommunityListing> findByCommunityIdAndListingId(UUID communityId, UUID listingId) {
        return communityListingRepository.findByCommunityIdAndListingId(communityId, listingId);
    }

    @Override
    public boolean existsByCommunityIdAndListingId(UUID communityId, UUID listingId) {
        return communityListingRepository.existsByCommunityIdAndListingId(communityId, listingId);
    }

    @Override
    public List<CommunityListing> findApprovedByCommunityId(UUID communityId) {
        return communityListingRepository.findByCommunityIdAndIsApprovedTrueOrderByCreatedAtDesc(communityId);
    }

    @Override
    public List<CommunityListing> findByListingId(UUID listingId) {
        return communityListingRepository.findByListingId(listingId);
    }
}
