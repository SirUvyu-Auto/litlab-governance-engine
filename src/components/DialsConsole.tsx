import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Activity, Percent, Lock } from 'lucide-react';

export interface ElementDialState {
  id: string;
  name: string;
  category: 'Input' | 'Rule' | 'Operating Assumption' | 'Output';
  tier: string;
  sq: number;
  vs: number;
  c: number;
  weight: number;
  desc: string;
}

const INITIAL_ELEMENTS: ElementDialState[] = [
  {
    id: 'E-01',
    name: 'Document Volume Threshold',
    category: 'Input',
    tier: 'Observable',
    sq: 88,
    vs: 82,
    c: 85,
    weight: 80,
    desc: 'Physical page count trigger extracted from raw PDF docket headers.'
  },
  {
    id: 'E-02',
    name: 'Index Tab Flip Velocity',
    category: 'Rule',
    tier: 'Inferrable',
    sq: 75,
    vs: 70,
    c: 72,
    weight: 70,
    desc: 'Estimated minutes per index lookup based on trial binder complexity.'
  },
  {
    id: 'E-03',
    name: 'Paralegal Cognitive Capacity',
    category: 'Operating Assumption',
    tier: 'Elicitable',
    sq: 65,
    vs: 60,
    c: 58,
    weight: 60,
    desc: 'Assumed threshold of 50 pages before manual indexing memory degrades.'
  },
  {
    id: 'E-04',
    name: 'Automated Tab Generation Output',
    category: 'Output',
    tier: 'Resolvable',
    sq: 95,
    vs: 90,
    c: 92,
    weight: 80,
    desc: 'Deterministic generation of digital section dividers and index manifests.'
  }
];

interface DialsConsoleProps {
  passMark?: number;
}

