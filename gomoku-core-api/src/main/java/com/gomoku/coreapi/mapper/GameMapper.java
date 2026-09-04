package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.game.GameDto;
import com.gomoku.coreapi.entity.game.GameEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
		componentModel = "spring",
		uses = {
				PlayerMapper.class,
				GameTurnMapper.class
		}
)
public interface GameMapper {

	@Mapping(target = "createdByUserUuid", source = "createdBy.uuid")
	@Mapping(target = "players", source = "gamePlayers")
	GameDto entityToDto(GameEntity entity);
}
