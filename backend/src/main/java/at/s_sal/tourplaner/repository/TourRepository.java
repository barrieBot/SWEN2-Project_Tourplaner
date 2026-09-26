package at.s_sal.tourplaner.repository;

import at.s_sal.tourplaner.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface TourRepository extends JpaRepository<Tour, Long> {


    boolean existsByIdAndUserId(Long tourId, Long userId);
    List<Tour> findAllByUserId(Long userId);
}
