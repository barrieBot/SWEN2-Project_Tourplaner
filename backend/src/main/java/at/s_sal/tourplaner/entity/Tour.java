package at.s_sal.tourplaner.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;


@Builder
@Entity
@Table(name = "t_tours")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "t_ID")
    private Long id;

    @Column(name = "t_u_id_owner", nullable = false)
    private Long userId;

    @Column(name = "t_name", nullable = false)
    private String name;

    @Column(name = "t_descr")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "t_transport_type", nullable = false)
    private TransportType transportType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "t_geo_id_start")
    private Location startLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "t_geo_id_end")
    private Location endLocation;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "t_ors_routedata")
    private String orsRouteData;

    @Column(name = "t_distance")
    private Integer distance;

    @Column(name = "t_estimated_time")
    private Duration estimatedTime;

    @Column(name = "t_created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Log> logs = new ArrayList<>();


}
