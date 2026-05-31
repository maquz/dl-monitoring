import { useState } from 'react';

interface AdminPanelProps {
  onLogout: () => void;
}

// Mock submission data — will be replaced with real Firebase data
const MOCK_SUBMISSIONS = [
  { id: 1, school: 'Accra Newtown D/A Primary', district: 'Accra Metro', region: 'Greater Accra', monitor: 'Ama Boateng', date: '2025-05-28', fidelity: 82, grade: 'P3' },
  { id: 2, school: 'Kumasi Anglican Primary', district: 'Kumasi Metro', region: 'Ashanti', monitor: 'Kofi Asante', date: '2025-05-27', fidelity: 75, grade: 'P2' },
  { id: 3, school: 'Tamale Islamic Primary', district: 'Tamale Metro', region: 'Northern', monitor: 'Abass Ibrahim', date: '2025-05-27', fidelity: 68, grade: 'P1' },
  { id: 4, school: 'Cape Coast R/C Primary', district: 'Cape Coast Metro', region: 'Central', monitor: 'Efua Mensah', date: '2025-05-26', fidelity: 90, grade: 'P4' },
  { id: 5, school: 'Sunyani Methodist Primary', district: 'Sunyani Muni', region: 'Bono', monitor: 'Yaw Osei', date: '2025-05-25', fidelity: 78, grade: 'P3' },
];

const STATS = [
  { label: 'Total Submissions', value: '5', icon: '📋', color: '#0ea5e9', bg: '#e0f2fe' },
  { label: 'Avg. Fidelity Score', value: '79%', icon: '📊', color: '#10b981', bg: '#d1fae5' },
  { label: 'Regions Covered', value: '5', icon: '🗺️', color: '#8b5cf6', bg: '#ede9fe' },
  { label: 'Districts Visited', value: '5', icon: '🏫', color: '#f59e0b', bg: '#fef3c7' },
];

type TabType = 'overview' | 'submissions' | 'regions';

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getFidelityColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 65) return '#f59e0b';
    return '#ef4444';
  };

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'submissions', label: 'Submissions', icon: '📋' },
    { key: 'regions', label: 'By Region', icon: '🗺️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 md:hidden text-xl"
            >
              ☰
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-white">
                <img
                  src="/logo.png"
                  alt="DL Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                    if (t.parentElement) {
                      t.parentElement.innerHTML = `<div style="background:#1e3a8a;color:white;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:900;border-radius:6px;">DL</div>`;
                    }
                  }}
                />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#1e3a8a' }}>DL Monitoring</p>
                <p className="text-xs text-gray-400 hidden sm:block">Admin Dashboard</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-full">
              <span className="text-xs font-semibold text-purple-700">🔑 Admin</span>
            </div>
            <button
              onClick={onLogout}
              className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">

        {/* Sidebar (desktop) */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          fixed md:static top-0 left-0 h-full w-56 bg-white shadow-lg md:shadow-none border-r border-gray-200
          z-30 md:z-auto transition-transform duration-200
          flex flex-col pt-16 md:pt-4
        `}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-5 mb-2">Menu</p>
          <nav className="flex flex-col gap-1 px-3">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => { setActiveTab(t.key); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-left transition
                  ${activeTab === t.key ? 'bg-sky-500 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto px-5 pb-6">
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-xs text-sky-700">
              <p className="font-bold">Firebase Sync</p>
              <p className="mt-1 text-sky-500">Connect your backend to see real-time data here.</p>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-5">📊 Overview</h2>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {STATS.map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2" style={{ background: s.bg }}>
                      {s.icon}
                    </div>
                    <p className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <h3 className="text-sm font-bold text-gray-700 mb-3">Recent Submissions</h3>
                <div className="flex flex-col gap-2">
                  {MOCK_SUBMISSIONS.slice(0, 3).map(s => (
                    <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{s.school}</p>
                        <p className="text-xs text-gray-400">{s.district} · {s.date}</p>
                      </div>
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-full text-white"
                        style={{ background: getFidelityColor(s.fidelity) }}
                      >
                        {s.fidelity}%
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className="mt-3 text-xs font-semibold text-sky-600 hover:underline"
                >
                  View all submissions →
                </button>
              </div>
            </div>
          )}

          {/* ── SUBMISSIONS TAB ── */}
          {activeTab === 'submissions' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-5">📋 All Submissions</h2>
              <div className="flex flex-col gap-3">
                {MOCK_SUBMISSIONS.map(s => (
                  <div key={s.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-800 truncate">{s.school}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.district} · {s.region}</p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <span className="text-xs text-gray-400">👤 {s.monitor}</span>
                          <span className="text-xs text-gray-400">📅 {s.date}</span>
                          <span className="text-xs text-gray-400">🎓 Grade {s.grade}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center flex-shrink-0">
                        <span
                          className="text-lg font-extrabold"
                          style={{ color: getFidelityColor(s.fidelity) }}
                        >
                          {s.fidelity}%
                        </span>
                        <span className="text-xs text-gray-400">Fidelity</span>
                      </div>
                    </div>
                    {/* Fidelity bar */}
                    <div className="mt-3 h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{ width: `${s.fidelity}%`, background: getFidelityColor(s.fidelity) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-center text-gray-400">
                🔥 Live data from Firebase will appear here once connected.
              </p>
            </div>
          )}

          {/* ── BY REGION TAB ── */}
          {activeTab === 'regions' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-5">🗺️ Submissions by Region</h2>
              <div className="flex flex-col gap-3">
                {[...new Set(MOCK_SUBMISSIONS.map(s => s.region))].map(region => {
                  const regionSubs = MOCK_SUBMISSIONS.filter(s => s.region === region);
                  const avgFidelity = Math.round(regionSubs.reduce((a, b) => a + b.fidelity, 0) / regionSubs.length);
                  return (
                    <div key={region} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-800">{region}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{regionSubs.length} submission{regionSubs.length > 1 ? 's' : ''}</p>
                        </div>
                        <span
                          className="text-xl font-extrabold"
                          style={{ color: getFidelityColor(avgFidelity) }}
                        >
                          {avgFidelity}%
                        </span>
                      </div>
                      <div className="mt-3 h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{ width: `${avgFidelity}%`, background: getFidelityColor(avgFidelity) }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
