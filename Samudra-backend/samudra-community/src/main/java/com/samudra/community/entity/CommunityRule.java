package com.samudra.community.entity;

import com.samudra.common.config.BaseEntity;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "community_rules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityRule extends BaseEntity {

    // real FK — within samudra-community module
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", nullable = false)
    private Community community;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String ruleText;

    @Column(nullable = false)
    private Integer displayOrder = 0;
}
