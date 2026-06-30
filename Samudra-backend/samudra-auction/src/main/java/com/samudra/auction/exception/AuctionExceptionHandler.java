package com.samudra.auction.exception;

import com.samudra.common.error.ApiErrorResponse;
import com.samudra.listing.exception.ListingForbiddenException;
import com.samudra.listing.exception.ListingNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "com.samudra.auction")
public class AuctionExceptionHandler {

    @ExceptionHandler(BidRejectedException.class)
    public ResponseEntity<ApiErrorResponse> handleBidRejected(BidRejectedException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiErrorResponse.of(400, "BID_REJECTED", ex.getMessage()));
    }

    @ExceptionHandler(AuctionClosedException.class)
    public ResponseEntity<ApiErrorResponse> handleAuctionClosed(AuctionClosedException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiErrorResponse.of(409, "AUCTION_CLOSED", ex.getMessage()));
    }

    @ExceptionHandler(ListingNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleListingNotFound(ListingNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiErrorResponse.of(404, "LISTING_NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(ListingForbiddenException.class)
    public ResponseEntity<ApiErrorResponse> handleListingForbidden(ListingForbiddenException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiErrorResponse.of(403, "LISTING_FORBIDDEN", ex.getMessage()));
    }
}
