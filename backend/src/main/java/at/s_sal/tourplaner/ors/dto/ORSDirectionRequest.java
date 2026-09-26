package at.s_sal.tourplaner.ors.dto;

import java.util.List;

public record ORSDirectionRequest(
        List<List<Double>> coordinates
) {
}
