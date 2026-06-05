package com.samudra.listing.repository;

import com.samudra.listing.entity.ListingAttribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ListingAttributeRepository extends JpaRepository<ListingAttribute, UUID> {

    List<ListingAttribute> findByListingIdOrderByDisplayOrderAsc(UUID listingId);

    void deleteByListingId(UUID listingId);
}
