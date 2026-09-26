package at.s_sal.tourplaner.service;


import at.s_sal.tourplaner.dto.tourlog.LogPostRequest;
import at.s_sal.tourplaner.dto.tourlog.LogResponse;
import at.s_sal.tourplaner.dto.tourlog.LogUpdateRequest;
import at.s_sal.tourplaner.entity.Location;
import at.s_sal.tourplaner.entity.Log;
import at.s_sal.tourplaner.helper.RequestResults;
import at.s_sal.tourplaner.helper.mapper.LogMapper;
import at.s_sal.tourplaner.helper.type.IErrorCodes;
import at.s_sal.tourplaner.repository.LogRepository;
import at.s_sal.tourplaner.repository.TourRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogService {

    private final TourRepository tourRepository;
    private final LogRepository logRepository;
    private final LogMapper logMapper;
    private final LocationService locationService;



    @PreAuthorize("@tourAccess.isOwner(#userId, #tourId)")
    public RequestResults<?> getLogsForTourByID(
            @NotNull Long userId,
            @NotNull Long tourId) {

        return RequestResults.success(
                logRepository.findAllByTourId(tourId).stream()
                        .map(logMapper::toResponse)
                        .toList()
        );
    }


    @PreAuthorize("@tourAccess.isOwner(#userId, #tourId)")
    public RequestResults<LogResponse> createNewLog(
            @NotNull Long userId,
            @NotNull Long tourId,
            @Valid LogPostRequest newLog) {

        return tourRepository.findById(tourId)
                .map(tour -> {
                    Location location = locationService.retrieveLocationEntity(newLog.locationId());
                    Log entity = logMapper.toEntity(newLog, tour, location);
                    return logRepository.save(entity);
                })
                .map(logMapper::toResponse)
                .map(RequestResults::success)
                .orElseGet(() -> RequestResults.failure(
                        IErrorCodes.TOUR_NOT_FOUND
                ));
    }


    @PreAuthorize("@tourAccess.isOwner(#userId, #tourId)")
    public RequestResults<LogResponse> getLogByID(
            @NotNull Long userId,
            @NotNull Long tourId,
            Long logID) {

        return logRepository.findByIdAndTourId(logID, tourId)
                .map(logMapper::toResponse)
                .map(RequestResults::success)
                .orElseGet(() -> RequestResults.failure(
                        IErrorCodes.LOG_NOT_FOUND
                ));
    }


    @PreAuthorize("@tourAccess.isOwner(#userId, #tourId)")
    public RequestResults<LogResponse> updateLogByID(
            @NotNull Long userId,
            @NotNull Long tourId,
            Long logID,
            @Valid LogUpdateRequest updatedLog) {

        Location location = locationService.retrieveLocationEntity(updatedLog.locationId());

        return logRepository.findByIdAndTourId(logID, tourId)
                .map(existingLog -> {
                    logMapper.updateEntity(
                            existingLog,
                            updatedLog,
                            location);
                    return logRepository.save(existingLog);
                })
                .map(logMapper::toResponse)
                .map(RequestResults::success)
                .orElseGet(() -> RequestResults.failure(
                        IErrorCodes.LOG_NOT_FOUND
                ));
    }



    @PreAuthorize("@tourAccess.isOwner(#userId, #tourId)")
    public RequestResults<?> deleteLogByID(
            @NotNull Long userId,
            @NotNull Long tourId,
            Long logID) {

        return logRepository.findByIdAndTourId(logID, tourId)
                .map(log -> {
                    logRepository.delete(log);
                    return RequestResults.emptySuccess();
                })
                .orElseGet(() -> RequestResults.failure(
                        IErrorCodes.LOG_NOT_FOUND
                ));
    }
}
