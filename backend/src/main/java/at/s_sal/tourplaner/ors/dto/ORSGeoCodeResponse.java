package at.s_sal.tourplaner.ors.dto;

import java.util.List;

public record ORSGeoCodeResponse (
        List<ORSFeature> features
){}


