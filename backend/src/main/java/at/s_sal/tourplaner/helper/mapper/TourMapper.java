package at.s_sal.tourplaner.helper.mapper;

import at.s_sal.tourplaner.dto.tour.TourPostRequest;
import at.s_sal.tourplaner.dto.tour.TourResponse;
import at.s_sal.tourplaner.dto.tour.TourUpdateRequest;
import at.s_sal.tourplaner.entity.Location;
import at.s_sal.tourplaner.entity.Tour;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {LogMapper.class, LocationMapper.class})
public interface TourMapper {

    @Mapping(target = "popularity", ignore = true)
    @Mapping(target = "difficulty", ignore = true)
    TourResponse toResponse(Tour tour);


    @Mapping(target = "popularity", source = "popularity")
    @Mapping(target = "difficulty", source = "difficulty")
    TourResponse toComputedResponse(TourResponse tour, Double popularity, Double difficulty);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", source = "userId")
    @Mapping(target = "startLocation", source = "startLocation")
    @Mapping(target = "endLocation", source = "endLocation")
    @Mapping(target = "orsRouteData", ignore = true)
    @Mapping(target = "estimatedTime", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "logs", ignore = true)
    Tour toEntity(TourPostRequest tourPostRequest, Long userId, Location startLocation, Location endLocation);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "startLocation", source = "startLocation")
    @Mapping(target = "endLocation", source = "endLocation")
    @Mapping(target = "orsRouteData", ignore = true)
    @Mapping(target = "estimatedTime", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "logs", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Tour updateEntity(@MappingTarget Tour tour, TourUpdateRequest updatedTour, Location startLocation, Location endLocation);



}
