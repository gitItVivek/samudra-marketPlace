package com.samudra.listing.entity;

import com.samudra.common.config.BaseEntity;
import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingCondition;
import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.ListingType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Listing extends BaseEntity {

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID userId;

    // logical reference to categories.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID categoryId;

    // denormalized from category for fast filtering — no join needed
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CategoryType categoryType;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ListingType listingType;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ListingCondition condition;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ListingStatus status = ListingStatus.DRAFT;

    @Column(precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, length = 5)
    private String currency = "INR";

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(length = 100)
    private String locality;

    @Column(precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 7)
    private BigDecimal longitude;

    @Column(nullable = false)
    private Integer viewCount = 0;

    @Column(nullable = false)
    private Integer chatCount = 0;

    @Column(nullable = false)
    private Boolean isBoosted = false;

    @Column
    private Instant boostedUntil;

    @Column
    private Instant expiresAt;

    @Column
    private Instant soldAt;

    @Column
    private Instant removedAt;

    @Column
    private Instant takenDownAt;

    @Column(columnDefinition = "TEXT")
    private String takenDownReason;

    @Column
    private Instant deletedAt;
}
