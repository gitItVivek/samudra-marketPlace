package com.samudra.community.repository;

import com.samudra.community.entity.CommunityRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommunityRuleRepository extends JpaRepository<CommunityRule, UUID> {

    List<CommunityRule> findByCommunityIdOrderByDisplayOrderAsc(UUID communityId);

    void deleteByCommunityId(UUID communityId);
}
