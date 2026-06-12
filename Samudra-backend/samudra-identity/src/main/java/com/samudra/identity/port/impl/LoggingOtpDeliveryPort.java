package com.samudra.identity.port.impl;

import com.samudra.identity.port.OtpDeliveryPort;
import lombok.extern.slf4j.Slf4j;

/**
 * Local/dev implementation — logs OTP to console instead of sending email.
 * Registered as a Spring bean via {@link com.samudra.identity.config.OtpDeliveryConfig}.
 */
@Slf4j
public class LoggingOtpDeliveryPort implements OtpDeliveryPort {

    @Override
    public void sendEmailOtp(String toEmail, String code) {
        log.info("EMAIL OTP for {}: {}", toEmail, code);
    }
}
