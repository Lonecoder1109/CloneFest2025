import React, { useState } from "react";

const FormInput: React.FC<{
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ id, name, type, placeholder, label, required = true, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-slate-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className="w-full bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all duration-300"
      required={required}
      onChange={onChange}
    />
  </div>
);

interface AuthProps {
  onNavigateHome: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onNavigateHome }) => {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeader: "",
    teamLeaderEmail: "",
    teamMember1: "",
    teamMember1Email: "",
    teamMember2: "",
    teamMember2Email: "",
    teamMember3: "",
    teamMember3Email: "",
    teamMember4: "",
    teamMember4Email: "",
    teamPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = mode === "signup" ? "/register" : "/login";
    const payload =
      mode === "signup"
        ? formData
        : { teamName: formData.teamName, teamPassword: formData.teamPassword };

    try {
      const response = await fetch(`/api${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      alert(data.message);
      if (mode === "login" && response.ok) {
        onNavigateHome();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
      <button
        onClick={onNavigateHome}
        className="absolute top-8 left-8 text-slate-400 hover:text-white transition-colors z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="sr-only">Back to Home</span>
      </button>
      <div className="w-full max-w-md">
        <div className="bg-slate-800/20 backdrop-blur-2xl border border-slate-700/30 rounded-2xl p-8 md:p-12 shadow-2xl hover:bg-slate-800/25 transition-all duration-300">
          <div className="mb-8 text-center">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white uppercase">
              {mode === "signup" ? "Register Your Team" : "Team Login"}
            </h2>
            <p className="text-slate-400 mt-2">
              {mode === "signup"
                ? "Register your team for CloneFest 2025 (3-4 members required)."
                : "Login with your team credentials."}
            </p>
          </div>

          <div className="flex justify-center bg-slate-900/30 backdrop-blur-sm border border-slate-700/20 rounded-lg p-1 mb-8">
            <button
              onClick={() => setMode("signup")}
              className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-colors ${
                mode === "signup"
                  ? "bg-cyan-500 text-slate-900"
                  : "text-slate-300 hover:bg-slate-700/30"
              }`}
            >
              Register Team
            </button>
            <button
              onClick={() => setMode("login")}
              className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-colors ${
                mode === "login"
                  ? "bg-cyan-500 text-slate-900"
                  : "text-slate-300 hover:bg-slate-700/30"
              }`}
            >
              Team Login
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <>
                <FormInput
                  id="teamName"
                  name="teamName"
                  type="text"
                  placeholder="Team Alpha"
                  label="Team Name"
                  required
                  onChange={handleInputChange}
                />
                <div className="border-t border-slate-700/30 pt-4">
                  <h3 className="text-lg font-bold text-white mb-4">Team Leader</h3>
                  <div className="space-y-4">
                    <FormInput
                      id="teamLeader"
                      name="teamLeader"
                      type="text"
                      placeholder="John Doe"
                      label="Team Leader Name"
                      required
                      onChange={handleInputChange}
                    />
                    <FormInput
                      id="teamLeaderEmail"
                      name="teamLeaderEmail"
                      type="email"
                      placeholder="leader@example.com"
                      label="Team Leader Email"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="border-t border-slate-700/30 pt-4">
                  <h3 className="text-lg font-bold text-white mb-4">Team Members</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        id="teamMember1"
                        name="teamMember1"
                        type="text"
                        placeholder="Member 2 Name"
                        label="Team Member 2"
                        required
                        onChange={handleInputChange}
                      />
                      <FormInput
                        id="teamMember1Email"
                        name="teamMember1Email"
                        type="email"
                        placeholder="member2@example.com"
                        label="Member 2 Email"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        id="teamMember2"
                        name="teamMember2"
                        type="text"
                        placeholder="Member 3 Name"
                        label="Team Member 3"
                        required
                        onChange={handleInputChange}
                      />
                      <FormInput
                        id="teamMember2Email"
                        name="teamMember2Email"
                        type="email"
                        placeholder="member3@example.com"
                        label="Member 3 Email"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        id="teamMember3"
                        name="teamMember3"
                        type="text"
                        placeholder="Member 4 Name (Optional)"
                        label="Team Member 4 (Optional)"
                        required={false}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        id="teamMember3Email"
                        name="teamMember3Email"
                        type="email"
                        placeholder="member4@example.com"
                        label="Member 4 Email (Optional)"
                        required={false}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <FormInput
                  id="teamPassword"
                  name="teamPassword"
                  type="password"
                  placeholder="••••••••"
                  label="Team Password"
                  required
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="w-full text-center block px-8 py-4 font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105"
                >
                  Register Team
                </button>
              </>
            ) : (
              <>
                <FormInput
                  id="login-teamName"
                  name="teamName"
                  type="text"
                  placeholder="Team Alpha"
                  label="Team Name"
                  onChange={handleInputChange}
                />
                <FormInput
                  id="login-teamPassword"
                  name="teamPassword"
                  type="password"
                  placeholder="••••••••"
                  label="Team Password"
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="w-full text-center block px-8 py-4 font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105"
                >
                  Team Login
                </button>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-300 underline"
                    onClick={() => {
                      // TODO: Implement forgot password functionality
                      alert("Forgot password functionality coming soon!");
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
