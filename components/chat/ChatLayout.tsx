"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { Chat } from "../icons";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessagesContainer from "./ChatMessagesContainer";
import type { ChatMessage, ChatStatus } from "./types";
import { generateResponse } from "@/actions/AI/AIresponse";

const ChatLayout = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  // the launcher waits until the visitor scrolls past the first screen, so it
  // never covers the main event or the secondary strip
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const check = () => setShown(window.scrollY > window.innerHeight * 0.6);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (content: string) => {
    const newMessages = [
      ...messages,
      { role: "user", content },
    ] as ChatMessage[];
    setMessages(newMessages);
    setStatus("thinking");
    try {
      const response = await generateResponse(newMessages);
      setStatus("idle");
      setMessages((m) => [...m, { role: "assistant", content: response }]);
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.chat.openLabel}
          aria-haspopup="dialog"
          data-hidden={shown ? undefined : ""}
          tabIndex={shown ? undefined : -1}
          className="chat-launcher btn btn-hot fixed bottom-4 right-4 z-50 h-14 gap-3 pl-2 pr-5 sm:bottom-6 sm:right-6"
        >
          <span className="grid size-10 place-items-center rounded-[2px] bg-scale text-ember">
            <Chat className="size-5" />
          </span>
          {t.chat.open}
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-title"
          className="chat-panel plate fixed inset-0 z-[55] flex flex-col overflow-hidden border-anvil sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(40rem,calc(100svh-8rem))] sm:w-[min(25rem,calc(100vw-3rem))] sm:rounded-[3px] sm:border sm:shadow-[0_30px_80px_-30px_rgb(0_0_0/0.95)]"
        >
          <span
            aria-hidden="true"
            className="heat-bar block h-[3px] shrink-0"
            data-heat="hot"
          />
          <ChatHeader
            status={status}
            onClose={() => setOpen(false)}
            canClear={messages.length > 0}
            onClear={() => {
              setMessages([]);
              setStatus("idle");
            }}
          />
          <ChatMessagesContainer
            messages={messages}
            status={status}
            onSuggestion={send}
            onRetry={() => setStatus("idle")}
          />
          <ChatInput onSend={send} disabled={status === "thinking"} autoFocus />
        </div>
      )}
    </>
  );
};

export default ChatLayout;
