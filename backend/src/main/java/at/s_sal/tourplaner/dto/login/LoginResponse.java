package at.s_sal.tourplaner.dto.login;

public record LoginResponse(
        String token,
        String username,
        String email
) {}
