package com.samudra.listing.interest.cache;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingType;
import com.samudra.common.enums.SaleType;
import com.samudra.common.listing.response.ListingSummaryResponse;
import com.samudra.common.response.PagedResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "samudra.cache.redis.enabled", havingValue = "true", matchIfMissing = true)
public class ListingSearchCache {

    private static final String KEY_PREFIX = "samudra:search:";

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    @Value("${samudra.cache.search-results-ttl-minutes:5}")
    private long searchTtlMinutes;

    public PagedResponse<ListingSummaryResponse> get(
            String city,
            String state,
            CategoryType categoryType,
            ListingType listingType,
            SaleType saleType,
            String q,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String sort,
            int page,
            int size) {
        try {
            String json = redisTemplate.opsForValue().get(cacheKey(
                    city, state, categoryType, listingType, saleType, q, minPrice, maxPrice, sort, page, size));
            if (!StringUtils.hasText(json)) {
                return null;
            }
            return objectMapper.readValue(
                    json,
                    objectMapper.getTypeFactory().constructParametricType(
                            PagedResponse.class, ListingSummaryResponse.class));
        } catch (Exception ex) {
            log.warn("Redis search cache read failed: {}", ex.getMessage());
            return null;
        }
    }

    public void put(
            String city,
            String state,
            CategoryType categoryType,
            ListingType listingType,
            SaleType saleType,
            String q,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String sort,
            int page,
            int size,
            PagedResponse<ListingSummaryResponse> response) {
        try {
            String json = objectMapper.writeValueAsString(response);
            redisTemplate.opsForValue().set(
                    cacheKey(city, state, categoryType, listingType, saleType, q, minPrice, maxPrice, sort, page, size),
                    json,
                    Duration.ofMinutes(searchTtlMinutes));
        } catch (JsonProcessingException ex) {
            log.warn("Redis search cache write failed: {}", ex.getMessage());
        }
    }

    public void invalidateCity(String city) {
        if (!StringUtils.hasText(city)) {
            return;
        }
        try {
            String pattern = KEY_PREFIX + normalize(city) + ":*";
            Set<String> keys = redisTemplate.keys(pattern);
            if (keys != null && !keys.isEmpty()) {
                redisTemplate.delete(keys);
            }
        } catch (Exception ex) {
            log.warn("Redis search cache invalidation failed for city={}: {}", city, ex.getMessage());
        }
    }

    private static String cacheKey(
            String city,
            String state,
            CategoryType categoryType,
            ListingType listingType,
            SaleType saleType,
            String q,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String sort,
            int page,
            int size) {
        return KEY_PREFIX
                + normalize(city) + ":"
                + normalize(state) + ":"
                + enumKey(categoryType) + ":"
                + enumKey(listingType) + ":"
                + enumKey(saleType) + ":"
                + normalize(q) + ":"
                + priceKey(minPrice) + ":"
                + priceKey(maxPrice) + ":"
                + normalize(sort) + ":"
                + page + ":"
                + size;
    }

    private static String normalize(String value) {
        return value == null ? "" : value.trim().toLowerCase();
    }

    private static String enumKey(Enum<?> value) {
        return value == null ? "" : value.name();
    }

    private static String priceKey(BigDecimal price) {
        return price == null ? "" : price.toPlainString();
    }
}
