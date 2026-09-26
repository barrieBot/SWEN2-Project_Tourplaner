package at.s_sal.tourplaner.dto.tourlog;

public record LogUpdateRequest(
        String comment,
        Integer difficulty,
        Integer rating,
        Long locationId
) {}
