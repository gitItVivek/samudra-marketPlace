package com.samudra.identity.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "samudra.oauth.google")
public class GoogleOAuthProperties {

    private String clientId;
}
