package at.s_sal.tourplaner.dto.search;

import at.s_sal.tourplaner.dto.tour.TourResponse;
import at.s_sal.tourplaner.dto.tourlog.LogResponse;

import java.util.List;

public record SearchResponse(
        List<TourResponse> tours,
        List<LogResponse> logs
) {}
