import type { FC } from "react";

const UnderConstruction: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="text-center max-w-lg mx-auto">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center animate-pulse-slow">
            <span className="text-3xl sm:text-4xl">⚔️</span>
          </div>
        </div>

        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-slate-100 mb-2">
          Age of Battles
        </h1>
        <p className="text-amber-400/90 font-semibold text-sm sm:text-base uppercase tracking-widest mb-6">
          Multiplayer RPG
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-8 sm:mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-slate-300 text-sm sm:text-base">
            Under construction
          </span>
        </div>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          We're building something great. Check back soon or follow us for
          updates.
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;