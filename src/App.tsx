import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Guides } from './pages/Guides';
import { GuideArticlePage } from './pages/GuideArticle';
import { Plan } from './pages/Plan';
import { NotFound } from './pages/NotFound';
import { DESTINATIONS, Destination } from './data/destinations';

const PLANNER_STORAGE_KEY = 'raahi_planner_destinations';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  // Itinerary destinations state with localStorage persistence
  const [plannerDestinations, setPlannerDestinations] = useState<Destination[]>(() => {
    try {
      const saved = localStorage.getItem(PLANNER_STORAGE_KEY);
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        const restored = DESTINATIONS.filter(d => ids.includes(d.id));
        if (restored.length > 0) return restored;
      }
    } catch (e) {}
    // Default initial selection for pleasant first-time exploration
    return DESTINATIONS.filter(d => ['jaipur', 'munnar'].includes(d.id));
  });

  // Global Toast state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync planner destinations to localStorage
  useEffect(() => {
    try {
      const ids = plannerDestinations.map(d => d.id);
      localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {}
  }, [plannerDestinations]);

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({
      id: Date.now().toString(),
      type,
      message
    });
  };

  const handleAddDestination = (dest: Destination) => {
    if (plannerDestinations.some(d => d.id === dest.id)) {
      triggerToast(`${dest.name} is already in your itinerary.`, 'info');
      return;
    }
    setPlannerDestinations([...plannerDestinations, dest]);
    triggerToast(`Added ${dest.name} to your itinerary.`, 'success');
  };

  const handleRemoveDestination = (id: string) => {
    setPlannerDestinations(plannerDestinations.filter(d => d.id !== id));
  };

  const handleReorderDestinations = (newDestinations: Destination[]) => {
    setPlannerDestinations(newDestinations);
  };

  const plannerDestinationIds = plannerDestinations.map(d => d.id);

  return (
    <div className="site-wrapper">
      <ScrollToTop />
      <Header />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              onAddToPlanner={handleAddDestination} 
              plannerDestinationIds={plannerDestinationIds} 
            />
          } 
        />
        <Route 
          path="/explore" 
          element={
            <Explore 
              onAddToPlanner={handleAddDestination} 
              plannerDestinationIds={plannerDestinationIds} 
            />
          } 
        />
        <Route 
          path="/guides" 
          element={<Guides />} 
        />
        <Route 
          path="/guides/:slug" 
          element={
            <GuideArticlePage 
              onAddToPlanner={handleAddDestination}
              plannerDestinationIds={plannerDestinationIds}
              onTriggerToast={triggerToast}
            />
          } 
        />
        <Route 
          path="/plan" 
          element={
            <Plan 
              plannerDestinations={plannerDestinations}
              onAddDestination={handleAddDestination}
              onRemoveDestination={handleRemoveDestination}
              onReorderDestinations={handleReorderDestinations}
              onTriggerToast={triggerToast}
            />
          } 
        />
        <Route 
          path="*" 
          element={<NotFound />} 
        />
      </Routes>

      <Footer />

      <Toast 
        toast={toast} 
        onDismiss={() => setToast(null)} 
      />
    </div>
  );
};

