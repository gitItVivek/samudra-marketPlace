package com.samudra.listing.interest.service;

import com.samudra.common.enums.CategoryType;
import com.samudra.common.enums.InterestSource;
import com.samudra.common.enums.ListingType;
import com.samudra.common.events.ListingCreatedEvent;
import com.samudra.common.listing.request.CreateUserInterestRequest;
import com.samudra.common.listing.request.UpdateUserInterestRequest;
import com.samudra.common.listing.response.UserInterestResponse;
import com.samudra.listing.exception.ListingForbiddenException;
import com.samudra.listing.exception.ListingNotFoundException;
import com.samudra.listing.interest.entity.UserInterest;
import com.samudra.listing.interest.InterestFingerprint;
import com.samudra.listing.interest.cache.InterestRegistrationCache;
import com.samudra.listing.interest.repository.UserInterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserInterestService {

    private static final int COOLDOWN_HOURS = 2;

    private final UserInterestRepository userInterestRepository;
    private final InterestRegistrationCache interestRegistrationCache;

    @Transactional
    public UserInterestResponse create(UUID userId, CreateUserInterestRequest request) {
        InterestFingerprint fingerprint = InterestFingerprint.of(
                request.city().trim(),
                request.categoryType(),
                request.listingType(),
                trimToNull(request.keywords()),
                trimToNull(request.customTag()));
        if (interestRegistrationCache.isRegistered(userId, fingerprint)) {
            return findDuplicate(
                            userId,
                            request.city().trim(),
                            request.categoryType(),
                            request.listingType(),
                            trimToNull(request.keywords()),
                            trimToNull(request.customTag()))
                    .map(this::toResponse)
                    .orElseThrow(IllegalStateException::new);
        }
        UserInterest interest = upsertInterestInDb(
                userId,
                request.city().trim(),
                trimToNull(request.state()),
                request.categoryType(),
                request.listingType(),
                trimToNull(request.keywords()),
                trimToNull(request.customTag()),
                request.source());
        interestRegistrationCache.markRegistered(userId, fingerprint);
        return toResponse(interest);
    }

    @Transactional
    public void recordSearchInterest(
            UUID userId,
            String city,
            String state,
            CategoryType categoryType,
            ListingType listingType,
            String q) {
        if (!StringUtils.hasText(city)) {
            return;
        }
        if (!StringUtils.hasText(q) && categoryType == null && listingType == null) {
            return;
        }
        String keywords = trimToNull(q);
        InterestFingerprint fingerprint = InterestFingerprint.of(
                city.trim(), categoryType, listingType, keywords, null);
        if (interestRegistrationCache.isRegistered(userId, fingerprint)) {
            return;
        }
        upsertInterestInDb(
                userId,
                city.trim(),
                trimToNull(state),
                categoryType,
                listingType,
                keywords,
                null,
                InterestSource.SEARCH);
        interestRegistrationCache.markRegistered(userId, fingerprint);
    }

    @Transactional(readOnly = true)
    public List<UserInterestResponse> listForUser(UUID userId) {
        return userInterestRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public UserInterestResponse update(UUID userId, UUID interestId, UpdateUserInterestRequest request) {
        UserInterest interest = requireOwned(userId, interestId);
        if (request.notifyEnabled() != null) {
            interest.setNotifyEnabled(request.notifyEnabled());
        }
        return toResponse(userInterestRepository.save(interest));
    }

    @Transactional
    public void delete(UUID userId, UUID interestId) {
        UserInterest interest = requireOwned(userId, interestId);
        userInterestRepository.delete(interest);
    }

    @Transactional(readOnly = true)
    public List<UUID> findMatchingUserIds(ListingCreatedEvent event) {
        Instant cooldownBefore = Instant.now().minus(COOLDOWN_HOURS, ChronoUnit.HOURS);
        String keywordsPattern = StringUtils.hasText(event.title()) || StringUtils.hasText(event.description())
                ? "match" : null;
        return userInterestRepository.findMatchingUserIds(
                event.city(),
                event.sellerId(),
                cooldownBefore,
                event.categoryType(),
                event.listingType(),
                event.customTag(),
                keywordsPattern,
                event.title() != null ? event.title() : "",
                event.description() != null ? event.description() : "");
    }

    @Transactional
    public void markNotified(UUID userId) {
        List<UserInterest> interests = userInterestRepository.findByUserIdOrderByCreatedAtDesc(userId);
        Instant now = Instant.now();
        for (UserInterest interest : interests) {
            if (interest.isNotifyEnabled()) {
                interest.setLastNotifiedAt(now);
            }
        }
        userInterestRepository.saveAll(interests);
    }

    private UserInterest requireOwned(UUID userId, UUID interestId) {
        UserInterest interest = userInterestRepository.findById(interestId)
                .orElseThrow(ListingNotFoundException::new);
        if (!interest.getUserId().equals(userId)) {
            throw new ListingForbiddenException();
        }
        return interest;
    }

    private UserInterestResponse toResponse(UserInterest interest) {
        return new UserInterestResponse(
                interest.getId(),
                interest.getCity(),
                interest.getState(),
                interest.getCategoryType(),
                interest.getListingType(),
                interest.getKeywords(),
                interest.getCustomTag(),
                interest.getSource(),
                interest.isNotifyEnabled(),
                interest.getLastNotifiedAt(),
                interest.getCreatedAt());
    }

    private static String trimToNull(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        return value.trim();
    }

    private UserInterest upsertInterestInDb(
            UUID userId,
            String city,
            String state,
            CategoryType categoryType,
            ListingType listingType,
            String keywords,
            String customTag,
            InterestSource source) {
        Optional<UserInterest> existing = findDuplicate(
                userId, city, categoryType, listingType, keywords, customTag);
        if (existing.isPresent()) {
            UserInterest interest = existing.get();
            interest.setUpdatedAt(Instant.now());
            return userInterestRepository.save(interest);
        }
        try {
            return userInterestRepository.save(UserInterest.builder()
                    .userId(userId)
                    .city(city)
                    .state(state)
                    .categoryType(categoryType)
                    .listingType(listingType)
                    .keywords(keywords)
                    .customTag(customTag)
                    .source(source)
                    .notifyEnabled(true)
                    .build());
        } catch (DataIntegrityViolationException ex) {
            return findDuplicate(userId, city, categoryType, listingType, keywords, customTag)
                    .orElseThrow(() -> ex);
        }
    }

    private Optional<UserInterest> findDuplicate(
            UUID userId,
            String city,
            CategoryType categoryType,
            ListingType listingType,
            String keywords,
            String customTag) {
        return userInterestRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .filter(interest -> InterestFingerprint.of(
                                city, categoryType, listingType, keywords, customTag)
                        .matches(
                                interest.getCity(),
                                interest.getCategoryType(),
                                interest.getListingType(),
                                interest.getKeywords(),
                                interest.getCustomTag()))
                .findFirst();
    }
}
