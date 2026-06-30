package com.samudra.listing.dal.impl;

import com.samudra.listing.dal.ListingAttributeDal;
import com.samudra.listing.entity.ListingAttribute;
import com.samudra.listing.repository.ListingAttributeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ListingAttributeDalImpl implements ListingAttributeDal {

    private final ListingAttributeRepository listingAttributeRepository;

    @Override
    public ListingAttribute save(ListingAttribute attribute) {
        return listingAttributeRepository.save(attribute);
    }

    @Override
    public List<ListingAttribute> saveAll(Iterable<ListingAttribute> attributes) {
        return listingAttributeRepository.saveAll(attributes);
    }

    @Override
    public Optional<ListingAttribute> findById(UUID id) {
        return listingAttributeRepository.findById(id);
    }

    @Override
    public List<ListingAttribute> findByListingId(UUID listingId) {
        return listingAttributeRepository.findByListingIdOrderByDisplayOrderAsc(listingId);
    }

    @Override
    public void deleteByListingId(UUID listingId) {
        listingAttributeRepository.deleteByListingId(listingId);
    }
}
