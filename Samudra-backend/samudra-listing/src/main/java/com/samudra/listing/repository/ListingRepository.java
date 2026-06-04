package com.samudra.listing.repository;

import com.samudra.listing.entity.Listing;
import com.samudra.listing.enums.ListingStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingRepository extends JpaRepository<Listing, Long> {

    List<Listing> findByCommunityIdAndStatusOrderByCreatedAtDesc(Long communityId, ListingStatus status);

    List<Listing> findByCommunityIdIsNullAndStatusOrderByCreatedAtDesc(ListingStatus status);

    List<Listing> findBySellerUserIdOrderByCreatedAtDesc(Long sellerUserId);
}
