package com.gomoku.coreapi.controller;

import com.gomoku.coreapi.dto.GameDto;
import com.gomoku.coreapi.dto.auth.AuthResponse;
import com.gomoku.coreapi.dto.auth.RegisterRequestDto;
import com.gomoku.coreapi.mapper.GameMapper;
import com.gomoku.coreapi.model.Game;
import com.gomoku.coreapi.repository.UserRepository;
import com.gomoku.coreapi.service.AuthService;
import com.gomoku.coreapi.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.DescriptorKey;
import java.util.UUID;

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

//    @PostMapping("/login")
//    public GameDto joinGame(@PathVariable final UUID gameUuid) {
//    }

}
