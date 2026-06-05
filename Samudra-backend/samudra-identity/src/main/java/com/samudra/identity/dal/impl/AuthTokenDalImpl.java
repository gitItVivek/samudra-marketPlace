package com.samudra.identity.dal.impl;

import com.samudra.identity.dal.AuthTokenDal;
import com.samudra.identity.entity.AuthToken;
import com.samudra.identity.repository.AuthTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AuthTokenDalImpl implements AuthTokenDal {

    private final AuthTokenRepository authTokenRepository;

    @Override
    public AuthToken save(AuthToken authToken) {
        return authTokenRepository.save(authToken);
    }

    @Override
    public Optional<AuthToken> findById(UUID id) {
        return authTokenRepository.findById(id);
    }

    @Override
    public Optional<AuthToken> findByTokenHash(String tokenHash) {
        return authTokenRepository.findByTokenHashAndRevokedAtIsNull(tokenHash);
    }

    @Override
    public List<AuthToken> findActiveByUserId(UUID userId) {
        return authTokenRepository.findByUserIdAndRevokedAtIsNull(userId);
    }

    @Override
    public void deleteById(UUID id) {
        authTokenRepository.deleteById(id);
    }
}
