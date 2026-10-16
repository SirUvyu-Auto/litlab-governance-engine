import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Layers, AlertCircle, Sparkles } from 'lucide-react';

export interface PipelinePass {
  id: number;
  name: string;
  status: 'completed' | 'running' | 'locked';
  desc: string;
}

export interface DecomposedElement {
  id: string;
  name: string;
  category: 'Input' | 'Rule' | 'Operating Assumption' | 'Output';
  tier: string;
  sq: number;
  vs: number;
  c: number;
  cs: number;
  weight: number;
  desc: string;
}

const PIPELINE_PASSES: PipelinePass[] = [
  { id: 1, name: 'Pass 1: Element Decomposition', status: 'completed', desc: 'Atomic extraction of parameters, rules, and conditions.' },
  { id: 2, name: 'Pass 2: Classification & SQ Tiers', status: 'completed', desc: 'Categorizing inputs, rules, assumptions, outputs, & SQ tiers.' },
  { id: 3, name: 'Pass 3: Adversarial Red-Teaming', status: 'completed', desc: 'Stress-testing for logic gaps & correlated risk drivers.' },
  { id: 4, name: 'Pass 4: Parameter Proposal', status: 'completed', desc: 'Calculated baseline values, weights, and confidence scores.' },
  { id: 5, name: 'Pass 5: Bouncer Lock', status: 'locked', desc: 'Convergence verification & document lock state.' }
];

const DECOMPOSED_ELEMENTS: DecomposedElement[] = [
  {
    id: 'E-01',
    name: 'Document Volume Threshold',
    category: 'Input',
    tier: 'Observable',
    sq: 88, vs: 82, c: 85, cs: 85.5,
    weight: 80,
    desc: 'Physical page count trigger extracted from raw PDF docket headers.'
  },
  {
    id: 'E-02',
    name: 'Index Tab Flip Velocity',
    category: 'Rule',
    tier: 'Inferrable',
    sq: 75, vs: 70, c: 72, cs: 72.8,
    weight: 70,
    desc: 'Estimated minutes per index lookup based on trial binder complexity.'
  },
  {
    id: 'E-03',
    name: 'Paralegal Cognitive Capacity',
    category: 'Operating Assumption',
    tier: 'Elicitable',
    sq: 65, vs: 60, c: 58, cs: 61.8,
    weight: 60,
    desc: 'Assumed threshold of 50 pages before manual indexing memory degrades.'
  },
  {
    id: 'E-04',
    name: 'Automated Tab Generation Output',
    category: 'Output',
    tier: 'Resolvable',
    sq: 95, vs: 90, c: 92, cs: 92.7,
    weight: 80,
    desc: 'Deterministic generation of digital section dividers and index manifests.'
  }
];

export const PipelineVisualizer: React.FC = () => {
  const [selectedPass, setSelectedPass] = useState<number>(1);

  return (
    <div className="space-y-6">
      {/* HEADER TITLE */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight">The 5-Pass AI Pipeline Visualizer</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Watch the scenario process in real-time through the 5 multi-agent Laboratory passes. The Bouncer checks stability across element counts, classifications, and parameter scores before locking the specification document.
        </p>
      </div>

      {/* HORIZONTAL STEPPER GRAPH */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {PIPELINE_PASSES.map((pass) => (
          <motion.button
            key={pass.id}
            whileHover={{ y: -2 }}
            onClick={() => setSelectedPass(pass.id)}
            className={`p-4 rounded-xl text-left border transition-all ${selectedPass === pass.id ? 'bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs flex items-center justify-center font-bold">{pass.id}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="font-heading font-bold text-xs text-white">{pass.name}</h4>
            <p className="text-[10px] text-slate-400 mt-1">{pass.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* BOUNCER CONVERGENCE LOCK BANNER */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-xs text-emerald-300 uppercase tracking-wider">Pass 5 Bouncer Convergence Verdict: SPECIFICATION LOCKED</h4>
            <p className="text-xs text-slate-300 mt-0.5">Element count stability (4/4), classification stability (100%), and parameter scores converged cleanly.</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          CS SCORE: 78.2 / 100
        </span>
      </div>

      {/* DECOMPOSED ELEMENT CARDS GRID */}
      <div>
        <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Decomposed Scenario Elements (Pass 2 & 4 Output)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DECOMPOSED_ELEMENTS.map((el) => (
            <motion.div key={el.id} whileHover={{ y: -2 }} className="glass-card-interactive p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">{el.id}</span>
                  <span className="font-heading font-bold text-sm text-white">{el.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{el.category}</span>
              </div>

              <p className="text-xs text-slate-400">{el.desc}</p>

              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-center font-mono text-[11px]">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">SOURCE QUALITY</span>
                  <span className="text-indigo-400 font-bold">{el.sq}%</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">VOLUME STABILITY</span>
                  <span className="text-indigo-400 font-bold">{el.vs}%</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">CONSISTENCY</span>
                  <span className="text-indigo-400 font-bold">{el.c}%</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
                  <span className="text-[9px] text-emerald-400 block font-bold">CONFIDENCE</span>
                  <span className="text-emerald-300 font-bold">{el.cs}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
