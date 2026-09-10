import { cn } from "@/lib/cn";

/**
 * The visible H1 for pages that open with an anchor bar instead of a hero
 * (For Homeowners, For Builders). Sits under the header, above the bar, and
 * scrolls away with the page.
 */
export function PageTitle({ title, id = "page-h", className }: { title: string; id?: string; className?: string }) {
  return (
    <div className={cn("bg-offwhite", className)}>
      <div className="site-width gutter pb-5 pt-8 lg:pb-8 lg:pt-12">
        <h1 id={id} className="text-[clamp(26px,8vw,32px)] font-bold leading-[1.1] tracking-[-0.01em] lg:text-h1 lg:font-bold">
          {title}
        </h1>
      </div>
    </div>
  );
}
