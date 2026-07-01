package com.samudra.listing.interest.repository;

import com.samudra.listing.interest.entity.UserInterest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserInterestRepository extends JpaRepository<UserInterest, UUID> {

    List<UserInterest> findByUserIdOrderByCreatedAtDesc(UUID userId);

    @Query("""
            SELECT DISTINCT ui.userId FROM UserInterest ui
            WHERE ui.notifyEnabled = true
              AND LOWER(ui.city) = LOWER(:city)
              AND ui.userId <> :sellerId
              AND (ui.lastNotifiedAt IS NULL OR ui.lastNotifiedAt < :cooldownBefore)
              AND (
                (:categoryType IS NOT NULL AND ui.categoryType = :categoryType)
                OR (:listingType IS NOT NULL AND (
                      ui.listingType = :listingType
                      OR (ui.listingType = com.samudra.common.enums.ListingType.BUY
                          AND :listingType = com.samudra.common.enums.ListingType.SELL)
                      OR (ui.listingType = com.samudra.common.enums.ListingType.RENT_WANTED
                          AND :listingType = com.samudra.common.enums.ListingType.RENT_OUT)
                      OR (ui.listingType = com.samudra.common.enums.ListingType.SELL
                          AND :listingType = com.samudra.common.enums.ListingType.BUY)
                      OR (ui.listingType = com.samudra.common.enums.ListingType.RENT_OUT
                          AND :listingType = com.samudra.common.enums.ListingType.RENT_WANTED)
                    ))
                OR (:customTag IS NOT NULL AND ui.customTag IS NOT NULL
                    AND LOWER(ui.customTag) = LOWER(:customTag))
                OR (:keywordsPattern IS NOT NULL AND ui.keywords IS NOT NULL AND ui.keywords <> ''
                    AND (LOWER(:title) LIKE LOWER(CONCAT('%', ui.keywords, '%'))
                      OR LOWER(:description) LIKE LOWER(CONCAT('%', ui.keywords, '%'))))
              )
            """)
    List<UUID> findMatchingUserIds(
            @Param("city") String city,
            @Param("sellerId") UUID sellerId,
            @Param("cooldownBefore") java.time.Instant cooldownBefore,
            @Param("categoryType") com.samudra.common.enums.CategoryType categoryType,
            @Param("listingType") com.samudra.common.enums.ListingType listingType,
            @Param("customTag") String customTag,
            @Param("keywordsPattern") String keywordsPattern,
            @Param("title") String title,
            @Param("description") String description);
}
