
import React, { useState } from 'react';

const FormInput: React.FC<{ id: string; name: string; type: string; placeholder: string; label: string; }> = ({ id, name, type, placeholder, label }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <input 
            type={type} 
            id={id} 
            name={name} 
            placeholder={placeholder}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
            required
        />
    </div>
);

export const Register: React.FC = () => {
    const [agreed, setAgreed] = useState(false);

    return (
        <section id="register" className="py-24">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Make an Impact?</h2>
                <p className="mt-4 text-lg text-slate-300">
                    Fill out the form below to be a part of CloneFest 2025. Spots are limited, so register now to secure your place!
                </p>
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput id="fullName" name="fullName" type="text" placeholder="John Doe" label="Full Name" />
                            <FormInput id="email" name="email" type="email" placeholder="you@example.com" label="Email Address" />
                        </div>
                        <FormInput id="github" name="github" type="url" placeholder="https://github.com/johndoe" label="GitHub Profile URL" />
                         <FormInput id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/johndoe" label="LinkedIn Profile URL (Optional)" />
                        
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="agree"
                                    name="agree"
                                    type="checkbox"
                                    className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 bg-slate-700 border-slate-600 rounded"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="agree" className="font-medium text-slate-300">
                                    I agree to the terms and conditions and confirm my availability for the event dates.
                                </label>
                            </div>
                        </div>

                        <a 
                            href="https://forms.gle/your-google-form-link-here" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`w-full text-center block px-8 py-4 font-bold rounded-lg transition-all duration-300 ${agreed ? 'bg-cyan-500 text-slate-900 shadow-lg hover:bg-cyan-400 transform hover:scale-105' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                        >
                            Register as a Participant
                        </a>
                         <p className="text-center text-xs text-slate-500 pt-2">
                            *This is a placeholder form. Clicking the button will redirect to the actual Google Form for registration.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};
