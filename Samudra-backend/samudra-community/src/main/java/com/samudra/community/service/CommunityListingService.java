package com.samudra.community.service;

import com.samudra.common.listing.request.CreateListingRequest;
import com.samudra.common.listing.response.ListingDetailResponse;
import com.samudra.common.listing.response.ListingSummaryResponse;
import com.samudra.common.response.PagedResponse;
import com.samudra.community.dal.CommunityDal;
import com.samudra.community.dal.CommunityListingDal;
import com.samudra.community.entity.Community;
import com.samudra.community.entity.CommunityListing;
import com.samudra.listing.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommunityListingService {

    private final CommunityService communityService;
    private final CommunityListingDal communityListingDal;
    private final CommunityDal communityDal;
    private final ListingService listingService;

    @Transactional
    public ListingDetailResponse postListing(UUID userId, UUID communityId, CreateListingRequest request) {
        communityService.requireActiveMember(userId, communityId);
        Community community = communityService.requireCommunity(communityId);

        ListingDetailResponse listing = listingService.create(userId, request);

        communityListingDal.save(CommunityListing.builder()
                .community(community)
                .listingId(listing.id())
                .postedBy(userId)
                .isApproved(true)
                .approvedAt(Instant.now())
                .approvedBy(userId)
                .build());

        community.setListingCount(community.getListingCount() + 1);
        communityDal.save(community);

        return listing;
    }

    @Transactional(readOnly = true)
    public PagedResponse<ListingSummaryResponse> getCommunityListings(UUID communityId, int page, int size) {
        communityService.requireCommunity(communityId);
        List<CommunityListing> links = communityListingDal.findApprovedByCommunityId(communityId);
        List<UUID> listingIds = links.stream()
                .sorted(Comparator.comparing(CommunityListing::getCreatedAt).reversed())
                .map(CommunityListing::getListingId)
                .toList();

        int from = Math.min(page * size, listingIds.size());
        int to = Math.min(from + size, listingIds.size());
        List<UUID> pageIds = listingIds.subList(from, to);

        List<ListingSummaryResponse> items = listingService.getSummariesByIds(pageIds);
        int totalPages = listingIds.isEmpty() ? 0 : (int) Math.ceil((double) listingIds.size() / size);
        return new PagedResponse<>(items, page, size, listingIds.size(), totalPages);
    }
}
