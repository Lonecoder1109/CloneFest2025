import React, { useState } from "react";

// Add responsive styles for better mobile experience
const authStyles = `
  @media (max-width: 768px) {
    .auth-container {
      padding: 1rem;
    }
    .auth-panel {
      padding: 1.5rem !important;
      margin: 0.5rem;
    }
    .auth-grid {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
    .member-card {
      padding: 1rem !important;
    }
  }
  
  @media (max-width: 640px) {
    .auth-title {
      font-size: 1.75rem !important;
    }
    .section-title {
      font-size: 1.125rem !important;
    }
  }
`;

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
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    teamPassword: "",
    teamLeader: {
      fullName: "",
      USN:"",
      email: "",
      phone: "",
      github: "",
    },
    teamMembers: [
      { fullName: "", USN: "", email: "" }, 
      { fullName: "", USN: "", email: "" }, 
      { fullName: "", USN: "", email: "" }
    ],
  });

  // Inject responsive styles
  React.useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = authStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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
      const parts = name.split("-");
      const index = parseInt(parts[1]);
      const field = parts[2]; // fullName, usn, or email
      setFormData((prev) => {
        const updated = [...prev.teamMembers];
        updated[index] = { ...updated[index], [field]: value };
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
      
      if (mode === "signup" && response.ok) {
        // Show WhatsApp community popup after successful registration
        setShowWhatsAppPopup(true);
      } else if (mode === "login" && response.ok) {
        alert(data.message);
        onNavigateHome();
      } else {
        alert(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative z-20 min-h-screen flex items-center justify-center p-4 auth-container">
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
      <div className="w-full max-w-4xl lg:max-w-6xl">
        <div className="bg-slate-800/20 backdrop-blur-2xl border border-slate-700/30 rounded-2xl p-4 md:p-8 lg:p-12 shadow-2xl hover:bg-slate-800/25 transition-all duration-300 auth-panel">
          <div className="mb-8 text-center">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white uppercase auth-title">
              {mode === "signup" ? "Join CloneFest 2025" : "Team Login"}
            </h2>
            <p className="text-slate-400 mt-2">
              {mode === "signup"
                ? "Register to begin your journey."
                : "Welcome back!"}
            </p>
            {mode === "signup" && (
              <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <p className="text-cyan-300 text-sm font-semibold">
                  ⚠️ CloneFest 2025 is exclusively for First-Year Students (1RV24XSXXX USN format)
                </p>
              </div>
            )}
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
           
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <>
                {/* Team Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auth-grid">
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
                </div>

                {/* Team Leader Information */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 section-title">Team Leader Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auth-grid">
                    <FormInput
                      id="leader-fullName"
                      name="leader-fullName"
                      type="text"
                      placeholder="John Doe"
                      label="Team Leader Name"
                      onChange={handleChange}
                    />
                    <FormInput
                      id="leader-usn"
                      name="leader-USN"
                      type="text"
                      placeholder="1RV24XX001"
                      label="Team Leader USN"
                      onChange={handleChange}
                    />

                    <FormInput
                      id="leader-email"
                      name="leader-email"
                      type="email"
                      placeholder="1234@rvce.edu.in"
                      label="Team Leader Email (RVCE)"
                      onChange={handleChange}
                    />
                    <FormInput
                      id="leader-phone"
                      name="leader-phone"
                      type="tel"
                      placeholder="+91-xxxxxxxxxx"
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
                  </div>
                </div>

                {/* Team Members Information */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 section-title">Team Members</h3>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="mb-6 p-4 bg-slate-900/30 rounded-lg border border-slate-700/30 member-card">
                      <h4 className="text-lg font-semibold text-slate-300 mb-3">
                        Member {i + 1} {i >= 2 ? "(Optional)" : ""}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auth-grid">
                        <FormInput
                          id={`member-${i}-fullName`}
                          name={`member-${i}-fullName`}
                          type="text"
                          placeholder={`Member ${i + 1} Name`}
                          label="Full Name"
                          required={i < 2}
                          onChange={handleChange}
                        />
                        <FormInput
                          id={`member-${i}-usn`}
                          name={`member-${i}-USN`}
                          type="text"
                          placeholder="1RV24XX001"
                          label="USN"
                          required={i < 2}
                          onChange={handleChange}
                        />
                        <FormInput
                          id={`member-${i}-email`}
                          name={`member-${i}-email`}
                          type="email"
                          placeholder="1234@rvce.edu.in"
                          label="Email (RVCE)"
                          required={i < 2}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full text-center block px-8 py-4 font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 mt-8"
                >
                  Create Team Account
                </button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auth-grid">
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
                </div>
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

      {/* WhatsApp Community Popup */}
      {showWhatsAppPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-pulse">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">🎉 Registration Successful!</h3>
                <p className="text-slate-300 mb-6">
                  Welcome to CloneFest 2025! Join our WhatsApp community to stay updated with announcements, deadlines, and connect with fellow participants.
                </p>
              </div>
              
              <div className="space-y-4">
                <a
                  href="https://chat.whatsapp.com/Lpyi88vbvdd2qUi6f9M7vr?mode=ac_t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  📱 Join WhatsApp Community
                </a>
                
                <button
                  onClick={() => {
                    setShowWhatsAppPopup(false);
                    window.location.href = `/team/${formData.teamName}`;
                  }}
                  className="w-full px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-bold rounded-lg transition-all duration-300"
                >
                  Continue to Team Page
                </button>
                
                <button
                  onClick={() => {
                    setShowWhatsAppPopup(false);
                    onNavigateHome();
                  }}
                  className="w-full px-6 py-3 text-slate-400 hover:text-white transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
