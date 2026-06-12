package com.samudra.identity.config;

import com.samudra.identity.port.OtpDeliveryPort;
import com.samudra.identity.port.impl.LoggingOtpDeliveryPort;
import com.samudra.identity.port.impl.SmtpOtpDeliveryPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;

@Configuration
public class OtpDeliveryConfig {

    @Bean
    @ConditionalOnProperty(name = "samudra.otp.delivery", havingValue = "log", matchIfMissing = true)
    public OtpDeliveryPort loggingOtpDeliveryPort() {
        return new LoggingOtpDeliveryPort();
    }

    @Bean
    @ConditionalOnProperty(name = "samudra.otp.delivery", havingValue = "smtp")
    public OtpDeliveryPort smtpOtpDeliveryPort(
            JavaMailSender mailSender,
            @Value("${samudra.mail.from:noreply@samudra.local}") String fromAddress) {
        return new SmtpOtpDeliveryPort(mailSender, fromAddress);
    }
}
