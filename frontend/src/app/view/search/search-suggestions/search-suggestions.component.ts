import {Component, Input} from '@angular/core';
import {SearchSuggestion} from '../../../data/models/searchSuggestion';

@Component({
  selector: 'app-search-suggestions',
  imports: [],
  templateUrl: './search-suggestions.component.html',
  styleUrl: './search-suggestions.component.scss'
})
export class SearchSuggestionsComponent {
  @Input({required: true}) suggestion?: SearchSuggestion;


}
