package at.s_sal.tourplaner.service;

import at.s_sal.tourplaner.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component("tourAccess")
@RequiredArgsConstructor
public class TourAccessManagerService {

    private final TourRepository tourRepository;

    public boolean isOwner(Long userId, Long tourId){

        log.trace("User: {}, Tour: {}", userId, tourId);

        return (tourId == null || userId == null) ? false
                : tourRepository.existsByIdAndUserId(tourId, userId);

    }
}
