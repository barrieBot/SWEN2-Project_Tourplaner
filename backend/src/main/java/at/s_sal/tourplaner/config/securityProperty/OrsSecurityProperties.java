package at.s_sal.tourplaner.config.securityProperty;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.security.ors")
public record OrsSecurityProperties (
        String orsBaseUrl,
        String orsApiToken
){}
