import React from 'react';
import { CodeBracketIcon, CloudArrowUpIcon, UserGroupIcon } from './icons/FeatureIcons';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 h-full">
        <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-cyan-900/50 text-cyan-400">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);

export const About: React.FC = () => {
    return (
        <section id="about" className="py-24">
            <div className="text-center mb-16">
                <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">What is CloneFest?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
                    A hands-on competition designed to bridge the gap between theory and real-world application development.
                </p>
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