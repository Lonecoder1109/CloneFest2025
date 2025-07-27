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
      {required && <span className="text-red-500 ml-1">*</span>}
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
    teamPassword: "",
    teamLeader: {
      fullName: "",
      email: "",
      phone: "",
      github: "",
    },
    teamMembers: [{ fullName: "" }, { fullName: "" }, { fullName: "" }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name.startsWith("leader-")) {
      const field = name.replace("leader-", "");
      setFormData((prev) => ({
        ...prev,
        teamLeader: { ...prev.teamLeader, [field]: value },
      }));
    } else if (name.startsWith("member-")) {
      const index = parseInt(name.split("-")[1]);
      setFormData((prev) => {
        const updated = [...prev.teamMembers];
        updated[index].fullName = value;
        return { ...prev, teamMembers: updated };
      });
    }
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
              {mode === "signup" ? "Join CloneFest 2025" : "Team Login"}
            </h2>
            <p className="text-slate-400 mt-2">
              {mode === "signup"
                ? "Register to begin your journey."
                : "Welcome back!"}
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
              Sign Up
            </button>
            <button
              onClick={() => setMode("login")}
              className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-colors ${
                mode === "login"
                  ? "bg-cyan-500 text-slate-900"
                  : "text-slate-300 hover:bg-slate-700/30"
              }`}
            >
              Login
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <>
                <FormInput
                  id="teamName"
                  name="teamName"
                  type="text"
                  placeholder="Team XYZ"
                  label="Team Name"
                  onChange={handleChange}
                />
                <FormInput
                  id="teamPassword"
                  name="teamPassword"
                  type="password"
                  placeholder="••••••••"
                  label="Team Password"
                  onChange={handleChange}
                />
                <FormInput
                  id="leader-fullName"
                  name="leader-fullName"
                  type="text"
                  placeholder="John Doe"
                  label="Team Leader Name"
                  onChange={handleChange}
                />
                <FormInput
                  id="leader-email"
                  name="leader-email"
                  type="email"
                  placeholder="JohnDoe@example.com"
                  label="Team Leader Email"
                  onChange={handleChange}
                />
                <FormInput
                  id="leader-phone"
                  name="leader-phone"
                  type="tel"
                  placeholder="xxx-xxx-xxxx"
                  label="Team Leader Phone"
                  onChange={handleChange}
                />
                <FormInput
                  id="leader-github"
                  name="leader-github"
                  type="url"
                  placeholder="https://github.com/JohnDoe"
                  label="GitHub Profile"
                  onChange={handleChange}
                />
                {[0, 1, 2].map((i) => (
                  <FormInput
                    key={i}
                    id={`member-${i}`}
                    name={`member-${i}`}
                    type="text"
                    placeholder={`Member ${i + 1} Name`}
                    label={`Team Member ${i + 1} ${i < 2 ? "" : "(optional)"}`}
                    required={i < 2}
                    onChange={handleChange}
                  />
                ))}
                <button
                  type="submit"
                  className="w-full text-center block px-8 py-4 font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105"
                >
                  Create Team Account
                </button>
              </>
            ) : (
              <>
                <FormInput
                  id="teamName"
                  name="teamName"
                  type="text"
                  placeholder="Team XYZ"
                  label="Team Name"
                  onChange={handleChange}
                />
                <FormInput
                  id="teamPassword"
                  name="teamPassword"
                  type="password"
                  placeholder="••••••••"
                  label="Team Password"
                  onChange={handleChange}
                />
                <button
                  type="submit"
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
