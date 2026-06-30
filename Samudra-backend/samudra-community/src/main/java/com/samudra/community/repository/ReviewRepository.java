package com.samudra.community.repository;

import com.samudra.community.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    List<Review> findByTargetUserIdOrderByCreatedAtDesc(UUID targetUserId);

    List<Review> findByListingIdOrderByCreatedAtDesc(UUID listingId);
}
