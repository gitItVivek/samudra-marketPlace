package com.samudra.community.exception;

public class NotMemberException extends RuntimeException {
    public NotMemberException() {
        super("You must be an active member of this community");
    }
}
