import { ArrowUpRight, MoveRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/data/projects";
import { accentClasses } from "@/lib/data/stack";

export function Portfolio() {
  return (
    <section id="projetos" className="section">
      <div className="container">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Projetos / estudos de caso"
            title="Produto digital é onde estratégia encontra execução."
            description="Estes blocos já estão estruturados para você substituir pelos seus projetos reais. A narrativa permanece focada no que importa: contexto, solução e impacto."
          />
        </ScrollReveal>

        <div className="mt-11 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.07}>
              <GlassPanel hoverable className="group h-full p-0">
                <div
                  className={`h-31 border-b border-white/9 bg-gradient-to-br ${accentClasses[project.accent]} p-5`}
                >
                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-white/13 bg-black/15 px-2.5 py-1 font-mono text-[0.55rem] font-bold uppercase tracking-[0.11em] text-slate-200">
                      {project.category}
                    </span>
                    <ArrowUpRight className="size-4 text-slate-400 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-200" />
                  </div>
                  <div className="mt-10 h-px w-20 bg-gradient-to-r from-white/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold leading-6 tracking-[-0.045em] text-white">
                    {project.title}
                  </h3>
                  <div className="mt-6 space-y-4 border-t border-white/[0.075] pt-5">
                    <div>
                      <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-violet-200">
                        Problema
                      </p>
                      <p className="mt-1.5 text-xs leading-5 text-slate-400">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-cyan-200">
                        Solução
                      </p>
                      <p className="mt-1.5 text-xs leading-5 text-slate-400">
                        {project.solution}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-emerald-200">
                        Resultado
                      </p>
                      <p className="mt-1.5 text-xs leading-5 text-slate-400">
                        {project.result}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.09] px-2 py-1 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-cyan-200">
                    Case editável <MoveRight className="size-3.5" />
                  </span>
                </div>
              </GlassPanel>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
