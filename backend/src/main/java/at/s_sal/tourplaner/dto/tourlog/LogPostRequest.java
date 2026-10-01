package at.s_sal.tourplaner.dto.tourlog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LogPostRequest(
        @NotBlank String comment,
        @NotNull Integer difficulty,
        @NotNull Integer rating,
        Long locationId
) {}
