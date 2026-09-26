package at.s_sal.tourplaner.helper.mapper;


import at.s_sal.tourplaner.dto.location.LocationGeoRequest;
import at.s_sal.tourplaner.dto.location.LocationResponse;
import at.s_sal.tourplaner.entity.Location;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.PrecisionModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import org.locationtech.jts.geom.Point;


@Mapper(componentModel = "spring")
public interface LocationMapper {


    GeometryFactory GEOMETRY_FACTORY = new GeometryFactory(new PrecisionModel(), 4326);

    @Mapping(target = "latitude", source = "position", qualifiedByName = "getLatFromPoint")
    @Mapping(target = "longitude", source = "position", qualifiedByName = "getLongFromPoint")
    LocationResponse toResponse(Location location);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "address", source = "address")
    @Mapping(target = "position", source = "location", qualifiedByName = "getPointFromCoordinates")
    Location toEntity(LocationGeoRequest location, String address);





    @Named("getLatFromPoint")
    default Double getLatFromPoint(Point point){
        return point != null ? point.getY() : null;
    }

    @Named("getLongFromPoint")
    default Double getLongFromPoint(Point point){
        return point !=null ? point.getX() : null;
    }

    @Named("getPointFromCoordinates")
    default Point getPointFromCoordinates(LocationGeoRequest coordinates){
        if(coordinates == null
                || coordinates.latitude() == null
                || coordinates.longitude() == null){
            return null;
        }

        return GEOMETRY_FACTORY.createPoint(new Coordinate(
                coordinates.longitude(),
                coordinates.latitude()
        ));
    }







}
