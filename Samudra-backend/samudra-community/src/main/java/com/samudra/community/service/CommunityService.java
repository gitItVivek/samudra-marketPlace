package com.samudra.community.service;

import com.samudra.common.community.request.CreateCommunityRequest;
import com.samudra.common.community.response.CommunityDetailResponse;
import com.samudra.common.community.response.CommunityMemberResponse;
import com.samudra.common.community.response.CommunitySummaryResponse;
import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.CommunityStatus;
import com.samudra.common.enums.MemberRole;
import com.samudra.common.enums.MemberStatus;
import com.samudra.common.response.PagedResponse;
import com.samudra.community.dal.CommunityDal;
import com.samudra.community.dal.CommunityMemberDal;
import com.samudra.community.entity.Community;
import com.samudra.community.entity.CommunityMember;
import com.samudra.community.exception.AlreadyMemberException;
import com.samudra.community.exception.CommunityNotFoundException;
import com.samudra.community.exception.CommunitySlugTakenException;
import com.samudra.community.exception.NotMemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityDal communityDal;
    private final CommunityMemberDal communityMemberDal;
    private final CommunityMapper communityMapper;

    @Transactional
    public CommunityDetailResponse create(UUID userId, CreateCommunityRequest request) {
        String slug = normalizeSlug(request.slug());
        if (communityDal.existsBySlug(slug)) {
            throw new CommunitySlugTakenException();
        }

        Community community = Community.builder()
                .createdBy(userId)
                .name(request.name().trim())
                .slug(slug)
                .description(request.description())
                .categoryType(request.categoryType())
                .city(request.city().trim())
                .state(request.state().trim())
                .status(CommunityStatus.ACTIVE)
                .memberCount(1)
                .listingCount(0)
                .build();
        community = communityDal.save(community);

        communityMemberDal.save(CommunityMember.builder()
                .community(community)
                .userId(userId)
                .role(MemberRole.ADMIN)
                .status(MemberStatus.ACTIVE)
                .joinedAt(Instant.now())
                .build());

        return communityMapper.toDetail(community);
    }

    @Transactional(readOnly = true)
    public PagedResponse<CommunitySummaryResponse> search(
            String city, CategoryType categoryType, String q, int page, int size) {
        Page<Community> results = communityDal.search(
                CommunityStatus.ACTIVE, city, categoryType, q, PageRequest.of(page, size));
        List<CommunitySummaryResponse> items = results.getContent().stream()
                .map(communityMapper::toSummary)
                .toList();
        return new PagedResponse<>(items, page, size, results.getTotalElements(), results.getTotalPages());
    }

    @Transactional(readOnly = true)
    public CommunityDetailResponse getBySlug(String slug) {
        Community community = communityDal.findBySlug(slug)
                .orElseThrow(CommunityNotFoundException::new);
        return communityMapper.toDetail(community);
    }

    @Transactional
    public void join(UUID userId, UUID communityId) {
        Community community = requireCommunity(communityId);
        if (communityMemberDal.findByCommunityIdAndUserId(communityId, userId).isPresent()) {
            throw new AlreadyMemberException();
        }
        communityMemberDal.save(CommunityMember.builder()
                .community(community)
                .userId(userId)
                .role(MemberRole.MEMBER)
                .status(MemberStatus.ACTIVE)
                .joinedAt(Instant.now())
                .build());
        community.setMemberCount(community.getMemberCount() + 1);
        communityDal.save(community);
    }

    @Transactional(readOnly = true)
    public List<CommunityMemberResponse> getMembers(UUID requesterId, UUID communityId) {
        requireCommunity(communityId);
        if (!communityMemberDal.isActiveMember(communityId, requesterId)) {
            throw new NotMemberException();
        }
        return communityMemberDal.findByCommunityIdAndStatus(communityId, MemberStatus.ACTIVE).stream()
                .map(member -> new CommunityMemberResponse(
                        member.getId(),
                        member.getUserId(),
                        member.getRole(),
                        member.getStatus(),
                        member.getJoinedAt()))
                .toList();
    }

    public Community requireCommunity(UUID communityId) {
        return communityDal.findById(communityId)
                .orElseThrow(CommunityNotFoundException::new);
    }

    public void requireActiveMember(UUID userId, UUID communityId) {
        requireCommunity(communityId);
        if (!communityMemberDal.isActiveMember(communityId, userId)) {
            throw new NotMemberException();
        }
    }

    private String normalizeSlug(String slug) {
        return slug.trim().toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9-]", "-")
                .replaceAll("-+", "-");
    }
}
