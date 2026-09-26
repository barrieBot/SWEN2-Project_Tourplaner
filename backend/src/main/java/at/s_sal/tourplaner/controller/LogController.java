package at.s_sal.tourplaner.controller;


import at.s_sal.tourplaner.dto.tourlog.LogPostRequest;
import at.s_sal.tourplaner.dto.tourlog.LogResponse;
import at.s_sal.tourplaner.dto.tourlog.LogUpdateRequest;
import at.s_sal.tourplaner.helper.mapper.HttpErrorMapper;
import at.s_sal.tourplaner.security.TokenHolder;
import at.s_sal.tourplaner.service.LogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tour/{tourId}/logs")
@RequiredArgsConstructor
@Validated
public class LogController {

    private final LogService logService;
    private final HttpErrorMapper errorMapper;


    @GetMapping
    public ResponseEntity<?> getLogsForTour(
            @AuthenticationPrincipal TokenHolder User,
            @PathVariable Long tourId
            ){

        return logService.getLogsForTourByID(User.userID(), tourId).toResponseEntity(
                HttpStatus.OK, errorMapper
        );
    }

    @PostMapping
    public ResponseEntity<?> createLogForTour(
            @AuthenticationPrincipal TokenHolder User,
            @PathVariable Long tourId,
            @Valid @RequestBody LogPostRequest newLog
    ) {


        return logService.createNewLog(User.userID(), tourId, newLog).toResponseEntity(
                HttpStatus.OK, errorMapper);
    }

    ///not sure if I even need this?
    /// Logs always come via List by TourId
    /// Don't think I really need this
    /// Maybe for completeness
    @GetMapping("/{logID}")
    public ResponseEntity<?> getLogByID(
            @AuthenticationPrincipal TokenHolder User,
            @PathVariable Long logID,
            @PathVariable Long tourId
    ){

        return logService.getLogByID(User.userID(), tourId, logID).toResponseEntity(
                HttpStatus.OK, errorMapper);

    }


    @PutMapping("/{logID}")
    public ResponseEntity<?> updateLogByID(
            @AuthenticationPrincipal TokenHolder User,
            @PathVariable Long logID,
            @PathVariable Long tourId,
            @Valid @RequestBody LogUpdateRequest updatedLog
    ){

        return logService.updateLogByID(User.userID(), tourId, logID, updatedLog).toResponseEntity(
                HttpStatus.OK, errorMapper);

    }


    @DeleteMapping("/{logID}")
    public ResponseEntity<?> delLogByID(
            @AuthenticationPrincipal TokenHolder User,
            @PathVariable Long tourId,
            @PathVariable Long logID
    ){
        return logService.deleteLogByID(User.userID(), tourId, logID).toResponseEntity(
                HttpStatus.OK, errorMapper);
    }




}
