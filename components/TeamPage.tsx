import React from "react";

interface TeamPageProps {
  teamName: string;
  onNavigateHome: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ teamName, onNavigateHome }) => {
  return (
    <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
      <button
        onClick={onNavigateHome}
        className="absolute top-8 left-8 text-slate-400 hover:text-white transition-colors z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="sr-only">Back to Home</span>
      </button>
      
      <div className="w-full max-w-4xl">
        <div className="bg-slate-800/20 backdrop-blur-2xl border border-slate-700/30 rounded-2xl p-8 md:p-12 shadow-2xl hover:bg-slate-800/25 transition-all duration-300">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-white uppercase mb-4">
                Welcome to CloneFest 2025
              </h1>
              <div className="text-2xl text-cyan-400 font-bold mb-2">
                Team: {teamName}
              </div>
              <p className="text-slate-400 text-lg">
                Registration Successful! Your journey begins now.
              </p>
            </div>

            <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Next Steps</h2>
              <div className="text-left space-y-3 text-slate-300">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Check your email for confirmation and further instructions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Join the official CloneFest Discord server</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Prepare for the competition guidelines</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Stay tuned for problem statements</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Important Dates</h3>
                <div className="text-slate-300 space-y-2 text-sm">
                  <div>Registration Ends: TBD</div>
                  <div>Competition Starts: TBD</div>
                  <div>Final Submission: TBD</div>
                </div>
              </div>
              
              <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Contact</h3>
                <div className="text-slate-300 space-y-2 text-sm">
                  <div>Email: clonefest@rvce.edu.in</div>
                  <div>Discord: CloneFest 2025</div>
                  <div>Website: clonefest.rvce.edu.in</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onNavigateHome}
                className="px-8 py-3 font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.open('https://discord.gg/clonefest', '_blank')}
                className="px-8 py-3 font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:from-purple-400 hover:to-pink-500 transform hover:scale-105"
              >
                Join Discord
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
