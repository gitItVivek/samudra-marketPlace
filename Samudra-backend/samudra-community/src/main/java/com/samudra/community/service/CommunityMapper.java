package com.samudra.community.service;

import com.samudra.common.community.response.CommunityDetailResponse;
import com.samudra.common.community.response.CommunitySummaryResponse;
import com.samudra.community.entity.Community;
import org.springframework.stereotype.Component;

@Component
public class CommunityMapper {

    public CommunitySummaryResponse toSummary(Community community) {
        return new CommunitySummaryResponse(
                community.getId(),
                community.getName(),
                community.getSlug(),
                community.getDescription(),
                community.getCategoryType(),
                community.getCity(),
                community.getState(),
                community.getStatus(),
                community.getMemberCount(),
                community.getListingCount(),
                community.getCreatedAt()
        );
    }

    public CommunityDetailResponse toDetail(Community community) {
        return new CommunityDetailResponse(
                community.getId(),
                community.getCreatedBy(),
                community.getName(),
                community.getSlug(),
                community.getDescription(),
                community.getCategoryType(),
                community.getCity(),
                community.getState(),
                community.getCoverImageUrl(),
                community.getStatus(),
                community.getIsPrivate(),
                community.getMemberCount(),
                community.getListingCount(),
                community.getCreatedAt()
        );
    }
}
