package com.samudra.identity.repository;

import com.samudra.common.enums.VerificationStatus;
import com.samudra.common.enums.VerificationType;
import com.samudra.identity.entity.VerificationChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VerificationChallengeRepository extends JpaRepository<VerificationChallenge, UUID> {

    Optional<VerificationChallenge> findTopByUserIdAndVerificationTypeAndStatusOrderByCreatedAtDesc(
            UUID userId, VerificationType type, VerificationStatus status);

    List<VerificationChallenge> findByUserIdAndVerificationTypeAndStatus(
            UUID userId, VerificationType type, VerificationStatus status);
}
