package com.gomoku.coreapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class GamesUuidsDto {
    /** List of game UUIDs */
    private List<UUID> uuids;
}
