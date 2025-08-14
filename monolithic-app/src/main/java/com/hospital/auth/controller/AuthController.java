package com.hospital.auth.controller;

import com.hospital.auth.dto.TokenRequest;
import com.hospital.auth.dto.TokenResponse;
import com.hospital.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Authorization", description = "JWT Token Management APIs")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/generate-token")
    @Operation(summary = "Generate JWT Token", description = "Generate a JWT token for authentication (anonymous access allowed)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Token generated successfully"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<TokenResponse> generateToken(@RequestBody(required = false) TokenRequest request) {
        if (request == null) {
            request = new TokenRequest("anonymous");
        }
        TokenResponse response = authService.generateToken(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/validate")
    @Operation(summary = "Validate JWT Token", description = "Validate if a JWT token is valid and not expired")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token) {
        boolean isValid = authService.validateToken(token);
        return ResponseEntity.ok(isValid);
    }
}