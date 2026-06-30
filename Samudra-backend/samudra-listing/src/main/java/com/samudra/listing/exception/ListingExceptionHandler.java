package com.samudra.listing.exception;

import com.samudra.common.error.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "com.samudra.listing")
public class ListingExceptionHandler {

    @ExceptionHandler(ListingNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFound(ListingNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiErrorResponse.of(404, "LISTING_NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(ListingForbiddenException.class)
    public ResponseEntity<ApiErrorResponse> handleForbidden(ListingForbiddenException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiErrorResponse.of(403, "LISTING_FORBIDDEN", ex.getMessage()));
    }

    @ExceptionHandler(InvalidListingStateException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidState(InvalidListingStateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiErrorResponse.of(409, "INVALID_LISTING_STATE", ex.getMessage()));
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleCategoryNotFound(CategoryNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiErrorResponse.of(400, "CATEGORY_NOT_FOUND", ex.getMessage()));
    }
}
