package com.samudra.integration.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.samudra.common.events.ListingCreatedEvent;
import com.samudra.common.identity.response.UserContactResponse;
import com.samudra.common.listing.response.MatchingUserIdsResponse;
import com.samudra.common.notifications.ListingDigestItem;
import com.samudra.common.notifications.ListingDigestNotificationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class CoreApiClient {

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${samudra.core.base-url}")
    private String coreBaseUrl;

    @Value("${samudra.internal.api.token:}")
    private String internalApiToken;

    public List<UUID> findMatchingUsers(ListingCreatedEvent event) {
        try {
            String body = objectMapper.writeValueAsString(event);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(coreBaseUrl + "/v1/internal/interests/matching"))
                    .timeout(Duration.ofSeconds(15))
                    .header("Content-Type", "application/json")
                    .header("X-Internal-Token", token())
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                log.warn("Matching API failed status={} body={}", response.statusCode(), response.body());
                return List.of();
            }
            MatchingUserIdsResponse parsed = objectMapper.readValue(response.body(), MatchingUserIdsResponse.class);
            return parsed.userIds();
        } catch (Exception ex) {
            log.warn("Matching API error: {}", ex.getMessage());
            return List.of();
        }
    }

    public UserContactResponse fetchContact(UUID userId) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(coreBaseUrl + "/v1/internal/users/" + userId + "/contact"))
                    .timeout(Duration.ofSeconds(10))
                    .header("X-Internal-Token", token())
                    .GET()
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                return null;
            }
            return objectMapper.readValue(response.body(), UserContactResponse.class);
        } catch (Exception ex) {
            log.warn("Contact lookup failed userId={}: {}", userId, ex.getMessage());
            return null;
        }
    }

    public void sendDigest(UUID userId, String email, String displayName, List<ListingDigestItem> listings) {
        try {
            ListingDigestNotificationRequest payload = new ListingDigestNotificationRequest(
                    userId, email, displayName, listings);
            String body = objectMapper.writeValueAsString(payload);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(coreBaseUrl + "/v1/internal/notifications/listing-digest"))
                    .timeout(Duration.ofSeconds(20))
                    .header("Content-Type", "application/json")
                    .header("X-Internal-Token", token())
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 300) {
                throw new IllegalStateException("Digest API status " + response.statusCode());
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to send digest for userId=" + userId, ex);
        }
    }

    public void markNotified(UUID userId) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(coreBaseUrl + "/v1/internal/interests/" + userId + "/notified"))
                    .timeout(Duration.ofSeconds(10))
                    .header("X-Internal-Token", token())
                    .method("PATCH", HttpRequest.BodyPublishers.noBody())
                    .build();
            httpClient.send(request, HttpResponse.BodyHandlers.discarding());
        } catch (Exception ex) {
            log.warn("markNotified failed userId={}: {}", userId, ex.getMessage());
        }
    }

    private String token() {
        return internalApiToken != null ? internalApiToken : "";
    }
}
