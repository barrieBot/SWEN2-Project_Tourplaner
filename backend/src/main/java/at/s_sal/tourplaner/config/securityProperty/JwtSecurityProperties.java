package at.s_sal.tourplaner.config.securityProperty;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix =  "app.security.jwt")
public record JwtSecurityProperties(
        String jwtSecret,
        Long jwtExpirationMS
) {}
