/**
 * Renders a JSON-LD script tag. Data is serialized with `<` escaped so content
 * can never break out of the script block.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
