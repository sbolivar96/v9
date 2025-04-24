import React from 'react';
import ReactDOM from 'react-dom/client';
import UserAnalytics from './UserAnalytics.jsx';
import CatAtGreatWall from './CatAtGreatWall.jsx';
import ArtBankConcertFinder from './Artbank_concert_finder.jsx';

const App = () => {
  const pathname = window.location.pathname;
  if (pathname === '/cat-at-great-wall') {
    return <CatAtGreatWall />;
  }
  if (pathname === '/analytics') {
    return <UserAnalytics />;
  }
  return <ArtBankConcertFinder />;
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);