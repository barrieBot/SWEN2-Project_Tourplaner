package at.s_sal.tourplaner.dto.login;

import at.s_sal.tourplaner.dto.register.UserResponse;

public record LoginResponse(
        String token,
        UserResponse user
) {}
