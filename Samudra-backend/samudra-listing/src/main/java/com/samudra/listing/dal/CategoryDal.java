package com.samudra.listing.dal;

import com.samudra.listing.entity.Category;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryDal {

    Category save(Category category);

    Optional<Category> findById(UUID id);

    Optional<Category> findBySlug(String slug);

    boolean existsBySlug(String slug);

    List<Category> findAllActive();
}
