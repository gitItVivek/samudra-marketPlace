package com.samudra.listing.dal.impl;

import com.samudra.common.enums.CategoryType;
import com.samudra.listing.dal.CategoryDal;
import com.samudra.listing.entity.Category;
import com.samudra.listing.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CategoryDalImpl implements CategoryDal {

    private final CategoryRepository categoryRepository;

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Optional<Category> findById(UUID id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Optional<Category> findBySlug(String slug) {
        return categoryRepository.findBySlug(slug);
    }

    @Override
    public Optional<Category> findByCategoryType(CategoryType categoryType) {
        return categoryRepository.findFirstByCategoryTypeAndIsActiveTrue(categoryType);
    }

    @Override
    public boolean existsBySlug(String slug) {
        return categoryRepository.existsBySlug(slug);
    }

    @Override
    public List<Category> findAllActive() {
        return categoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
    }
}
