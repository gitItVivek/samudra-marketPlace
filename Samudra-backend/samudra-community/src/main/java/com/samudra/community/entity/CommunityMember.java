package com.samudra.community.entity;

import com.samudra.common.config.BaseEntity;
import com.samudra.common.enums.MemberRole;
import com.samudra.common.enums.MemberStatus;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "community_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityMember extends BaseEntity {

    // real FK — within samudra-community module
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", nullable = false)
    private Community community;

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private MemberRole role = MemberRole.MEMBER;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private MemberStatus status = MemberStatus.ACTIVE;

    @Column(nullable = false)
    private Instant joinedAt = Instant.now();

    @Column
    private Instant bannedAt;

    @Column(columnDefinition = "TEXT")
    private String banReason;
}
