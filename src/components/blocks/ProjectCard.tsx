import type { Project } from "@/lib/content";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

/**
 * Builder project card: small blue city label, bold project type, scope line.
 * The image slot is collapsed until a real photo exists (`withPhoto`), so the
 * card never shows a large empty block.
 */
export function ProjectCard({ project, withPhoto = false }: { project: Project; withPhoto?: boolean }) {
  return (
    <div className="flex flex-col gap-2 rounded-card border border-hairline bg-white p-6">
      {withPhoto && <PhotoPlaceholder photo={project.photo} aspect="3/2" className="mb-2" />}
      <div className="text-[13px] font-bold uppercase tracking-[0.04em] text-blue">{project.city}</div>
      <div className="text-[18px] font-semibold">{project.type}</div>
      <p className="text-[15px] leading-relaxed text-slate">{project.scope}</p>
    </div>
  );
}
