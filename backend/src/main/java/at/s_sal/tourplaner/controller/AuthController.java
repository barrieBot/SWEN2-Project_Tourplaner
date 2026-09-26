package at.s_sal.tourplaner.controller;

import at.s_sal.tourplaner.dto.login.LoginRequest;
import at.s_sal.tourplaner.dto.register.RegisterRequest;
import at.s_sal.tourplaner.helper.mapper.HttpErrorMapper;
import at.s_sal.tourplaner.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final HttpErrorMapper errorMapper;

    public AuthController(AuthService authService, HttpErrorMapper errorMapper) {
        this.authService = authService;
        this.errorMapper = errorMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest registerCredentials
    ){

        return authService.registerUser(registerCredentials).toResponseEntity(
                HttpStatus.CREATED,
                errorMapper
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest loginCredentials){

        return authService.loginUser(loginCredentials).toResponseEntity(
                HttpStatus.ACCEPTED,
                errorMapper
        );
    }

}
