import React from 'react';
import BlurText from './BlurText';

interface HeroProps {
  onNavigateToAuth: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToAuth }) => {
  return (
    <section className="relative z-10 py-32 md:py-48 text-center">
      <BlurText
        text="Revamp Legacy."
        delay={250}
        animateBy="words"
        direction="top"
        gradientWords={["Build", "Future"]}
        className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
      />
      <BlurText
        text="Build the Future."
        delay={250}
        animateBy="words"
        direction="top"
        gradientWords={["Build", "Future"]}
        className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
      />
      <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-slate-300">
        Join CloneFest 2025, a 3-week coding marathon to transform legacy systems into modern, full-stack applications. Showcase your skills, learn deployment, and make your mark in the open-source world.
      </p>
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={onNavigateToAuth} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105">
          Register for CloneFest
        </button>
        <a href="#about" className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors duration-300">
          Learn More
        </a>
      </div>
    </section>
  );
};
