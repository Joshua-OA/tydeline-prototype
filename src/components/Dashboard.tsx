import { useState } from "react";

const SHIPMENTS = [
  {
    bl: "MAEU123456789",
    status: "In Transit",
    statusColor: "text-blue-600 bg-blue-50",
    vessel: "X-PRESS BARDSEY / 607W",
    origin: "Napier, NZ",
    destination: "Mundra, IN",
    eta: "18 Mar 2026",
    lastEvent: "Vessel departure — Tanjung Pelepas",
    progress: 75,
  },
  {
    bl: "MAEU987654321",
    status: "Arrived",
    statusColor: "text-emerald-600 bg-emerald-50",
    vessel: "MAERSK SELETAR / 412E",
    origin: "Shanghai, CN",
    destination: "Durban, ZA",
    eta: "09 Mar 2026",
    lastEvent: "Vessel arrival — Durban",
    progress: 100,
  },
  {
    bl: "HLCU223344556",
    status: "Loading",
    statusColor: "text-amber-600 bg-amber-50",
    vessel: "MSC OSCAR / 803N",
    origin: "Rotterdam, NL",
    destination: "Jebel Ali, AE",
    eta: "02 Apr 2026",
    lastEvent: "Gate in — Rotterdam ECT",
    progress: 15,
  },
];

interface DashboardProps {
  plan: string;
  onLogout: () => void;
}

export default function Dashboard({ plan, onLogout }: DashboardProps) {
  const [searchValue, setSearchValue] = useState("");

  const filtered = SHIPMENTS.filter(
    (s) =>
      !searchValue ||
      s.bl.toLowerCase().includes(searchValue.toLowerCase()) ||
      s.vessel.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-gray-900">Tydeline</h1>
            <span className="text-xs font-medium text-[#0753BB] bg-blue-50 px-2 py-0.5 rounded-full capitalize">
              {plan} Plan
            </span>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Active Shipments</p>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">In Transit</p>
            <p className="text-2xl font-bold text-blue-600">1</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Alerts</p>
            <p className="text-2xl font-bold text-amber-600">2</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search BL or vessel..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-md outline-none focus:border-gray-300 text-gray-700"
            />
          </div>
        </div>

        {/* Shipments table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">BL Number</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Route</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider hidden lg:table-cell">Vessel</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">ETA</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Progress</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.bl} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">{s.bl}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.lastEvent}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.statusColor}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-gray-700">{s.origin}</span>
                    <span className="text-gray-400 mx-1.5">&rarr;</span>
                    <span className="text-gray-700">{s.destination}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">{s.vessel}</td>
                  <td className="px-5 py-4 font-medium text-gray-900">{s.eta}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            s.progress === 100 ? "bg-emerald-500" : "bg-[#0753BB]"
                          }`}
                          style={{ width: `${s.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{s.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
