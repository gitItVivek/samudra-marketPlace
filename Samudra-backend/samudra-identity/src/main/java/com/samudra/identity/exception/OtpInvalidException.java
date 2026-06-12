package com.samudra.identity.exception;

public class OtpInvalidException extends RuntimeException {

    public OtpInvalidException() {
        super("Invalid OTP code");
    }
}
