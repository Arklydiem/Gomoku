package com.gomoku.coreapi.service;

import com.gomoku.coreapi.dto.auth.AuthResponse;
import com.gomoku.coreapi.dto.auth.LoginRequestDto;
import com.gomoku.coreapi.dto.auth.RegisterRequestDto;
import com.gomoku.coreapi.exception.InvalidCredentialsException;
import com.gomoku.coreapi.exception.UserAlreadyExistsException;
import com.gomoku.coreapi.mapper.UserMapper;
import com.gomoku.coreapi.model.User;
import com.gomoku.coreapi.repository.UserRepository;
import com.gomoku.coreapi.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(final RegisterRequestDto request) {

        checkUsernameAndEmail(request);

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));

        user = userRepository.save(user);

        return generateAuthResponse(user);
    }

    public AuthResponse login(final LoginRequestDto request) {
        final User user = userRepository
                .findByUsernameIgnoreCaseOrEmailIgnoreCase(
                        request.login(),
                        request.login()
                )
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid credentials")
                );

        if (!passwordEncoder.matches(
                request.password(),
                user.getPasswordHash()
        )) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        return generateAuthResponse(user);
    }

    private void checkUsernameAndEmail(final RegisterRequestDto request) {

        if (userRepository.existsByUsernameIgnoreCase(request.username())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new UserAlreadyExistsException("Email already exists");
        }
    }

    private AuthResponse generateAuthResponse(final User user) {

        final String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                userMapper.toDto(user)
        );
    }
}