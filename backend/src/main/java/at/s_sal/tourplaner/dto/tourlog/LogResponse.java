package at.s_sal.tourplaner.dto.tourlog;

import at.s_sal.tourplaner.dto.location.LocationResponse;
import jakarta.validation.constraints.NotBlank;

import java.time.OffsetDateTime;

public record LogResponse(
        Long id,
        Long tourId,
        OffsetDateTime timeStamp,
        String comment,
        Integer difficulty,
        Integer rating,
        LocationResponse location
) {}
