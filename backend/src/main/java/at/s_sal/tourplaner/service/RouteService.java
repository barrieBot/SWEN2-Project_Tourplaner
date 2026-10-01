package at.s_sal.tourplaner.service;


import at.s_sal.tourplaner.dto.route.RouteRequest;
import at.s_sal.tourplaner.entity.Location;
import at.s_sal.tourplaner.helper.RequestResults;
import at.s_sal.tourplaner.helper.type.IErrorCodes;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@AllArgsConstructor
public class RouteService {

    private final OrsGeoService geoService;
    private final LocationService locationService;

    @Transactional(readOnly = true)
    public RequestResults<?> getRouteData(@Valid RouteRequest routeRequest){

        log.trace("");

        Location startLocation = locationService.retrieveLocationEntity(routeRequest.startLocationId());
        Location endLocation = locationService.retrieveLocationEntity(routeRequest.endLocationId());

        if(startLocation == null || endLocation == null){
            return RequestResults.failure(
                    IErrorCodes.NO_RESOURCES_FOUND,
                    "Supplied location-data inconsistent"
            );
        }

        return geoService.getRoute(
                routeRequest.transportType(),
                startLocation,
                endLocation);

    }
}
