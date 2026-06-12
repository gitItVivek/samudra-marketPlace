package com.samudra.identity.exception;

public class AlreadyVerifiedException extends RuntimeException {

    public AlreadyVerifiedException() {
        super("User is already verified");
    }
}
