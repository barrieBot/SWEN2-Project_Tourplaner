package at.s_sal.tourplaner.repository;

import at.s_sal.tourplaner.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    boolean existsByUsernameOrEmail(String username, String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    boolean existsByEmail(@NotBlank @Email String email);
}
