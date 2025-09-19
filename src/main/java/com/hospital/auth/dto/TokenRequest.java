package com.hospital.auth.dto;

public class TokenRequest {
    private String username;

    public TokenRequest() {
    }

    public TokenRequest(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}