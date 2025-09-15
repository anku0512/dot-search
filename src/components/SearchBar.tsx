import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { queryChanged, clearQuery, toggleAllScopes } from '../store/searchSlice';
import { selectQuery } from '../store/selectors';
import SettingsMenu from './SettingsMenu';

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const q = useSelector(selectQuery);
  const [openSettings, setOpenSettings] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onShortcut = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      const isA = e.key.toLowerCase() === 'a';
      const isS = e.key.toLowerCase() === 's';
      
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if ((e.metaKey || e.ctrlKey) && isA) {
        e.preventDefault();
        dispatch(toggleAllScopes());
      } else if ((e.metaKey || e.ctrlKey) && isS) {
        e.preventDefault();
        setOpenSettings((v) => !v);
      }
    };
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, [dispatch]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => dispatch(queryChanged(e.target.value)),
    [dispatch]
  );

  const onClear = useCallback(() => dispatch(clearQuery()), [dispatch]);

  const onKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dispatch(clearQuery());
      }
    },
    [dispatch]
  );

  const hasQuery = q && q.length > 0;

  return (
    <div className={`searchbar ${hasQuery ? 'expanded' : ''}`} role="search">
      <SearchIcon fontSize="small" aria-hidden />
      <input
        aria-label="Search"
        placeholder="Search"
        value={q}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
        ref={inputRef}
      />
      {hasQuery ? (
        <button className="clear-btn" aria-label="Clear search" onClick={onClear}>
          <CloseIcon fontSize="small" />
        </button>
      ) : (
        <span className="shortcut-hint">⌘K</span>
      )}
      {hasQuery && (
        <div className="settings-container">
          <button
            className={`settings-btn ${openSettings ? 'rotated' : ''}`}
            aria-label="Search settings"
            title="Settings"
            onClick={() => setOpenSettings((v) => !v)}
          >
            <SettingsOutlinedIcon fontSize="small" />
          </button>
          <SettingsMenu open={openSettings} onClose={() => setOpenSettings(false)} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;


