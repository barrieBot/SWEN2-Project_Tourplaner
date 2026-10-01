import {Log} from './log';
import {Location} from './location';
import {TransportType} from './transportType';

export interface Tour {
  id: number;
  name: string;
  description: string;
  transportType: TransportType;
  distance: number;
  estimatedTime: number;
  popularity: number;
  difficulty: number;
  startLocation: Location;
  endLocation: Location;
  logs: Log[];
}


export interface TourRequest {
  name: string;
  description: string;
  transportType: TransportType;
  startLocationId: number;
  endLocationId: number;
}


export interface TourUpdate {
  name?: string;
  description?: string;
  transportType?: TransportType;
  startLocation?: number;
  endLocation?: number;
}
