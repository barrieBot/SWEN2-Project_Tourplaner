import { Component, computed, effect, inject, input, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common'
import { Tour, TourUpdate } from '../../../data/models/tour';
import {Location} from '../../../data/models/location';
import { LogListComponent } from '../../logs/log-list/log-list.component';
import { Router } from '@angular/router';
import { TourManager } from '../../../viewmodel/tour/tour-manager';
import { LogManager } from '../../../viewmodel/log/log-manager';
import {TuiButton, TuiInput, TuiScrollbar, TuiDialogService} from '@taiga-ui/core';
import {TuiTabs, TuiBadge, TuiRating, TuiTextarea} from '@taiga-ui/kit';
import {MapComponent} from '../../base_components/map/map.component'
import {FormsModule, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {TransportType} from '../../../data/models/transportType';
import {LocationPicker} from '../../base_components/location-picker/location-picker'


@Component({
  selector: 'app-tour-details',
  imports: [
    MapComponent,
    LogListComponent,
    CommonModule,
    FormsModule,
    TuiButton,
    TuiTabs,
    TuiBadge,
    TuiRating,
    TuiScrollbar,
    TuiTabs,
    TuiTextarea,
    TuiInput,
    ReactiveFormsModule,
    LocationPicker
  ],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss'
})
export class TourDetailsComponent {

  private tourManager = inject(TourManager);
  private logManager = inject(LogManager);
  private router = inject(Router);
  private dialogs = inject(TuiDialogService);
  private fb = inject(FormBuilder)



  activeTabIndex = signal<number>(0);
  id = input<string | null>(null);
  tour = computed(() => this.tourManager.selectedTour());


  editingModalActive = signal<'title' | 'description' | 'route' | null>(null);
  titleModal = this.fb.control('', [Validators.required]);
  descriptionModal = this.fb.control('');


  difficultyTag = computed(() =>{
    const diff = this.tour()?.difficulty ?? 0;
    if (diff <= 4) {
      return { label: `Easy (${diff})`, appearance: 'success' as const };
    }
    if(diff <= 8) {
      return { label: `Advanced (${diff})`, appearance: 'warning' as const };
    }
    return {
      label: `Difficult (${diff})`,  appearance: 'critical' as const
    };
  });



  onTapChange(tapIndex: number) {
    this.activeTabIndex.set(tapIndex)
    if(tapIndex === 0){

    }
  }

  close(){
    this.tourManager.setSelectedTour(null);
    this.router.navigate(['/dashboard']);
  }


  openTitleEditModal() {
    const tour = this.tour();
    if (!tour) {return;}
    this.titleModal.setValue(tour.name);
    this.editingModalActive.set('title');
  }

  saveTitleUpdate(){
    const tour = this.tour();
    if(this.titleModal.invalid || tour === null){ return; }
    const update: TourUpdate = {name: this.titleModal.value!}
    this.tourManager.updateTour(tour.id, update);
    this.editingModalActive.set(null);
  }




  openDescriptionEditModal() {
    const tour = this.tour();
    if (!tour) {return;}
    this.descriptionModal.setValue(tour.description);
    this.editingModalActive.set('description');
  }

  saveDescriptionUpdate(){
    const tour = this.tour();
    if(this.descriptionModal.invalid || tour === null){ return; }
    const update: TourUpdate = {description: this.descriptionModal.value!}
    this.tourManager.updateTour(tour.id, update)
    this.editingModalActive.set(null);
  }




  openRouteEditModal() {
    this.editingModalActive.set('route');
  }


  onRouteConfirmed(routeDetails: {start: Location, end:Location, transportType?: TransportType}): void {
    const tour = this.tour();
    if (!tour) {return;}
    const update: TourUpdate= {
      startLocationId: routeDetails.start.id,
      endLocationId: routeDetails.end.id,
      ...(routeDetails.transportType && { transportType: routeDetails.transportType }),
    };
    this.tourManager.updateTour(tour.id, update)
  }


  closeModal(){
    this.editingModalActive.set(null);
  }




  addLog() {
    this.activeTabIndex.set(1);
  }

  deleteTour() {
    /// Prompt "Are you sure or something"
    if (confirm('Are you sure you want to delete this tour?')) {
      this.tourManager.deleteSelectedTour();
    }
  }
}
