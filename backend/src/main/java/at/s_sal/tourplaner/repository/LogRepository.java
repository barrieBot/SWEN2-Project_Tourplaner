package at.s_sal.tourplaner.repository;

import at.s_sal.tourplaner.entity.Log;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface LogRepository extends JpaRepository<Log, Long> {
    List<Log> findAllByTourId(@NotNull Long tourId);
    Optional<Log> findByIdAndTourId(Long logID, @NotNull Long tourId);
}
