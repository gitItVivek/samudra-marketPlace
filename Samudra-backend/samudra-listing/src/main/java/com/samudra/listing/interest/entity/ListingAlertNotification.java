package com.samudra.listing.interest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "listing_alert_notifications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListingAlertNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "listing_id", nullable = false)
    private UUID listingId;

    @Column(name = "listing_title", nullable = false, length = 500)
    private String listingTitle;

    @Column(name = "listing_city", nullable = false, length = 100)
    private String listingCity;

    @Column(name = "delivered_at", nullable = false)
    private Instant deliveredAt;
}
