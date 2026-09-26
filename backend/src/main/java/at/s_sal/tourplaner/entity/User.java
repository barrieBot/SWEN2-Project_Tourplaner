package at.s_sal.tourplaner.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "u_users")
@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "u_ID")
    private Long id;

    @Column(name = "u_username", unique = true, nullable = false)
    private String username;

    @Column(name = "u_email", unique = true, nullable = false)
    private String email;

    @Column(name = "u_pwd", nullable = false)
    private String password;

    @Column(name = "u_created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

}
