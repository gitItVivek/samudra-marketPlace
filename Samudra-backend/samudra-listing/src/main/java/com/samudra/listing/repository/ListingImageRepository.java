package com.samudra.listing.repository;

import com.samudra.listing.entity.ListingImage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingImageRepository extends JpaRepository<ListingImage, Long> {

    List<ListingImage> findByListingIdOrderBySortOrderAsc(Long listingId);
}
