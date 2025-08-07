import React from 'react';
import { CodeBracketIcon, CloudArrowUpIcon, UserGroupIcon } from './icons/FeatureIcons';
import CountUp from './CountUp';
import BlurText from './BlurText';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 h-full shadow-xl hover:bg-slate-800/30 hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
        <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-cyan-900/30 backdrop-blur-sm border border-cyan-500/20 text-cyan-400 shadow-lg">
            {icon}
        </div>
        <h3 className="font-orbitron text-xl font-bold text-white mb-2 uppercase tracking-wide">{title}</h3>
        <p className="font-inter text-slate-400 leading-relaxed">{description}</p>
    </div>
);

export const About: React.FC = () => {
    return (
        <section id="about" className="py-24">
            <div className="text-center mb-16">
                <BlurText
                    text="What is CloneFest 2025?"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    gradientWords={["CloneFest", "2025"]}
                    className="font-orbitron text-4xl md:text-5xl font-bold text-white uppercase tracking-wider"
                />
                <div className="mt-4">
                    <BlurText
                        text="A hands-on competition designed to bridge the gap between theory and real-world application development."
                        delay={100}
                        animateBy="words"
                        direction="top"
                        className="max-w-2xl mx-auto text-lg text-slate-300"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<CodeBracketIcon />}
                    title="Full-Stack Challenge"
                    description="Dive deep into a legacy codebase each week. Your mission: revamp and modernize it into a full-stack project with both frontend and backend components."
                />
                <FeatureCard 
                    icon={<CloudArrowUpIcon />}
                    title="Real-World Deployment"
                    description="Gain practical experience by deploying your projects on industry-standard platforms like Vercel, Render, and Railway. We'll guide you through it."
                />
                <FeatureCard 
                    icon={<UserGroupIcon />}
                    title="Expert Judging & Recognition"
                    description="Projects are reviewed by senior developers from RVCE. Top submissions get recognized and have the chance to be pushed as open-source contributions."
                />
            </div>
        </section>
    );
}

// Why Participate Section Component
export const WhyParticipate: React.FC = () => {
    return (
        <section id="why-participate" className="py-24 bg-slate-900/20">
            <div className="text-center mb-16">
                <BlurText
                    text="Why Participate?"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    gradientWords={["Why", "Participate"]}
                    className="font-orbitron text-4xl md:text-5xl font-bold text-white uppercase tracking-wider"
                />
                <div className="mt-4">
                    <BlurText
                        text="Build major projects for your resume, and get your best clones featured on the RVCE Coding Club GitHub account with credits to your team."
                        delay={100}
                        animateBy="words"
                        direction="top"
                        className="max-w-2xl mx-auto text-lg text-cyan-300"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <FeatureCard 
                    icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>}
                    title="Skill Development"
                    description="Master modern full-stack development by working with real legacy codebases and transforming them into production-ready applications."
                />
                <FeatureCard 
                    icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>}
                    title="Career Growth"
                    description="Build an impressive portfolio with three deployed full-stack projects that showcase your ability to modernize legacy systems."
                />
                <FeatureCard 
                    icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                    title="Recognition"
                    description="Get your work reviewed by industry experts and have top submissions featured as open-source contributions to the community."
                />
                <FeatureCard 
                    icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>}
                    title="Mentorship"
                    description="Learn from experienced developers who will guide you through deployment processes and industry best practices."
                />
            </div>

            {/* Prize Pool Section */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 text-center shadow-2xl">
                    <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                        Prize Pool
                    </h3>
                    <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 font-orbitron mb-4 flex items-center justify-center">
                        ₹<span className="inline-block"><CountUp to={6000} duration={2.5} separator="," className="font-orbitron" /></span>
                    </div>
                    <p className="font-inter text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        Compete for exciting cash prizes! The top performers will share the grand prize pool based on their project quality, innovation, and successful deployment and other factors.
                    </p>
                </div>
            </div>
        </section>
    );
}