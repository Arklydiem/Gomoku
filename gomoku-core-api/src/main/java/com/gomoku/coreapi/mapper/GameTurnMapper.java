package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.game.GameTurnDto;
import com.gomoku.coreapi.entity.game.GameTurnEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
        componentModel = "spring",
        uses = MoveMapper.class
)
public interface GameTurnMapper {

    @Mapping(target = "playerUuid", source = "gamePlayer.player.uuid")
    GameTurnDto entityToDto(GameTurnEntity entity);
}
