import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertOctagon, CheckCircle2, Flame, DollarSign, Clock, MapPin, UserCheck, ArrowRight, Layers, Lock } from 'lucide-react';

export interface ValidationTierItem {
  tier: number;
  name: string;
  badgeColor: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  condition: string;
  action: string;
  status: string;
}

export interface DocketCaseLead {
  id: string;
  caseId: string;
  plaintiff: string;
  defense: string;
  court: string;
  nosCode: string;
  nosName: string;
  nosMultiplier: number;
  trialDate: string;
  daysUntil: number;
  proximityMultiplier: number;
  ear: number;
  trisScore: number;
  heatTier: 'Red' | 'Orange' | 'Gray';
  validationTier: number;
  conflictFlag: boolean;
}

const VALIDATION_TIERS: ValidationTierItem[] = [
  {
    tier: 1,
    name: 'Tier 1: Pure Automated Pass',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-950/20',
    textColor: 'text-emerald-400',
    condition: 'CS >= Pass Mark AND All Sub-Scores (SQ, VS, C) >= 50%',
    action: 'Instant automated execution & high-confidence pipeline approval.',
    status: 'AUTOMATED APPROVAL'
  },
  {
    tier: 2,
    name: 'Tier 2: Automated Pass with Variance Log',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    borderColor: 'border-indigo-500/40',
    bgColor: 'bg-indigo-950/20',
    textColor: 'text-indigo-400',
    condition: 'CS >= (Pass Mark - 5) AND All Sub-Scores >= 50%',
    action: 'Automated execution with logged variance telemetry for weekly audit.',
    status: 'LOGGED PASS'
  },
  {
    tier: 3,
    name: 'Tier 3: Operator Review Recommended',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-950/20',
    textColor: 'text-amber-400',
    condition: '(Pass Mark - 10) <= CS < Pass Mark',
    action: 'Standard operator sign-off recommended before sales dispatch.',
    status: 'REVIEW RECOMMENDED'
  },
  {
    tier: 4,
    name: 'Tier 4: Mandatory Human Review',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    borderColor: 'border-rose-500/40',
    bgColor: 'bg-rose-950/20',
    textColor: 'text-rose-400',
    condition: 'CS < (Pass Mark - 10) OR Any Sub-Score < 50%',
    action: 'Mandatory operator intervention. Execution locked until sign-off owner approves.',
    status: 'MANDATORY HOLD'
  },
  {
    tier: 5,
    name: 'Tier 5: Automatic Red-Line Stop',
    badgeColor: 'bg-red-950 text-red-400 border-red-800',
    borderColor: 'border-red-600/60',
    bgColor: 'bg-red-950/40',
    textColor: 'text-red-500',
    condition: 'CS < 40.0 OR Ethical Conflict Flag Active',
    action: 'System hard-stop. Target locked out; trigger Change Loop or legal review.',
    status: 'HARD SYSTEM LOCK'
  }
];

