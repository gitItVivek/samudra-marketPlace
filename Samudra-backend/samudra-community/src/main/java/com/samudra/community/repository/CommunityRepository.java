package com.samudra.community.repository;

import com.samudra.community.entity.Community;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    Optional<Community> findBySlug(String slug);

    boolean existsBySlug(String slug);
}
