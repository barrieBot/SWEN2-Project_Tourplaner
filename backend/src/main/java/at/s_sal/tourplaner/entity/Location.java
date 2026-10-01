package at.s_sal.tourplaner.entity;


import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "geo_locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "geo_id")
    private Long id;

    @Column(name = "geo_address", unique = true)
    private String address;

    @Column(name = "geo_position", nullable = false, columnDefinition = "Geography(Point, 4326)")
    private Point position;

}


