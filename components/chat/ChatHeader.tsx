"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Close, NewChat } from "../icons";
import type { ChatStatus } from "./types";

/** The panel's top bar: the vinyl spins while the assistant thinks. */
export default function ChatHeader({
  status,
  onClose,
  onClear,
  canClear,
}: {
  status: ChatStatus;
  onClose: () => void;
  onClear?: () => void;
  canClear?: boolean;
}) {
  const { t } = useLang();
  return (
    <header className="flex items-center gap-3 border-b border-anvil px-4 py-3">
      <Image
        src="/logo-512.webp"
        alt=""
        width={40}
        height={40}
        className={`size-10 shrink-0 ${status === "thinking" ? "spin-slow" : ""}`}
      />
      <div className="min-w-0 flex-1">
        <h2 id="chat-title" className="stencil truncate text-[1.35rem] leading-none [--wdth:80]">
          {t.chat.title}
        </h2>
        <p className="readout mt-1 flex items-center gap-2 whitespace-nowrap text-[0.55rem] text-steel">
          <span aria-hidden="true" className="chat-online size-1.5 rounded-full bg-glow" />
          {t.chat.status}
        </p>
      </div>
      {canClear && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label={t.chat.clear}
          title={t.chat.clear}
          className="btn btn-steel size-11 min-h-11 shrink-0 p-0"
        >
          <NewChat className="size-5 text-ember" />
        </button>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label={t.chat.close}
        className="btn btn-steel size-11 min-h-11 shrink-0 p-0"
      >
        <Close className="size-5" />
      </button>
    </header>
  );
}
