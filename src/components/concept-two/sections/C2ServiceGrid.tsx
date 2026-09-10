import Link from "next/link";
import { C2Drawing } from "../ui/C2Drawing";

export type ServiceTile = { id: string; label: string; href: string };

/** The illustrated service cards. No photographs, no paragraphs. */
export function C2ServiceGrid({ items }: { items: readonly ServiceTile[] }) {
  return (
    <ul className="c2-service-grid">
      {items.map((item) => (
        <li key={item.label}>
          <Link href={item.href} className="c2-service">
            <C2Drawing id={item.id} />
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
