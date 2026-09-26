package at.s_sal.tourplaner.service;

import at.s_sal.tourplaner.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("tourAccess")
@RequiredArgsConstructor
public class TourAccessManagerService {

    private final TourRepository tourRepository;

    public boolean isOwner(Long userId, Long tourId){
        return (tourId == null || userId == null) ? false
                : tourRepository.existsByIdAndUserId(tourId, userId);

    }
}
