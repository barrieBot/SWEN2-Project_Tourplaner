import {Tour} from './tour';
import {Log} from './log';
import {Route} from './route';

export interface SearchResults {
  tours?: Tour[];
  logs?: Log[];
  routes?: Route[];
}

