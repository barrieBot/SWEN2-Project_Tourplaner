package at.s_sal.tourplaner.dto.location;

public record LocationResponse(
        Long id,
        String address,
        Double latitude,
        Double longitude
) {
}
