package at.s_sal.tourplaner.dto.tour;

import at.s_sal.tourplaner.helper.type.TransportType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TourPostRequest(
        @NotBlank String name,
        @NotBlank String description,
        @NotNull TransportType transportType,
        @NotNull Long startLocationId,
        @NotNull Long endLocationId
) {}
