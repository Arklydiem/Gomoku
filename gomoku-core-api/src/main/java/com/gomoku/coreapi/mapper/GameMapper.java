package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.GameDto;
import com.gomoku.coreapi.model.Game;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GameMapper {

    GameDto entityToDto(Game entity);

    Game dtoToEntity(GameDto dto);
}
