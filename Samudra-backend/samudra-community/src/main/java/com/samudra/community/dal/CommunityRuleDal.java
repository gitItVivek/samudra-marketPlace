package com.samudra.community.dal;

import com.samudra.community.entity.CommunityRule;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommunityRuleDal {

    CommunityRule save(CommunityRule rule);

    List<CommunityRule> saveAll(Iterable<CommunityRule> rules);

    Optional<CommunityRule> findById(UUID id);

    List<CommunityRule> findByCommunityId(UUID communityId);

    void deleteByCommunityId(UUID communityId);
}
