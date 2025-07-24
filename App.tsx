import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { Footer } from './components/Footer';
import { Auth } from './components/Auth';

const App: React.FC = () => {
  const [view, setView] = useState<'main' | 'auth'>('main');

  const handleNavigateToAuth = () => setView('auth');
  const handleNavigateHome = () => setView('main');

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-900 text-slate-50">
      {view === 'main' ? (
        <div key="main" className="relative z-10 w-full">
          <Header onNavigateToAuth={handleNavigateToAuth} />
          <main className="relative z-10 container mx-auto px-6 md:px-8 pt-20">
            <Hero onNavigateToAuth={handleNavigateToAuth} />
            <About />
            <Timeline />
          </main>
          <Footer />
        </div>
      ) : (
        <Auth key="auth" onNavigateHome={handleNavigateHome} />
      )}
    </div>
  );
};

export default App;