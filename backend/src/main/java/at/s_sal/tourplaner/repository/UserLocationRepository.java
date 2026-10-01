package at.s_sal.tourplaner.repository;

import at.s_sal.tourplaner.entity.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLocationRepository extends JpaRepository<UserLocation, Long> {

    List<UserLocation> findAllByUserId(Long userId);

    boolean existsByUserIdAndLocationId(Long userId, Long locationId);
    void deleteByUserIdAndLocationId(Long userId, Long locationId);
}
