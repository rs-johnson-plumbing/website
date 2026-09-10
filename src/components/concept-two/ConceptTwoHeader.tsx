"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { conceptTwo as copy, site, smsLink } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { RequestServiceButton } from "./RequestServiceButton";
import styles from "./concept-two.module.css";

export function ConceptTwoHeader() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#concept-two-main">{copy.ui.skipToContent}</a>
      <div className={`site-width gutter ${styles.headerInner}`}>
        <Logo />
        <nav aria-label={copy.ui.primaryNavigation} className={styles.desktopNav}>
          {copy.navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className={styles.headerActions}>
          <a href={site.phone.tel} className={styles.headerPhone}><Icon name="phone" size={17} />{site.phone.display}</a>
          <RequestServiceButton label={copy.ui.requestService} compact />
        </div>
        <button ref={menuButton} type="button" className={styles.menuButton} aria-expanded={open} aria-controls="concept-two-menu" aria-label={open ? copy.ui.closeMenu : copy.ui.openMenu} onClick={() => setOpen(!open)}>
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>
      <nav id="concept-two-menu" aria-label={copy.ui.mobileNavigation} hidden={!open} className={styles.mobileNav}>
        {copy.navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<Icon name="arrow-right" /></Link>)}
        <div className={styles.menuContact}>
          <a href={site.phone.tel}>{site.cta.call}<Icon name="phone" /></a>
          <a href={smsLink()}>{site.cta.text}<Icon name="message" /></a>
        </div>
      </nav>
    </header>
  );
}
