package com.samudra.identity.controller;

import com.samudra.common.identity.response.UserSummaryResponse;
import com.samudra.identity.dal.UserDal;
import com.samudra.identity.entity.User;
import com.samudra.identity.security.SamudraUserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserDal userDal;

    @GetMapping("/me")
    public ResponseEntity<UserSummaryResponse> me(
            @AuthenticationPrincipal SamudraUserPrincipal principal) {
        User user = userDal.findById(principal.userId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(new UserSummaryResponse(
                user.getId(), user.getEmail(), user.getDisplayName(), user.getIsVerified()
        ));
    }
}
