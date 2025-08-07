import React from 'react';

interface TimelineItemProps {
    date: string;
    title: string;
    description: string;
    number: number;
    isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, number, isLast = false }) => (
    <div className="relative flex items-start">
        <div className="flex flex-col items-center mr-6">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 backdrop-blur-sm border border-cyan-400/20 shadow-lg flex items-center justify-center text-slate-900 font-bold">
                {number}
            </div>
            {!isLast && <div className="w-px h-full bg-gradient-to-b from-slate-700 to-transparent mt-2"></div>}
        </div>
        <div className="pb-16 bg-slate-800/10 backdrop-blur-sm border border-slate-700/20 rounded-xl p-6 hover:bg-slate-800/20 hover:border-slate-600/30 transition-all duration-300 shadow-lg hover:shadow-xl">
            <p className="text-sm font-semibold text-cyan-400 mb-1">{date}</p>
            <h4 className="font-orbitron text-xl font-bold text-white mb-2 uppercase tracking-wide">{title}</h4>
            <p className="font-inter text-slate-400 leading-relaxed">{description}</p>
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
                    number={1}
                    date="Registration Ends: 21st Aug"
                    title="Registration Deadline"
                    description="Final deadline to register for CloneFest 2025. Make sure you've signed up and are ready for the challenge ahead."
                />
                <TimelineItem
                    number={2}
                    date="31st Aug - 6th Sept"
                    title="Week 1: Project Alpha"
                    description="Kick off CloneFest with the first legacy project. Focus on understanding the existing architecture, planning your revamp strategy, and deploy your completed application."
                />
                <TimelineItem
                    number={3}
                    date="7th Sept - 13th Sept"
                    title="Week 2: Project Beta"
                    description="Tackle the second project with increased complexity. Integrate new features, optimize performance, and deploy your second application."
                />
                <TimelineItem
                    number={4}
                    date="14th Sept - 21st Sept"
                    title="Week 3: Project Gamma & Final Submissions"
                    description="The final challenge. Complete and deploy your third project. All three deployed applications will be submitted for evaluation."
                />
                <TimelineItem
                    number={5}
                    date="Continuous Throughout"
                    title="Continuous Judging & Feedback"
                    description="Expert judges evaluate projects after each round, providing valuable feedback and comments to help students improve. Judging happens continuously throughout the competition to ensure timely guidance and assessment."
                />
                <TimelineItem
                    number={6}
                    date="30th Sept"
                    title="Results & Winner Announcement"
                    description="The moment you've been waiting for! Winners will be announced and prize distribution will take place. Best projects will be featured on the Coding Club GitHub."
                    isLast={true}
                />
            </div>
        </section>
    );
};