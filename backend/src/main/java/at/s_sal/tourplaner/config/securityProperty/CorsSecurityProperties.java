package at.s_sal.tourplaner.config.securityProperty;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.security.cors")
public record CorsSecurityProperties() {
}


