package com.samudra.listing.exception;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException() {
        super("Category not found for the given category type");
    }
}
