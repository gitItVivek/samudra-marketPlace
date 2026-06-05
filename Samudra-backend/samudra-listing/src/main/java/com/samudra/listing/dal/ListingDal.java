package com.samudra.listing.dal;

import com.samudra.common.enums.ListingStatus;
import com.samudra.listing.entity.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;

public interface ListingDal {

    Listing save(Listing listing);

    Optional<Listing> findById(UUID id);

    Optional<Listing> findByIdAndStatus(UUID id, ListingStatus status);

    Page<Listing> findByStatus(ListingStatus status, Pageable pageable);

    Page<Listing> findByStatusAndCity(ListingStatus status, String city, Pageable pageable);

    Page<Listing> findByUserId(UUID userId, Pageable pageable);
}
