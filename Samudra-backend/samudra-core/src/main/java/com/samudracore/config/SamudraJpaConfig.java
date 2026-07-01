package com.samudracore.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = {
        "com.samudra.identity.entity",
        "com.samudra.community.entity",
        "com.samudra.listing.entity",
        "com.samudra.listing.interest.entity",
        "com.samudra.messaging.entity",
        "com.samudra.auction.entity"
})
@EnableJpaRepositories(basePackages = {
        "com.samudra.identity.repository",
        "com.samudra.community.repository",
        "com.samudra.listing.repository",
        "com.samudra.listing.interest.repository",
        "com.samudra.messaging.repository",
        "com.samudra.auction.repository"
})
public class SamudraJpaConfig {
}
