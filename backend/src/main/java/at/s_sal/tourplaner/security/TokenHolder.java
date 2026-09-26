package at.s_sal.tourplaner.security;

import jakarta.validation.constraints.NotBlank;

public record TokenHolder(
        @NotBlank Long userID,
        @NotBlank String userEmail
) {}
