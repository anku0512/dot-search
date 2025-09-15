import React, { useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import ResultsList from './components/ResultsList';
import FloatingHelp from './components/FloatingHelp';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuery, selectScope } from './store/selectors';
import { searchStarted, searchSuccess, searchError } from './store/searchSlice';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { useAbortableEffect } from './hooks/useAbortableEffect';
import { DUMMY_RESULTS } from './data/dummyResults';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const q = useSelector(selectQuery);
  const scope = useSelector(selectScope);
  const debounced = useDebouncedValue(q, 300);

  useAbortableEffect(
    (signal) => {
      if (!debounced) {
        return;
      }
      dispatch(searchStarted());
      const run = async () => {
        try {
          // Simulate async fetch with abort support
          await new Promise<void>((resolve, reject) => {
            const t = setTimeout(() => resolve(), 300);
            signal.addEventListener('abort', () => {
              clearTimeout(t);
              reject(new DOMException('Aborted', 'AbortError'));
            });
          });

          const queryLc = debounced.toLowerCase();
          const filtered = DUMMY_RESULTS.filter((r) =>
            r.title.toLowerCase().includes(queryLc)
          );
          const files = filtered.filter((r) => r.type === 'file' || r.type === 'folder');
          const people = filtered.filter((r) => r.type === 'person');
          const chats = filtered.filter((r) => r.type === 'chat');
          const lists = filtered.filter((r) => r.type === 'list');
          const hitsByScope: { All: typeof filtered; Files: typeof files; People: typeof people } = {
            All: [...files, ...people, ...chats, ...lists],
            Files: [...files],
            People: [...people],
          };
          dispatch(
            searchSuccess({
              hits: hitsByScope,
              counts: {
                Files: hitsByScope.Files.length,
                People: hitsByScope.People.length,
                Chats: chats.length,
                Lists: lists.length,
              },
            })
          );
        } catch (err: any) {
          if (err?.name === 'AbortError') return;
          dispatch(searchError('Failed to load results'));
        }
      };
      run();
    },
    [debounced, scope, dispatch]
  );

  useEffect(() => {
    // trigger recompute when scope changes by re-dispatching success from cache; handled in effect above via deps
  }, [scope]);

  const hasQuery = debounced.length > 0;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dots Search</h1>
      </header>
      <main className={`SearchPage ${hasQuery ? 'expanded' : 'centered'}`}>
        <SearchBar />
        {hasQuery ? (
          <>
            <Tabs />
            <ResultsList />
          </>
        ) : null}
      </main>
      <FloatingHelp />
    </div>
  );
};

export default App;
