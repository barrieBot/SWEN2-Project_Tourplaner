
package at.s_sal.tourplaner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan("at.s_sal.tourplaner.config.securityProperty")
public class TourplanerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TourplanerApplication.class, args);
	}

}
