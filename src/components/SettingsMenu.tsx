import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import { toggleScopeVisibility, Scope } from '../store/searchSlice';
import { selectEnabledScopes } from '../store/selectors';

const OPTIONS: Exclude<Scope, 'All'>[] = ['Files', 'People', 'Chats', 'Lists'];

function getScopeIcon(scope: Exclude<Scope, 'All'>) {
  switch (scope) {
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

export const SettingsMenu: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const enabled = useSelector(selectEnabledScopes);
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, onClose]);

  if (!open && mounted) return null;

  return (
    <div ref={ref} className={`settings-menu ${open ? 'open' : ''}`} role="menu" aria-label="Settings">
      {OPTIONS.map((opt) => (
        <label key={opt} className="menu-item">
          <span className="menu-label">
            <span className="menu-icon">{getScopeIcon(opt)}</span>
            {opt}
          </span>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={!!enabled[opt]}
              onChange={() => dispatch(toggleScopeVisibility(opt))}
            />
            <span className="toggle-slider"></span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default SettingsMenu;


