package com.samudra.community.exception;

import com.samudra.common.error.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "com.samudra.community")
public class CommunityExceptionHandler {

    @ExceptionHandler(CommunityNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFound(CommunityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiErrorResponse.of(404, "COMMUNITY_NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(CommunitySlugTakenException.class)
    public ResponseEntity<ApiErrorResponse> handleSlugTaken(CommunitySlugTakenException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiErrorResponse.of(409, "COMMUNITY_SLUG_TAKEN", ex.getMessage()));
    }

    @ExceptionHandler(AlreadyMemberException.class)
    public ResponseEntity<ApiErrorResponse> handleAlreadyMember(AlreadyMemberException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiErrorResponse.of(409, "ALREADY_MEMBER", ex.getMessage()));
    }

    @ExceptionHandler(NotMemberException.class)
    public ResponseEntity<ApiErrorResponse> handleNotMember(NotMemberException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiErrorResponse.of(403, "NOT_MEMBER", ex.getMessage()));
    }
}
