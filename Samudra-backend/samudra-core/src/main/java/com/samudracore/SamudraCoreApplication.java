package com.samudracore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication(scanBasePackages = {
        "com.samudracore",
        "com.samudra.identity",
        "com.samudra.community",
        "com.samudra.listing",
        "com.samudra.messaging"
})
@EnableJpaAuditing
public class SamudraCoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(SamudraCoreApplication.class, args);
    }

}
