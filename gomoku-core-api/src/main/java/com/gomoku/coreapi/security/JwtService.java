package com.gomoku.coreapi.security;

import com.gomoku.coreapi.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtEncoder jwtEncoder;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(final UserEntity userEntity) {

        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("gomoku-core-api")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiration))
                .subject(userEntity.getUuid().toString())
                .claim("username", userEntity.getUsername())
                .build();

        return jwtEncoder
                .encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
    }
}