"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import type { ChatMessage, ChatStatus } from "./types";

export default function ChatMessagesContainer({
  messages,
  status,
  onSuggestion,
  onRetry,
}: {
  messages: ChatMessage[];
  status: ChatStatus;
  onSuggestion: (text: string) => void;
  onRetry?: () => void;
}) {
  const { t } = useLang();
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages.length, status]);

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label={t.chat.log}
      className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 [scrollbar-width:thin]"
    >
      {/* the greeting always opens the log */}
      <div className="chat-turn max-w-[90%]">
        <p className="stamp mb-2 text-glow">{t.chat.bot}</p>
        <p className="rounded-[3px] border border-anvil bg-forge px-4 py-3 text-[0.95rem] leading-relaxed text-iron/90">
          {t.chat.greeting}
        </p>
      </div>

      {messages.length === 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {t.chat.suggestions.map((q) => (
            <li key={q}>
              <button
                type="button"
                onClick={() => onSuggestion(q)}
                className="min-h-11 rounded-[3px] border border-iron/20 px-3 py-2 text-left text-[0.88rem] leading-snug text-iron/85 transition-colors hover:border-ember hover:bg-forge-3 hover:text-white-heat"
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
      )}

      <ol className="mt-5 flex flex-col gap-5">
        {messages.map((m) =>
          m.role === "assistant" ? (
            <li key={m.content} className="chat-turn max-w-[90%]">
              <p className="stamp mb-2 text-glow">{t.chat.bot}</p>
              <p className="whitespace-pre-line rounded-[3px] border border-anvil bg-forge px-4 py-3 text-[0.95rem] leading-relaxed text-iron/90">
                {m.content}
              </p>
            </li>
          ) : (
            <li
              key={m.content}
              className="chat-turn ml-auto max-w-[85%] text-right"
            >
              <p className="stamp mb-2">{t.chat.you}</p>
              <p className="whitespace-pre-line rounded-[3px] border border-ember/30 bg-[linear-gradient(135deg,rgb(255_90_17/0.16),rgb(194_30_14/0.1))] px-4 py-3 text-left text-[0.95rem] leading-relaxed text-iron">
                {m.content}
              </p>
            </li>
          ),
        )}

        {status === "thinking" && (
          <li className="chat-turn max-w-[90%]">
            <p className="stamp mb-2 text-glow">{t.chat.bot}</p>
            <p className="inline-flex items-center gap-3 rounded-[3px] border border-anvil bg-forge px-4 py-3">
              <span aria-hidden="true" className="flex gap-1.5">
                {[0, 1, 2].map((k) => (
                  <span
                    key={k}
                    className="chat-dot size-1.5 rounded-full bg-ember"
                    style={{ animationDelay: `${k * 0.18}s` }}
                  />
                ))}
              </span>
              <span className="readout text-[0.6rem] text-steel">
                {t.chat.thinking}
              </span>
            </p>
          </li>
        )}

        {status === "error" && (
          <li
            role="alert"
            className="rounded-[3px] border border-cherry bg-cherry/10 px-4 py-3"
          >
            <p className="text-[0.9rem] leading-relaxed text-iron/90">
              {t.chat.error}
            </p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="readout mt-2 min-h-11 text-[0.62rem] text-ember hover:text-white-heat"
              >
                {t.chat.retry}
              </button>
            )}
          </li>
        )}
      </ol>
      <div ref={end} />
    </div>
  );
}
