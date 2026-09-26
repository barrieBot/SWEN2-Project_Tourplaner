package at.s_sal.tourplaner.dto.location;

import jakarta.validation.constraints.NotNull;

public record LocationGeoRequest(
        @NotNull Double latitude,
        @NotNull Double longitude
) {}
