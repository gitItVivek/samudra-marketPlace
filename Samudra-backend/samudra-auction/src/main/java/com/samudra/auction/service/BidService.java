package com.samudra.auction.service;

import com.samudra.auction.entity.Bid;
import com.samudra.common.auction.request.PlaceBidRequest;
import com.samudra.common.auction.response.AuctionAlertResponse;
import com.samudra.common.auction.response.BidAnalyticsResponse;
import com.samudra.common.auction.response.BidResponse;
import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.SaleType;
import com.samudra.auction.dal.BidDal;
import com.samudra.auction.exception.AuctionClosedException;
import com.samudra.auction.exception.BidRejectedException;
import com.samudra.listing.dal.ListingDal;
import com.samudra.listing.entity.Listing;
import com.samudra.listing.exception.ListingForbiddenException;
import com.samudra.listing.exception.ListingNotFoundException;
import com.samudra.listing.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BidService {

    private final BidDal bidDal;
    private final ListingDal listingDal;
    private final ListingService listingService;

    @Transactional
    public BidResponse placeBid(UUID bidderId, UUID listingId, PlaceBidRequest request) {
        Listing listing = listingDal.findByIdForUpdate(listingId)
                .orElseThrow(ListingNotFoundException::new);

        validateAuctionOpen(listing, bidderId);

        BigDecimal minimum = listing.getCurrentBidAmount() != null
                ? listing.getCurrentBidAmount()
                : listing.getStartingPrice();
        if (request.amount().compareTo(minimum) <= 0) {
            throw new BidRejectedException("Bid must be higher than the current amount of " + minimum);
        }

        Bid bid = bidDal.save(Bid.builder()
                .listingId(listingId)
                .bidderId(bidderId)
                .amount(request.amount())
                .build());

        listing.setCurrentBidAmount(request.amount());
        listing.setCurrentBidId(bid.getId());
        listingDal.save(listing);

        return toResponse(bid);
    }

    @Transactional(readOnly = true)
    public List<BidResponse> getBidHistoryForSeller(UUID sellerId, UUID listingId) {
        Listing listing = listingService.requireOwnedListing(sellerId, listingId);
        if (listing.getSaleType() != SaleType.AUCTION) {
            throw new BidRejectedException("This listing is not an auction");
        }
        return bidDal.findByListingIdOrderByCreatedAtDesc(listingId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public BidAnalyticsResponse getAnalyticsForSeller(UUID sellerId, UUID listingId) {
        Listing listing = listingService.requireOwnedListing(sellerId, listingId);
        if (listing.getSaleType() != SaleType.AUCTION) {
            throw new BidRejectedException("This listing is not an auction");
        }

        long totalBids = bidDal.countByListingId(listingId);
        long uniqueBidders = bidDal.countDistinctBidders(listingId);
        BigDecimal highest = bidDal.findMaxAmount(listingId);
        BigDecimal lowest = bidDal.findMinAmount(listingId);
        Double avg = bidDal.findAverageAmount(listingId);
        Instant latest = bidDal.findLatestBidAt(listingId);
        Instant last24h = Instant.now().minus(24, ChronoUnit.HOURS);
        long bidsLast24h = bidDal.countByListingIdAndCreatedAtAfter(listingId, last24h);

        return new BidAnalyticsResponse(
                listingId,
                totalBids,
                uniqueBidders,
                highest,
                lowest,
                avg != null ? BigDecimal.valueOf(avg).setScale(2, RoundingMode.HALF_UP) : null,
                latest,
                bidsLast24h
        );
    }

    @Transactional
    public void markBidsSeen(UUID sellerId, UUID listingId) {
        listingService.markBidsSeen(sellerId, listingId);
    }

    @Transactional(readOnly = true)
    public List<AuctionAlertResponse> getAuctionAlerts(UUID sellerId) {
        List<UUID> listingIds = bidDal.findListingIdsWithUnreadBids(sellerId);
        List<AuctionAlertResponse> alerts = new ArrayList<>();
        for (UUID listingId : listingIds) {
            Listing listing = listingDal.findById(listingId).orElse(null);
            if (listing == null) {
                continue;
            }
            long unread = bidDal.countUnreadBids(listingId, listing.getSellerBidsSeenAt());
            Instant latest = bidDal.findLatestBidAt(listingId);
            alerts.add(new AuctionAlertResponse(
                    listingId,
                    listing.getTitle(),
                    listing.getCurrentBidAmount(),
                    unread,
                    latest
            ));
        }
        return alerts;
    }

    private void validateAuctionOpen(Listing listing, UUID bidderId) {
        if (listing.getSaleType() != SaleType.AUCTION || listing.getStatus() != ListingStatus.ACTIVE) {
            throw new AuctionClosedException();
        }
        if (listing.getAuctionEndsAt() != null && !Instant.now().isBefore(listing.getAuctionEndsAt())) {
            throw new AuctionClosedException();
        }
        if (listing.getUserId().equals(bidderId)) {
            throw new ListingForbiddenException();
        }
    }

    private BidResponse toResponse(Bid bid) {
        return new BidResponse(
                bid.getId(),
                bid.getListingId(),
                bid.getBidderId(),
                bid.getAmount(),
                bid.getCreatedAt()
        );
    }
}
