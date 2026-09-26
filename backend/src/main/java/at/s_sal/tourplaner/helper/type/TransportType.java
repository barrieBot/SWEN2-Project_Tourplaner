package at.s_sal.tourplaner.helper.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransportType {
    DRIVING_CAR("driving_car"),
    DRIVING_HGV("driving_hgv"),
    CYCLING_REGULAR("cycling_regular"),
    CYCLING_MOUNTAIN("cycling_mountain"),
    CYCLING_ROAD("cycling_road"),
    FOOT_HIKING("foot_hiking"),
    FOOT_WALKING("foot_walking"),
    WHEELCHAIR("wheelchair");

    private final String orsProfile;
}
