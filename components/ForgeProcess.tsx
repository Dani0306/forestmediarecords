"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

/** Five steps of artist development, each row heats as it reaches the hammer line. */
export default function ForgeProcess() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="forja" aria-labelledby="forja-title" className="border-t border-anvil">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-36">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="forja-title" className="stencil drop text-[clamp(2.75rem,6vw,4.5rem)] [--wdth:74]">
              {t.forge.title}
            </h2>
            <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-iron/80">{t.forge.intro}</p>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {t.forge.steps.map((step, i) => {
            const hot = i === active;
            const done = i < active;
            return (
              <li
                key={step.name}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                data-i={i}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-anvil py-8 first:border-t sm:grid-cols-[5.5rem_1fr_auto] sm:gap-x-8 sm:py-10"
              >
                <span
                  className="stencil text-[2.75rem] transition-colors duration-700 [--wdth:70] sm:text-[4rem]"
                  style={{
                    color: hot ? "var(--color-glow)" : done ? "var(--color-cherry)" : "var(--color-anvil)",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="stencil text-[clamp(2.4rem,5.4vw,4.25rem)] transition-[color,font-variation-settings] duration-700 ease-[var(--ease-hammer)]"
                    style={{ color: hot ? "var(--color-white-heat)" : "var(--color-iron)", "--wdth": hot ? 92 : 74 } as React.CSSProperties}
                  >
                    {step.name}
                  </h3>
                  <p className="mt-3 max-w-[36rem] text-[1.0625rem] leading-relaxed text-iron/75">{step.body}</p>
                </div>
                <div className="hidden h-full items-center gap-3 sm:flex" aria-hidden="true">
                  <span className="relative h-16 w-px bg-anvil">
                    {[0, 1, 2, 3, 4].map((k) => (
                      <span key={k} className="absolute left-0 h-px w-2 bg-steel/50" style={{ top: `${k * 25}%` }} />
                    ))}
                    <span
                      className="absolute -left-1 h-0.5 w-3 bg-ember transition-[top,opacity] duration-700"
                      style={{ top: hot ? "20%" : "100%", opacity: hot || done ? 1 : 0 }}
                    />
                  </span>
                  <span className="readout w-16 text-[0.65rem]" style={{ color: hot ? "var(--color-ember)" : "var(--color-steel)" }}>
                    +{(i + 1) * 25}MM
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
