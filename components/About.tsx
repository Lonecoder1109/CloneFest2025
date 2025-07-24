import React from 'react';
import { CodeBracketIcon, CloudArrowUpIcon, UserGroupIcon } from './icons/FeatureIcons';
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
                    text="What is CloneFest?"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    gradientWords={["CloneFest"]}
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
                    description="Projects are reviewed by senior developers. Top submissions get recognized and have the chance to be pushed as open-source contributions."
                />
            </div>
        </section>
    );
}