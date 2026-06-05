package com.samudra.community.dal;

import com.samudra.common.enums.MemberStatus;
import com.samudra.community.entity.CommunityMember;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommunityMemberDal {

    CommunityMember save(CommunityMember member);

    Optional<CommunityMember> findById(UUID id);

    Optional<CommunityMember> findByCommunityIdAndUserId(UUID communityId, UUID userId);

    boolean isActiveMember(UUID communityId, UUID userId);

    List<CommunityMember> findByUserIdAndStatus(UUID userId, MemberStatus status);

    List<CommunityMember> findByCommunityIdAndStatus(UUID communityId, MemberStatus status);

    long countActiveMembers(UUID communityId);
}
