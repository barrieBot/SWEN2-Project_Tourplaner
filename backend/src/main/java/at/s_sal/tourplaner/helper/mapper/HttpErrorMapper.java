package at.s_sal.tourplaner.helper.mapper;

import at.s_sal.tourplaner.dto.error.ErrorResponse;
import at.s_sal.tourplaner.helper.type.IErrorCodes;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class HttpErrorMapper {

    private final HttpServletRequest request;

    public HttpErrorMapper(HttpServletRequest request) {
        this.request = request;
    }

    public ResponseEntity<ErrorResponse> toErrorResponse(
            IErrorCodes internalError,
            String errorMsg
    ){
        String requestPath = request.getRequestURI();
        HttpStatus status = switch (internalError){
            case INVALID_USER_CREDENTIAL, NO_PERMISSION_TO_ACCESS_RESOURCE -> HttpStatus.UNAUTHORIZED;
            case USER_CREDENTIALS_TAKEN -> HttpStatus.BAD_REQUEST;
            case TOUR_NOT_FOUND, LOG_NOT_FOUND, NO_RESOURCES_FOUND -> HttpStatus.NOT_FOUND;
            case INTERNAL_SERVER_ERROR, EXTERNAL_API_ERROR -> HttpStatus.INTERNAL_SERVER_ERROR;

            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };

        String msg = (errorMsg != null) ? errorMsg : status.getReasonPhrase();
        return ResponseEntity.status(status).body(
                new ErrorResponse(
                        Instant.now(),
                        status.value(),
                        status.getReasonPhrase(),
                        msg,
                        requestPath)
        );
    }


}
