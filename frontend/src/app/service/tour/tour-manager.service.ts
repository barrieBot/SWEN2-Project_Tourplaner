import {computed, Injectable, signal} from '@angular/core';
import {Tour, TourUpdate} from '../../data/models/tour';
import {TransportType} from '../../data/models/transportType';

@Injectable({
  providedIn: 'root'
})
export class TourManagerService {

  private tourList = signal<Tour[]>([])
  selectedTour = signal<Tour | null>(null);
  isTourSelected = computed(() => !!this.selectedTour);
  ///private searchResults = signal<Tour[] | null>( null)

  constructor() { }

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
      transportType: TransportType.PUBIX,
      distance: 18,
      estimatedTime: 45,
      popularity: 1,
      childFriendliness: 5,
      logs: []
    },
  ];

  displayTourList = computed(()=>{
    if (this.tourList().length != 0){
      return this.tourList();
    }
    return this.mockedTours;
  })

  fetchUserTours(){
    //// Bind to API /api/tours to retrieve tours on successful login

  }

  postTour(tour:Tour){
    /// For now only this
    this.tourList.update(tours => [...tours, tour])

    /// Post to /api/tours
  }

  deleteTour(tourID: string){
    /// For now only this
    this.tourList.update(tours => tours.filter((t) => t.id !== tourID))

    /// Delete to /api/tours/{tourID}
  }

  getTourById(tourID: string): Tour {
    return this.tourList().filter(t => t.id === tourID)[0];
  }

  updateTour(tour_update:TourUpdate){
    /// Update to /api/tours/{tourID} ?... hmmm
  }

}
