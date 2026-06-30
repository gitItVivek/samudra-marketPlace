package com.samudra.listing.repository;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;
import com.samudra.listing.entity.Listing;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ListingRepository extends JpaRepository<Listing, UUID> {

    Optional<Listing> findByIdAndDeletedAtIsNull(UUID id);

    Optional<Listing> findByIdAndStatusAndDeletedAtIsNull(UUID id, ListingStatus status);

    Page<Listing> findByStatusAndDeletedAtIsNullOrderByCreatedAtDesc(ListingStatus status, Pageable pageable);

    Page<Listing> findByStatusAndCityAndDeletedAtIsNullOrderByCreatedAtDesc(
            ListingStatus status, String city, Pageable pageable);

    Page<Listing> findByUserIdAndDeletedAtIsNullOrderByCreatedAtDesc(UUID userId, Pageable pageable);

    List<Listing> findByIdInAndDeletedAtIsNull(Collection<UUID> ids);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT l FROM Listing l WHERE l.id = :id AND l.deletedAt IS NULL")
    Optional<Listing> findByIdForUpdate(@Param("id") UUID id);

    @Query("""
            SELECT l FROM Listing l
            WHERE l.saleType = com.samudra.common.enums.SaleType.AUCTION
              AND l.status = com.samudra.common.enums.ListingStatus.ACTIVE
              AND l.auctionEndsAt < :now
              AND l.deletedAt IS NULL
            """)
    List<Listing> findExpiredActiveAuctions(@Param("now") Instant now);

    @Query("""
            SELECT l FROM Listing l
            WHERE l.status = :status
              AND l.deletedAt IS NULL
              AND (:city IS NULL OR :city = '' OR LOWER(l.city) = LOWER(:city))
              AND (:state IS NULL OR :state = '' OR LOWER(l.state) = LOWER(:state))
              AND (:categoryType IS NULL OR l.categoryType = :categoryType)
              AND (:listingType IS NULL OR l.listingType = :listingType)
              AND (:saleType IS NULL OR l.saleType = :saleType)
              AND (:q IS NULL OR :q = '' OR LOWER(l.title) LIKE LOWER(CONCAT('%', :q, '%'))
                   OR LOWER(l.description) LIKE LOWER(CONCAT('%', :q, '%')))
              AND (:minPrice IS NULL OR COALESCE(l.price, l.startingPrice, l.currentBidAmount) >= :minPrice)
              AND (:maxPrice IS NULL OR COALESCE(l.price, l.startingPrice, l.currentBidAmount) <= :maxPrice)
            """)
    Page<Listing> search(
            @Param("status") ListingStatus status,
            @Param("city") String city,
            @Param("state") String state,
            @Param("categoryType") CategoryType categoryType,
            @Param("listingType") ListingType listingType,
            @Param("saleType") SaleType saleType,
            @Param("q") String q,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable);
}
