package com.samudra.listing.interest.service;

import com.samudra.common.listing.response.ListingAlertNotificationResponse;
import com.samudra.common.notifications.ListingDigestItem;
import com.samudra.listing.interest.entity.ListingAlertNotification;
import com.samudra.listing.interest.repository.ListingAlertNotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ListingAlertService {

    private final ListingAlertNotificationRepository listingAlertNotificationRepository;

    @Transactional(readOnly = true)
    public List<ListingAlertNotificationResponse> listForUser(UUID userId) {
        return listingAlertNotificationRepository.findByUserIdOrderByDeliveredAtDesc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void recordDeliveries(UUID userId, List<ListingDigestItem> listings) {
        Instant now = Instant.now();
        for (ListingDigestItem listing : listings) {
            if (listingAlertNotificationRepository.existsByUserIdAndListingId(userId, listing.listingId())) {
                continue;
            }
            listingAlertNotificationRepository.save(ListingAlertNotification.builder()
                    .userId(userId)
                    .listingId(listing.listingId())
                    .listingTitle(listing.title())
                    .listingCity(listing.city())
                    .deliveredAt(now)
                    .build());
        }
    }

    private ListingAlertNotificationResponse toResponse(ListingAlertNotification notification) {
        return new ListingAlertNotificationResponse(
                notification.getId(),
                notification.getListingId(),
                notification.getListingTitle(),
                notification.getListingCity(),
                notification.getDeliveredAt());
    }
}