const INITIAL_LEADS: DocketCaseLead[] = [
  {
    id: 'L-101',
    caseId: '2026-CA-008412',
    plaintiff: 'BioHealth Corp',
    defense: 'Apex Pharma Inc',
    court: 'Miami-Dade Circuit Court',
    nosCode: '362',
    nosName: 'Medical Malpractice / Pharma',
    nosMultiplier: 2.4,
    trialDate: '2026-11-12',
    daysUntil: 35,
    proximityMultiplier: 1.7,
    ear: 306000,
    trisScore: 78,
    heatTier: 'Red',
    validationTier: 1,
    conflictFlag: false
  },
  {
    id: 'L-102',
    caseId: '2026-CA-009105',
    plaintiff: 'Vanguard Realty Group',
    defense: 'Coastal Logistics LLC',
    court: 'Broward County Circuit Court',
    nosCode: '830',
    nosName: 'Patent / Tech Infringement',
    nosMultiplier: 2.7,
    trialDate: '2026-10-28',
    daysUntil: 20,
    proximityMultiplier: 2.0,
    ear: 405000,
    trisScore: 86,
    heatTier: 'Red',
    validationTier: 1,
    conflictFlag: false
  },
  {
    id: 'L-103',
    caseId: '2026-CA-007299',
    plaintiff: 'Metro Transit Auth',
    defense: 'Southland Builders P.A.',
    court: 'Palm Beach County Court',
    nosCode: '365',
    nosName: 'Personal Injury / Negligence',
    nosMultiplier: 2.5,
    trialDate: '2027-01-15',
    daysUntil: 99,
    proximityMultiplier: 1.4,
    ear: 223125,
    trisScore: 58,
    heatTier: 'Orange',
    validationTier: 3,
    conflictFlag: false
  },
  {
    id: 'L-104',
    caseId: '2026-CA-006110',
    plaintiff: 'Global Equity Partners',
    defense: 'Sunrise Capital Ltd',
    court: 'Orange County Circuit Court',
    nosCode: '440',
    nosName: 'General Civil Contract',
    nosMultiplier: 1.5,
    trialDate: '2027-04-10',
    daysUntil: 184,
    proximityMultiplier: 1.0,
    ear: 112500,
    trisScore: 38,
    heatTier: 'Gray',
    validationTier: 4,
    conflictFlag: true
  }
];

