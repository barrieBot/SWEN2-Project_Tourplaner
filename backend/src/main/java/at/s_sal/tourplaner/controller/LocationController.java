package at.s_sal.tourplaner.controller;


import at.s_sal.tourplaner.dto.location.LocationGeoRequest;
import at.s_sal.tourplaner.helper.mapper.HttpErrorMapper;
import at.s_sal.tourplaner.security.TokenHolder;
import at.s_sal.tourplaner.service.LocationService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/locations")
@Validated
public class LocationController {

    private final LocationService locationService;
    private final HttpErrorMapper errorMapper;

    public LocationController(LocationService locationService, HttpErrorMapper errorMapper) {
        this.locationService = locationService;
        this.errorMapper = errorMapper;
    }

    @GetMapping
    public ResponseEntity<?> getUserLocations(
            @AuthenticationPrincipal TokenHolder user
            ){

        return locationService.getUserLocations(user.userID()).toResponseEntity(
                HttpStatus.OK, errorMapper
        );
    }

    @PostMapping
    public ResponseEntity<?> getAddressForGEO(
            @AuthenticationPrincipal TokenHolder user,
            @Valid @RequestBody LocationGeoRequest locationGeoRequest
            ){

        return locationService.getAddressOfLocation(user.userID(), locationGeoRequest).toResponseEntity(
                HttpStatus.OK, errorMapper
        );

    }

    @GetMapping("/search")
    public ResponseEntity<?> getAddressLookup(
            @AuthenticationPrincipal TokenHolder user,
            @RequestParam @NotBlank String lookup
    ){

        return locationService.searchForLocations(user.userID(), lookup).toResponseEntity(
                HttpStatus.OK, errorMapper
        );


    }

}
