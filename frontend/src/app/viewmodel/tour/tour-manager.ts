import {Service, inject, signal, computed, Injectable} from '@angular/core';
import { Router } from '@angular/router'
import { TourService } from '../../service/tour/tour.service'
import { Tour, TourUpdate, TourRequest} from '../../data/models/tour'

@Injectable({
  providedIn: 'root'
})
export class TourManager {
  private tourService = inject(TourService);
  private router = inject(Router);


  public tourList = signal<Tour[]>([]);
  readonly activeTourID = signal<number | null>(null);

  readonly selectedTour =computed(() =>
    this.tourList().find(tour => tour.id === this.activeTourID()) || null);
  readonly isTourSelected = computed(() =>
    !!this.activeTourID());

  setSelectedTour(id: number | null): void {
    if(!id){
      this.activeTourID.set(null);
      return;
    }
    const tour = this.getTourById(id);
    if(!tour){
      this.fetchTourById(id);
    }
    this.activeTourID.set(id);
  }


  getTourById(id: number) {
    return this.tourList().find((tour) => tour.id === id);
  }



  fetchUserTours(): void{
    this.tourService.fetchUserTours().subscribe({
      next: (tours) => this.tourList.set(tours),
      error: error => console.log(error)
    })
  }



  fetchTourById(id: number): void{
    this.tourService.getTourById(id).subscribe({
      next: (detailedTour) => {
        this.tourList.update(tours => {
          const index = tours.findIndex(tour => tour.id === id);
          if(index > -1) {
            const updatedTour = [...tours];
            updatedTour[index] = detailedTour;
            return updatedTour;
          }
          return [...tours, detailedTour];
          })
      },
      error: error => console.log(error)
    })
  }



  postNewTour(tour: TourRequest){
    this.tourService.postTour(tour).subscribe({
      next: (tour) => {
        this.tourList.update(tours => [...tours, tour]);
        this.activeTourID.set(tour.id);
        this.router.navigate(['/dashboard/tour', tour.id]);
      },
      error: error => console.log(error)
    })
  }

  updateTour(id: number, tourUpdate: TourUpdate): void {
    this.tourService.updateTour(id, tourUpdate).subscribe({
      next: (updatedTour) =>
        this.tourList.update(tours =>
          tours.map(t => t.id === id ? updatedTour : t)
        ),
      error: error => console.log(error)
    })
  }

  deleteSelectedTour(): void {
    const tourId = this.activeTourID();
    if(tourId) {
      this.deleteTour(tourId);
    }
  }

  deleteTour(id: number): void {
    this.tourService.deleteTour(id).subscribe({
      next: (detailedTour) => {
        if (this.activeTourID() === id){
          this.activeTourID.set(null);
        }
        this.tourList.update(tours =>
          tours.filter(t => t.id !== id))
      },
      error: error => console.log(error)
    })
  }


}
