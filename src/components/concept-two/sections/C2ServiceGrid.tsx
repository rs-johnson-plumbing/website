import Link from "next/link";
import { ServiceSketch } from "../ui/ServiceSketch";
import { C2Drawing } from "../ui/C2Drawing";

export type ServiceTile = { id: string; label: string; href: string };

/** The illustrated service cards. No photographs, no paragraphs. */
export function C2ServiceGrid({ items, columns = 6, detailed = false }: { items: readonly ServiceTile[]; columns?: 4 | 6; detailed?: boolean }) {
  return (
    <ul className={`c2-service-grid c2-service-grid--${columns}`}>
      {items.map((item) => (
        <li key={item.label}>
          <Link href={item.href} className="c2-service" style={detailed ? { color: "#153e65" } : undefined}>
            {detailed ? <ServiceSketch id={item.id} /> : <C2Drawing id={item.id} />}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
