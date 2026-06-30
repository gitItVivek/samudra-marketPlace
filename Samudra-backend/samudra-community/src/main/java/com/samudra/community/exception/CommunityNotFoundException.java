package com.samudra.community.exception;

public class CommunityNotFoundException extends RuntimeException {
    public CommunityNotFoundException() {
        super("Community not found");
    }
}
