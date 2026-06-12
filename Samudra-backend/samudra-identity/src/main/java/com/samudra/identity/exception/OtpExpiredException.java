package com.samudra.identity.exception;

public class OtpExpiredException extends RuntimeException {

    public OtpExpiredException() {
        super("OTP has expired");
    }
}
