package com.samudra.auction.dal.impl;

import com.samudra.auction.dal.BidDal;
import com.samudra.auction.entity.Bid;
import com.samudra.auction.repository.BidRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class BidDalImpl implements BidDal {

    private final BidRepository bidRepository;

    @Override
    public Bid save(Bid bid) {
        return bidRepository.save(bid);
    }

    @Override
    public List<Bid> findByListingIdOrderByCreatedAtDesc(UUID listingId) {
        return bidRepository.findByListingIdOrderByCreatedAtDesc(listingId);
    }

    @Override
    public long countByListingId(UUID listingId) {
        return bidRepository.countByListingId(listingId);
    }

    @Override
    public long countDistinctBidders(UUID listingId) {
        return bidRepository.countDistinctBidders(listingId);
    }

    @Override
    public BigDecimal findMinAmount(UUID listingId) {
        return bidRepository.findMinAmount(listingId);
    }

    @Override
    public BigDecimal findMaxAmount(UUID listingId) {
        return bidRepository.findMaxAmount(listingId);
    }

    @Override
    public Double findAverageAmount(UUID listingId) {
        return bidRepository.findAverageAmount(listingId);
    }

    @Override
    public Instant findLatestBidAt(UUID listingId) {
        return bidRepository.findLatestBidAt(listingId);
    }

    @Override
    public long countByListingIdAndCreatedAtAfter(UUID listingId, Instant since) {
        return bidRepository.countByListingIdAndCreatedAtAfter(listingId, since);
    }

    @Override
    public long countUnreadBids(UUID listingId, Instant seenAt) {
        return bidRepository.countUnreadBids(listingId, seenAt);
    }

    @Override
    public List<UUID> findListingIdsWithUnreadBids(UUID sellerId) {
        return bidRepository.findListingIdsWithUnreadBids(sellerId);
    }
}
