"use client";

import { Fragment, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import type { HormoneUniverseSectionData } from "@/app/lib/types";

export default function LivingHormoneUniverse({
  section,
}: {
  section: HormoneUniverseSectionData;
}) {
  const nodes = useMemo(() => section.nodes ?? [], [section.nodes]);
  const connections = useMemo(() => section.connections ?? [], [section.connections]);

  const systems = useMemo(() => nodes.filter((n) => n.kind === "system"), [nodes]);
  const hormones = useMemo(() => nodes.filter((n) => n.kind === "hormone"), [nodes]);

  const byId = useMemo(
    () => new Map(nodes.map((n) => [n.nodeId, n])),
    [nodes],
  );

  const [activeNodeId, setActiveNodeId] = useState(
    section.defaultNodeId || systems[0]?.nodeId || "",
  );
  const [hoverNodeId, setHoverNodeId] = useState("");

  const displayId = hoverNodeId || activeNodeId;
  const activeNode = displayId ? byId.get(displayId) : undefined;

  /* Labels of every node wired to the one currently in focus. */
  const connectedLabels = useMemo(() => {
    if (!displayId) return [];
    const found = new Set<string>();
    for (const conn of connections) {
      const otherId =
        conn.from === displayId ? conn.to : conn.to === displayId ? conn.from : null;
      if (!otherId) continue;
      const node = byId.get(otherId);
      if (node) found.add(node.label);
    }
    return [...found];
  }, [displayId, connections, byId]);

  /* Nothing to draw without a constellation. */
  if (nodes.length === 0) return null;

  const handleNodeClick = (nodeId: string) =>
    setActiveNodeId((prev) => (prev === nodeId ? "" : nodeId));

  return (
    <section className="bg-slate-950 text-white py-16 sm:py-24 border-t border-brand-subtle relative overflow-hidden">
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Twinkling star dots */}
      <span className="absolute top-[8%] left-[10%] w-1 h-1 rounded-full bg-white/40 animate-ping" />
      <span className="absolute top-[20%] right-[15%] w-1 h-1 rounded-full bg-white/30 animate-pulse" />
      <span className="absolute top-[55%] left-[5%] w-1 h-1 rounded-full bg-indigo-300/50 animate-ping" style={{ animationDelay: "0.7s" }} />
      <span className="absolute bottom-[20%] right-[8%] w-1 h-1 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: "1.2s" }} />
      <span className="absolute bottom-[10%] left-[40%] w-1 h-1 rounded-full bg-purple-300/40 animate-ping" style={{ animationDelay: "0.4s" }} />

      <div className="global-container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {section.badgeText && (
            <span className="inline-block bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 mb-4">
              {section.badgeText}
            </span>
          )}
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-white mb-4">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-16 leading-relaxed text-slate-400 max-w-xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left — Readout terminal */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-[2rem] p-8 flex flex-col">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                {section.telemetryLabel || "System Feedback Telemetry"}
              </span>
            </div>

            {/* AnimatePresence content */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {activeNode ? (
                  <motion.div
                    key={displayId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/10 text-slate-300 border border-white/10 rounded-full px-2 py-0.5 mb-3">
                      {activeNode.kind === "system"
                        ? section.systemNodeType || "Body System"
                        : section.hormoneNodeType || "Hormone"}
                    </span>
                    <h3 className="text-18 font-display font-semibold text-white mb-3 leading-snug">
                      {activeNode.fullLabel || activeNode.label}
                    </h3>
                    {activeNode.description && (
                      <p className="text-14 leading-relaxed text-slate-400 mb-5">
                        {activeNode.description}
                      </p>
                    )}
                    {connectedLabels.length > 0 && (
                      <div>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-2">
                          {section.pathwaysLabel || "Connected Nodes"}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {connectedLabels.map((label) => (
                            <span
                              key={label}
                              className="text-[11px] bg-brand-blue/10 border border-brand-blue/20 text-brand-blue rounded-full px-2 py-0.5"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.emptyStateType && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/10 text-slate-300 border border-white/10 rounded-full px-2 py-0.5 mb-3">
                        {section.emptyStateType}
                      </span>
                    )}
                    <h3 className="text-18 font-display font-semibold text-white mb-3">
                      {section.emptyStateTitle || "Interactive Constellation"}
                    </h3>
                    {section.emptyStateDescription && (
                      <p className="text-14 leading-relaxed text-slate-400">
                        {section.emptyStateDescription}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer hint */}
            {section.hintText && (
              <p className="text-[10px] font-mono text-slate-600 mt-6 leading-relaxed">
                {section.hintText}
              </p>
            )}
          </div>

          {/* Right — Constellation */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-900 rounded-[2rem] p-6 lg:p-8 min-h-[460px]">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] min-h-[400px]">
              {/* SVG connection matrix layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <style>{`
                  @keyframes dash { to { stroke-dashoffset: -20; } }
                  .animate-dash-line { animation: dash 1.5s linear infinite; }
                `}</style>
                {connections.map((conn) => {
                  const fromNode = byId.get(conn.from);
                  const toNode = byId.get(conn.to);
                  if (!fromNode || !toNode) return null;
                  const isConnectionActive =
                    conn.from === displayId || conn.to === displayId;

                  return (
                    <Fragment key={conn.id}>
                      {/* Glow layer underneath */}
                      {isConnectionActive && (
                        <line
                          x1={`${fromNode.x}%`}
                          y1={`${fromNode.y}%`}
                          x2={`${toNode.x}%`}
                          y2={`${toNode.y}%`}
                          className="stroke-brand-blue opacity-25"
                          strokeWidth={8}
                          strokeLinecap="round"
                        />
                      )}
                      {/* Core line */}
                      <line
                        x1={`${fromNode.x}%`}
                        y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`}
                        y2={`${toNode.y}%`}
                        className={`transition-all duration-500 ${
                          isConnectionActive
                            ? "stroke-brand-blue opacity-100 animate-dash-line"
                            : "stroke-slate-800 opacity-20"
                        }`}
                        strokeWidth={isConnectionActive ? 2.5 : 1}
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: isConnectionActive ? "8 4" : "none",
                        }}
                      />
                    </Fragment>
                  );
                })}
              </svg>

              {/* 1. Health Systems (Outer Glow Circles) */}
              {systems.map((sys) => {
                const isActive = displayId === sys.nodeId;
                return (
                  <div
                    key={sys.id}
                    style={{ left: `${sys.x}%`, top: `${sys.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onMouseEnter={() => setHoverNodeId(sys.nodeId)}
                      onMouseLeave={() => setHoverNodeId("")}
                      onClick={() => handleNodeClick(sys.nodeId)}
                      className="relative group focus:outline-none cursor-pointer"
                    >
                      {/* Pulsating interactive halo aura */}
                      <span
                        className={`absolute inset-0 rounded-full -m-4 transition-all duration-300 pointer-events-none ${
                          isActive
                            ? "bg-brand-blue/15 scale-125 blur-sm"
                            : "bg-transparent scale-0 group-hover:bg-slate-800/20 group-hover:scale-100"
                        }`}
                      />

                      {/* Interactive Circle Hub */}
                      <div
                        className={`p-4 rounded-full border transition-all duration-300 flex items-center justify-center font-display font-black text-xs uppercase tracking-tight shadow-md ${
                          isActive
                            ? "bg-slate-900 border-brand-blue text-white scale-110 ring-4 ring-brand-blue/10"
                            : "bg-slate-950 border-slate-800 text-slate-400 group-hover:border-slate-700 group-hover:text-slate-200"
                        }`}
                      >
                        {sys.label}
                      </div>
                    </button>
                  </div>
                );
              })}

              {/* 2. Hormone Star Nodes */}
              {hormones.map((horm) => {
                const isActive = displayId === horm.nodeId;
                return (
                  <div
                    key={horm.id}
                    style={{ left: `${horm.x}%`, top: `${horm.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    <button
                      onMouseEnter={() => setHoverNodeId(horm.nodeId)}
                      onMouseLeave={() => setHoverNodeId("")}
                      onClick={() => handleNodeClick(horm.nodeId)}
                      className="relative group flex flex-col items-center focus:outline-none cursor-pointer"
                    >
                      {/* Soft background glow on active */}
                      <span
                        className={`absolute h-7 w-7 rounded-full transition-all duration-300 pointer-events-none ${
                          isActive
                            ? "bg-brand-blue/20 blur-md scale-150"
                            : "bg-transparent scale-0"
                        }`}
                      />

                      {/* Sparkle Star Node */}
                      <div
                        className={`transition-all duration-300 flex items-center justify-center rounded-full p-2 border ${
                          isActive
                            ? "bg-brand-blue border-white text-white scale-125"
                            : "bg-slate-900 border-slate-800 text-slate-500 group-hover:border-slate-700 group-hover:text-slate-300"
                        }`}
                      >
                        <Star size={10} className={isActive ? "fill-white" : ""} />
                      </div>

                      {/* Text under label */}
                      <span
                        className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono font-bold tracking-tight transition-all px-1.5 py-0.5 rounded ${
                          isActive
                            ? "bg-brand-blue text-white opacity-100 translate-y-0"
                            : "bg-slate-950 border border-slate-900 text-slate-500 group-hover:text-slate-300 translate-y-1"
                        }`}
                      >
                        {horm.label}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
