package com.samudra.identity.exception;

public class OAuthAccountConflictException extends RuntimeException {

    public OAuthAccountConflictException() {
        super("This email is already linked to a different Google account");
    }
}
