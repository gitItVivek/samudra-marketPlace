package com.samudra.listing.service;

import com.samudra.common.enums.CategoryType;
import com.samudra.listing.dal.CategoryDal;
import com.samudra.listing.entity.Category;
import com.samudra.listing.exception.CategoryNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryDal categoryDal;

    public Category resolveCategory(CategoryType categoryType) {
        return categoryDal.findByCategoryType(categoryType)
                .orElseThrow(CategoryNotFoundException::new);
    }

    public Category requireById(UUID categoryId) {
        return categoryDal.findById(categoryId)
                .orElseThrow(CategoryNotFoundException::new);
    }
}
