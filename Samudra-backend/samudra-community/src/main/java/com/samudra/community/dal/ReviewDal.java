package com.samudra.community.dal;

import com.samudra.community.entity.Review;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReviewDal {

    Review save(Review review);

    Optional<Review> findById(UUID id);

    List<Review> findByTargetUserId(UUID targetUserId);

    List<Review> findByListingId(UUID listingId);
}
