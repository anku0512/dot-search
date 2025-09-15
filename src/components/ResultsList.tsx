import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { selectHitsByScope, selectQuery, selectScope, selectStatus, selectError } from '../store/selectors';
import SearchResultItem from './SearchResultItem';

export const ResultsList: React.FC = () => {
  const scope = useSelector(selectScope);
  const q = useSelector(selectQuery);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const hits = useSelector(useMemo(() => selectHitsByScope(scope), [scope]));

  if (status === 'loading') {
    return (
      <ul className="results skeleton" aria-live="polite" aria-busy="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <li className="skeleton-item" key={i} />
        ))}
      </ul>
    );
  }

  if (status === 'error') {
    return (
      <div className="results-error" role="alert">
        {error || 'Something went wrong. Please try again.'}
      </div>
    );
  }

  if (!q) {
    return <div className="results-empty">Start typing to search…</div>;
  }

  if (!hits || hits.length === 0) {
    return (
      <div className="results-empty">
        No results found for “{q}”. Try different keywords.
      </div>
    );
  }

  return (
    <motion.ul
      className="results"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08 },
        },
      }}
      key={scope + q}
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {hits.map((item) => (
          <SearchResultItem key={item.id} item={item} query={q} />)
        )}
      </AnimatePresence>
    </motion.ul>
  );
};

export default ResultsList;


