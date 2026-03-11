import { useState, useRef, useEffect, useCallback } from "react";
import heroImg from "../assets/container.jpg";
import Pricing from "./Pricing";

const EXAMPLE_BL = "MAEU123456789";

type PopupStep = "loading" | "result" | "pricing";

interface HeroProps {
  onSubscribe?: (plan: string) => void;
}

export default function Hero({ onSubscribe }: HeroProps) {
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState<PopupStep>("loading");
  const popupRef = useRef<HTMLDivElement>(null);

  const openPopup = useCallback(() => {
    setShowPopup(true);
    setPopupStep("loading");
    setTimeout(() => setPopupStep("result"), 2000);
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setPopupStep("loading");
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup();
      }
    }
    if (showPopup) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup, closePopup]);

  function handleExampleClick() {
    setInputValue(EXAMPLE_BL);
  }

  function handleTrackClick() {
    if (!inputValue.trim()) return;
    openPopup();
  }

  return (
    <section className="relative min-h-[calc(100vh-65px)] overflow-hidden">
      {/* Graph grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-indigo-100/40" />

      <main className="relative max-w-7xl mx-auto px-12 min-h-[calc(100vh-65px)] flex flex-col lg:flex-row items-center justify-center">
        <div className="lg:w-1/2 z-10">
          <div className="max-w-lg">
            <h1 className="text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              Smarter Tracking for Importers.
            </h1>
            <p className="text-gray-500 text-lg mb-10 max-w-md leading-relaxed">
              Predictive ETAs, real-time updates, and smart alerts via Web,
              WhatsApp, and Email so you can clear shipments faster and avoid
              demurrage penalties.
            </p>

            <div className="max-w-md">
              <div className="flex items-stretch gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleTrackClick()}
                    placeholder="Enter Container/BL Number"
                    className="w-full pl-11 pr-4 py-3 bg-white border-0 ring-1 ring-gray-200 focus:ring-1 focus:ring-gray-200 outline-none text-gray-700 text-base shadow-sm"
                  />
                </div>
                <button
                  onClick={handleTrackClick}
                  className="bg-[#0753BB] text-white font-bold px-10 py-3 hover:bg-[#064299] transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                >
                  Track
                </button>
              </div>

              {/* Example BL link */}
              <p className="mt-3 text-sm text-gray-400">
                Try an example:{" "}
                <button
                  onClick={handleExampleClick}
                  className="text-[#0753BB] underline underline-offset-2 hover:text-[#064299] transition-colors cursor-pointer"
                >
                  {EXAMPLE_BL}
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative mt-16 lg:mt-0 flex justify-center">
          <img
            src={heroImg}
            alt="Shipping Container"
            className="w-full max-w-xl h-[420px] rounded-lg object-cover"
          />

          <div className="absolute -top-10 right-10 flex items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg
                className="absolute w-full h-full animate-spin-slow"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[8px] font-bold uppercase tracking-widest fill-gray-400">
                  <textPath href="#circlePath">
                    Container Tracking Platform • Container Tracking Platform •
                  </textPath>
                </text>
              </svg>
              <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                <span className="text-gray-900 font-extrabold text-2xl">1</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Popup / Dialog */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            ref={popupRef}
            className="bg-white rounded-lg shadow-xl border border-gray-200 w-[90vw] max-w-4xl max-h-[85vh] mx-4 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {popupStep === "loading"
                  ? "Looking up shipment..."
                  : popupStep === "pricing"
                    ? "Choose Your Plan"
                    : "Tracking Preview"}
              </h3>
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Loading state */}
            {popupStep === "loading" && (
              <div className="px-6 py-12 flex flex-col items-center gap-4 flex-1">
                <div className="w-10 h-10 border-3 border-gray-200 border-t-[#0753BB] rounded-full animate-spin" />
                <p className="text-sm text-gray-500">
                  Searching for <span className="font-medium text-gray-700">{inputValue}</span>
                </p>
              </div>
            )}

            {/* Result state */}
            {popupStep === "result" && (
              <>
                <div className="px-6 py-5 space-y-4 flex-1 overflow-y-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#0753BB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bill of Lading</p>
                      <p className="font-semibold text-gray-900">{inputValue}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 italic">Times shown in local time unless otherwise indicated.</p>

                  <div className="rounded-lg bg-gray-50 p-4 space-y-0 overflow-y-auto">
                    {/* NAPIER */}
                    <div className="pb-3 mb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-sm font-bold text-gray-900">NAPIER</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-4 mb-1">CC Napier Container Park NCP</p>
                      <div className="ml-4 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Gate out — Empty</span>
                          <span className="text-gray-900 font-medium">15 Jan 2026 10:46</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 ml-4 mt-2 mb-1">Napier Container Terminal</p>
                      <div className="ml-4 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Gate in</span>
                          <span className="text-gray-900 font-medium">16 Jan 2026 12:06</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Load on MONACO / 601N</span>
                          <span className="text-gray-900 font-medium">19 Jan 2026 16:36</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Vessel departure (MONACO / 601N)</span>
                          <span className="text-gray-900 font-medium">20 Jan 2026 05:44</span>
                        </div>
                      </div>
                    </div>

                    {/* TAURANGA */}
                    <div className="pb-3 mb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-sm font-bold text-gray-900">TAURANGA</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-4 mb-1">Tauranga Container Terminal</p>
                      <div className="ml-4 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Vessel arrival (MONACO / 551S)</span>
                          <span className="text-gray-900 font-medium">23 Jan 2026 07:49</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Discharge (MONACO / 551S)</span>
                          <span className="text-gray-900 font-medium">23 Jan 2026 10:36</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Load on MAERSK RIO DELTA / 604N</span>
                          <span className="text-gray-900 font-medium">26 Jan 2026 12:58</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Vessel departure (MAERSK RIO DELTA / 604N)</span>
                          <span className="text-gray-900 font-medium">27 Jan 2026 21:03</span>
                        </div>
                      </div>
                    </div>

                    {/* TANJUNG PELEPAS */}
                    <div className="pb-3 mb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-sm font-bold text-gray-900">TANJUNG PELEPAS</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-4 mb-1">Pelabuhan Tanjung Pelepas Terminal</p>
                      <div className="ml-4 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Vessel arrival (MAERSK RIO DELTA / 604N)</span>
                          <span className="text-gray-900 font-medium">21 Feb 2026 15:23</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Discharge (MAERSK RIO DELTA / 604N)</span>
                          <span className="text-gray-900 font-medium">22 Feb 2026 06:13</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Load on X-PRESS BARDSEY / 607W</span>
                          <span className="text-gray-900 font-medium">08 Mar 2026 00:46</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Vessel departure (X-PRESS BARDSEY / 607W)</span>
                          <span className="text-gray-900 font-medium">08 Mar 2026 12:26</span>
                        </div>
                      </div>
                    </div>

                    {/* MUNDRA */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
                        <span className="text-sm font-bold text-gray-900">MUNDRA</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-4 mb-1">Mundra Int. Cont. Ter. Pvt. Ltd.</p>
                      <div className="ml-4 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Vessel arrival (X-PRESS BARDSEY / 607W)</span>
                          <span className="text-gray-900 font-medium">18 Mar 2026 00:30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setPopupStep("pricing")}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#0753BB] rounded-md hover:bg-[#064299] transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
              </>
            )}

            {/* Pricing tier selection */}
            {popupStep === "pricing" && (
              <Pricing
                onBack={() => setPopupStep("result")}
                onSubscribe={(plan) => {
                  closePopup();
                  onSubscribe?.(plan);
                }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
