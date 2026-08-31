package com.gomoku.coreapi.controller;

import com.gomoku.coreapi.dto.auth.AuthResponse;
import com.gomoku.coreapi.dto.auth.LoginRequestDto;
import com.gomoku.coreapi.dto.auth.RegisterRequestDto;
import com.gomoku.coreapi.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.management.DescriptorKey;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @DescriptorKey("")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody final RegisterRequestDto registerRequestDto
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(registerRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody final LoginRequestDto loginRequestDto
    ) {
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

}
