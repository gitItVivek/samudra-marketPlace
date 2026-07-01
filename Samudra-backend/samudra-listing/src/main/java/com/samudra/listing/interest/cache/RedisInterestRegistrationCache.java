package com.samudra.listing.interest.cache;

import com.samudra.listing.interest.InterestFingerprint;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "samudra.cache.redis.enabled", havingValue = "true", matchIfMissing = true)
public class RedisInterestRegistrationCache implements InterestRegistrationCache {

    private static final String KEY_PREFIX = "samudra:interest:registered:";

    private final StringRedisTemplate redisTemplate;

    @Value("${samudra.cache.interest-registration-ttl-days:90}")
    private long interestTtlDays;

    @Override
    public boolean isRegistered(UUID userId, InterestFingerprint fingerprint) {
        try {
            Boolean exists = redisTemplate.hasKey(key(userId, fingerprint));
            return Boolean.TRUE.equals(exists);
        } catch (Exception ex) {
            log.warn("Redis interest lookup failed, falling back to DB: {}", ex.getMessage());
            return false;
        }
    }

    @Override
    public void markRegistered(UUID userId, InterestFingerprint fingerprint) {
        try {
            redisTemplate.opsForValue().set(
                    key(userId, fingerprint),
                    "1",
                    Duration.ofDays(interestTtlDays));
        } catch (Exception ex) {
            log.warn("Redis interest cache write failed: {}", ex.getMessage());
        }
    }

    private static String key(UUID userId, InterestFingerprint fingerprint) {
        return KEY_PREFIX + fingerprint.redisKey(userId);
    }
}
