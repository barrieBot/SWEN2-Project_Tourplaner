import {computed, Injectable, signal} from '@angular/core';
import {SearchSuggestion} from '../../data/models/searchSuggestion';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchManagerService {

  constructor() { }

  private mockedSuggestions: SearchSuggestion[] = [
    { label: "testoption 1", query:"testoption=1" },
    { label: "option 2: Test", query:"testoption!=2" },
    { label: "3. testoption", query:"testoption>=3" }
  ]


  searchTerm = signal<string>('');
  selectedSuggestions = signal<SearchSuggestion[]>([]);


  filteredSuggestions = computed(() => {
    const searchFor = this.searchTerm().trim();
    if (searchFor === '' || searchFor === null) {
      return [];
    }
    return this.mockedSuggestions;
  })

  updateSearchTerm(term: string){
    this.searchTerm.set(term)
  }

  selectSuggestion(selection: SearchSuggestion){
    this.selectedSuggestions.update(selections => [...selections, selection])
  }

  removeSuggestion(suggestion: SearchSuggestion){
    this.selectedSuggestions.update(suggestions => suggestions.filter(s => s !== suggestion))
  }


}
