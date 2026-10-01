package at.s_sal.tourplaner.helper.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransportType {
    DRIVING_CAR("driving-car"),
    DRIVING_HGV("driving-hgv"),
    CYCLING_REGULAR("cycling-regular"),
    CYCLING_MOUNTAIN("cycling-mountain"),
    CYCLING_ROAD("cycling-road"),
    FOOT_HIKING("foot-hiking"),
    FOOT_WALKING("foot-walking"),
    WHEELCHAIR("wheelchair");

    private final String orsProfile;

}
