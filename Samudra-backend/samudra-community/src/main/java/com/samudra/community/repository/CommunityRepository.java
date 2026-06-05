package com.samudra.community.repository;

import com.samudra.common.enums.CommunityStatus;
import com.samudra.community.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CommunityRepository extends JpaRepository<Community, UUID> {

    Optional<Community> findBySlugAndDeletedAtIsNull(String slug);

    boolean existsBySlug(String slug);

    Page<Community> findByStatusAndCityAndDeletedAtIsNullOrderByMemberCountDesc(
            CommunityStatus status, String city, Pageable pageable);

    Page<Community> findByStatusAndDeletedAtIsNullOrderByMemberCountDesc(
            CommunityStatus status, Pageable pageable);
}
