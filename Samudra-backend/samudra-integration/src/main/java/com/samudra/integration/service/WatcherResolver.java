package com.samudra.integration.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
public class WatcherResolver {

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    @Value("${samudra.core.base-url}")
    private String coreBaseUrl;

    @Value("${samudra.internal.api.token:}")
    private String internalApiToken;

    public List<UUID> resolveWatcherIds(UUID listingId) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(coreBaseUrl + "/v1/internal/listings/" + listingId + "/watchers"))
                    .timeout(Duration.ofSeconds(10))
                    .header("X-Internal-Token", internalApiToken != null ? internalApiToken : "")
                    .GET()
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                log.warn("Watcher lookup failed for listing {} status={}", listingId, response.statusCode());
                return List.of();
            }
            return objectMapper.readValue(response.body(), new TypeReference<>() {
            });
        } catch (Exception ex) {
            log.warn("Watcher lookup error for listing {}: {}", listingId, ex.getMessage());
            return List.of();
        }
    }
}
