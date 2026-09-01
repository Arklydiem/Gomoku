package com.gomoku.coreapi.dto;

import com.gomoku.coreapi.enums.GameStatus;
import com.gomoku.coreapi.enums.GameType;
import com.gomoku.coreapi.enums.StoneColor;

import java.util.List;
import java.util.UUID;

public record GameDto(
        UUID uuid,
        BoardDto board,
        List<PlayerDto> players,
        List<GameTurnDto> turns,
        StoneColor currentTurn,
        GameStatus status,
        int blackCaptures,
        int whiteCaptures,
        GameType gameType
) { }