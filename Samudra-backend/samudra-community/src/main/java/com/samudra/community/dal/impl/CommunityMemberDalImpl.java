package com.samudra.community.dal.impl;

import com.samudra.common.enums.MemberStatus;
import com.samudra.community.dal.CommunityMemberDal;
import com.samudra.community.entity.CommunityMember;
import com.samudra.community.repository.CommunityMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CommunityMemberDalImpl implements CommunityMemberDal {

    private final CommunityMemberRepository communityMemberRepository;

    @Override
    public CommunityMember save(CommunityMember member) {
        return communityMemberRepository.save(member);
    }

    @Override
    public Optional<CommunityMember> findById(UUID id) {
        return communityMemberRepository.findById(id);
    }

    @Override
    public Optional<CommunityMember> findByCommunityIdAndUserId(UUID communityId, UUID userId) {
        return communityMemberRepository.findByCommunityIdAndUserId(communityId, userId);
    }

    @Override
    public boolean isActiveMember(UUID communityId, UUID userId) {
        return communityMemberRepository.existsByCommunityIdAndUserIdAndStatus(
                communityId, userId, MemberStatus.ACTIVE);
    }

    @Override
    public List<CommunityMember> findByUserIdAndStatus(UUID userId, MemberStatus status) {
        return communityMemberRepository.findByUserIdAndStatusOrderByJoinedAtDesc(userId, status);
    }

    @Override
    public List<CommunityMember> findByCommunityIdAndStatus(UUID communityId, MemberStatus status) {
        return communityMemberRepository.findByCommunityIdAndStatusOrderByJoinedAtAsc(communityId, status);
    }

    @Override
    public long countActiveMembers(UUID communityId) {
        return communityMemberRepository.countByCommunityIdAndStatus(communityId, MemberStatus.ACTIVE);
    }
}
