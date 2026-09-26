package at.s_sal.tourplaner.dto.tour;

import at.s_sal.tourplaner.entity.TransportType;
import jakarta.validation.constraints.NotBlank;

public record TourPostRequest(
        @NotBlank String name,
        @NotBlank String description,
        @NotBlank TransportType transportType,
        @NotBlank Long startLocationId,
        @NotBlank Long endLocationId
) {}
