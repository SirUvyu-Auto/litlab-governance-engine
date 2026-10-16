import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, ShieldAlert, Zap, Tag, Edit3, Shield, Hash, 
  Target, Calendar, User, AlertTriangle, Play 
} from 'lucide-react';
import { ScenarioPreset, HumanAccountabilityParams } from '../types/laboratory';

const PRESETS: ScenarioPreset[] = [
  {
    id: 'paralegal',
    title: 'Paralegal Trial Binder (Legal Tech)',
    icon: 'FileText',
    text: 'A paralegal managing a physical trial binder shifts from remembering tab locations mentally to physically flipping through index tabs once document volume crosses a cognitive threshold.',
    startingValue: '45 min',
    passMark: 80,
    decayInterval: '90 Days',
    owner: 'Lead Paralegal'
  },
  {
    id: 'onboarding',
    title: 'High-Risk Account Onboarding (FinTech)',
    icon: 'ShieldAlert',
    text: 'An automated compliance engine flags new corporate bank accounts for manual KYC audit when initial transfer velocity exceeds daily historical limits.',
    startingValue: '$50,000 / day',
    passMark: 80,
    decayInterval: '30 Days',
    owner: 'Head of Compliance'
  },
  {
    id: 'leadgen',
    title: 'Lead Quality Priority Scoring (B2B SaaS)',
    icon: 'Zap',
    text: 'Sales routing algorithm escalates incoming inbound demo requests to enterprise reps when employee headcount exceeds 250 and tech stack includes target CRM.',
    startingValue: '250 Employees',
    passMark: 70,
    decayInterval: '60 Days',
    owner: 'VP of Revenue Ops'
  },
  {
    id: 'pricing',
    title: 'Dynamic Pricing Bounds (E-Commerce)',
    icon: 'Tag',
    text: 'Automated pricing agent adjusts retail product margins based on inventory turnover velocity without dropping below minimum vendor MAP thresholds.',
    startingValue: '18% Margin Floor',
    passMark: 60,
    decayInterval: '14 Days',
    owner: 'Pricing Lead'
  }
];

export const ScenarioIntakeStudio: React.FC = () => {
  const [scenarioText, setScenarioText] = useState(PRESETS[0].text);
  const [params, setParams] = useState<HumanAccountabilityParams>({
    startingValue: PRESETS[0].startingValue,
    passMark: PRESETS[0].passMark,
    decayInterval: PRESETS[0].decayInterval,
    owner: PRESETS[0].owner
  });
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleApplyPreset = (preset: ScenarioPreset) => {
    setScenarioText(preset.text);
    setParams({
      startingValue: preset.startingValue,
      passMark: preset.passMark,
      decayInterval: preset.decayInterval,
      owner: preset.owner
    });
  };

  const handleRunEngine = () => {
    setIsRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsRunning(false), 500);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  return (
    <div className="p-8 space-y-6">
      {/* WORKSPACE HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight">Scenario Intake Studio</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Ingest plain-language operational scenarios before writing software code. CP-ARCH-001 extracts every rule, variable, and parameter to replace hardcoded assumptions ("invisible rules") with audited human accountability.
          </p>
        </div>

        {/* GLOWING RUN CTA BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRunEngine}
          disabled={isRunning}
          className="glow-button px-6 py-3 rounded-xl font-heading font-bold text-xs tracking-wider text-white uppercase flex items-center space-x-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isRunning ? `RUNNING ENGINES (${progress}%)` : 'RUN 5-PASS LABORATORY ENGINE'}</span>
        </motion.button>
      </div>

      {/* PRESET SELECTION PILLS */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-1">
        <span className="text-xs font-mono text-slate-400 whitespace-nowrap uppercase tracking-wider">Presets:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleApplyPreset(preset)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 hover:bg-indigo-950/60 text-slate-300 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center space-x-2 whitespace-nowrap"
          >
            <span>{preset.title}</span>
          </button>
        ))}
      </div>

      {/* MAIN TEXT INTAKE AREA */}
      <div className="glass-panel rounded-2xl p-6 relative">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-300 flex items-center space-x-2">
            <Edit3 className="w-4 h-4 text-indigo-400" />
            <span>Plain-Language Operational Scenario Text</span>
          </label>
          <span className="text-[10px] font-mono text-slate-500">{scenarioText.length} Characters &bull; Plain Language Format</span>
        </div>

        <textarea
          value={scenarioText}
          onChange={(e) => setScenarioText(e.target.value)}
          rows={4}
          className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all leading-relaxed"
          placeholder="Describe the operational workflow or feature logic in plain English..."
        />
      </div>

      {/* THE 4 MANDATORY HUMAN ACCOUNTABILITY CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>The 4 Mandatory Human Accountability Parameters</span>
          </h3>
          <span className="text-[10px] font-mono text-indigo-400">CP-ARCH-001 Inception Requirement</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* CARD 1: STARTING VALUE */}
          <motion.div whileHover={{ y: -2 }} className="glass-card-interactive p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-400">PARAMETER 1</span>
              <Hash className="w-4 h-4 text-indigo-400" />
            </div>
            <h4 className="font-heading font-bold text-xs text-white">Starting Baseline Value (V₀)</h4>
            <input
              type="text"
              value={params.startingValue}
              onChange={(e) => setParams({ ...params, startingValue: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-slate-500">Initial threshold assumption prior to statistical telemetry.</p>
          </motion.div>

          {/* CARD 2: PASS MARK SELECTION */}
          <motion.div whileHover={{ y: -2 }} className="glass-card-interactive p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400">PARAMETER 2</span>
              <Target className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="font-heading font-bold text-xs text-white">Pass Mark Selection (W-Band)</h4>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {([60, 70, 80] as const).map((mark) => (
                <button
                  key={mark}
                  onClick={() => setParams({ ...params, passMark: mark })}
                  className={`py-1.5 rounded text-[11px] font-mono font-bold transition-all ${params.passMark === mark ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  {mark}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500">
              {params.passMark === 60 ? 'Low Weight (0-33)' : params.passMark === 70 ? 'Middle Weight (34-66)' : 'Top Weight (67-100)'}
            </p>
          </motion.div>

          {/* CARD 3: REVIEW DATE / DECAY RUNWAY */}
          <motion.div whileHover={{ y: -2 }} className="glass-card-interactive p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">PARAMETER 3</span>
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="font-heading font-bold text-xs text-white">Review Date / Decay Interval</h4>
            <input
              type="text"
              value={params.decayInterval}
              onChange={(e) => setParams({ ...params, decayInterval: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-slate-500">Time-decay (Δt) mandatory re-verification runway.</p>
          </motion.div>

          {/* CARD 4: NAMED PARAMETER OWNER */}
          <motion.div whileHover={{ y: -2 }} className="glass-card-interactive p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400">PARAMETER 4</span>
              <User className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="font-heading font-bold text-xs text-white">Final Sign-Off Owner</h4>
            <input
              type="text"
              value={params.owner}
              onChange={(e) => setParams({ ...params, owner: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-sans text-purple-300 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-slate-500">Named human operator accountable for rule accuracy.</p>
          </motion.div>
        </div>
      </div>

      {/* ZERO DEFAULT RULE ALERT BANNER */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-heading font-bold text-xs text-amber-300 uppercase tracking-wider">Zero Default Value Rule Enforcement (Rulings 17 & 18)</h4>
          <p className="text-xs text-slate-300 mt-1">
            If any required element cannot be read or computed in production, the system is strictly forbidden from injecting default fallback values or dummy guesses. Execution holds in full for human sign-off by <strong>{params.owner}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
