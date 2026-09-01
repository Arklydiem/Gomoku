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
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(
            name = "game_id",
            nullable = false
    )
    private List<PlayerEntity> players =
            new ArrayList<>();


    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(
            name = "game_id",
            nullable = false
    )
    @OrderBy("turnNumber ASC")
    private List<GameTurnEntity> turns =
            new ArrayList<>();
}