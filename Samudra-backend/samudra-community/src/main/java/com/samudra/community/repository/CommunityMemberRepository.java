package com.samudra.community.repository;

import com.samudra.community.entity.CommunityMember;
import com.samudra.community.entity.CommunityMemberId;
import com.samudra.community.enums.MembershipStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, CommunityMemberId> {

    List<CommunityMember> findByIdCommunityId(Long communityId);

    Optional<CommunityMember> findByIdCommunityIdAndIdUserId(Long communityId, Long userId);

    boolean existsByIdCommunityIdAndIdUserIdAndStatus(Long communityId, Long userId, MembershipStatus status);
}
