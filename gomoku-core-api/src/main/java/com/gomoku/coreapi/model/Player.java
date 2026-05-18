package com.gomoku.coreapi.model;

import com.gomoku.coreapi.enums.PlayerType;
import com.gomoku.coreapi.enums.StoneColor;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class Player {

    public Player(){
        this.uuid = UUID.randomUUID();
    }

    /**
     * Player ID.
     */
    @Setter(AccessLevel.NONE)
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
