package at.s_sal.tourplaner.service;

import at.s_sal.tourplaner.dto.location.LocationResponse;
import at.s_sal.tourplaner.dto.tour.TourPostRequest;
import at.s_sal.tourplaner.dto.tour.TourResponse;
import at.s_sal.tourplaner.dto.tour.TourUpdateRequest;
import at.s_sal.tourplaner.entity.Location;
import at.s_sal.tourplaner.entity.Tour;
import at.s_sal.tourplaner.helper.RequestResults;
import at.s_sal.tourplaner.helper.mapper.TourMapper;
import at.s_sal.tourplaner.helper.type.IErrorCodes;
import at.s_sal.tourplaner.repository.LocationRepository;
import at.s_sal.tourplaner.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository tourRepository;
    private  final TourMapper tourMapper;
    private final LocationService locationService;

    public RequestResults<List<TourResponse>> getUserTours(Long userId) {

        List<TourResponse> userTours = tourRepository.findAllByUserId(userId).stream()
                .map(tourMapper::toResponse)
                .toList();

        return userTours.isEmpty() ?
                RequestResults.failure(IErrorCodes.NO_RESOURCES_FOUND, "No tours found for user")
                :RequestResults.success(userTours);
    }

    public RequestResults<TourResponse> createNewTour(Long userId, TourPostRequest newTour) {

        Location startLocation = locationService.retrieveLocationEntity(newTour.startLocationId());
        Location endLocation = locationService.retrieveLocationEntity(newTour.endLocationId());

        Tour entity = tourMapper.toEntity(
                newTour,
                userId,
                startLocation,
                endLocation
        );
        Tour savedTour = tourRepository.save(entity);
        return RequestResults.success(tourMapper.toResponse(savedTour));

    }


    @PreAuthorize("@tourAccess.isOwner(#userId, #tourId)")
    public RequestResults<TourResponse> getTourByID(Long userId, Long tourId) {
        return tourRepository.findById(tourId)
                .map(tourMapper::toResponse)
                .map(RequestResults::success)
                .orElseGet(() -> RequestResults.failure(
                        IErrorCodes.TOUR_NOT_FOUND
                ));
    }

    @PreAuthorize("@tourAccess.isOwner(#userId, #tourId)")
    public RequestResults<TourResponse> updateTour(Long userId, Long tourId, TourUpdateRequest updatedTour) {

        Location startLocation = locationService.retrieveLocationEntity(updatedTour.startLocationId());
        Location endLocation = locationService.retrieveLocationEntity(updatedTour.endLocationId());

        return tourRepository.findById(tourId)
                .map(oldTour -> {
                    Tour tour = tourMapper.updateEntity(oldTour,  updatedTour, null, null);
                    return tourRepository.save(tour);
                })
                .map(tourMapper::toResponse)
                .map(RequestResults::success)
                .orElseGet(() ->
                        RequestResults.failure(
                                IErrorCodes.TOUR_NOT_FOUND,
                                "Failed to locate/update tour"
                        )
                );
    }


    @PreAuthorize("@tourAccess.isOwner(#userId, #tourId)")
    public RequestResults<?> deleteTour(Long userId, Long tourId) {

        return tourRepository.findById(tourId)
                .map(tour -> {
                    tourRepository.delete(tour);
                    return RequestResults.emptySuccess();
                })
                .orElseGet(() ->
                        RequestResults.failure(
                                IErrorCodes.TOUR_NOT_FOUND,
                                "Failed to locate/delete Tour"
                        )
                );
    }



}
