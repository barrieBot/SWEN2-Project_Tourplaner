package at.s_sal.tourplaner.ors.dto;

import java.util.List;

public record ORSDirectionResponse(
        List<ORSRoute> routes
) {
}
