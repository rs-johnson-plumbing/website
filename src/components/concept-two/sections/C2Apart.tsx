import { conceptTwo as copy } from "@/lib/content";
import { C2Icon, type C2IconName } from "../ui/C2Icon";

/** Four differentiators, thin dividers, no explanatory copy. */
export function C2Apart() {
  const apart = copy.home.apart;
  return (
    <section className="c2-section c2-section--apart c2-section--paper" aria-labelledby="c2-apart-heading">
      <div className="c2-wrap">
        <h2 id="c2-apart-heading" className="c2-h2 c2-center">
          {apart.heading}
        </h2>
        <ul className="c2-apart-grid">
          {apart.items.map((item) => (
            <li key={item.line1}>
              <C2Icon name={item.icon as C2IconName} size={46} />
              <span>
                {item.line1}
                <br />
                {item.line2}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
