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
