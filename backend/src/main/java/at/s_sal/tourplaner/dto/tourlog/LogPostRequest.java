package at.s_sal.tourplaner.dto.tourlog;

public record LogPostRequest(
        String comment,
        Integer difficulty,
        Integer rating,
        Long locationId
) {
}