export const DialsConsole: React.FC<DialsConsoleProps> = ({ passMark = 80 }) => {
  const [elements, setElements] = useState<ElementDialState[]>(INITIAL_ELEMENTS);
  const [selectedId, setSelectedId] = useState<string>('E-01');

  const selectedElement = elements.find((e) => e.id === selectedId) || elements[0];

  const updateDial = (key: 'sq' | 'vs' | 'c' | 'weight', val: number) => {
    setElements((prev) =>
      prev.map((el) => (el.id === selectedId ? { ...el, [key]: val } : el))
    );
  };

  // Formula: CS = SQ*0.46 + VS*0.31 + C*0.23
  const rawCS = Number((selectedElement.sq * 0.46 + selectedElement.vs * 0.31 + selectedElement.c * 0.23).toFixed(1));

  // Sub-Score Floor Rule: Any sub-score < 50 hard-caps CS at 49.0
  const isFloorBreached = selectedElement.sq < 50 || selectedElement.vs < 50 || selectedElement.c < 50;
  const finalCS = isFloorBreached ? Math.min(rawCS, 49.0) : rawCS;

  const isPassed = finalCS >= passMark;

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight flex items-center space-x-3">
            <Sliders className="w-6 h-6 text-indigo-400" />
            <span>The 3-Dials Interactive Console</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Calibrate element confidence sub-scores (Source Quality $SQ$, Volume Stability $VS$, Consistency $C$) and Business Impact Weight ($W$). Compute real-time Confidence Scores ($CS$) under CP-ARCH-001 v1.6 rules.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono text-xs">
          <span className="text-slate-400">ACTIVE PASS MARK:</span>
          <span className="px-3 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/30">
            {passMark} / 100
          </span>
        </div>
      </div>

      {/* ELEMENT SELECTOR TABS */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
        {elements.map((el) => {
          const elRaw = Number((el.sq * 0.46 + el.vs * 0.31 + el.c * 0.23).toFixed(1));
          const elBreached = el.sq < 50 || el.vs < 50 || el.c < 50;
          const elCS = elBreached ? Math.min(elRaw, 49.0) : elRaw;
          const isSel = el.id === selectedId;

          return (
            <button
              key={el.id}
              onClick={() => setSelectedId(el.id)}
              className={`flex-1 min-w-[200px] p-3.5 rounded-xl text-left border transition-all ${
                isSel
                  ? 'bg-indigo-600/20 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 font-bold">{el.id}</span>
                <span className={`text-[10px] font-mono font-bold ${elCS >= passMark ? 'text-emerald-400' : 'text-crimsonGlow'}`}>
                  CS: {elCS}
                </span>
              </div>
              <h4 className="font-heading font-bold text-xs text-white truncate mt-1">{el.name}</h4>
              <span className="text-[9px] font-mono text-indigo-300 block mt-0.5">{el.category}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN WORKSPACE: 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: DIALS & SLIDERS (7 COLS) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">CALIBRATING ELEMENT</span>
              <h3 className="font-heading font-bold text-lg text-white mt-0.5">{selectedElement.name}</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-indigo-300 border border-slate-700">
              {selectedElement.tier} Evidence
            </span>
          </div>

          <p className="text-xs text-slate-400">{selectedElement.desc}</p>

          {/* DIAL 1: SOURCE QUALITY (SQ) */}
          <div className="space-y-2 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <label className="font-heading font-bold text-xs text-white">Source Quality ($SQ$)</label>
                <span className="text-[10px] text-slate-400 font-mono">(Weight: 46%)</span>
              </div>
              <span className={`font-mono text-sm font-bold ${selectedElement.sq < 50 ? 'text-crimsonGlow' : 'text-indigo-400'}`}>
                {selectedElement.sq}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={selectedElement.sq}
              onChange={(e) => updateDial('sq', parseInt(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Evaluates empirical origin, audit trail, and verification tier strength.</p>
          </div>

          {/* DIAL 2: VOLUME STABILITY (VS) */}
          <div className="space-y-2 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <label className="font-heading font-bold text-xs text-white">Volume Stability ($VS$)</label>
                <span className="text-[10px] text-slate-400 font-mono">(Weight: 31%)</span>
              </div>
              <span className={`font-mono text-sm font-bold ${selectedElement.vs < 50 ? 'text-crimsonGlow' : 'text-emerald-400'}`}>
                {selectedElement.vs}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={selectedElement.vs}
              onChange={(e) => updateDial('vs', parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Measures historical operational throughput and sample size stability.</p>
          </div>

          {/* DIAL 3: CONSISTENCY (C) */}
          <div className="space-y-2 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <label className="font-heading font-bold text-xs text-white">Consistency ($C$)</label>
                <span className="text-[10px] text-slate-400 font-mono">(Weight: 23%)</span>
              </div>
              <span className={`font-mono text-sm font-bold ${selectedElement.c < 50 ? 'text-crimsonGlow' : 'text-amber-400'}`}>
                {selectedElement.c}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={selectedElement.c}
              onChange={(e) => updateDial('c', parseInt(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Checks logic repeatability and absence of conflicting operational rules.</p>
          </div>

          {/* BUSINESS IMPACT WEIGHT (W) */}
          <div className="space-y-2 bg-slate-950/70 p-4 rounded-xl border border-indigo-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <label className="font-heading font-bold text-xs text-white">Business Impact Weight ($W$)</label>
              </div>
              <span className="font-mono text-sm font-bold text-purple-300">{selectedElement.weight} / 100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={selectedElement.weight}
              onChange={(e) => updateDial('weight', parseInt(e.target.value))}
              className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Execution risk priority multiplier used for final risk routing.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: CALCULATOR & GAUGES (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* CONFIDENCE SCORE RADIAL GAUGE & VERDICT */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col items-center text-center space-y-4">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">MASTER CONFIDENCE SCORE (CS)</span>

            {/* CIRCULAR GAUGE */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1E293B" strokeWidth="8" fill="transparent" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={isFloorBreached ? '#EF4444' : isPassed ? '#10B981' : '#F59E0B'}
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * finalCS) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * finalCS) / 100 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className={`font-mono text-3xl font-extrabold ${isFloorBreached ? 'text-crimsonGlow' : isPassed ? 'text-emerald-300' : 'text-amber-400'}`}>
                  {finalCS}
                </span>
                <span className="text-[10px] font-mono text-slate-400">/ 100 CS</span>
              </div>
            </div>

            {/* VERDICT BADGE */}
            <div className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center space-x-2 font-heading font-bold text-xs ${
              isPassed
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-crimsonGlow/10 border-crimsonGlow/40 text-crimsonGlow'
            }`}>
              {isPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-crimsonGlow" />}
              <span>{isPassed ? `CS (${finalCS}) >= PASS MARK (${passMark}) — VERIFIED` : `CS (${finalCS}) < PASS MARK (${passMark}) — BREACHED`}</span>
            </div>
          </div>

          {/* SUB-SCORE FLOOR RULE ALERT (RULINGS 17 & 18) */}
          {isFloorBreached ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-500/10 border border-red-500/40 rounded-2xl p-5 space-y-2 shadow-lg shadow-red-500/10"
            >
              <div className="flex items-center space-x-2 text-red-400">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider">Sub-Score Floor Breach (Ruling 17 & 18)</h4>
              </div>
              <p className="text-xs text-red-200 leading-relaxed">
                One or more sub-scores ($SQ, VS, C$) dropped below 50%. The Master Confidence Score has been hard-capped at <strong>49.0</strong> (Raw CS was {rawCS}).
              </p>
              <div className="pt-2 border-t border-red-500/30 flex items-center justify-between font-mono text-[10px] text-red-300">
                <span>ACTION REQUIRED:</span>
                <span className="font-bold uppercase tracking-wider">Tier 4 Mandatory Human Review</span>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider">Sub-Score Floor Integrity Intact</h4>
              </div>
              <p className="text-xs text-slate-400">
                All sub-scores are $\ge 50\%$. Raw weighted formula operates without artificial ceiling caps.
              </p>
            </div>
          )}

          {/* FORMULA MATHEMATICAL BREAKDOWN */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-heading font-bold text-xs text-slate-300 uppercase tracking-wider">Weighted Formula Breakdown</h4>
            <div className="font-mono text-xs space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">SQ Contribution (46%):</span>
                <span className="text-indigo-400 font-bold">{(selectedElement.sq * 0.46).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">VS Contribution (31%):</span>
                <span className="text-emerald-400 font-bold">{(selectedElement.vs * 0.31).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">C Contribution (23%):</span>
                <span className="text-amber-400 font-bold">{(selectedElement.c * 0.23).toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-white font-bold">
                <span>Calculated Raw CS:</span>
                <span className="text-indigo-300">{rawCS}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
