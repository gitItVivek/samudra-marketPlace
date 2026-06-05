package com.samudra.listing.dal.impl;

import com.samudra.common.enums.ListingStatus;
import com.samudra.listing.dal.ListingDal;
import com.samudra.listing.entity.Listing;
import com.samudra.listing.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ListingDalImpl implements ListingDal {

    private final ListingRepository listingRepository;

    @Override
    public Listing save(Listing listing) {
        return listingRepository.save(listing);
    }

    @Override
    public Optional<Listing> findById(UUID id) {
        return listingRepository.findById(id);
    }

    @Override
    public Optional<Listing> findByIdAndStatus(UUID id, ListingStatus status) {
        return listingRepository.findByIdAndStatusAndDeletedAtIsNull(id, status);
    }

    @Override
    public Page<Listing> findByStatus(ListingStatus status, Pageable pageable) {
        return listingRepository.findByStatusAndDeletedAtIsNullOrderByCreatedAtDesc(status, pageable);
    }

    @Override
    public Page<Listing> findByStatusAndCity(ListingStatus status, String city, Pageable pageable) {
        return listingRepository.findByStatusAndCityAndDeletedAtIsNullOrderByCreatedAtDesc(status, city, pageable);
    }

    @Override
    public Page<Listing> findByUserId(UUID userId, Pageable pageable) {
        return listingRepository.findByUserIdAndDeletedAtIsNullOrderByCreatedAtDesc(userId, pageable);
    }
}
