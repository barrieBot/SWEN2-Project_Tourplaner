import {Log} from './log';
import {TransportType} from './transportType';

export interface Tour {
  id: string;
  name: string;
  description: string;
  transportType: TransportType;
  distance: number;
  estimatedTime: number;
  popularity: number;
  childFriendliness: number;
  logs: Log[];

}

export interface TourUpdate {
  id: string;
  name?: string;
  description?: string;
  transportType?: TransportType;

}
