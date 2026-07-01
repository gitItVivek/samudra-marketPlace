package com.samudra.listing.interest.entity;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.InterestSource;
import com.samudra.common.enums.ListingType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.EntityListeners;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "user_interests")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Enumerated(EnumType.STRING)
    @Column(name = "category_type", length = 30)
    private CategoryType categoryType;

    @Enumerated(EnumType.STRING)
    @Column(name = "listing_type", length = 30)
    private ListingType listingType;

    @Column(length = 500)
    private String keywords;

    @Column(name = "custom_tag", length = 100)
    private String customTag;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private InterestSource source;

    @Column(name = "notify_enabled", nullable = false)
    private boolean notifyEnabled;

    @Column(name = "last_notified_at")
    private Instant lastNotifiedAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
