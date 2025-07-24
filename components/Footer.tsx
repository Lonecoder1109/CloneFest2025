import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-slate-800 mt-24">
            <div className="container mx-auto px-6 md:px-8 py-8">
                <div className="text-center text-slate-400">
                    <p className="font-bold">&copy; 2025 CloneFest Initiative. All Rights Reserved.</p>
                    <p className="text-sm text-slate-500">Designed by Students for Students.</p>
                </div>
            </div>
        </footer>
    );
};
