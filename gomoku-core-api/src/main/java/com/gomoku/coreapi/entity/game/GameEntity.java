package com.gomoku.coreapi.entity.game;

import com.gomoku.coreapi.enums.GameStatus;
import com.gomoku.coreapi.enums.GameType;
import com.gomoku.coreapi.enums.StoneColor;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "games")
@Getter
@Setter
public class GameEntity {

    public GameEntity() {
        this.uuid = UUID.randomUUID();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(
            nullable = false,
            unique = true,
            updatable = false
    )
    @Setter(AccessLevel.NONE)
    private UUID uuid;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GameStatus status;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "game_type",
            nullable = false
    )
    private GameType gameType;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_turn")
    private StoneColor currentTurn;

    @Column(
            name = "black_captures",
            nullable = false
    )
    private int blackCaptures = 0;

    @Column(
            name = "white_captures",
            nullable = false
    )
    private int whiteCaptures = 0;

    @OneToMany(
            mappedBy = "game",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<GamePlayerEntity> gamePlayers = new ArrayList<>();

    @OneToMany(
            mappedBy = "game",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OrderBy("turnNumber ASC")
    private List<GameTurnEntity> turns = new ArrayList<>();

    public void addGamePlayer(final GamePlayerEntity gamePlayer) {
        gamePlayer.setGame(this);
        gamePlayers.add(gamePlayer);
    }

    public void removeGamePlayer(final GamePlayerEntity gamePlayer) {
        gamePlayers.remove(gamePlayer);
        gamePlayer.setGame(null);
    }

    public void addTurn(final GameTurnEntity turn) {
        turn.setGame(this);
        turns.add(turn);
    }

    public void removeTurn(final GameTurnEntity turn) {
        turns.remove(turn);
        turn.setGame(null);
    }
}
