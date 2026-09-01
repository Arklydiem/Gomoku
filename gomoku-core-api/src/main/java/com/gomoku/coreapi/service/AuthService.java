package com.gomoku.coreapi.service;

import com.gomoku.coreapi.dto.auth.AuthResponse;
import com.gomoku.coreapi.dto.auth.LoginRequestDto;
import com.gomoku.coreapi.dto.auth.RegisterRequestDto;
import com.gomoku.coreapi.entity.UserEntity;
import com.gomoku.coreapi.exception.InvalidCredentialsException;
import com.gomoku.coreapi.exception.UserAlreadyExistsException;
import com.gomoku.coreapi.mapper.UserMapper;
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

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(request.username());
        userEntity.setEmail(request.email());
        userEntity.setPasswordHash(passwordEncoder.encode(request.password()));

        userEntity = userRepository.save(userEntity);

        return generateAuthResponse(userEntity);
    }

    public AuthResponse login(final LoginRequestDto request) {
        final UserEntity userEntity = userRepository
                .findByUsernameIgnoreCaseOrEmailIgnoreCase(
                        request.login(),
                        request.login()
                )
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid credentials")
                );

        if (!passwordEncoder.matches(
                request.password(),
                userEntity.getPasswordHash()
        )) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        return generateAuthResponse(userEntity);
    }

    private void checkUsernameAndEmail(final RegisterRequestDto request) {

        if (userRepository.existsByUsernameIgnoreCase(request.username())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new UserAlreadyExistsException("Email already exists");
        }
    }

    private AuthResponse generateAuthResponse(final UserEntity userEntity) {

        final String token = jwtService.generateToken(userEntity);

        return new AuthResponse(
                token,
                userMapper.toDto(userEntity)
        );
    }
}