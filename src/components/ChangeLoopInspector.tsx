import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert, ArrowLeft, ArrowRight, UserCheck, Scale, History, Terminal } from 'lucide-react';

export interface ReturnStep {
  step: number;
  name: string;
  target: string;
  trigger: string;
  remedy: string;
  status: 'active' | 'pending' | 'resolved';
}

const RETURN_STEPS: ReturnStep[] = [
  {
    step: 4,
    name: 'Step 4: Recalibrate Scoring Weights (Wrong Score)',
    target: 'TRIS Urgency Curve & Weighting',
    trigger: 'Lead priority drift detected; actual trial date moved out by court clerk.',
    remedy: 'Adjust urgency curve clock or recalibrate W-band from 80 down to 70.',
    status: 'active'
  },
  {
    step: 3,
    name: 'Step 3: Recalibrate Baseline Values (Wrong Value)',
    target: 'Starting Baseline Value (V₀)',
    trigger: 'Exhibit volume baseline shifted from 50 pages to 120 pages for Patent NOS 830.',
    remedy: 'Update V₀ from $75,000 to $120,000 baseline estimate.',
    status: 'pending'
  },
  {
    step: 2,
    name: 'Step 2: Re-classify Data Tier (Wrong Tier)',
    target: 'Evidence Quality Tier Mapping',
    trigger: 'Lead counsel address source upgraded from scraped Web directory to direct Bar Registry API.',
    remedy: 'Promote element E-02 from Inferrable to Observable Tier (SQ 75% -> 92%).',
    status: 'pending'
  },
  {
    step: 1,
    name: 'Step 1: Add Missing Element (Missing Variable)',
    target: 'Scenario Ingestion Intake Map',
    trigger: 'Emergency continuance motion filed due to judicial hospital leave.',
    remedy: 'Ingest new atomic element E-05: Judicial Continuance History Indicator.',
    status: 'pending'
  }
];

export const ChangeLoopInspector: React.FC = () => {
  const [activeReturnStep, setActiveReturnStep] = useState<number>(4);
  const [waveCount, setWaveCount] = useState<number>(1);
  const [auditLog, setAuditLog] = useState<string[]>([
    '[SYSTEM INIT] Change Loop Inspector initialized under CP-ARCH-001 v1.6 Governance.',
    '[DRIFT DETECTED] Case 2026-CA-008412 trial date shifted +14 days by court order.',
    '[STEP 4 TRIGGER] Initiated Step 4 Score Recalibration. Wave Count: 1/2.'
  ]);

  const handleDismissWarning = () => {
    if (waveCount >= 2) {
      setAuditLog((prev) => [
        ...prev,
        '[ESCALATION ALERT] Waved off warning twice! System automatically escalated case to VP of Legal Operations under Ruling 19.'
      ]);
    } else {
      setWaveCount((prev) => prev + 1);
      setAuditLog((prev) => [
        ...prev,
        `[WARNING WAVED] Operator dismissed warning (${waveCount}/2). Second wave-off will trigger mandatory VP escalation.`
      ]);
    }
  };

  const handleExecuteRemedy = () => {
    setAuditLog((prev) => [
      ...prev,
      `[REMEDY APPLIED] Executed Return Step ${activeReturnStep} fix. Specification document re-converged and locked.`
    ]);
  };

  const currentStep = RETURN_STEPS.find((s) => s.step === activeReturnStep) || RETURN_STEPS[0];

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight flex items-center space-x-3">
            <RotateCcw className="w-6 h-6 text-indigo-400" />
            <span>Stage 5: Change Loop & Human Governance Inspector</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            When lead scores or pipeline rules drift, execute the deterministic 4-step return sequence (Step 4 &rarr; Step 3 &rarr; Step 2 &rarr; Step 1). Enforce human sign-off & double wave-off VP escalation rules.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono text-xs">
          <span className="text-slate-400">ESCALATION CIRCUIT:</span>
          <span className={`px-3 py-1 rounded-lg font-bold border ${
            waveCount >= 2
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 uppercase'
              : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30 uppercase'
          }`}>
            Wave Count: {waveCount} / 2 {waveCount >= 2 ? '(VP ESCALATED)' : '(NORMAL)'}
          </span>
        </div>
      </div>

      {/* 4-STEP RETURN SEQUENCE FLOW GRAPH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {RETURN_STEPS.map((s) => (
          <button
            key={s.step}
            onClick={() => setActiveReturnStep(s.step)}
            className={`p-4 rounded-xl text-left border transition-all space-y-2 ${
              activeReturnStep === s.step
                ? 'bg-indigo-600/20 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs flex items-center justify-center font-bold">
                {s.step}
              </span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                activeReturnStep === s.step ? 'bg-indigo-500/30 text-indigo-300' : 'bg-slate-800 text-slate-400'
              }`}>
                RETURN STEP {s.step}
              </span>
            </div>
            <h4 className="font-heading font-bold text-xs text-white truncate">{s.name}</h4>
            <p className="text-[10px] text-slate-400 line-clamp-2">{s.target}</p>
          </button>
        ))}
      </div>

      {/* STEP INSPECTOR & ESCALATION PANEL (2 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: ACTIVE RETURN STEP DETAILS (7 COLS) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
                EXECUTING RETURN STEP {currentStep.step}
              </span>
              <h3 className="font-heading font-bold text-lg text-white mt-0.5">{currentStep.name}</h3>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              TARGET: {currentStep.target}
            </span>
          </div>

          {/* DRIFT TRIGGER CAUSE */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
            <span className="text-[9px] text-slate-500 uppercase block font-bold">DRIFT TRIGGER CAUSE</span>
            <p className="text-slate-200">{currentStep.trigger}</p>
          </div>

          {/* RECOMMENDED SYSTEM REMEDY */}
          <div className="bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/30 space-y-1 font-mono text-xs">
            <span className="text-[9px] text-indigo-400 uppercase block font-bold">RECOMMENDED SYSTEM REMEDY</span>
            <p className="text-indigo-200">{currentStep.remedy}</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleDismissWarning}
              className="px-4 py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 font-heading font-bold text-xs hover:bg-amber-500/20 transition-all flex items-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>DISMISS / WAVE OFF WARNING ({waveCount}/2)</span>
            </button>

            <button
              onClick={handleExecuteRemedy}
              className="glow-button px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase text-white flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>APPLY RETURN FIX & LOCK SPEC</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: AUDIT TELEMETRY & VP ESCALATION LOG (5 COLS) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-heading font-bold text-sm text-white flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Governance Audit Telemetry Log</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">LIVE TELEMETRY</span>
          </div>

          {/* AUDIT LOG CONTAINER */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] space-y-2 h-64 overflow-y-auto">
            {auditLog.map((log, idx) => (
              <div
                key={idx}
                className={`p-2 rounded border leading-relaxed ${
                  log.includes('ESCALATION')
                    ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                    : log.includes('WARNING')
                    ? 'bg-amber-950/30 border-amber-800/60 text-amber-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                {log}
              </div>
            ))}
          </div>

          {/* VP ESCALATION BANNER IF TRIGGERED */}
          {waveCount >= 2 && (
            <div className="bg-rose-500/10 border border-rose-500/40 rounded-xl p-4 space-y-1 font-mono text-xs">
              <div className="flex items-center space-x-2 text-rose-400 font-bold">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                <span className="uppercase text-[10px]">VP ESCALATION TRIGGERED (RULING 19)</span>
              </div>
              <p className="text-rose-200 text-[11px]">
                Warning dismissed twice without remediation. Case escalated to VP of Legal Operations for mandatory executive review.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
