package at.s_sal.tourplaner.controller;


import at.s_sal.tourplaner.dto.location.LocationGeoRequest;
import at.s_sal.tourplaner.dto.route.RouteRequest;
import at.s_sal.tourplaner.helper.mapper.HttpErrorMapper;
import at.s_sal.tourplaner.service.OrsGeoService;
import at.s_sal.tourplaner.service.RouteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/route")
@Validated
@AllArgsConstructor
public class RouteController {

    private final RouteService routeService;
    private final HttpErrorMapper errorMapper;

    @PostMapping
    public ResponseEntity<?> register(
            @Valid @RequestBody RouteRequest routeData){

        return routeService.getRouteData(routeData).toResponseEntity(
                HttpStatus.OK,
                errorMapper
        );
    }

}
