package com.samudra.identity.exception;

public class InvalidGoogleTokenException extends RuntimeException {

    public InvalidGoogleTokenException() {
        super("Invalid or expired Google ID token");
    }
}
