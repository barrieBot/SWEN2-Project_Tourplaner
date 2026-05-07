import {computed, inject, Injectable, signal} from '@angular/core';
import {SearchSuggestion} from '../../data/models/searchSuggestion';
import {debounceTime, distinctUntilChanged, Observable, of, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SearchResults} from '../../data/models/searchResults';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class SearchManagerService {

  private http = inject(HttpClient);

  constructor() { }

  searchTerm = signal<string>('');
  selectedSuggestions = signal<SearchSuggestion[]>([]);
  private searchResults = signal<SearchResults | null>(null);

  completeQuery = computed (() => {
    return this.selectedSuggestions().map(s => s.query).join(' ');
  })

  private suggestions$ = toObservable(this.searchTerm).pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((search_term: string)=> {
      const trimmed = search_term.trim()
      if(!trimmed || trimmed.length <= 3) return of([]);
      return this.http.get<SearchSuggestion[]>(`/api/search/suggestions`, {
        params: {q: trimmed}
      })
    })
  )


  foundTours = computed(() => this.searchResults()?.tours ?? [])
  foundLogs = computed(() => {this.searchResults()?.logs ?? []})
  foundRoutes = computed(() => {this.searchResults()?.routes ?? []})

  updateSearchTerm(term: string){
    this.searchTerm.set(term)
  }

  selectSuggestion(selection: SearchSuggestion){
    this.selectedSuggestions.update(selections => [...selections, selection])
  }

  removeSuggestion(suggestion: SearchSuggestion){
    this.selectedSuggestions.update(suggestions =>
      suggestions.filter(s => s !== suggestion)
    )
  }

  executeSearch() {
    const query = this.completeQuery();
    if(!query){ return }

    this.http.get<SearchResults>(`/api/search/`, { params: { query } }).subscribe(
      results => this.searchResults.set(results)
    )
  }





  filteredSuggestions = computed(() => {
    const searchFor = this.searchTerm().trim();
    if (searchFor === '' || searchFor === null) {
      return [];
    }
    return this.mockedSuggestions;
  })

  private mockedSuggestions: SearchSuggestion[] = [
    { label: "testoption 1", query:"testoption=1" },
    { label: "option 2: Test", query:"testoption!=2" },
    { label: "3. testoption", query:"testoption>=3" }
  ]



}
