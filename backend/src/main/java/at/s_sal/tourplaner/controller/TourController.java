package at.s_sal.tourplaner.controller;


import at.s_sal.tourplaner.dto.tour.TourPostRequest;
import at.s_sal.tourplaner.dto.tour.TourResponse;
import at.s_sal.tourplaner.dto.tour.TourUpdateRequest;
import at.s_sal.tourplaner.helper.mapper.HttpErrorMapper;
import at.s_sal.tourplaner.security.TokenHolder;
import at.s_sal.tourplaner.service.TourService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    private final TourService tourService;
    private final HttpErrorMapper errorMapper;

    public TourController(TourService tourService, HttpErrorMapper errorMapper) {
        this.tourService = tourService;
        this.errorMapper = errorMapper;
    }


    @GetMapping
    public ResponseEntity<?> getAllTours(
            @AuthenticationPrincipal TokenHolder user
    ){
        return tourService.getUserTours(user.userID()).toResponseEntity(
                HttpStatus.OK, errorMapper);
    }

    @PostMapping
    public ResponseEntity<?> createTour(
            @AuthenticationPrincipal TokenHolder user,
            @Valid @RequestBody TourPostRequest newTour){
        return tourService.createNewTour(user.userID(), newTour).toResponseEntity(
                HttpStatus.CREATED, errorMapper);
    }


    @GetMapping("/{tourID}")
    public ResponseEntity<?> getTourByID(
            @AuthenticationPrincipal TokenHolder user,
            @PathVariable Long tourID){
        return tourService.getTourByID(user.userID(), tourID).toResponseEntity(
                HttpStatus.OK, errorMapper);
    }


    @PutMapping("/{tourID}")
    public ResponseEntity<?> updateTourByID(
            @AuthenticationPrincipal TokenHolder user,
            @PathVariable Long tourID,
            @Valid @RequestBody TourUpdateRequest updatedTour){
        return tourService.updateTour(user.userID(), tourID, updatedTour).toResponseEntity(
                HttpStatus.OK, errorMapper);
    }

    @DeleteMapping("/{tourID}")
    public ResponseEntity<?> deleteTourByID(
            @AuthenticationPrincipal TokenHolder user,
            @PathVariable Long tourID){
        return tourService.deleteTour(user.userID(), tourID).toResponseEntity(
                HttpStatus.OK, errorMapper);
    }



}

