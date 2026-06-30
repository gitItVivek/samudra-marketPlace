package com.samudra.identity.port.impl;

import com.samudra.identity.port.OtpDeliveryPort;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

/**
 * Production email implementation using Spring's JavaMailSender (javax/jakarta Mail under the hood).
 * Registered as a Spring bean via {@link com.samudra.identity.config.OtpDeliveryConfig} when SMTP is enabled.
 */
@Slf4j
public class SmtpOtpDeliveryPort implements OtpDeliveryPort {

    private final JavaMailSender mailSender;
    private final String fromAddress;

    public SmtpOtpDeliveryPort(JavaMailSender mailSender, String fromAddress) {
        this.mailSender = mailSender;
        this.fromAddress = fromAddress;
    }

    @Override
    public void sendEmailOtp(String toEmail, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(toEmail);
        message.setSubject("Your Samudra verification code");
        message.setText("Your verification code is: " + code + "\n\nIt is valid for 10 minutes.");
        mailSender.send(message);
        log.info("EMAIL OTP sent to {}: {}", toEmail, code);
    }
}
