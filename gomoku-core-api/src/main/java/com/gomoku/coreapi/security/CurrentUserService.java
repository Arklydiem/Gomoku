package com.gomoku.coreapi.security;

import com.gomoku.coreapi.entity.UserEntity;
import com.gomoku.coreapi.exception.UserNotFoundException;
import com.gomoku.coreapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CurrentUserService {

    private final UserRepository userRepository;

    public Optional<UserEntity> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuthenticationToken)) {
            return Optional.empty();
        }

        String subject = jwtAuthenticationToken.getToken().getSubject();

        if (subject == null || subject.isBlank()) {
            return Optional.empty();
        }

        UUID userUuid = UUID.fromString(subject);

        return Optional.of(
                userRepository
                        .findByUuid(userUuid)
                        .orElseThrow(() -> new UserNotFoundException("User not found: " + userUuid))
        );
    }
}
