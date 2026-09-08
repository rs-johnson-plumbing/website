import Link from "next/link";
import { home, site, link } from "@/lib/content";

/**
 * Phone-only strip above the header: Book Service on the left, the phone
 * number on the right. Desktop carries the same actions in the header.
 */
export function UtilityBar() {
  return (
    <div className="grid grid-cols-2 lg:hidden">
      <Link href={link("book")} data-track="book-utility" className="flex h-11 items-center justify-center bg-blue text-[15px] font-bold text-white hover:no-underline">
        {home.utilityBar.book}
      </Link>
      <a href={site.phone.tel} data-track="call-utility" className="flex h-11 items-center justify-center bg-charcoal text-[15px] font-bold text-offwhite">
        {home.utilityBar.call}
      </a>
    </div>
  );
}
