package com.gomoku.coreapi.dto.auth;

public record LoginRequestDto(
        String login,
        String password
) {
}