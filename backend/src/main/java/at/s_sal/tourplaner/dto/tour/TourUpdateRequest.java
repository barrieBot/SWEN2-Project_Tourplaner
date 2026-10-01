package at.s_sal.tourplaner.dto.tour;

import at.s_sal.tourplaner.helper.type.TransportType;

public record TourUpdateRequest(
        String name,
        String description,
        TransportType transportType,
        Long startLocationId,
        Long endLocationId
) {}
