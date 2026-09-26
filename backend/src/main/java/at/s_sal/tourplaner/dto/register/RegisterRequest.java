package at.s_sal.tourplaner.dto.register;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;


public record RegisterRequest(
        @NotBlank
        @Pattern(regexp = "^[^@]+$", message = "Username cannot contain an @ symbol")
        String username,
        @NotBlank
        @Email
        String email,
        @NotBlank
        String password
) {}
