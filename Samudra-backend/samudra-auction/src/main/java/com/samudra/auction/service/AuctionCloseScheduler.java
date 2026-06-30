package com.samudra.auction.service;

import com.samudra.common.enums.ListingStatus;
import com.samudra.listing.dal.ListingDal;
import com.samudra.listing.entity.Listing;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuctionCloseScheduler {

    private final ListingDal listingDal;

    @Scheduled(fixedRate = 60_000)
    @Transactional
    public void closeExpiredAuctions() {
        List<Listing> expired = listingDal.findExpiredActiveAuctions(Instant.now());
        for (Listing listing : expired) {
            if (listing.getCurrentBidId() != null) {
                listing.setStatus(ListingStatus.SOLD);
                listing.setSoldAt(Instant.now());
                log.info("Auction closed with winner: listingId={}", listing.getId());
            } else {
                listing.setStatus(ListingStatus.EXPIRED);
                log.info("Auction expired with no bids: listingId={}", listing.getId());
            }
            listingDal.save(listing);
        }
    }
}
