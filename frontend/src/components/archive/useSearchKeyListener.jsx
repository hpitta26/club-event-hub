import { useEffect } from 'react';

// Custom hook that listens for the Ctrl + K key and opens the search bar
const useSearchKeyListener = (setOpenSearch) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpenSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setOpenSearch]);
};

export default useSearchKeyListener;
