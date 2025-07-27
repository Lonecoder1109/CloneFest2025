import React, { useState, useEffect } from "react";

interface AdminDashboardProps {
  adminToken: string;
  onLogout: () => void;
}

interface UserStats {
  totalUsers: number;
  recentUsers: any[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminToken,
  onLogout,
}) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);

  const exportUsers = async (format: "json" | "csv") => {
    setLoading(true);
    try {
      const response = await fetch(`/api/export-users?format=${format}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        if (format === "csv") {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `clonefest-users-${
            new Date().toISOString().split("T")[0]
          }.csv`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          alert("CSV file downloaded successfully!");
        } else {
          const data = await response.json();
          setStats(data);
          alert(`Exported ${data.totalUsers} users successfully!`);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Export failed");
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("An error occurred during export.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">CloneFest 2025 - Data Management</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Export User Data
          </h2>
          <p className="text-slate-400 mb-6">
            Download all registered users data in your preferred format.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => exportUsers("csv")}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? "Exporting..." : "Export as CSV"}
            </button>

            <button
              onClick={() => exportUsers("json")}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? "Loading..." : "View JSON Data"}
            </button>
          </div>
        </div>

        {stats && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Export Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-semibold">Total Users</h3>
                <p className="text-2xl font-bold text-white">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-green-400 font-semibold">Export Date</h3>
                <p className="text-white">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-blue-400 font-semibold">Format</h3>
                <p className="text-white">JSON</p>
              </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg max-h-96 overflow-y-auto">
              <pre className="text-sm text-slate-300">
                {JSON.stringify(stats.users, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
