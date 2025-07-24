import React, { useState } from 'react';

const FormInput: React.FC<{ id: string; name: string; type: string; placeholder: string; label: string; required?: boolean; }> = ({ id, name, type, placeholder, label, required = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-bold text-slate-300 mb-2">{label}</label>
        <input 
            type={type} 
            id={id} 
            name={name} 
            placeholder={placeholder}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
            required={required}
        />
    </div>
);

interface AuthProps {
    onNavigateHome: () => void; 
}

export const Auth: React.FC<AuthProps> = ({ onNavigateHome }) => {
    const [mode, setMode] = useState<'login' | 'signup'>('signup');

    return (
        <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
             <button onClick={onNavigateHome} className="absolute top-8 left-8 text-slate-400 hover:text-white transition-colors z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="sr-only">Back to Home</span>
            </button>
            <div className="w-full max-w-md">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
                    <div className="mb-8 text-center">
                        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white uppercase">
                            {mode === 'signup' ? 'Join CloneFest 2025' : 'Welcome Back'}
                        </h2>
                        <p className="text-slate-400 mt-2">
                            {mode === 'signup' ? 'Create an account to begin your journey.' : 'Login to access your details.'}
                        </p>
                    </div>

                    <div className="flex justify-center bg-slate-900/50 rounded-lg p-1 mb-8">
                        <button onClick={() => setMode('signup')} className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-colors ${mode === 'signup' ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-700/50'}`}>
                            Sign Up
                        </button>
                        <button onClick={() => setMode('login')} className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-colors ${mode === 'login' ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-700/50'}`}>
                            Login
                        </button>
                    </div>

                    <form className="space-y-6">
                        {mode === 'signup' ? (
                            <>
                                <FormInput id="fullName" name="fullName" type="text" placeholder="John Doe" label="Full Name" />
                                <FormInput id="email" name="email" type="email" placeholder="you@example.com" label="Email Address" />
                                <FormInput id="github" name="github" type="url" placeholder="https://github.com/johndoe" label="GitHub Profile URL" />
                                <FormInput id="password" name="password" type="password" placeholder="••••••••" label="Password" />
                                <a 
                                    href="https://forms.gle/your-google-form-link-here" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full text-center block px-8 py-4 font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105"
                                >
                                    Create Account & Register
                                </a>
                                <p className="text-center text-xs text-slate-500 pt-2">
                                    *Registration is finalized via Google Forms.
                                </p>
                            </>
                        ) : (
                            <>
                                <FormInput id="login-email" name="login-email" type="email" placeholder="you@example.com" label="Email Address" />
                                <FormInput id="login-password" name="login-password" type="password" placeholder="••••••••" label="Password" />
                                <button
                                    type="submit"
                                    onClick={(e) => e.preventDefault()}
                                    className="w-full text-center block px-8 py-4 font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105"
                                >
                                    Login   
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};