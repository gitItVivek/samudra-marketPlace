package com.samudra.community.dal;

import com.samudra.common.enums.CommunityStatus;
import com.samudra.community.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;

public interface CommunityDal {

    Community save(Community community);

    Optional<Community> findById(UUID id);

    Optional<Community> findBySlug(String slug);

    boolean existsBySlug(String slug);

    Page<Community> findByStatus(CommunityStatus status, Pageable pageable);

    Page<Community> findByStatusAndCity(CommunityStatus status, String city, Pageable pageable);
}
