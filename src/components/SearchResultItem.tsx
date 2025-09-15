import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';
import { SearchResult } from '../store/searchSlice';

function getIcon(type: SearchResult['type']) {
  switch (type) {
    case 'folder':
      return <FolderIcon fontSize="small" />;
    case 'file':
      return <InsertDriveFileIcon fontSize="small" />;
    case 'person':
      return <PersonIcon fontSize="small" />;
    case 'chat':
      return <ChatIcon fontSize="small" />;
    case 'list':
      return <ListIcon fontSize="small" />;
    default:
      return null;
  }
}

export const SearchResultItem: React.FC<{ item: SearchResult; query: string }> = ({ item, query }) => {
  const { title, description, tag, lastUpdated, type } = item;

  const highlight = (text: string) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + query.length);
    const after = text.slice(idx + query.length);
    return (
      <>
        {before}
        <mark>{match}</mark>
        {after}
      </>
    );
  };

  return (
    <motion.li
      className="result-item"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      tabIndex={0}
      role="link"
      onDoubleClick={() => {
        if ((item as any).url) window.open((item as any).url, '_blank', 'noopener');
      }}
    >
      <div className="icon">
        {type === 'person' && (item as any).image ? (
          <img 
            src={(item as any).image} 
            alt={title}
            className="person-avatar"
            onError={(e) => {
              // Fallback to icon if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={type === 'person' && (item as any).image ? 'hidden' : ''}>
          {getIcon(type)}
        </div>
      </div>
      <div className="content">
        <div className="title">{highlight(title)}</div>
        <div className="desc">{description}</div>
      </div>
      <div className="meta">
        <span className="tag">{tag}</span>
        <span className="time">{lastUpdated}</span>
        {(item as any).url ? (
          <a
            className="open-link"
            href={(item as any).url}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.stopPropagation()}
          >
            <OpenInNewIcon fontSize="small" />
            Open
          </a>
        ) : null}
      </div>
    </motion.li>
  );
};

export default SearchResultItem;


