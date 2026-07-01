package com.samudra.listing.interest;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.ListingType;
import org.springframework.util.StringUtils;

import java.util.UUID;

/**
 * Normalized identity for a saved interest — used for DB dedup and Redis cache keys.
 */
public record InterestFingerprint(
        String city,
        CategoryType categoryType,
        ListingType listingType,
        String keywords,
        String customTag) {

    public static InterestFingerprint of(
            String city,
            CategoryType categoryType,
            ListingType listingType,
            String keywords,
            String customTag) {
        return new InterestFingerprint(
                normalize(city),
                categoryType,
                listingType,
                normalizeNullable(keywords),
                normalizeNullable(customTag));
    }

    public String redisKey(UUID userId) {
        return userId
                + "|" + city
                + "|" + enumKey(categoryType)
                + "|" + enumKey(listingType)
                + "|" + nullToEmpty(keywords)
                + "|" + nullToEmpty(customTag);
    }

    public boolean matches(
            String otherCity,
            CategoryType otherCategory,
            ListingType otherListing,
            String otherKeywords,
            String otherCustomTag) {
        return city.equals(normalize(otherCity))
                && sameEnum(categoryType, otherCategory)
                && sameEnum(listingType, otherListing)
                && nullToEmpty(keywords).equals(nullToEmpty(normalizeNullable(otherKeywords)))
                && nullToEmpty(customTag).equals(nullToEmpty(normalizeNullable(otherCustomTag)));
    }

    private static String normalize(String value) {
        return value == null ? "" : value.trim().toLowerCase();
    }

    private static String normalizeNullable(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        return value.trim().toLowerCase();
    }

    private static String nullToEmpty(String value) {
        return value == null ? "" : value;
    }

    private static String enumKey(Enum<?> value) {
        return value == null ? "" : value.name();
    }

    private static <T> boolean sameEnum(T left, T right) {
        if (left == null && right == null) {
            return true;
        }
        return left != null && left.equals(right);
    }
}
