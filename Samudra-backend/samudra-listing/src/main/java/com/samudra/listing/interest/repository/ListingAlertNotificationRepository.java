package com.samudra.listing.interest.repository;

import com.samudra.listing.interest.entity.ListingAlertNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ListingAlertNotificationRepository extends JpaRepository<ListingAlertNotification, UUID> {

    List<ListingAlertNotification> findByUserIdOrderByDeliveredAtDesc(UUID userId);

    boolean existsByUserIdAndListingId(UUID userId, UUID listingId);
}
