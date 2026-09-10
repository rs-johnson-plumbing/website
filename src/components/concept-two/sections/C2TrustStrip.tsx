import { C2Icon, type C2IconName } from "../ui/C2Icon";

/** A quiet row of short proof points under a page hero. */
export function C2TrustStrip({ items }: { items: readonly { icon: string; label: string }[] }) {
  return (
    <div className="c2-trust-strip">
      <div className="c2-wrap">
        <ul>
          {items.map((item) => (
            <li key={item.label}>
              <C2Icon name={item.icon as C2IconName} size={22} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
