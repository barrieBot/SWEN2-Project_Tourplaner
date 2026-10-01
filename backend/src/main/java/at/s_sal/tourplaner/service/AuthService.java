package at.s_sal.tourplaner.service;


import at.s_sal.tourplaner.dto.login.LoginRequest;
import at.s_sal.tourplaner.dto.login.LoginResponse;
import at.s_sal.tourplaner.dto.register.RegisterRequest;
import at.s_sal.tourplaner.dto.register.UserResponse;
import at.s_sal.tourplaner.entity.User;
import at.s_sal.tourplaner.helper.RequestResults;
import at.s_sal.tourplaner.helper.type.IErrorCodes;
import at.s_sal.tourplaner.repository.UserRepository;
import at.s_sal.tourplaner.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public RequestResults<UserResponse> registerUser(RegisterRequest registerRequest){

        log.trace("Registration: {}", registerRequest.username());

        boolean usernameExists = userRepository.existsByUsername(registerRequest.username());
        boolean emailExists = userRepository.existsByEmail(registerRequest.email());

        if(usernameExists && emailExists){
            return RequestResults.failure(IErrorCodes.USER_CREDENTIALS_TAKEN,
                    "Username and Email already taken.");
        } else if (usernameExists) {
            return RequestResults.failure(IErrorCodes.USER_CREDENTIALS_TAKEN,
                    "Username already taken.");
        } else if (emailExists) {
            return RequestResults.failure(IErrorCodes.USER_CREDENTIALS_TAKEN,
                    "Email already taken.");
        }

        String encodedPWD = passwordEncoder.encode(registerRequest.password());

        User newUser = User.builder()
                .username(registerRequest.username())
                .email(registerRequest.email())
                .password(encodedPWD)
                .build();

        return RequestResults.tryExecute(
                () -> userRepository.save(newUser),
                DataIntegrityViolationException.class,
                IErrorCodes.USER_CREDENTIALS_TAKEN,
                "Failed to register User: email/username taken"
        ).map(savedUser -> new UserResponse(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail()
        ));
    }



    public RequestResults<LoginResponse> loginUser(LoginRequest loginRequest){

        log.trace("Login: {}", loginRequest.username());

        Optional<User> registeredUser = userRepository.findByUsernameOrEmail(
                loginRequest.username(),
                loginRequest.username()
        );

        return registeredUser
                .filter(userEntity ->
                        passwordEncoder.matches(
                                loginRequest.password(),
                                userEntity.getPassword()
                        ))
                .map(userEntity ->
                        RequestResults.success(
                            new LoginResponse(
                                    jwtService.generateToken(userEntity),
                                    new UserResponse(userEntity.getId(),
                                            userEntity.getUsername(),
                                            userEntity.getEmail()
                                    )
                            )))
                .orElseGet(() ->
                        RequestResults.failure(
                            IErrorCodes.INVALID_USER_CREDENTIAL,
                            "Login-credentials incorrect"
                        ));
    }

}
