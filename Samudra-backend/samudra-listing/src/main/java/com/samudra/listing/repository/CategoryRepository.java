package com.samudra.listing.repository;

import com.samudra.common.enums.CategoryType;
import com.samudra.listing.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

    List<Category> findByIsActiveTrueOrderByDisplayOrderAsc();

    Optional<Category> findBySlug(String slug);

    Optional<Category> findFirstByCategoryTypeAndIsActiveTrue(CategoryType categoryType);

    boolean existsBySlug(String slug);
}
