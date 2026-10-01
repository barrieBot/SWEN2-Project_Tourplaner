import { Service, Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { RouteRequest, RouteResponse} from '../../data/models/route'


@Injectable({providedIn: 'root'})
export class Route {
  private http = inject(HttpClient);

  fetchRoute(routeRequest: RouteRequest): Observable<RouteResponse> {
    return this.http.post<RouteResponse>('/api/route', routeRequest);
  }
}
