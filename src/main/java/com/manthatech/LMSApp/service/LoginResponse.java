package com.manthatech.LMSApp.service;

public class LoginResponse {

    private final String token;

    private final long expiresIn;

    private final boolean isDefaultPassword;

    private String role;

    private String email;

    private Long userId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LoginResponse(String token, long expiresIn, boolean isDefaultPassword, String role, String email, Long userId) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.isDefaultPassword = isDefaultPassword;
        this.role = role;
        this.email = email;
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public boolean isDefaultPassword() {
        return isDefaultPassword;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
