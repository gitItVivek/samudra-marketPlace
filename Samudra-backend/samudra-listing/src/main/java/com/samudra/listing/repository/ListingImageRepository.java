package com.samudra.listing.repository;

import com.samudra.listing.entity.ListingImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ListingImageRepository extends JpaRepository<ListingImage, UUID> {

    List<ListingImage> findByListingIdOrderByDisplayOrderAsc(UUID listingId);

    void deleteByListingId(UUID listingId);
}
