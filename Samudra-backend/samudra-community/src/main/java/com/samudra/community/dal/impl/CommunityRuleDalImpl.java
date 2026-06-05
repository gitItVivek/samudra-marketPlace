package com.samudra.community.dal.impl;

import com.samudra.community.dal.CommunityRuleDal;
import com.samudra.community.entity.CommunityRule;
import com.samudra.community.repository.CommunityRuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CommunityRuleDalImpl implements CommunityRuleDal {

    private final CommunityRuleRepository communityRuleRepository;

    @Override
    public CommunityRule save(CommunityRule rule) {
        return communityRuleRepository.save(rule);
    }

    @Override
    public List<CommunityRule> saveAll(Iterable<CommunityRule> rules) {
        return communityRuleRepository.saveAll(rules);
    }

    @Override
    public Optional<CommunityRule> findById(UUID id) {
        return communityRuleRepository.findById(id);
    }

    @Override
    public List<CommunityRule> findByCommunityId(UUID communityId) {
        return communityRuleRepository.findByCommunityIdOrderByDisplayOrderAsc(communityId);
    }

    @Override
    public void deleteByCommunityId(UUID communityId) {
        communityRuleRepository.deleteByCommunityId(communityId);
    }
}
