package at.s_sal.tourplaner.helper.mapper;


import at.s_sal.tourplaner.dto.tourlog.LogPostRequest;
import at.s_sal.tourplaner.dto.tourlog.LogResponse;
import at.s_sal.tourplaner.dto.tourlog.LogUpdateRequest;
import at.s_sal.tourplaner.entity.Location;
import at.s_sal.tourplaner.entity.Log;
import at.s_sal.tourplaner.entity.Tour;
import org.mapstruct.*;
import org.springframework.data.jpa.repository.Modifying;

@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface LogMapper {


    @Mapping(target = "tourId", source = "tour.id")
    LogResponse toResponse(Log log);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tour", source = "tour")
    @Mapping(target = "location", source = "location")
    @Mapping(target = "timeStamp", ignore = true)
    @Mapping(target = "comment", source = "log.comment")
    @Mapping(target = "difficulty", source = "log.difficulty")
    @Mapping(target = "rating", source = "log.rating")
    Log toEntity(LogPostRequest log, Tour tour, Location location);



    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tour", ignore = true)
    @Mapping(target = "timeStamp", ignore = true)
    @Mapping(target = "location", source = "location")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Log updateEntity(@MappingTarget Log log, LogUpdateRequest updatedLog, Location location);



}
