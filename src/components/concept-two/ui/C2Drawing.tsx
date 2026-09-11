import { ServiceSketch } from "./ServiceSketch";

/** Legacy illustration entry point shares the approved hybrid artwork. */
export function C2Drawing({ id, className }: { id: string; className?: string }) {
 return <ServiceSketch id={id} className={className}/>;
}
