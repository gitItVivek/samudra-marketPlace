package com.samudra.auction.repository;

import com.samudra.auction.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface BidRepository extends JpaRepository<Bid, UUID> {

    List<Bid> findByListingIdOrderByCreatedAtDesc(UUID listingId);

    long countByListingId(UUID listingId);

    @Query("SELECT COUNT(DISTINCT b.bidderId) FROM Bid b WHERE b.listingId = :listingId")
    long countDistinctBidders(@Param("listingId") UUID listingId);

    @Query("SELECT MIN(b.amount) FROM Bid b WHERE b.listingId = :listingId")
    BigDecimal findMinAmount(@Param("listingId") UUID listingId);

    @Query("SELECT MAX(b.amount) FROM Bid b WHERE b.listingId = :listingId")
    BigDecimal findMaxAmount(@Param("listingId") UUID listingId);

    @Query("SELECT AVG(b.amount) FROM Bid b WHERE b.listingId = :listingId")
    Double findAverageAmount(@Param("listingId") UUID listingId);

    @Query("SELECT MAX(b.createdAt) FROM Bid b WHERE b.listingId = :listingId")
    Instant findLatestBidAt(@Param("listingId") UUID listingId);

    long countByListingIdAndCreatedAtAfter(UUID listingId, Instant since);

    @Query("""
            SELECT COUNT(b) FROM Bid b
            WHERE b.listingId = :listingId
              AND (:seenAt IS NULL OR b.createdAt > :seenAt)
            """)
    long countUnreadBids(@Param("listingId") UUID listingId, @Param("seenAt") Instant seenAt);

    @Query("""
            SELECT b.listingId FROM Bid b
            JOIN com.samudra.listing.entity.Listing l ON l.id = b.listingId
            WHERE l.userId = :sellerId
              AND l.saleType = com.samudra.common.enums.SaleType.AUCTION
              AND l.deletedAt IS NULL
              AND (l.sellerBidsSeenAt IS NULL OR b.createdAt > l.sellerBidsSeenAt)
            GROUP BY b.listingId
            """)
    List<UUID> findListingIdsWithUnreadBids(@Param("sellerId") UUID sellerId);
}
