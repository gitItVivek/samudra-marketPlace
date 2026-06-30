package com.samudra.identity.dal.impl;

import com.samudra.common.enums.VerificationStatus;
import com.samudra.common.enums.VerificationType;
import com.samudra.identity.dal.VerificationChallengeDal;
import com.samudra.identity.entity.VerificationChallenge;
import com.samudra.identity.repository.VerificationChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class VerificationChallengeDalImpl implements VerificationChallengeDal {

    private final VerificationChallengeRepository verificationChallengeRepository;

    @Override
    public VerificationChallenge save(VerificationChallenge challenge) {
        return verificationChallengeRepository.save(challenge);
    }

    @Override
    public List<VerificationChallenge> saveAll(Iterable<VerificationChallenge> challenges) {
        return verificationChallengeRepository.saveAll(challenges);
    }

    @Override
    public Optional<VerificationChallenge> findLatestPendingByUserId(UUID userId, VerificationType type) {
        return verificationChallengeRepository.findTopByUserIdAndVerificationTypeAndStatusOrderByCreatedAtDesc(
                userId, type, VerificationStatus.PENDING);
    }

    @Override
    public List<VerificationChallenge> findPendingByUserId(UUID userId, VerificationType type) {
        return verificationChallengeRepository.findByUserIdAndVerificationTypeAndStatus(
                userId, type, VerificationStatus.PENDING);
    }

    @Override
    public void expirePendingChallenges(UUID userId, VerificationType type) {
        List<VerificationChallenge> pending = findPendingByUserId(userId, type);
        if (pending.isEmpty()) {
            return;
        }
        pending.forEach(challenge -> challenge.setStatus(VerificationStatus.EXPIRED));
        verificationChallengeRepository.saveAll(pending);
    }
}
