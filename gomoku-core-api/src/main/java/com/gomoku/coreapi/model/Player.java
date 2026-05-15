package com.gomoku.coreapi.model;

import com.gomoku.coreapi.enums.PlayerType;
import com.gomoku.coreapi.enums.StoneColor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class Player {
    /**
     * Player ID.
     */
    private UUID uuid;

    /**
     * Player name.
     */
    private String name;

    /**
     * Player Type.
     */
    private PlayerType type;

    /**
     * Player stone color.
     */
    private StoneColor color;
}
