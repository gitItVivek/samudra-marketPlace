package com.samudra.listing.entity;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingCondition;
import com.samudra.common.enums.ListingStatus;
import com.samudra.common.enums.ListingType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "listings")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private Instant updatedAt;

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private UUID categoryId;

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
    @Builder.Default
    private ListingStatus status = ListingStatus.DRAFT;

    @Column(precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, length = 5)
    @Builder.Default
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
    @Builder.Default
    private Integer viewCount = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer chatCount = 0;

    @Column(nullable = false)
    @Builder.Default
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
