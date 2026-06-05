package com.samudra.community.entity;

import com.samudra.common.config.BaseEntity;
import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.CommunityStatus;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "communities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Community extends BaseEntity {

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID createdBy;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CategoryType categoryType;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(length = 500)
    private String coverImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CommunityStatus status = CommunityStatus.ACTIVE;

    @Column(nullable = false)
    private Boolean isPrivate = false;

    @Column(nullable = false)
    private Integer memberCount = 0;

    @Column(nullable = false)
    private Integer listingCount = 0;

    @Column
    private Instant deletedAt;
}
