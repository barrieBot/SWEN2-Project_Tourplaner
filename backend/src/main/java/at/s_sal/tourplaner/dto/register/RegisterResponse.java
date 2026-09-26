package at.s_sal.tourplaner.dto.register;

public record RegisterResponse(
        Long ID,
        String username,
        String email
) {}
