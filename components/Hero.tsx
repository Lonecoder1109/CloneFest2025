import React from 'react';
import BlurText from './BlurText';
import ScrambledText from './ScrambledText';

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
      <ScrambledText
        className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-slate-300"
        radius={100}
        duration={1.2}
        speed={0.5}
        scrambleChars=".:"
      >
        Join CloneFest 2025, a 3-week coding marathon to transform legacy systems into modern, full-stack applications. Showcase your skills, learn deployment, and make your mark in the open-source world.
      </ScrambledText>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={onNavigateToAuth} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105">
          Register for CloneFest
        </button>
        <a href="#about" className="w-full sm:w-auto px-8 py-4 bg-slate-800/20 backdrop-blur-xl border border-slate-700/40 text-white font-semibold rounded-lg hover:bg-slate-700/30 hover:border-slate-600/60 transition-all duration-300 hover:scale-105 shadow-lg">
          Learn More
        </a>
      </div>
    </section>
  );
};