export const ValidationTiersMatrix: React.FC = () => {
  const [selectedLeadId, setSelectedLeadId] = useState<string>('L-101');
  const selectedLead = INITIAL_LEADS.find((l) => l.id === selectedLeadId) || INITIAL_LEADS[0];

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span>Stage 4: Validation Tiers & Heat Map Routing Matrix</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Evaluate elements against CP-ARCH-001 Validation Tiers (1 to 5) and compute LitPulse Expected Addressable Revenue (EAR) & TRIS 0-90 Heat Map routing.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono text-xs">
          <span className="text-slate-400">ROUTING ENGINE:</span>
          <span className="px-3 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 font-bold border border-emerald-500/30 uppercase">
            TRIS 0-90 Active
          </span>
        </div>
      </div>

      {/* 5 VALIDATION TIERS CARDS GRID */}
      <div>
        <h3 className="font-heading font-bold text-xs text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>CP-ARCH-001 Validation Tiers Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {VALIDATION_TIERS.map((tier) => (
            <motion.div
              key={tier.tier}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-xl border space-y-2 ${tier.bgColor} ${tier.borderColor}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 font-bold">T-{tier.tier}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${tier.badgeColor}`}>
                  {tier.status}
                </span>
              </div>
              <h4 className="font-heading font-bold text-xs text-white leading-tight">{tier.name}</h4>
              <div className="text-[10px] font-mono text-slate-300 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[8px] uppercase">RULE CONDITION</span>
                {tier.condition}
              </div>
              <p className="text-[10px] text-slate-400 leading-snug">{tier.action}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TRIS HEAT MAP LEADS ROUTING MATRIX WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* LEFT COLUMN: DOCKET LEADS LIST (5 COLS) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-heading font-bold text-sm text-white flex items-center space-x-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Trial Docket Heat Map Leads</span>
            </h3>
            <span className="text-[10px] font-mono text-indigo-300">4 Active Cases</span>
          </div>

          <div className="space-y-3">
            {INITIAL_LEADS.map((lead) => {
              const isSel = lead.id === selectedLeadId;

              return (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`w-full p-4 rounded-xl text-left border transition-all space-y-2 ${
                    isSel
                      ? 'bg-indigo-600/20 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-indigo-400 font-bold">{lead.caseId}</span>
                      {lead.conflictFlag && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-red-950 text-red-400 border border-red-800">
                          ETHICAL LOCK
                        </span>
                      )}
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        lead.heatTier === 'Red'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : lead.heatTier === 'Orange'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {lead.heatTier.toUpperCase()} HEAT ({lead.trisScore} PTS)
                    </span>
                  </div>

                  <div className="font-heading font-bold text-xs text-white">
                    {lead.plaintiff} v. {lead.defense}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>EAR: ${lead.ear.toLocaleString()}</span>
                    <span>T-Minus {lead.daysUntil} Days</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: LEAD DEEP-DIVE & ROUTING CALCULATION (7 COLS) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
                DOCKET CALCULATION DEEP-DIVE
              </span>
              <h3 className="font-heading font-bold text-lg text-white mt-0.5">
                {selectedLead.plaintiff} vs. {selectedLead.defense}
              </h3>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                selectedLead.heatTier === 'Red'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : selectedLead.heatTier === 'Orange'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {selectedLead.heatTier.toUpperCase()} HEAT TIER
            </span>
          </div>

          {/* ETHICAL LOCK ALERT IF ACTIVE */}
          {selectedLead.conflictFlag && (
            <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-4 flex items-center space-x-3 text-red-300 font-mono text-xs">
              <Lock className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <span className="font-bold block uppercase text-red-400 text-[10px]">ETHICAL CONFLICT LOCK ACTIVE</span>
                Opposing party signed or retained. Target is auto-locked (`status: Conflict - Do Not Contact`).
              </div>
            </div>
          )}

          {/* DOCKET ATTRIBUTES GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-500 block uppercase">NATURE OF SUIT</span>
              <span className="text-white font-bold text-[11px] truncate block">{selectedLead.nosName}</span>
              <span className="text-indigo-400 text-[10px]">Multiplier: {selectedLead.nosMultiplier}x</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-500 block uppercase">PROXIMITY CLOCK</span>
              <span className="text-white font-bold text-[11px] block">{selectedLead.daysUntil} Days to Trial</span>
              <span className="text-emerald-400 text-[10px]">Multiplier: {selectedLead.proximityMultiplier}x</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-500 block uppercase">EST. ADDRESSABLE REV</span>
              <span className="text-emerald-300 font-bold text-sm block">${selectedLead.ear.toLocaleString()}</span>
              <span className="text-slate-500 text-[9px]">Base: $75,000</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-500 block uppercase">TRIS 0-90 SCORE</span>
              <span className="text-amber-300 font-bold text-sm block">{selectedLead.trisScore} / 90</span>
              <span className="text-indigo-400 text-[9px]">Tier {selectedLead.validationTier} Verified</span>
            </div>
          </div>

          {/* EAR FORMULA BREAKDOWN */}
          <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="font-heading font-bold text-xs text-slate-300 uppercase tracking-wider">
              Expected Addressable Revenue (EAR) Formula Engine
            </h4>
            <div className="font-mono text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Base Revenue Baseline:</span>
                <span className="text-white font-bold">$75,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Exhibit Intensity (NOS {selectedLead.nosCode}):</span>
                <span className="text-indigo-400 font-bold">{selectedLead.nosMultiplier}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Proximity Escalation ({selectedLead.daysUntil}d):</span>
                <span className="text-emerald-400 font-bold">{selectedLead.proximityMultiplier}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Continuance Buffer Factor:</span>
                <span className="text-amber-400 font-bold">0.85 (15% Adj)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-emerald-300 font-bold text-sm">
                <span>Calculated EAR:</span>
                <span>${selectedLead.ear.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* SALES REP DISPATCH ACTION */}
          <div className="flex items-center justify-between p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="font-heading font-bold text-xs text-white block">
                  {selectedLead.heatTier === 'Red'
                    ? 'DISPATCH IMMEDIATE SALES REP & COURIER DROP'
                    : 'ROUTINE OUTREACH QUEUE'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Assigned to: Senior Litigation Account Executive
                </span>
              </div>
            </div>

            <button
              disabled={selectedLead.conflictFlag}
              className={`glow-button px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2 ${
                selectedLead.conflictFlag ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{selectedLead.conflictFlag ? 'ETHICAL LOCK' : 'EXECUTE DISPATCH'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
