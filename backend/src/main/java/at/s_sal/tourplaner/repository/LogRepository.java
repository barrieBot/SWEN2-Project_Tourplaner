package at.s_sal.tourplaner.repository;

import at.s_sal.tourplaner.entity.Log;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LogRepository extends JpaRepository<Log, Long> {
    List<Log> findAllByTourId(@NotNull Long tourId);
    Optional<Log> findByIdAndTourId(Long logId, @NotNull Long tourId);

    @Query("SELECT AVG(l.rating) FROM Log l WHERE l.tour.id = :tourId")
    Double findAveragePopularityByTourId(@Param("tourId") Long id);

    @Query("SELECT AVG(l.difficulty) FROM Log l WHERE l.tour.id = :tourId")
    Double findAverageDifficultyByTourId(@Param("tourId") Long id);
}
