package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.UserDto;
import com.gomoku.coreapi.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(UserEntity userEntity);
}