"use client";

import { Bot, Send, User } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { answerEventQuestion } from "./knowledge";
import { trackEvent } from "@/features/analytics/storage";

type Message = { id: number; role: "assistant" | "user"; content: string };
const starters = ["When is the celebration?", "Where is the venue?", "How do I RSVP?", "What is planned?"];

export function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: 1, role: "assistant", content: "Welcome! I can answer questions using Lakshmi's event details." }]);

  const ask = (question: string) => {
    const cleaned = question.trim();
    if (!cleaned) return;
    trackEvent("ai_question", "/assistant");
    setMessages(current => [...current, { id: Date.now(), role: "user", content: cleaned }, { id: Date.now() + 1, role: "assistant", content: answerEventQuestion(cleaned) }]);
    setInput("");
  };
  const submit = (event: FormEvent) => { event.preventDefault(); ask(input); };

  return (
    <div>
      <div aria-live="polite" className="max-h-[28rem] min-h-72 space-y-4 overflow-y-auto p-5 sm:p-7">
        {messages.map(message => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-[#24112f]"><Bot size={18} /></span>}
            <p className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-royal text-white" : "bg-white/70 text-lilac"}`}>{message.content}</p>
            {message.role === "user" && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/70"><User size={17} /></span>}
          </div>
        ))}
      </div>
      <div className="border-t border-royal/10 p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-2">{starters.map(question => <button key={question} onClick={() => ask(question)} className="rounded-full border border-royal/15 px-3 py-2 text-xs text-lilac hover:bg-royal/10">{question}</button>)}</div>
        <form onSubmit={submit} className="flex gap-2">
          <label className="sr-only" htmlFor="event-question">Ask about the event</label>
          <input id="event-question" value={input} onChange={event => setInput(event.target.value)} maxLength={300} placeholder="Ask about the event…" className="min-w-0 flex-1 rounded-full border border-royal/15 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/45" />
          <Button type="submit" aria-label="Send question" className="px-4"><Send size={18} /></Button>
        </form>
        <p className="mt-3 text-center text-[11px] text-ink/50">Local knowledge mode · Answers only from supplied event information</p>
      </div>
    </div>
  );
}
