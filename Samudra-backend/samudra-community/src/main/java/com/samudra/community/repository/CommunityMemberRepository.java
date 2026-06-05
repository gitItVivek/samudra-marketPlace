package com.samudra.community.repository;

import com.samudra.common.enums.MemberStatus;
import com.samudra.community.entity.CommunityMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, UUID> {

    Optional<CommunityMember> findByCommunityIdAndUserId(UUID communityId, UUID userId);

    boolean existsByCommunityIdAndUserIdAndStatus(UUID communityId, UUID userId, MemberStatus status);

    List<CommunityMember> findByUserIdAndStatusOrderByJoinedAtDesc(UUID userId, MemberStatus status);

    List<CommunityMember> findByCommunityIdAndStatusOrderByJoinedAtAsc(UUID communityId, MemberStatus status);

    long countByCommunityIdAndStatus(UUID communityId, MemberStatus status);
}
