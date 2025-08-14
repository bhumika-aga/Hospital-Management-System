package com.hospital.auth.service;

import com.hospital.auth.dto.TokenRequest;
import com.hospital.auth.dto.TokenResponse;
import com.hospital.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public TokenResponse generateToken(TokenRequest request) {
        String username = request.getUsername() != null ? request.getUsername() : "anonymous";
        String token = jwtUtil.generateToken(username);
        
        return new TokenResponse(
            token,
            "Bearer",
            jwtUtil.getExpirationTime() / 1000  // Convert to seconds
        );
    }
    
    public boolean validateToken(String token) {
        try {
            String username = jwtUtil.extractUsername(token);
            return jwtUtil.validateToken(token, username);
        } catch (Exception e) {
            return false;
        }
    }
}