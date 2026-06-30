package com.samudra.identity.exception;


public class InvalidCredentialsException extends RuntimeException{
    public InvalidCredentialsException() {
        super("invalid credentials");
    }
}
