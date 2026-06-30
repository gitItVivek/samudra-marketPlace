package com.samudra.auction.dal;

import com.samudra.auction.entity.Bid;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface BidDal {

    Bid save(Bid bid);

    List<Bid> findByListingIdOrderByCreatedAtDesc(UUID listingId);

    long countByListingId(UUID listingId);

    long countDistinctBidders(UUID listingId);

    BigDecimal findMinAmount(UUID listingId);

    BigDecimal findMaxAmount(UUID listingId);

    Double findAverageAmount(UUID listingId);

    Instant findLatestBidAt(UUID listingId);

    long countByListingIdAndCreatedAtAfter(UUID listingId, Instant since);

    long countUnreadBids(UUID listingId, Instant seenAt);

    List<UUID> findListingIdsWithUnreadBids(UUID sellerId);
}
