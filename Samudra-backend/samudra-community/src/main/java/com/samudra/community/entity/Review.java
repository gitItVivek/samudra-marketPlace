package com.samudra.community.entity;


import com.samudra.common.config.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review extends BaseEntity {

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID reviewerId;

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID targetUserId;

    // logical reference to listings.id — no FK constraint (cross-module)
    // nullable — future general reviews without listing context
    @Column
    private UUID listingId;

    // validated in service layer: 1 to 5
    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;
}
