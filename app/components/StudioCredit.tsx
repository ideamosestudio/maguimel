"use client";

import { useEffect, useRef } from "react";

export default function StudioCredit({ imagePrefix = "/" }: { imagePrefix?: string }) {
  const credit = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const link = credit.current;
    const floating = document.querySelector<HTMLAnchorElement>(".whatsapp-float");
    if (!link || !floating) return;
    const observer = new IntersectionObserver(([entry]) => {
      floating.classList.toggle("whatsapp-float--hidden", entry.isIntersecting);
      floating.setAttribute("aria-hidden", String(entry.isIntersecting));
      floating.tabIndex = entry.isIntersecting ? -1 : 0;
      if (entry.isIntersecting && document.activeElement === floating) link.focus({ preventScroll: true });
    });
    observer.observe(link);
    return () => observer.disconnect();
  }, []);
  return (
    <a ref={credit} className="studio-credit" href="https://ideamos.com.ar" target="_blank" rel="noopener noreferrer" aria-label="Concepto por Ideamos, visitar su sitio web">
      <span>Concepto por</span>
      <img src={imagePrefix + "images/ideamos-credit.webp"} alt="Ideamos" width={870} height={213} loading="lazy" decoding="async" />
    </a>
  );
}
