package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.game.GameDto;
import com.gomoku.coreapi.entity.game.GameEntity;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        uses = {
                PlayerMapper.class,
                GameTurnMapper.class
        }
)
public interface GameMapper {

    GameDto entityToDto(GameEntity entity);
}
