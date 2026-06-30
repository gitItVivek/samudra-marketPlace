package com.samudra.community.repository;

import com.samudra.community.entity.ListingWatcher;
import com.samudra.community.entity.ListingWatcherId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ListingWatcherRepository extends JpaRepository<ListingWatcher, ListingWatcherId> {

    List<ListingWatcher> findByListingId(UUID listingId);

    boolean existsByListingIdAndUserId(UUID listingId, UUID userId);
}
