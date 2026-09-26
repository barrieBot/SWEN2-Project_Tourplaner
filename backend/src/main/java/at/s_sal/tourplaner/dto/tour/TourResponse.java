package at.s_sal.tourplaner.dto.tour;

import at.s_sal.tourplaner.dto.location.LocationResponse;
import at.s_sal.tourplaner.dto.tourlog.LogResponse;
import at.s_sal.tourplaner.helper.type.TransportType;

import java.time.Duration;
import java.util.List;

public record TourResponse(
        Long id,
        String name,
        String description,
        TransportType transportType,
        LocationResponse startLocation,
        LocationResponse endLocation,
        Integer distance,
        Duration estimatedTime,
        Double popularity,
        Double childFriendliness,
        List<LogResponse> logs
) {}
