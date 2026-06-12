package com.samudra.identity.port;

public interface OtpDeliveryPort {
    void sendEmailOtp(String toEmail, String code);
}
