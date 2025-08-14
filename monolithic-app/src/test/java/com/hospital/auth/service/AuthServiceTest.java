package com.hospital.auth.service;

import com.hospital.auth.dto.TokenRequest;
import com.hospital.auth.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(jwtUtil);
    }

    @Test
    void generateToken_ShouldReturnJwtToken() {
        // Given
        TokenRequest request = new TokenRequest("testuser");
        String expectedToken = "mock.jwt.token";
        
        when(jwtUtil.generateToken(anyString())).thenReturn(expectedToken);

        // When
        String actualToken = authService.generateToken(request);

        // Then
        assertEquals(expectedToken, actualToken);
    }

    @Test
    void validateToken_WithValidToken_ShouldReturnTrue() {
        // Given
        String validToken = "valid.jwt.token";
        when(jwtUtil.validateToken(validToken)).thenReturn(true);

        // When
        boolean isValid = authService.validateToken(validToken);

        // Then
        assertTrue(isValid);
    }

    @Test
    void validateToken_WithInvalidToken_ShouldReturnFalse() {
        // Given
        String invalidToken = "invalid.jwt.token";
        when(jwtUtil.validateToken(invalidToken)).thenReturn(false);

        // When
        boolean isValid = authService.validateToken(invalidToken);

        // Then
        assertFalse(isValid);
    }

    @Test
    void validateToken_WithNullToken_ShouldReturnFalse() {
        // Given
        String nullToken = null;
        when(jwtUtil.validateToken(nullToken)).thenReturn(false);

        // When
        boolean isValid = authService.validateToken(nullToken);

        // Then
        assertFalse(isValid);
    }
}