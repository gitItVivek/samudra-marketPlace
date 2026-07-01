package com.samudra.identity.controller;

import com.samudra.common.identity.response.UserContactResponse;
import com.samudra.identity.dal.UserDal;
import com.samudra.identity.entity.User;
import com.samudra.identity.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/v1/internal/users")
@RequiredArgsConstructor
public class InternalUserController {

    private final UserDal userDal;

    @GetMapping("/{userId}/contact")
    public ResponseEntity<UserContactResponse> contact(@PathVariable UUID userId) {
        User user = userDal.findById(userId).orElseThrow(UserNotFoundException::new);
        return ResponseEntity.ok(new UserContactResponse(
                user.getId(),
                user.getEmail(),
                user.getDisplayName()));
    }
}
