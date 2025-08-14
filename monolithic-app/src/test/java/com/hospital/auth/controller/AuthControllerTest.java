package com.hospital.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hospital.auth.dto.TokenRequest;
import com.hospital.auth.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@ActiveProfiles("test")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void generateToken_ShouldReturnTokenResponse() throws Exception {
        // Given
        TokenRequest request = new TokenRequest("testuser");
        String expectedToken = "mock.jwt.token";
        
        when(authService.generateToken(any(TokenRequest.class)))
                .thenReturn(expectedToken);

        // When & Then
        mockMvc.perform(post("/auth/generate-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value(expectedToken))
                .andExpect(jsonPath("$.type").value("Bearer"));
    }

    @Test
    void generateToken_WithEmptyUsername_ShouldReturnBadRequest() throws Exception {
        // Given
        TokenRequest request = new TokenRequest("");

        // When & Then
        mockMvc.perform(post("/auth/generate-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void validateToken_WithValidToken_ShouldReturnTrue() throws Exception {
        // Given
        String validToken = "valid.jwt.token";
        when(authService.validateToken(validToken)).thenReturn(true);

        // When & Then
        mockMvc.perform(get("/auth/validate-token")
                        .param("token", validToken))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    void validateToken_WithInvalidToken_ShouldReturnFalse() throws Exception {
        // Given
        String invalidToken = "invalid.jwt.token";
        when(authService.validateToken(invalidToken)).thenReturn(false);

        // When & Then
        mockMvc.perform(get("/auth/validate-token")
                        .param("token", invalidToken))
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }
}