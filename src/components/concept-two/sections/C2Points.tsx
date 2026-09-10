/** Short reasons in a plain two-up list. Headings carry the message. */
export function C2Points({ id, heading, items }: { id: string; heading: string; items: readonly { title: string; text: string }[] }) {
  return (
    <section id={id} className="c2-section c2-section--sand" aria-labelledby={`${id}-heading`}>
      <div className="c2-wrap">
        <h2 id={`${id}-heading`} className="c2-h2">
          {heading}
        </h2>
        <ul className="c2-points">
          {items.map((item) => (
            <li key={item.title}>
              <h3 className="c2-h3">{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
