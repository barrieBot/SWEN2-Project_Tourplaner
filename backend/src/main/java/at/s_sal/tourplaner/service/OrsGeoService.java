package at.s_sal.tourplaner.service;


import at.s_sal.tourplaner.config.securityProperty.OrsSecurityProperties;
import at.s_sal.tourplaner.dto.location.LocationGeoRequest;
import at.s_sal.tourplaner.dto.location.LocationResponse;
import at.s_sal.tourplaner.entity.Location;
import at.s_sal.tourplaner.helper.RequestResults;
import at.s_sal.tourplaner.helper.type.IErrorCodes;
import at.s_sal.tourplaner.helper.type.TransportType;
import at.s_sal.tourplaner.ors.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class OrsGeoService {

    private final RestClient restClient;

    //https://openrouteservice.org/dev/#/api-docs

    public OrsGeoService(RestClient.Builder restClientBuilder, OrsSecurityProperties orsProperties) {
        this.restClient = restClientBuilder
                .baseUrl(orsProperties.orsBaseUrl())
                .defaultHeader("Authorization", orsProperties.orsApiToken())
                .build();
    }

    public RequestResults<ORSRoute> getRoute(
            TransportType transportType,
            Location startLocation,
            Location endLocation){

        log.trace("Route: {}, form: {}, to: {}", transportType, startLocation, endLocation);

        return RequestResults.tryExecute(() -> {
                    String transportProfile = transportType.getOrsProfile();
                    String path = "/v2/directions/" + transportProfile + "/json";
                    ORSDirectionRequest orsDirectionRequest = makeORSDirectionRequest(startLocation, endLocation);

                    log.debug("Ors-Request: {}", orsDirectionRequest);

                    ORSDirectionResponse orsDirectionResponse = executeOrsRequestPOST(path, orsDirectionRequest);

                    log.debug("ORS-Route-Response: {}", orsDirectionResponse);

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



    public RequestResults<String> getReverseGeoCodingByLocation(
            LocationGeoRequest geoRequest){

        log.trace("GeoRequest: {}", geoRequest);

        return RequestResults.tryExecute(() -> {
                    Map<String, String> qParams = Map.of(
                            "point.lat", String.valueOf(geoRequest.latitude()),
                            "point.lon", String.valueOf(geoRequest.longitude())
                    );
                    String path = "/geocode/reverse";

                    ORSGeoCodeResponse orsGeoCodeResponse = executeOrsRequestGET(path, qParams);

                    log.debug("ORS-GeoCode-Response: {}", orsGeoCodeResponse);

                    if(orsGeoCodeResponse != null && !orsGeoCodeResponse.features().isEmpty()){
                        return orsGeoCodeResponse.features().getFirst().properties().label();
                    }

                    return "Location unknown";
                },
                Exception.class,
                IErrorCodes.EXTERNAL_API_ERROR,
                "ORS-Request failed"
        );
    }

    public RequestResults<List<LocationResponse>> getGeoCodeByAddress(
            String address) {

        log.trace("Address: {}", address);

        return RequestResults.tryExecute(() -> {
                    Map<String, String> qParams = Map.of("text", address);
                    String path = "/geocode/search";

                    ORSGeoCodeResponse orsGeoCodeResponse = executeOrsRequestGET(path, qParams);

                    if(orsGeoCodeResponse == null || orsGeoCodeResponse.features().isEmpty()){
                        return List.of();
                    }

                    return orsGeoCodeResponse.features().stream()
                            .map(this::makeLocationResponse)
                            .toList();

                },
                Exception.class,
                IErrorCodes.EXTERNAL_API_ERROR,
                "ORS-Request failed"
        );
    }





    private LocationResponse makeLocationResponse(ORSFeature feature){
        return new LocationResponse(
                null,
                feature.properties().label(),
                feature.geometry().coordinates().get(1),
                feature.geometry().coordinates().getFirst()
        );
    }


    private ORSDirectionRequest makeORSDirectionRequest(Location start, Location end){
        return new ORSDirectionRequest(
                List.of(
                    List.of(start.getPosition().getX(), start.getPosition().getY()),
                    List.of(end.getPosition().getX(), end.getPosition().getY())
                ));
    }



    private ORSGeoCodeResponse executeOrsRequestGET(String apiEndpoint, Map<String, String> queryParams){
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
                .body(ORSGeoCodeResponse.class);
    }

    private ORSDirectionResponse executeOrsRequestPOST(String apiEndpoint, ORSDirectionRequest orsRequests){
        return restClient.post()
                .uri(apiEndpoint)
                .body(orsRequests)
                .retrieve()
                .body(ORSDirectionResponse.class);
    }

}
