package at.s_sal.tourplaner;

import org.springframework.boot.SpringApplication;

public class TestTourplanerApplication {

	public static void main(String[] args) {
		SpringApplication.from(TourplanerApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
