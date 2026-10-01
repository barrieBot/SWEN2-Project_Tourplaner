package at.s_sal.tourplaner.service;


import at.s_sal.tourplaner.dto.location.LocationGeoRequest;
import at.s_sal.tourplaner.dto.location.LocationResponse;
import at.s_sal.tourplaner.entity.Location;
import at.s_sal.tourplaner.entity.UserLocation;
import at.s_sal.tourplaner.helper.RequestResults;
import at.s_sal.tourplaner.helper.mapper.LocationMapper;
import at.s_sal.tourplaner.helper.type.IErrorCodes;
import at.s_sal.tourplaner.repository.LocationRepository;
import at.s_sal.tourplaner.repository.UserLocationRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final UserLocationRepository userLocationRepository;
    private final LocationMapper locationMapper;
    private final OrsGeoService orsGeoService;

    private static final GeometryFactory geoFactory = new GeometryFactory(new PrecisionModel(), 4326);



    public RequestResults<List<LocationResponse>> getUserLocations(
            @NotNull Long userId) {

        log.trace("Locations: User: {}", userId);

        List<LocationResponse> userLocations = userLocationRepository.findAllByUserId(userId).stream()
                .map(UserLocation::getLocation)
                .map(locationMapper::toResponse)
                .toList();

        return RequestResults.success(userLocations);
    }


    @Transactional
    public RequestResults<LocationResponse> getAddressOfLocation(
            @NotNull Long userId,
            @Valid LocationGeoRequest locationGeoRequest) {

        log.trace("Location-Lookup: {}", locationGeoRequest);

        RequestResults<String> addressResult = orsGeoService.getReverseGeoCodingByLocation(locationGeoRequest);
        Point position = makePointFromLocationData(locationGeoRequest);

        return addressResult.data()
                .map(address -> saveNewLocationIfNotExists(address, position))
                .map(savedLocation -> {
                    saveNewUserLocationIfNotExists(userId, savedLocation);
                    return savedLocation;
                })
                .map(locationMapper::toResponse)
                .map(RequestResults::success)
                .orElseGet(() -> RequestResults.failure(
                    addressResult.error()
                            .orElse(IErrorCodes.EXTERNAL_API_ERROR),
                    addressResult.message())
                );

    }


    public RequestResults<List<LocationResponse>> searchForLocations(
            @NotNull Long userId,
            @NotBlank String lookup) {

        log.trace("Address-Lookup: {}", lookup);

        return orsGeoService.getGeoCodeByAddress(lookup);
    }


    @Transactional
    public RequestResults<Void> deleteUserLocation(
            @NotNull Long userId,
            @NotNull Long locationId){

        log.trace("Delete UserLocation: User: {}, Location: {}", userId, locationId);

        if(!userLocationRepository.existsByUserIdAndLocationId(userId, locationId)){
            return RequestResults.failure(IErrorCodes.NO_RESOURCES_FOUND, "User-Location not found");
        }
        userLocationRepository.deleteByUserIdAndLocationId(userId, locationId);
        return RequestResults.emptySuccess();
    }






    public Location retrieveLocationEntity(Long locationId){
        return locationId != null ?
                locationRepository.findById(locationId)
                        .orElse(null)
                : null;
    }


    private Location saveNewLocationIfNotExists(String address, Point position){
        return locationRepository.findByAddress(address)
                .orElseGet(() -> locationRepository.save(
                        Location.builder()
                        .address(address)
                        .position(position)
                        .build())
                );
    }


    private void saveNewUserLocationIfNotExists(Long userId, Location location){
        if(!userLocationRepository.existsByUserIdAndLocationId(userId, location.getId())){
            userLocationRepository.save(
                    UserLocation.builder()
                            .userId(userId)
                            .location(location)
                            .build()
            );
        }
    }

    private Point makePointFromLocationData(@Valid LocationGeoRequest locationGeoRequest) {
        return geoFactory.createPoint(
                new Coordinate(
                        locationGeoRequest.longitude(),
                        locationGeoRequest.latitude()
                )
        );
    }
}
