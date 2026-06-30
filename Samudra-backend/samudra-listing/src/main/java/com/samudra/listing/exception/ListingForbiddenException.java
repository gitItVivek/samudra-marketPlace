package com.samudra.listing.exception;

public class ListingForbiddenException extends RuntimeException {
    public ListingForbiddenException() {
        super("You do not have permission to modify this listing");
    }
}
