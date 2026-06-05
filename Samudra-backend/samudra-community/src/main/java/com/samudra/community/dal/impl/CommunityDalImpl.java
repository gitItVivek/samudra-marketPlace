package com.samudra.community.dal.impl;

import com.samudra.common.enums.CommunityStatus;
import com.samudra.community.dal.CommunityDal;
import com.samudra.community.entity.Community;
import com.samudra.community.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CommunityDalImpl implements CommunityDal {

    private final CommunityRepository communityRepository;

    @Override
    public Community save(Community community) {
        return communityRepository.save(community);
    }

    @Override
    public Optional<Community> findById(UUID id) {
        return communityRepository.findById(id);
    }

    @Override
    public Optional<Community> findBySlug(String slug) {
        return communityRepository.findBySlugAndDeletedAtIsNull(slug);
    }

    @Override
    public boolean existsBySlug(String slug) {
        return communityRepository.existsBySlug(slug);
    }

    @Override
    public Page<Community> findByStatus(CommunityStatus status, Pageable pageable) {
        return communityRepository.findByStatusAndDeletedAtIsNullOrderByMemberCountDesc(status, pageable);
    }

    @Override
    public Page<Community> findByStatusAndCity(CommunityStatus status, String city, Pageable pageable) {
        return communityRepository.findByStatusAndCityAndDeletedAtIsNullOrderByMemberCountDesc(status, city, pageable);
    }
}
