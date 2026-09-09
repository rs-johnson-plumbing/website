import { home, type IconName } from "@/lib/content";
import { IconTile } from "@/components/ui/Icon";
import { MessageForm } from "./MessageForm";
import { cn } from "@/lib/cn";

type ContactDetail = { icon: IconName; label: string; value: string; href?: string };

/**
 * Contact Us: heading, one line, the three facts (call or text, based in,
 * serving) with icon tiles, and the message form. Shared by the homepage and
 * the audience pages; copy lives in home.json under ready.
 */
export function ContactBlock({ id = "contact-h", headingClassName }: { id?: string; headingClassName?: string }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_520px] lg:items-start lg:gap-16">
      <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
        <div className="flex flex-col gap-2">
          <h2 id={id} className={headingClassName ?? "text-center text-h2-m tracking-[-0.01em] lg:text-left lg:text-h2"}>
            {home.ready.heading}
          </h2>
          {home.ready.line && <p className={cn("text-[15px] text-slate builders:text-ondark-muted lg:max-w-[440px] lg:text-body")}>{home.ready.line}</p>}
        </div>
        <ul className="flex w-full max-w-[440px] flex-col gap-3 text-left">
          {(home.ready.details as ContactDetail[]).map((d) => (
            <li key={d.label} className="flex items-center gap-3.5">
              <IconTile name={d.icon} size={44} />
              <div className="flex flex-col leading-tight">
                <span className="text-[12px] font-semibold text-slate builders:text-ondark-muted">{d.label}</span>
                {d.href ? (
                  <a href={d.href} data-track="call-contact" className="text-[18px] font-bold text-charcoal hover:no-underline builders:text-offwhite">
                    {d.value}
                  </a>
                ) : (
                  <span className="text-[17px] font-bold text-charcoal builders:text-offwhite">{d.value}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <MessageForm heading={false} />
    </div>
  );
}
