import {TransportType} from './transportType';



export interface Route {
  id: string;
  geometry?: string;
  startLocation?: Location;
  endLocation?: Location;
}


export interface RouteRequest {
  startLocationId: number,
  endLocationId: number,
  transportType?: TransportType
}

export interface RouteResponse {
  geometry: string;
  summary: RouteSummary;
}

export interface RouteSummary {
  distanceKm?: number;
  duration?: number;

}
