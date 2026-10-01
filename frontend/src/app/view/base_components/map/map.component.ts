import {Component,
  ElementRef,
  viewChild,
  AfterViewInit,
  OnDestroy,
  input,
  output,
  effect,
  inject
} from '@angular/core';
import * as L from 'leaflet';
import {Route} from '../../../service/route/route'
import {RouteRequest, RouteResponse} from '../../../data/models/route'
import {Location, LocationGeoRequest} from '../../../data/models/location'
import {TransportType} from '../../../data/models/transportType'
import polyline from '@mapbox/polyline'

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  private routeService = inject(Route);

  startLocation = input<Location | null>();
  endLocation = input<Location | null>();

  startPreselectedLocation = input<LocationGeoRequest | null>();
  endPreselectedLocation = input<LocationGeoRequest | null>();

  transportType = input<TransportType>(TransportType.DRIVING_CAR);


  interactive = input<boolean>(true);
  grayscale = input<boolean>(false);

  private map?: L.Map;
  private routeLayer?: L.Polyline;
  private markersLayer: L.LayerGroup = L.layerGroup();

  locationSelected = output<L.LatLng>();

  mapContainer = viewChild<ElementRef>('mapContainer');

  constructor() {
    effect(() => {
      const start = this.startLocation();
      const end = this.endLocation();
      const preStart = this.startPreselectedLocation();
      const preEnd = this.endPreselectedLocation();
      const transport = this.transportType();

      if(this.map){
        this.clearMap()

        if (start && end){
          this.fetchAndPlaceRoute(start, end, transport);
        } else {
          if(start) this.addMarker(start);
          if(end) this.addMarker(end);
        }
        if(preStart) this.addPreMarker(preStart, 'Start');
        if(preEnd) this.addPreMarker(preEnd, 'End');
      }
    });
  }


  ngAfterViewInit() {
    this.intiMap();

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 200)
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private intiMap(){
    const container = this.mapContainer()?.nativeElement;
    if(!container){return;}

    this.map = L.map(container, {
      zoomControl: this.interactive(),
      dragging: this.interactive(),
      scrollWheelZoom: this.interactive(),
      doubleClickZoom: this.interactive(),
      attributionControl: false
    }).setView([48.2082, 16.3738], 13);



    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

/*

    L.control.zoom({
        position: 'topright'
    }).addTo(this.map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 10
    }).addTo(this.map);


    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(this.map)
   * */


    this.markersLayer.addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.locationSelected.emit(e.latlng)
    })

    const start = this.startLocation();
    const end = this.endLocation();
    const transportType = this.transportType();
    if(start && end){
      this.fetchAndPlaceRoute(start, end, transportType);
    }

  }


  private fetchAndPlaceRoute(start: Location, end: Location, transportType: TransportType) {
    this.placeMarkers([start, end]);

    const routeRequest ={
      startLocationId: start.id,
      endLocationId: end.id,
      transportType: transportType
    } as unknown as RouteRequest;

    this.routeService.fetchRoute(routeRequest).subscribe({
      next: (response: RouteResponse) => {
        if(!this.map || !response.geometry || response.geometry.length === 0){
          return;
        }
        const decodedPoly = polyline.decode(response.geometry);
        this.placeRoute(decodedPoly);
        this.autoZoomToRoute();
      },
      error: (e) => {
        console.error('Failed to load route: ', e);
      }
    })
  }


  private placeRoute(points: L.LatLngExpression[]) {
    if(!this.map) return;

    this.clearMap();
    if(!points || points.length === 0) return;

    this.routeLayer = L.polyline(points, {
      color: '#0066FF',
      weight: 5,
      opacity: 0.75,
    }).addTo(this.map);

  }


  private placeMarkers(locations: Location[]) {
    locations.forEach(location => {
      this.addMarker(location);
    })
  }

  private addMarker(location: Location) {
    if(!this.map){return;}
    L.marker([location.latitude, location.longitude])
      .bindPopup(`<b>${location.address}</b>`)
      .addTo(this.markersLayer);
  }

  private addPreMarker(location: LocationGeoRequest, type: 'Start' | 'End') {
    if(!this.map){return;}
    L.marker([location.latitude, location.longitude])
      .bindPopup(` <b>Pending: ${type} - </b><b>Waiting for Confirmation</b>`)
      .addTo(this.markersLayer);
  }


  private autoZoomToRoute(){
    if(!this.map || !this.routeLayer){return;}

    this.map?.fitBounds(this.routeLayer.getBounds(), {
      padding: [80, 80],
      maxZoom: 15
    });
  }


  private clearMap() {
    if(this.routeLayer && this.map){
      this.map.removeLayer(this.routeLayer);
      this.map.removeLayer(this.markersLayer);
      this.routeLayer = undefined;
    }
    this.markersLayer.clearLayers();
  }

}
