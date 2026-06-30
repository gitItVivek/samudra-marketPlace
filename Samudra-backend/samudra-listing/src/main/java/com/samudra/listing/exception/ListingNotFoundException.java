package com.samudra.listing.exception;

public class ListingNotFoundException extends RuntimeException {
    public ListingNotFoundException() {
        super("Listing not found");
    }
}
