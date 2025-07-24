import React, { useState } from 'react';

const Logo: React.FC = () => (
    <div className="flex items-center">
        <span className="font-orbitron text-xl font-bold tracking-wider text-white">CLONEFEST</span>
    </div>
);

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
    <a href={href} onClick={onClick} className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-semibold text-2xl md:text-base">
        {children}
    </a>
);

interface HeaderProps {
    onNavigateToAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToAuth }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleRegisterClick = () => {
        setIsOpen(false);
        onNavigateToAuth();
    }

    return (
        <>
            <header className="fixed top-0 z-50 w-full bg-slate-900/70 backdrop-blur-xl border-b border-slate-700/30 shadow-lg">
                <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-8">
                    <Logo />
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink href="#about">About</NavLink>
                        <NavLink href="#timeline">Timeline</NavLink>
                    </nav>
                    <button onClick={onNavigateToAuth} className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75">
                        Register Now
                    </button>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-slate-300 hover:text-cyan-400 z-50 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-xl md:hidden">
                    <div className="flex flex-col items-center justify-center h-full">
                        <nav className="flex flex-col items-center space-y-8">
                            <NavLink href="#about" onClick={toggleMenu}>About</NavLink>
                            <NavLink href="#timeline" onClick={toggleMenu}>Timeline</NavLink>
                            <button onClick={handleRegisterClick} className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105">
                                Register Now
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};
