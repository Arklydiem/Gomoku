package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.game.PlayerDto;
import com.gomoku.coreapi.entity.game.GamePlayerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

    @Mapping(target = "uuid", source = "player.uuid")
    @Mapping(target = "userUuid", source = "player.userUuid")
    @Mapping(target = "name", source = "player.name")
    @Mapping(target = "type", source = "player.type")
    @Mapping(target = "color", source = "color")
    PlayerDto entityToDto(GamePlayerEntity entity);
}
