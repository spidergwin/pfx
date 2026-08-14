"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calculator, ShieldCheck, RefreshCw, Info, ArrowRight } from "lucide-react";

export default function LotSizeCalculatorPage() {
  const [currency, setCurrency] = useState("USD");
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLossPips, setStopLossPips] = useState<number>(25);
  const [pair, setPair] = useState("EURUSD");

  // Pair pip values for 1 Standard Lot (100,000 units)
  const pairPipValues: Record<string, number> = {
    EURUSD: 10,
    GBPUSD: 10,
    AUDUSD: 10,
    USDCAD: 7.5,
    USDJPY: 6.7,
    XAUUSD: 10, // Gold
    BTCUSD: 1,
  };

  const currentPipVal = pairPipValues[pair] || 10;
  const cashRisk = (balance * riskPercent) / 100;
  
  // Standard Lot calculation: Lot Size = Cash Risk / (Stop Loss Pips * Pip Value per lot)
  const standardLots = stopLossPips > 0 ? cashRisk / (stopLossPips * currentPipVal) : 0;
  const miniLots = standardLots * 10;
  const microLots = standardLots * 100;
  const units = Math.round(standardLots * 100000);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-[#1E0306] text-white py-14 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="mx-auto max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-[#ED3C52] border border-rose-500/30">
            <Calculator className="h-3.5 w-3.5" />
            Official PFX Risk Tool
          </div>
          <h1 className="text-3xl md:text-5xl font-black">
            Forex <span className="text-[#ED3C52]">Lot Size Calculator</span>
          </h1>
          <p className="text-xs md:text-sm text-rose-200/80 max-w-xl mx-auto leading-relaxed">
            Calculate your exact position size in standard, mini, and micro lots based on your account balance and stop loss pips to preserve capital.
          </p>
        </div>
      </section>

      {/* Calculator Main Grid */}
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
            <h2 className="text-lg font-extrabold text-[#1E0306]">Position Inputs</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Account Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold focus:border-[#ED3C52] focus:outline-none bg-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="NGN">NGN (₦)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Currency Pair / Asset
                </label>
                <select
                  value={pair}
                  onChange={(e) => setPair(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold focus:border-[#ED3C52] focus:outline-none bg-white"
                >
                  <option value="EURUSD">EUR/USD (Euro / US Dollar)</option>
                  <option value="GBPUSD">GBP/USD (British Pound / USD)</option>
                  <option value="USDJPY">USD/JPY (US Dollar / Japanese Yen)</option>
                  <option value="USDCAD">USD/CAD (US Dollar / Canadian Dollar)</option>
                  <option value="AUDUSD">AUD/USD (Australian Dollar / USD)</option>
                  <option value="XAUUSD">XAU/USD (Gold / US Dollar)</option>
                  <option value="BTCUSD">BTC/USD (Bitcoin / US Dollar)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Account Balance ({currency})
                </label>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold focus:border-[#ED3C52] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Risk Amount (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold focus:border-[#ED3C52] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Stop Loss (in Pips)
                </label>
                <input
                  type="number"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold focus:border-[#ED3C52] focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-rose-50 p-4 border border-rose-100 flex items-start gap-3 text-xs text-slate-700">
              <Info className="h-5 w-5 text-[#ED3C52] shrink-0 mt-0.5" />
              <p>
                <strong>The PFX Golden Rule:</strong> Never risk more than 1% to 2% of your capital per trade. Proper lot sizing eliminates emotional anxiety during market volatility.{" "}
                <span className="text-slate-500 italic">Note: Pip values for JPY and commodity pairs fluctuate with exchange rates — verify with your broker.</span>
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Results Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#1E0306] text-white p-6 md:p-8 shadow-xl border border-rose-950 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#ED3C52] mb-1">
                Calculation Output
              </div>
              <h3 className="text-xl font-bold text-white mb-6">Recommended Position Size</h3>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <div className="text-xs text-rose-200/70">Standard Lots (100,000 units)</div>
                  <div className="text-3xl font-black text-[#ED3C52] mt-1">
                    {standardLots.toFixed(2)} Lots
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10">
                    <div className="text-[11px] text-rose-200/70">Mini Lots</div>
                    <div className="text-lg font-bold text-white mt-0.5">{miniLots.toFixed(1)}</div>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10">
                    <div className="text-[11px] text-rose-200/70">Micro Lots</div>
                    <div className="text-lg font-bold text-white mt-0.5">{microLots.toFixed(0)}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-rose-200/80">
                    <span>Cash Amount at Risk:</span>
                    <strong className="text-white">${cashRisk.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between text-rose-200/80">
                    <span>Units to Buy/Sell:</span>
                    <strong className="text-white">{units.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setBalance(10000);
                setRiskPercent(1);
                setStopLossPips(25);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 py-3 text-xs font-bold text-white transition"
            >
              <RefreshCw className="h-4 w-4" /> Reset Inputs
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
