package at.s_sal.tourplaner.ors.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record ORSDirectionRequest(
        List<List<Double>> coordinates
) {
}
