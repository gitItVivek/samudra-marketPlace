package com.samudracore;

import com.samudra.identity.config.GoogleOAuthProperties;
import com.samudra.identity.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication(scanBasePackages = {
        "com.samudracore",
        "com.samudra.identity",
        "com.samudra.community",
        "com.samudra.listing",
        "com.samudra.messaging"
})
@EnableJpaAuditing
@EnableConfigurationProperties({JwtProperties.class, GoogleOAuthProperties.class})
public class SamudraCoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(SamudraCoreApplication.class, args);
    }

}
