package com.samudra.listing.dal;

import com.samudra.listing.entity.ListingImage;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ListingImageDal {

    ListingImage save(ListingImage image);

    List<ListingImage> saveAll(Iterable<ListingImage> images);

    Optional<ListingImage> findById(UUID id);

    List<ListingImage> findByListingId(UUID listingId);

    void deleteByListingId(UUID listingId);
}
