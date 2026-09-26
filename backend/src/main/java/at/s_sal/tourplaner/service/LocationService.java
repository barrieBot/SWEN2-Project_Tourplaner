package at.s_sal.tourplaner.service;


import at.s_sal.tourplaner.dto.location.LocationGeoRequest;
import at.s_sal.tourplaner.dto.location.LocationResponse;
import at.s_sal.tourplaner.entity.Location;
import at.s_sal.tourplaner.helper.RequestResults;
import at.s_sal.tourplaner.repository.LocationRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    public Location retrieveLocationEntity(Long locationId){
        return locationId != null ?
                locationRepository.findById(locationId)
                        .orElse(null)
                : null;
    }


    public RequestResults<List<LocationResponse>> getUserLocations(
            @NotNull Long userId) {


        return RequestResults.emptySuccess();
    }


    public RequestResults<LocationResponse> getAddressOfLocation(
            @NotNull Long userId,
            @Valid LocationGeoRequest locationGeoRequest) {


        return RequestResults.emptySuccess();
    }

    public RequestResults<LocationResponse> searchForLocations(@NotBlank Long aLong, @NotBlank String lookup) {

        return RequestResults.emptySuccess();
    }
}
