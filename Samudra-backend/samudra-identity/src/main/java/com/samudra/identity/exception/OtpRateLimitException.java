package com.samudra.identity.exception;

public class OtpRateLimitException extends RuntimeException {

    public OtpRateLimitException() {
        super("Too many OTP requests. Please try again later.");
    }
}
