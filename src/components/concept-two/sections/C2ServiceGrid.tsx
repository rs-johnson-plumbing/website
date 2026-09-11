import Link from "next/link";
import { ServiceSketch } from "../ui/ServiceSketch";
import { C2Drawing } from "../ui/C2Drawing";

export type ServiceTile = { id: string; label: string; href: string };

/** The illustrated service cards. */
export function C2ServiceGrid({ items, columns = 6, detailed = false, onSelect }: { items: readonly ServiceTile[]; columns?: 4 | 6; detailed?: boolean; onSelect?: (item: ServiceTile) => void }) {
  return (
    <ul className={`c2-service-grid c2-service-grid--${columns}`}>
      {items.map((item) => {
        const content = <>{detailed ? <ServiceSketch id={item.id === "remodels" ? "trim" : item.id === "other" ? "fixtures" : item.id} /> : <C2Drawing id={item.id} />}<span>{item.label}</span></>;
        return <li key={item.label}>
          {onSelect ? <button type="button" className={`c2-service${detailed ? " c2-service--sketch" : ""}`} style={{ width: "100%", font: "inherit", cursor: "pointer", ...(detailed ? { color: "#153e65" } : {}) }} aria-haspopup="dialog" onClick={() => onSelect(item)}>{content}</button>
            : <Link href={item.href} className="c2-service" style={detailed ? { color: "#153e65" } : undefined}>{content}</Link>}
        </li>;
      })}
    </ul>
  );
}
