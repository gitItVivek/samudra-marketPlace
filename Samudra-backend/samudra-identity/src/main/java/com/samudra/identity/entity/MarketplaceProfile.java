package com.samudra.identity.entity;

import com.samudra.common.config.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "marketplace_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarketplaceProfile extends BaseEntity {

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false, unique = true)
    private UUID userId;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 500)
    private String avatarUrl;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(precision = 3, scale = 2)
    private BigDecimal avgRating = BigDecimal.ZERO;

    @Column(nullable = false)
    private Integer totalReviews = 0;

    @Column(nullable = false)
    private Integer totalListings = 0;

    @Column(nullable = false)
    private Integer totalSold = 0;

    @Column(nullable = false)
    private Integer totalRemoved = 0;

    @Column
    private Integer responseTimeMinutes;

    @Column
    private Instant lastActiveAt;

    @Column(nullable = false)
    private Boolean isProfilePublic = true;

    @Column
    private Instant deletedAt;
}
