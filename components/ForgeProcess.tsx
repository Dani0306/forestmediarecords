"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

/** The steps of a music career, each row heats as it reaches the middle of the screen. */
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
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-28">
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
                className="drop grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-anvil py-8 first:border-t sm:grid-cols-[5rem_1fr] sm:gap-x-8 sm:py-8"
              >
                <span
                  className="stencil text-[2.5rem] transition-colors duration-700 [--wdth:70] sm:text-[3.5rem]"
                  style={{
                    color: hot ? "var(--color-glow)" : done ? "var(--color-cherry)" : "var(--color-anvil)",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="stencil text-[clamp(2.2rem,4.6vw,3.75rem)] transition-[color,font-variation-settings] duration-700 ease-[var(--ease-hammer)]"
                    style={{ color: hot ? "var(--color-white-heat)" : "var(--color-iron)", "--wdth": hot ? 92 : 74 } as React.CSSProperties}
                  >
                    {step.name}
                  </h3>
                  <p
                    className="readout mt-2 text-[0.64rem] transition-colors duration-700"
                    style={{ color: hot ? "var(--color-ember)" : "var(--color-steel)" }}
                  >
                    {step.tag}
                  </p>
                  <p className="mt-3 max-w-[36rem] text-[1.0625rem] leading-relaxed text-iron/75">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
