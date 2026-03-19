import { Component } from '@angular/core';
import {SearchManagerService} from '../../../service/search/search-manager.service';
import {SearchSuggestion} from '../../../data/models/searchSuggestion';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  constructor(public searchManager: SearchManagerService) {}

  onInputChange(event: Event){
    const search_term = (event.target as HTMLInputElement).value;
    this.searchManager.updateSearchTerm(search_term);
  }



}
