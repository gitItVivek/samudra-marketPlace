package com.samudra.listing.dal;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;
import com.samudra.listing.entity.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ListingDal {

    Listing save(Listing listing);

    Optional<Listing> findById(UUID id);

    Optional<Listing> findByIdAndStatus(UUID id, ListingStatus status);

    Optional<Listing> findByIdForUpdate(UUID id);

    Page<Listing> findByStatus(ListingStatus status, Pageable pageable);

    Page<Listing> findByStatusAndCity(ListingStatus status, String city, Pageable pageable);

    Page<Listing> findByUserId(UUID userId, Pageable pageable);

    List<Listing> findByIds(Collection<UUID> ids);

    List<Listing> findExpiredActiveAuctions(Instant now);

    Page<Listing> search(
            ListingStatus status,
            String city,
            String state,
            CategoryType categoryType,
            ListingType listingType,
            SaleType saleType,
            String q,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable);
}
