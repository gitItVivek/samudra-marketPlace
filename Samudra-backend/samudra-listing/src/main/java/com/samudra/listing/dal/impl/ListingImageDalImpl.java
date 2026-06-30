package com.samudra.listing.dal.impl;

import com.samudra.listing.dal.ListingImageDal;
import com.samudra.listing.entity.ListingImage;
import com.samudra.listing.repository.ListingImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ListingImageDalImpl implements ListingImageDal {

    private final ListingImageRepository listingImageRepository;

    @Override
    public ListingImage save(ListingImage image) {
        return listingImageRepository.save(image);
    }

    @Override
    public List<ListingImage> saveAll(Iterable<ListingImage> images) {
        return listingImageRepository.saveAll(images);
    }

    @Override
    public Optional<ListingImage> findById(UUID id) {
        return listingImageRepository.findById(id);
    }

    @Override
    public List<ListingImage> findByListingId(UUID listingId) {
        return listingImageRepository.findByListingIdOrderByDisplayOrderAsc(listingId);
    }

    @Override
    public void deleteByListingId(UUID listingId) {
        listingImageRepository.deleteByListingId(listingId);
    }
}
