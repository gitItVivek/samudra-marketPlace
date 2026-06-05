package com.samudra.identity.dal;

import com.samudra.identity.entity.AuthToken;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AuthTokenDal {

    AuthToken save(AuthToken authToken);

    Optional<AuthToken> findById(UUID id);

    Optional<AuthToken> findByTokenHash(String tokenHash);

    List<AuthToken> findActiveByUserId(UUID userId);

    void deleteById(UUID id);
}
