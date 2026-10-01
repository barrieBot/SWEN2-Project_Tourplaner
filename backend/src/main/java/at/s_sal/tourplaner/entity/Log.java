package at.s_sal.tourplaner.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;


@Entity
@Table(name = "l_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "l_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "l_t_id", nullable = false)
    private Tour tour;

    @Column(name = "l_timestamp")
    private OffsetDateTime timeStamp;

    @Column(name = "l_comment")
    private String comment;

    @Column(name = "l_difficulty")
    private Integer difficulty;

    @Column(name = "l_rating")
    private Integer rating;

    // private Integer totalDistance;
    // private Integer totalTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "l_geo_id_position")
    private Location location;




}
