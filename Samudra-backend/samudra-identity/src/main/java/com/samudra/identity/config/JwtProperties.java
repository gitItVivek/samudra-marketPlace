package com.samudra.identity.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "samudra.jwt")
@Getter
@Setter
public class JwtProperties {
    private String secret;
    private long expirySeconds = 3600;
}
