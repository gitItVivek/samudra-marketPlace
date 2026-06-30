package com.samudra.identity.dal;

import com.samudra.common.enums.VerificationType;
import com.samudra.identity.entity.VerificationChallenge;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VerificationChallengeDal {

    VerificationChallenge save(VerificationChallenge challenge);

    List<VerificationChallenge> saveAll(Iterable<VerificationChallenge> challenges);

    Optional<VerificationChallenge> findLatestPendingByUserId(UUID userId, VerificationType type);

    List<VerificationChallenge> findPendingByUserId(UUID userId, VerificationType type);

    void expirePendingChallenges(UUID userId, VerificationType type);
}
