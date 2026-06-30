package com.samudra.community.repository;

import com.samudra.common.enums.CommunityStatus;
import com.samudra.common.enums.CategoryType;
import com.samudra.community.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface CommunityRepository extends JpaRepository<Community, UUID> {

    Optional<Community> findBySlugAndDeletedAtIsNull(String slug);

    Optional<Community> findByIdAndDeletedAtIsNull(UUID id);

    boolean existsBySlug(String slug);

    Page<Community> findByStatusAndCityAndDeletedAtIsNullOrderByMemberCountDesc(
            CommunityStatus status, String city, Pageable pageable);

    Page<Community> findByStatusAndDeletedAtIsNullOrderByMemberCountDesc(
            CommunityStatus status, Pageable pageable);

    @Query("""
            SELECT c FROM Community c
            WHERE c.status = :status
              AND c.deletedAt IS NULL
              AND (:city IS NULL OR :city = '' OR LOWER(c.city) = LOWER(:city))
              AND (:categoryType IS NULL OR c.categoryType = :categoryType)
              AND (:q IS NULL OR :q = '' OR LOWER(c.name) LIKE LOWER(CONCAT('%', :q, '%'))
                   OR LOWER(c.description) LIKE LOWER(CONCAT('%', :q, '%')))
            """)
    Page<Community> search(
            @Param("status") CommunityStatus status,
            @Param("city") String city,
            @Param("categoryType") CategoryType categoryType,
            @Param("q") String q,
            Pageable pageable);
}
