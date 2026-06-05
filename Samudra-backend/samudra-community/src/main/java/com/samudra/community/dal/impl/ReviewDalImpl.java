package com.samudra.community.dal.impl;

import com.samudra.community.dal.ReviewDal;
import com.samudra.community.entity.Review;
import com.samudra.community.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ReviewDalImpl implements ReviewDal {

    private final ReviewRepository reviewRepository;

    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Optional<Review> findById(UUID id) {
        return reviewRepository.findById(id);
    }

    @Override
    public List<Review> findByTargetUserId(UUID targetUserId) {
        return reviewRepository.findByTargetUserIdOrderByCreatedAtDesc(targetUserId);
    }

    @Override
    public List<Review> findByListingId(UUID listingId) {
        return reviewRepository.findByListingIdOrderByCreatedAtDesc(listingId);
    }
}
