"use client";

import { useId, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { Send } from "../icons";

/** The composer: grows to four lines; Enter sends, Shift + Enter breaks the line. */
export default function ChatInput({
  onSend,
  disabled,
  autoFocus,
}: {
  onSend: (text: string) => void;
  /** e.g. while the assistant is answering */
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  const { t } = useLang();
  const [text, setText] = useState("");
  const area = useRef<HTMLTextAreaElement>(null);
  const hintId = useId();
  const ready = text.trim().length > 0 && !disabled;

  const grow = () => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  };

  const submit = () => {
    if (!ready) return;
    onSend(text.trim());
    setText("");
    requestAnimationFrame(() => {
      grow();
      area.current?.focus();
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="border-t border-anvil px-4 pb-4 pt-3"
    >
      <div className="flex items-end gap-2 rounded-[3px] border border-anvil bg-forge p-1.5 transition-colors focus-within:border-ember">
        <label htmlFor="chat-input" className="sr-only">
          {t.chat.inputLabel}
        </label>
        <textarea
          id="chat-input"
          ref={area}
          rows={1}
          value={text}
          autoFocus={autoFocus}
          placeholder={t.chat.placeholder}
          aria-describedby={hintId}
          onChange={(e) => {
            setText(e.target.value);
            grow();
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              submit();
            }
          }}
          className="chat-field max-h-32 min-h-11 flex-1 resize-none bg-transparent px-2.5 py-2.5 text-[0.95rem] leading-snug text-iron outline-none placeholder:text-steel/70"
        />
        <button
          type="submit"
          aria-disabled={!ready}
          aria-label={t.chat.send}
          className={`btn size-11 min-h-11 shrink-0 p-0 ${ready ? "btn-hot" : "btn-steel opacity-50"}`}
        >
          <Send className="size-5" />
        </button>
      </div>
    </form>
  );
}
