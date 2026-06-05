package com.samudra.listing.dal;

import com.samudra.listing.entity.ListingAttribute;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ListingAttributeDal {

    ListingAttribute save(ListingAttribute attribute);

    List<ListingAttribute> saveAll(Iterable<ListingAttribute> attributes);

    Optional<ListingAttribute> findById(UUID id);

    List<ListingAttribute> findByListingId(UUID listingId);

    void deleteByListingId(UUID listingId);
}
