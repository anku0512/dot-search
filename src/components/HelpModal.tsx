import React, { useEffect, useRef } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const shortcuts = [
  { key: '⌘K', description: 'Focus search input' },
  { key: '⌘A', description: 'Toggle all result types on/off' },
  { key: '⌘S', description: 'Open/close settings menu' },
  { key: 'Esc', description: 'Clear search or close modals' },
];

export const HelpModal: React.FC<HelpModalProps> = ({ open, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!modalRef.current) return;
      if (!modalRef.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, onClose]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    if (open) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="help-modal-overlay">
      <div ref={modalRef} className="help-modal">
        <div className="help-modal-header">
          <h3>Keyboard Shortcuts</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close help">
            <CloseIcon fontSize="small" />
          </button>
        </div>
        <div className="help-modal-content">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="shortcut-item">
              <kbd className="shortcut-key">{shortcut.key}</kbd>
              <span className="shortcut-desc">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
