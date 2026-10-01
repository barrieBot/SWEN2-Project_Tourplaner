package at.s_sal.tourplaner.repository;

import at.s_sal.tourplaner.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {

    Optional<Location> findByAddress(String address);

}
