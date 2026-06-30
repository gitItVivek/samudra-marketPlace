package com.samudra.community.controller;

import com.samudra.community.service.CommunityWatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/internal/listings")
@RequiredArgsConstructor
public class InternalListingWatchController {

    private final CommunityWatchService communityWatchService;

    @GetMapping("/{id}/watchers")
    public ResponseEntity<List<UUID>> listWatchers(@PathVariable UUID id) {
        return ResponseEntity.ok(communityWatchService.listWatcherUserIds(id));
    }
}
