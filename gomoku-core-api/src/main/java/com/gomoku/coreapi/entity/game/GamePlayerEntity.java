package com.gomoku.coreapi.entity.game;

import com.gomoku.coreapi.enums.StoneColor;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
        name = "game_players",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_game_players_game_color",
                        columnNames = {"game_id", "color"}
                )
        }
)
@Getter
@Setter
public class GamePlayerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "game_id", nullable = false)
    private GameEntity game;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private PlayerEntity player;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StoneColor color;
}
