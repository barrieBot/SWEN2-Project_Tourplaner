import {Component, ElementRef, viewChild} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  private map?: L.Map;
  private routeLayer?: L.Polyline;
  mapContainer = viewChild<ElementRef>('mapContainer');

  ngAfterViewInit() {
    this.intiMap();

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 200)
  }

  private intiMap(){
    const container = this.mapContainer()?.nativeElement;
    this.map = L.map(container, {
      zoomControl: false,
      attributionControl: false
    }).setView([48.2082, 16.3738], 13);

    /*
    L.control.zoom({
        position: 'bottomleft'
    }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);


    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 10
    }).addTo(this.map);
   * */

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(this.map)

  }

}
