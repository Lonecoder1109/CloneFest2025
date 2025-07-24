import React from 'react';
import { CodeBracketIcon, CloudArrowUpIcon, UserGroupIcon } from './icons/FeatureIcons';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-slate-800 mt-24">
            <div className="container mx-auto px-6 md:px-8 py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex gap-6 mb-4">
                        <img src="/logos/coding-club.png" alt="Coding Club Logo" className="h-12 w-auto" />
                        <img src="/logos/rvce.png" alt="RV College of Engineering Logo" className="h-12 w-auto" />
                    </div>
                    <div className="text-center text-slate-400">
                        <p className="font-bold">&copy; 2025 CloneFest Initiative. All Rights Reserved.</p>
                        <p className="text-sm text-slate-500">Designed by Students for Students.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
