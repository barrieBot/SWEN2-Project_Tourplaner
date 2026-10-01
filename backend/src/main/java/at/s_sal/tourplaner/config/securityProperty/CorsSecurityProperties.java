package at.s_sal.tourplaner.config.securityProperty;


import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "app.security.cors")
public record CorsSecurityProperties(
        List<String> corsAllowedOrigins
) {
}


