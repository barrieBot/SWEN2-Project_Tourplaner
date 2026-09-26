package at.s_sal.tourplaner.helper;

import at.s_sal.tourplaner.helper.mapper.HttpErrorMapper;
import at.s_sal.tourplaner.helper.type.IErrorCodes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Objects;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

public record RequestResults<T>(
        Optional<T> data,
        Optional<IErrorCodes> error,
        String message
) {
    public RequestResults {
        Objects.requireNonNull(data, "Error: Data missing");
    }

    public static <T> RequestResults<T> success(T data){
        return new RequestResults<>(Optional.ofNullable(data), Optional.empty(), null);
    }

    public static <T> RequestResults<T> emptySuccess(){
        return new RequestResults<>(Optional.empty(), Optional.empty(), null);
    }


    public static <T> RequestResults<T> failure(IErrorCodes statusCode, String message){
        return new RequestResults<>(Optional.empty(), Optional.of(statusCode), message);

    }

    public static <T> RequestResults<T> failure(IErrorCodes statusCode){
        return new RequestResults<>(Optional.empty(), Optional.of(statusCode), null);

    }


    public ResponseEntity<?> toResponseEntity(
            HttpStatus successStatus,
            HttpErrorMapper errorMapper
    ){
        return this.fold(
                response -> response.map(body -> ResponseEntity.status(successStatus).body(body))
                        .orElseGet(() -> ResponseEntity.status(successStatus).build()),
                errorMapper::toErrorResponse);
    }

    public static <T, E extends Exception> RequestResults<T> tryExecute(
            Supplier<T> exe,
            Class<E> exceptionType,
            IErrorCodes internalError,
            String errorMsg
    ){
        try{
            return RequestResults.success(exe.get());
        } catch (Exception e){
            if(exceptionType.isInstance(e)){
                return RequestResults.failure(internalError, errorMsg);
            }
            throw (RuntimeException) e;
        }
    }








    // --- Classic monadic operations ---




    //https://stackoverflow.com/questions/53755902/r-streamr-mapfunction-super-t-extends-r-mapper-stream
    public <R> RequestResults<R> map(
            Function<? super T, ? extends R> mapper
    ){
        return error.<RequestResults<R>>map(
                        iErrorCodes -> RequestResults.failure(iErrorCodes, message))
                .orElseGet(() -> data.<RequestResults<R>>map(t -> RequestResults.success(mapper.apply(t)))
                        .orElseGet(RequestResults::emptySuccess));
    }



    public <R> R fold(
            Function<Optional<T>, R> onSuccess,
            BiFunction<IErrorCodes, String, R> onFailure
    ){
        return error.isPresent() ?
                onFailure.apply(error.get(),message)
                : onSuccess.apply(data);
    }
}
