package com.gomoku.coreapi.entity.game;

import com.gomoku.coreapi.model.MoveModel;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "game_turns")
@Getter
@Setter
public class GameTurnEntity {

    public GameTurnEntity() {
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

    @Column(
            name = "turn_number",
            nullable = false
    )
    private int turnNumber;

    @Column(
            name = "player_uuid",
            nullable = false
    )
    private UUID playerUuid;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name = "x",
                    column = @Column(name = "suggested_x")
            ),
            @AttributeOverride(
                    name = "y",
                    column = @Column(name = "suggested_y")
            )
    })
    private MoveModel suggestedMove;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name = "x",
                    column = @Column(name = "played_x")
            ),
            @AttributeOverride(
                    name = "y",
                    column = @Column(name = "played_y")
            )
    })
    private MoveModel playedMove;

    @Column(name = "ai_computation_time_ms")
    private Long aiComputationTimeMs;
}