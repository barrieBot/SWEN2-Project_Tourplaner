package at.s_sal.tourplaner.repository;

import at.s_sal.tourplaner.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
