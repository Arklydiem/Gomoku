package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.game.GameTurnDto;
import com.gomoku.coreapi.entity.game.GameTurnEntity;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        uses = MoveMapper.class
)
public interface GameTurnMapper {

    GameTurnDto entityToDto(GameTurnEntity entity);
}
