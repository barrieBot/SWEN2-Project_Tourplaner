package at.s_sal.tourplaner.dto.register;

public record UserResponse(
        Long ID,
        String username,
        String email
) {}
