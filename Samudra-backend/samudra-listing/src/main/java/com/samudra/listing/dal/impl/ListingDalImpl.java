package com.samudra.listing.dal.impl;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;
import com.samudra.listing.dal.ListingDal;
import com.samudra.listing.entity.Listing;
import com.samudra.listing.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collection;
import java.util.List;
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
        return listingRepository.findByIdAndDeletedAtIsNull(id);
    }

    @Override
    public Optional<Listing> findByIdAndStatus(UUID id, ListingStatus status) {
        return listingRepository.findByIdAndStatusAndDeletedAtIsNull(id, status);
    }

    @Override
    public Optional<Listing> findByIdForUpdate(UUID id) {
        return listingRepository.findByIdForUpdate(id);
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

    @Override
    public List<Listing> findByIds(Collection<UUID> ids) {
        if (ids == null || ids.isEmpty()) {
            return List.of();
        }
        return listingRepository.findByIdInAndDeletedAtIsNull(ids);
    }

    @Override
    public List<Listing> findExpiredActiveAuctions(Instant now) {
        return listingRepository.findExpiredActiveAuctions(now);
    }

    @Override
    public Page<Listing> search(
            ListingStatus status,
            String city,
            String state,
            CategoryType categoryType,
            ListingType listingType,
            SaleType saleType,
            String q,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable) {
        return listingRepository.search(
                status, city, state, categoryType, listingType, saleType, q, minPrice, maxPrice, pageable);
    }
}
