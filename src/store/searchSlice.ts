import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ResultType = 'file' | 'folder' | 'person' | 'chat' | 'list';

export interface SearchResult {
  id: string | number;
  title: string;
  description: string;
  tag: string;
  lastUpdated: string;
  type: ResultType;
}

export type Scope = 'All' | 'Files' | 'People' | 'Chats' | 'Lists';

export interface SearchState {
  q: string;
  scope: Scope;
  filters: {
    enabledScopes: Record<Exclude<Scope, 'All'>, boolean>;
  };
  status: 'idle' | 'loading' | 'success' | 'error';
  hits: Record<Scope, SearchResult[]>;
  counts: Record<Scope, number>;
  error?: string;
}

const initialState: SearchState = {
  q: '',
  scope: 'All',
  filters: {
    enabledScopes: {
      Files: true,
      People: true,
      Chats: false,
      Lists: false,
    },
  },
  status: 'idle',
  hits: {
    All: [],
    Files: [],
    People: [],
    Chats: [],
    Lists: [],
  },
  counts: {
    All: 0,
    Files: 0,
    People: 0,
    Chats: 0,
    Lists: 0,
  },
  error: undefined,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    queryChanged(state, action: PayloadAction<string>) {
      state.q = action.payload;
    },
    scopeChanged(state, action: PayloadAction<Scope>) {
      state.scope = action.payload;
    },
    searchStarted(state) {
      state.status = 'loading';
      state.error = undefined;
    },
    searchSuccess(
      state,
      action: PayloadAction<{
        hits: Partial<Record<Scope, SearchResult[]>>;
        counts: Partial<Record<Scope, number>>;
      }>
    ) {
      state.status = 'success';
      const { hits, counts } = action.payload;
      
      // Reset all hits and counts first
      state.hits = { All: [], Files: [], People: [], Chats: [], Lists: [] };
      state.counts = { All: 0, Files: 0, People: 0, Chats: 0, Lists: 0 };
      
      // Update hits
      (Object.keys(hits) as Scope[]).forEach((k) => {
        if (hits[k]) state.hits[k] = hits[k]!;
      });
      
      // Update counts
      (Object.keys(counts) as Scope[]).forEach((k) => {
        if (typeof counts[k] === 'number') state.counts[k] = counts[k]!;
      });
      
      // Recalculate All counts and hits
      state.counts.All =
        state.counts.Files + state.counts.People + state.counts.Chats + state.counts.Lists;
      state.hits.All = [
        ...state.hits.Files,
        ...state.hits.People,
        ...state.hits.Chats,
        ...state.hits.Lists,
      ];
    },
    searchError(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    clearQuery(state) {
      state.q = '';
      state.hits = { All: [], Files: [], People: [], Chats: [], Lists: [] };
      state.counts = { All: 0, Files: 0, People: 0, Chats: 0, Lists: 0 };
      state.status = 'idle';
      state.error = undefined;
    },
    toggleScopeVisibility(
      state,
      action: PayloadAction<Exclude<Scope, 'All'>>
    ) {
      const key = action.payload;
      state.filters.enabledScopes[key] = !state.filters.enabledScopes[key];
    },
    toggleAllScopes(state) {
      const allEnabled = Object.values(state.filters.enabledScopes).every(Boolean);
      Object.keys(state.filters.enabledScopes).forEach((key) => {
        state.filters.enabledScopes[key as Exclude<Scope, 'All'>] = !allEnabled;
      });
    },
  },
});

export const {
  queryChanged,
  scopeChanged,
  searchStarted,
  searchSuccess,
  searchError,
  clearQuery,
  toggleScopeVisibility,
  toggleAllScopes,
} = searchSlice.actions;

export default searchSlice.reducer;


