import React from 'react';
import BlurText from './BlurText';
import CountUp from './CountUp';
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
        gradientWords={["Revamp", "Legacy.", "Build", "Future."]}
        className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
      />
      <BlurText
        text="Build the Future."
        delay={250}
        animateBy="words"
        direction="top"
        gradientWords={["Revamp", "Legacy.", "Build", "Future."]}
        className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
      />
      <div className="mt-8 max-w-3xl mx-auto text-center">
        <div className="mb-2 text-lg md:text-xl font-bold text-white font-orbitron leading-tight">
          Join CloneFest 2025, a 3-week coding marathon to transform legacy systems into modern, full-stack applications.
        </div>
        <div className="mb-2 text-lg md:text-xl font-bold text-cyan-400 font-orbitron leading-tight">
          Win from a ₹<span className="inline-block"><CountUp to={6000} duration={2.5} separator="," className="font-orbitron" /></span> prize pool — <span className="text-white">build major projects for your resume.</span>
        </div>
        <div className="text-lg md:text-xl font-bold text-white font-orbitron leading-tight">
          Best clones will be featured on the Coding Club GitHub account with credits to your team.
        </div>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <div onClick={onNavigateToAuth} className="cursor-pointer">
          <ScrambledText
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105 text-2xl"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
          >
            Register for CloneFest
          </ScrambledText>
        </div>
      </div>
    </section>
  );
};


