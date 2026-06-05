package com.samudra.listing.repository;

import com.samudra.common.enums.ListingStatus;
import com.samudra.listing.entity.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ListingRepository extends JpaRepository<Listing, UUID> {

    Optional<Listing> findByIdAndStatusAndDeletedAtIsNull(UUID id, ListingStatus status);

    Page<Listing> findByStatusAndDeletedAtIsNullOrderByCreatedAtDesc(ListingStatus status, Pageable pageable);

    Page<Listing> findByStatusAndCityAndDeletedAtIsNullOrderByCreatedAtDesc(
            ListingStatus status, String city, Pageable pageable);

    Page<Listing> findByUserIdAndDeletedAtIsNullOrderByCreatedAtDesc(UUID userId, Pageable pageable);
}
