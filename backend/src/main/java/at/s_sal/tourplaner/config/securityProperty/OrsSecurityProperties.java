package at.s_sal.tourplaner.config.securityProperty;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.securityy.ors")
public record OrsSecurityProperties (
        String OrsBaseUrl,
        String orsApiToken
){}
