package com.samudra.community.exception;

public class CommunitySlugTakenException extends RuntimeException {
    public CommunitySlugTakenException() {
        super("Community slug is already taken");
    }
}
