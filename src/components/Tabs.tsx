import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import { scopeChanged, Scope } from '../store/searchSlice';
import { selectCounts, selectScope, selectEnabledScopes } from '../store/selectors';

const ALL_SCOPES: Scope[] = ['All', 'Files', 'People', 'Chats', 'Lists'];

function getScopeIcon(scope: Scope) {
  switch (scope) {
    case 'All':
      return <InsertDriveFileIcon fontSize="small" />;
    case 'Files':
      return <InsertDriveFileIcon fontSize="small" />;
    case 'People':
      return <PersonIcon fontSize="small" />;
    case 'Chats':
      return <ChatIcon fontSize="small" />;
    case 'Lists':
      return <ListIcon fontSize="small" />;
    default:
      return null;
  }
}

export const Tabs: React.FC = () => {
  const dispatch = useDispatch();
  const active = useSelector(selectScope);
  const counts = useSelector(selectCounts);
  const enabled = useSelector(selectEnabledScopes);

  return (
    <div className="tabs" role="tablist" aria-label="Search scopes">
      {ALL_SCOPES.filter((s) => s === 'All' || enabled[s as Exclude<Scope, 'All'>]).map((s) => {
        const isActive = s === active;
        return (
          <button
            key={s}
            role="tab"
            aria-selected={isActive}
            className={`tab ${isActive ? 'active' : ''}`}
            onClick={() => dispatch(scopeChanged(s))}
            onMouseEnter={() => {}}
          >
            <span className="label">
              <span className="tab-icon">{getScopeIcon(s)}</span>
              {s}
            </span>
            <span className="count">{counts[s]}</span>
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="underline"
                  className="underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;


