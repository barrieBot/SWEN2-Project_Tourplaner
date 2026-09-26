package at.s_sal.tourplaner.service;


import at.s_sal.tourplaner.config.securityProperty.JwtSecurityProperties;
import at.s_sal.tourplaner.config.securityProperty.OrsSecurityProperties;
import at.s_sal.tourplaner.dto.location.LocationGeoRequest;
import at.s_sal.tourplaner.entity.Location;
import at.s_sal.tourplaner.helper.RequestResults;
import at.s_sal.tourplaner.helper.type.IErrorCodes;
import at.s_sal.tourplaner.helper.type.TransportType;
import at.s_sal.tourplaner.ors.dto.ORSDirectionRequest;
import at.s_sal.tourplaner.ors.dto.ORSDirectionResponse;
import at.s_sal.tourplaner.ors.dto.ORSGeoCodeResponse;
import at.s_sal.tourplaner.ors.dto.ORSRoute;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.awt.geom.RectangularShape;
import java.util.List;
import java.util.Map;

@Service
public class OrsGeoService {

    private final RestClient restClient;

    //https://openrouteservice.org/dev/#/api-docs

    public OrsGeoService(RestClient.Builder restClientBuilder, OrsSecurityProperties orsProperties) {
        this.restClient = restClientBuilder
                .baseUrl(orsProperties.OrsBaseUrl())
                .defaultHeader("Authorization", orsProperties.orsApiToken())
                .build();
    }

    public RequestResults<ORSRoute> getRoute(
            TransportType transportType,
            Location startLocation,
            Location endLocation){

        return RequestResults.tryExecute(
                () -> {
                    String transportProfile = transportType.getOrsProfile();
                    String path = "/v2/directions/" + transportProfile + "/json";

                    ORSDirectionRequest orsDirectionRequest = makeORSDirectionRequest(startLocation, endLocation);
                    ORSDirectionResponse orsDirectionResponse = executeOrsRequestPOST(path, orsDirectionRequest);

                    if(orsDirectionResponse != null && !orsDirectionResponse.routes().isEmpty()){
                        return orsDirectionResponse.routes().getFirst();
                    }

                    return null;
                },
                Exception.class,
                IErrorCodes.EXTERNAL_API_ERROR,
                "ORS-Request failed"
        );
    }



    public RequestResults<?> getGeoCodingForLocation(
            LocationGeoRequest geoRequest){

        return RequestResults.tryExecute(
                () -> {

                    String path = "/v2/dir";

                    ORSDirectionRequest orsDirectionRequest = makeORSDirectionRequest(startLocation, endLocation);
                    ORSDirectionResponse orsDirectionResponse = executeOrsRequestPOST(path, orsDirectionRequest);

                    if(orsDirectionResponse != null && !orsDirectionResponse.routes().isEmpty()){
                        return orsDirectionResponse.routes().getFirst();
                    }

                    return null;
                },
                Exception.class,
                IErrorCodes.EXTERNAL_API_ERROR,
                "ORS-Request failed"
        );
    }

    public RequestResults<?> getReverseGeoCodingForAddress(
            String address) {

        return RequestResults.tryExecute(
                () -> {

                    Map<String, String> qParams = Map.of("text", address);
                    String path = "/geocode/search";

                    ORSGeoCodeResponse orsGeoCodeResponse = executeOrsRequestGET(path, qParams, ORSGeoCodeResponse.class);

                    if(orsGeoCodeResponse == null && orsGeoCodeResponse.features() == null){
                        return List.of();
                    }

                    return orsGeoCodeResponse.features().stream()

                },
                Exception.class,
                IErrorCodes.EXTERNAL_API_ERROR,
                "ORS-Request failed"
        );
    }




    private ORSDirectionRequest makeORSDirectionRequest(Location start, Location end){
        return new ORSDirectionRequest(
                List.of(
                    List.of(start.getPosition().getX(),
                        start.getPosition().getY()),
                    List.of(end.getPosition().getX(),
                        end.getPosition().getY())
                ));
    }



    private <T> T executeOrsRequestGET(String apiEndpoint, Map<String, String> queryParams, Class<T> returnType){
        return restClient.get()
                .uri(uriBuilder -> {
                            uriBuilder.path(apiEndpoint);
                            if(queryParams != null){
                                queryParams.forEach(uriBuilder::queryParam);
                            }
                            return uriBuilder.build();
                        }
                )
                .retrieve()
                .body(returnType);
    }

    private ORSDirectionResponse executeOrsRequestPOST(String apiEndpoint, ORSDirectionRequest orsRequests){
        return restClient.post()
                .uri(apiEndpoint)
                .body(orsRequests)
                .retrieve()
                .body(ORSDirectionResponse.class);
    }

}
