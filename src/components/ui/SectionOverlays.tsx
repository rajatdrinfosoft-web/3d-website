import React from 'react';
import { ArrowDown, FileText, Sparkles, Send, ExternalLink, Github, Award, Code2, Terminal, ChevronRight } from 'lucide-react';
import { STUDENT_INFO, PROJECTS, TIMELINE, ACHIEVEMENTS, REPOSITORIES } from '../../data/portfolioData';
import { Project, TimelineMilestone } from '../../types/portfolio';
import { soundFx } from '../../utils/audio';

interface SectionOverlaysProps {
  currentChapter: number;
  onNavigate: (index: number) => void;
  onSelectProject: (p: Project) => void;
  onSelectMilestone: (m: TimelineMilestone) => void;
  onOpenContact: () => void;
}

export const SectionOverlays: React.FC<SectionOverlaysProps> = ({
  currentChapter,
  onNavigate,
  onSelectProject,
  onSelectMilestone,
  onOpenContact,
}) => {
  return (
    <div className="relative z-10 w-full pointer-events-none font-body">
      
      {/* SECTION 1: THE SPARK */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto pt-20">
        <div className="max-w-3xl pointer-events-auto space-y-6 animate-scaleUp">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-[#38BDF8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GENESIS • CHAPTER 01</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white leading-tight">
            {STUDENT_INFO.name}
          </h1>

          <p className="text-xl sm:text-2xl font-heading font-medium text-[#38BDF8]">
            {STUDENT_INFO.title} • {STUDENT_INFO.subtitle}
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl">
            {STUDENT_INFO.bio} Currently pursuing {STUDENT_INFO.degree} at {STUDENT_INFO.college}.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                soundFx.playWarpWhoosh();
                onNavigate(1);
              }}
              className="px-6 py-3.5 rounded-xl bg-[#38BDF8] text-[#050505] font-mono font-bold text-xs tracking-wider uppercase flex items-center gap-2.5 hover:bg-[#7dd3fc] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all"
            >
              <span>EXPLORE JOURNEY</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Aarav Sharma - Resume PDF downloaded.');
              }}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 font-mono text-xs hover:border-[#38BDF8] hover:text-[#38BDF8] transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE BEGINNING */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto py-24">
        <div className="max-w-2xl ml-auto pointer-events-auto p-8 rounded-3xl bg-slate-950/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-[#818CF8]">
            <Terminal className="w-3.5 h-3.5" />
            <span>CHAPTER 02 • THE BEGINNING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Curiosity Became Passion
          </h2>

          <blockquote className="border-l-2 border-[#38BDF8] pl-4 text-base sm:text-lg text-slate-200 italic font-light">
            "I started programming because I loved solving problems. Every project taught me something new."
          </blockquote>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            From writing basic C scripts in 2022 to architecting distributed microservices and WebGL experiences, my evolution is driven by relentless iteration and a deep commitment to technical craft.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>ABC Institute of Technology • B.Tech CSE</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: SKILLS CONSTELLATION */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto py-24">
        <div className="max-w-xl pointer-events-auto p-8 rounded-3xl bg-slate-950/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-[#38BDF8]">
            <Code2 className="w-3.5 h-3.5" />
            <span>CHAPTER 03 • CONSTELLATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Tech Constellations
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Hover or click on the 3D star nodes in space to explore individual skill domains, proficiency levels, and architecture patterns.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[#38BDF8] font-bold block">FRONTEND</span>
              <span className="text-slate-300">React 19, Next.js 15, Three.js, Tailwind</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[#818CF8] font-bold block">BACKEND</span>
              <span className="text-slate-300">Node.js, Express, MongoDB, Postgres</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROJECT GALAXY */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto py-24">
        <div className="pointer-events-auto space-y-8">
          <div className="max-w-xl p-6 rounded-2xl bg-slate-950/85 border border-slate-800 backdrop-blur-xl">
            <div className="text-xs font-mono text-[#38BDF8] uppercase mb-1">CHAPTER 04</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Project Galaxy
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Each orbiting planet represents a production software project. Click any planet to inspect the problem, solution, and live demo.
            </p>
          </div>

          {/* Quick Planet Shortcut Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  soundFx.playWarpWhoosh();
                  onSelectProject(proj);
                }}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-[#38BDF8]/60 backdrop-blur-xl cursor-pointer group transition-all"
                data-cursor-type="explore"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: proj.planetColor }}
                    />
                    <span className="text-xs font-mono text-[#38BDF8] uppercase">PLANET</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#38BDF8] transition-colors" />
                </div>
                <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {proj.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TIMELINE */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto py-24">
        <div className="pointer-events-auto space-y-8">
          <div className="max-w-xl p-6 rounded-2xl bg-slate-950/85 border border-slate-800 backdrop-blur-xl">
            <div className="text-xs font-mono text-[#818CF8] uppercase mb-1">CHAPTER 05</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              The Journey & Milestones
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Fly through floating 3D crystals tracing pivotal milestones from 2022 to present. Click any crystal to view full details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIMELINE.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  soundFx.playWarpWhoosh();
                  onSelectMilestone(m);
                }}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-[#818CF8]/60 backdrop-blur-xl cursor-pointer group transition-all"
                data-cursor-type="crystal"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#38BDF8]">{m.year}</span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{m.organization}</span>
                </div>
                <h3 className="text-base font-heading font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: ACHIEVEMENTS */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto py-24">
        <div className="pointer-events-auto space-y-8">
          <div className="max-w-xl p-6 rounded-2xl bg-slate-950/85 border border-slate-800 backdrop-blur-xl">
            <div className="text-xs font-mono text-[#F59E0B] uppercase mb-1">CHAPTER 06</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Achievements & Credentials
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-xl space-y-3"
              >
                <Award className="w-8 h-8 text-[#38BDF8]" />
                <div className="text-3xl font-heading font-extrabold text-white">
                  {ach.value}
                </div>
                <div className="text-sm font-heading font-bold text-slate-200">
                  {ach.title}
                </div>
                <p className="text-xs text-slate-400">
                  {ach.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: OPEN SOURCE */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto py-24">
        <div className="pointer-events-auto space-y-8">
          <div className="max-w-xl p-6 rounded-2xl bg-slate-950/85 border border-slate-800 backdrop-blur-xl">
            <div className="text-xs font-mono text-[#EC4899] uppercase mb-1">CHAPTER 07</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Open Source Repositories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REPOSITORIES.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-[#38BDF8]/60 backdrop-blur-xl space-y-3 group transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-slate-400 group-hover:text-[#38BDF8]" />
                    <span className="font-mono text-sm font-bold text-white group-hover:text-[#38BDF8]">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-xs text-slate-300">
                  {repo.description}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                  <span>★ {repo.stars}</span>
                  <span>⑂ {repo.forks}</span>
                  <span>{repo.language}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CONTACT PORTAL */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 max-w-4xl mx-auto py-24 text-center">
        <div className="pointer-events-auto space-y-6 max-w-xl p-8 rounded-3xl bg-slate-950/90 border border-[#38BDF8]/50 backdrop-blur-2xl shadow-[0_0_50px_rgba(56,189,248,0.2)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FINAL DESTINATION • CHAPTER 08</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            Let's Build Something Amazing Together.
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Open for full-time Software Engineer opportunities, internships, and collaborative projects.
          </p>

          <button
            onClick={() => {
              soundFx.playWarpWhoosh();
              onOpenContact();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#38BDF8] text-[#050505] font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 hover:bg-[#7dd3fc] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all"
          >
            <Send className="w-4 h-4" />
            <span>TRANSMIT MESSAGE IN PORTAL</span>
          </button>
        </div>
      </section>

    </div>
  );
};
