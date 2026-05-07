import {computed, inject, Injectable, signal} from '@angular/core';
import {Tour, TourUpdate} from '../../data/models/tour';
import {TransportType} from '../../data/models/transportType';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, tap} from 'rxjs';
import {SearchManagerService} from '../search/search-manager.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TourManagerService {

  private http = inject(HttpClient)
  private router = inject(Router)
  private search = inject(SearchManagerService)

  private navigationEnd = toSignal(
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
  )

  private tourList = signal<Tour[]>([])

  private activeTourID = signal<string | null>(null)
  isTourSelected = computed(() => !!this.selectedTour());
  selectedTour = computed(() => {
    const id = this.activeTourID()
    if(!id) return null;
    return id ? this.displayTourList().find(tour => tour.id === id)  : null
  })

  setSelectedTour = (id: string | null) => {
    this.activeTourID.set(id)
  }


  constructor() { }

  displayTourList = computed(()=>{
    if (this.tourList().length != 0){
      return this.tourList();
    }
    return this.mockedTours;
  })


  fetchUserTours(){
    this.http.get<Tour[]>(`/api/tours`).subscribe({
      next: (tours) => this.tourList.set(tours),
      error: (error) => { console.error(error); }
      })
  }

  postTour(tour:Tour){

    /// Post to /api/tours
    return this.http.post<Tour>(`/api/tours`, tour).pipe(
      tap((newTour) => {
        this.tourList.update(tours => [...tours, newTour])
      })
    )
  }

  deleteTour(tourID: string){
    /// For now only this
    this.tourList.update(tours => tours.filter((t) => t.id !== tourID))

    /// Delete to /api/tours/{tourID}
    this.http.delete(`/api/tours/${tourID}`).subscribe({
      next: () => {
        this.tourList.update(tours => tours.filter((t) => t.id !== tourID))
        this.router.navigate(['/dashboard'])
      },
      error: (err) => console.error(err)
    })
  }

  getTourById(tourID: string): Tour {
    return this.tourList().filter(t => t.id === tourID)[0];
  }

  updateTour(tour_update:TourUpdate){
    /// Update to /api/tours/{tourID} ?... hmmm
    this.http.put<Tour>(`/api/tours/${tour_update.id}`, tour_update).pipe(
      tap((updatedTour) =>  {
        this.tourList.update(tours => tours.filter(t => t.id !== tour_update.id))
        this.tourList.update(tours => [...tours, updatedTour])
      })
      )
  }



  private mockedTours: Tour[] = [
    { id: "tour1",
      name: "Tour de France",
      description: "Fahrradtour durch Frankreich",
      transportType: TransportType.BIKE,
      distance: 50,
      estimatedTime: 200,
      popularity: 4,
      childFriendliness: 1,
      logs: []
    },
    { id: "tour2",
      name: "Wiener Ringtour",
      description: "Ein Spaziergang durch die Wiener Innenstadt",
      transportType: TransportType.VACATION,
      distance: 8,
      estimatedTime: 120,
      popularity: 3,
      childFriendliness: 3,
      logs: []
    },
    { id: "tour3",
      name: "Großglockner Downhill",
      description: "Mit dem Rad den Großglockner hinunter",
      transportType: TransportType.BIKE,
      distance: 25,
      estimatedTime: 240,
      popularity: 4,
      childFriendliness: 1,
      logs: []
    },
    { id: "tour4",
      name: "Arbeitsweg",
      description: "Schnellster Weg in die Arbeit",
      transportType: TransportType.PUBLIX,
      distance: 18,
      estimatedTime: 45,
      popularity: 1,
      childFriendliness: 5,
      logs: []
    },
  ];

}
