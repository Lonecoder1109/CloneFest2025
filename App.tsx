import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About, WhyParticipate } from './components/About';
import { Timeline } from './components/Timeline';
import { Footer } from './components/Footer';
import { Auth } from './components/Auth';
import Squares from './components/Squares';

const App: React.FC = () => {
  const [view, setView] = useState<'main' | 'auth'>('main');

  const handleNavigateToAuth = () => setView('auth');
  const handleNavigateHome = () => setView('main');

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-slate-50">
      <Squares 
        speed={0.5} 
        squareSize={40}
        direction='diagonal'
        borderColor='#334155'
        hoverFillColor='#06b6d4'
      />
      {view === 'main' ? (
        <div key="main" className="relative z-10 w-full">
          <Header onNavigateToAuth={handleNavigateToAuth} />
          <main className="relative z-10 container mx-auto px-6 md:px-8 pt-20">
            <Hero onNavigateToAuth={handleNavigateToAuth} />
            <About />
            <WhyParticipate />
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