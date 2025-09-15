import React, { useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpModal from './HelpModal';

export const FloatingHelp: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="floating-help"
        onClick={() => setShowModal(true)}
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts"
      >
        <HelpOutlineIcon />
      </button>
      <HelpModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default FloatingHelp;
