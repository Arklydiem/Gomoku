package com.gomoku.coreapi.entity.game;

import com.gomoku.coreapi.enums.PlayerType;
import com.gomoku.coreapi.enums.StoneColor;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "game_players")
@Getter
@Setter
public class PlayerEntity {

    public PlayerEntity() {
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

    @Column(name = "user_uuid")
    private UUID userUuid;

    @Column(nullable = false, length = 50)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PlayerType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StoneColor color;
}