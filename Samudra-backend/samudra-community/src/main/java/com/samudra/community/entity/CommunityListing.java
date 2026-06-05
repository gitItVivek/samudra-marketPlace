package com.samudra.community.entity;

import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.samudra.common.config.BaseEntity;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;
import lombok.Builder;

@Entity
@Table(name = "community_listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityListing extends BaseEntity {

    // real FK — within samudra-community module
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", nullable = false)
    private Community community;

    // logical reference to listings.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID listingId;

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID postedBy;

    @Column(nullable = false)
    private Boolean isApproved = true;

    @Column
    private Instant approvedAt;

    // logical reference to users.id — no FK constraint (cross-module)
    @Column
    private UUID approvedBy;
}
