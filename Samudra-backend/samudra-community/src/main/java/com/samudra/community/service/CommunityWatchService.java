package com.samudra.community.service;

import com.samudra.community.entity.ListingWatcher;
import com.samudra.community.repository.ListingWatcherRepository;
import com.samudra.listing.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommunityWatchService {

    private final ListingWatcherRepository listingWatcherRepository;
    private final ListingService listingService;

    @Transactional
    public void addWatcher(UUID userId, UUID listingId) {
        listingService.requireListing(listingId);
        if (listingWatcherRepository.existsByListingIdAndUserId(listingId, userId)) {
            return;
        }
        listingWatcherRepository.save(ListingWatcher.builder()
                .listingId(listingId)
                .userId(userId)
                .createdAt(Instant.now())
                .build());
    }

    @Transactional(readOnly = true)
    public List<UUID> listWatcherUserIds(UUID listingId) {
        listingService.requireListing(listingId);
        return listingWatcherRepository.findByListingId(listingId).stream()
                .map(ListingWatcher::getUserId)
                .toList();
    }
}
