package com.samudra.common.community.response;

import com.samudra.common.enums.MemberRole;
import com.samudra.common.enums.MemberStatus;

import java.time.Instant;
import java.util.UUID;

public record CommunityMemberResponse(
        UUID id,
        UUID userId,
        MemberRole role,
        MemberStatus status,
        Instant joinedAt
) {}
