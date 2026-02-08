import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { WherePage } from './pages/WherePage';
import { ContextPage } from './pages/ContextPage';
import { MasteringPage } from './pages/MasteringPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/where" element={<WherePage />} />
        <Route path="/context" element={<ContextPage />} />
        <Route path="/mastering" element={<MasteringPage />} />
      </Routes>
    </Router>
  );
}

export default App;
