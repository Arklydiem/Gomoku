package com.gomoku.coreapi.model;

import com.gomoku.coreapi.enums.GameStatus;
import com.gomoku.coreapi.enums.StoneColor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class Game {
    /**
     * Game ID.
     */
    private UUID uuid;

    /**
     * Game board representation.
     */
    private Board board;

    /**
     * List of players in the game.
     */
    private List<Player> players;

    /**
     * Current turn's stone color
     */
    private StoneColor currentTurn;

    /**
     * Current game status
     */
    private GameStatus status;

    /**
     * Number of Captures by Black.
     */
    private int blackCaptures;

    /**
     * Number of Captures by White.
     */
    private int whiteCaptures;
}
