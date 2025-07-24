import React from 'react';

interface TimelineItemProps {
    date: string;
    title: string;
    description: string;
    isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, isLast = false }) => (
    <div className="relative flex items-start">
        <div className="flex flex-col items-center mr-6">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 backdrop-blur-sm border border-cyan-400/20 shadow-lg flex items-center justify-center text-slate-900 font-bold">
                {date.split(' ')[0][0]}
            </div>
            {!isLast && <div className="w-px h-full bg-gradient-to-b from-slate-700 to-transparent mt-2"></div>}
        </div>
        <div className="pb-16 bg-slate-800/10 backdrop-blur-sm border border-slate-700/20 rounded-xl p-6 hover:bg-slate-800/20 hover:border-slate-600/30 transition-all duration-300 shadow-lg hover:shadow-xl">
            <p className="text-sm font-semibold text-cyan-400 mb-1">{date}</p>
            <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
            <p className="text-slate-400">{description}</p>
        </div>
    </div>
);

export const Timeline: React.FC = () => {
    return (
        <section id="timeline" className="py-24">
            <div className="text-center mb-16">
                <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">Event Timeline</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
                    Three weeks, three challenges. Here's the breakdown.
                </p>
            </div>
            <div className="max-w-3xl mx-auto">
                <TimelineItem
                    date="31st Aug - 6th Sept"
                    title="Week 1: Project Alpha"
                    description="Kick off CloneFest with the first legacy project. Focus on understanding the existing architecture and planning your revamp strategy."
                />
                <TimelineItem
                    date="7th Sept - 13th Sept"
                    title="Week 2: Project Beta"
                    description="Tackle the second project. This week introduces more complexity, challenging you to integrate new features and optimize performance."
                />
                <TimelineItem
                    date="14th Sept - 21st Sept"
                    title="Week 3: Project Gamma & Deployment"
                    description="The final challenge. Finalize your third project and deploy all three applications. Submissions will be judged after this week."
                    isLast={true}
                />
            </div>
        </section>
    );
};