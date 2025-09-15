import { RootState } from '../store';
import { Scope } from './searchSlice';

export const selectQuery = (s: RootState) => s.search.q;
export const selectScope = (s: RootState) => s.search.scope;
export const selectCounts = (s: RootState) => s.search.counts;
export const selectStatus = (s: RootState) => s.search.status;
export const selectError = (s: RootState) => s.search.error;
export const selectHits = (s: RootState) => s.search.hits;
export const selectHitsByScope = (scope: Scope) => (s: RootState) => s.search.hits[scope];
export const selectEnabledScopes = (s: RootState) => s.search.filters.enabledScopes;


