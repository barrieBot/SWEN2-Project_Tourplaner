package at.s_sal.tourplaner.dto.route;

import at.s_sal.tourplaner.helper.type.TransportType;
import jakarta.validation.constraints.NotNull;

public record RouteRequest(
        TransportType transportType,
        @NotNull Long startLocationId,
        @NotNull Long endLocationId
) {}
