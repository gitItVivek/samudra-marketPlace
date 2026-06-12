package com.samudra.identity.dal.impl;

import com.samudra.identity.dal.RevokedTokenDal;
import com.samudra.identity.entity.RevokedToken;
import com.samudra.identity.repository.RevokedTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class RevokedTokenDalImpl implements RevokedTokenDal {

    private final RevokedTokenRepository revokedTokenRepository;

    @Override
    public RevokedToken save(RevokedToken revokedToken) {
        return revokedTokenRepository.save(revokedToken);
    }

    @Override
    public boolean existsByTokenHash(String tokenHash) {
        return revokedTokenRepository.existsByTokenHash(tokenHash);
    }

    @Override
    public Optional<RevokedToken> findByTokenHash(String tokenHash) {
        return revokedTokenRepository.findByTokenHash(tokenHash);
    }
}
