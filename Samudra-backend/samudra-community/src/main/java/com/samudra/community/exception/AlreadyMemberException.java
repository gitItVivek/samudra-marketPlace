package com.samudra.community.exception;

public class AlreadyMemberException extends RuntimeException {
    public AlreadyMemberException() {
        super("You are already a member of this community");
    }
}
