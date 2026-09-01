package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.MoveDto;
import com.gomoku.coreapi.model.MoveModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MoveMapper {

    MoveDto modelToDto(MoveModel model);

    MoveModel dtoToModel(MoveDto dto);
}