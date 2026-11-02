"use client";

import { useState, type FormEvent } from "react";

/* ---------------- Contact form ----------------
   Sends the message to FORM_ENDPOINT, a form service such as Formspree or
   Web3Forms that forwards each message to the inbox. While FORM_ENDPOINT is
   empty, submitting opens the visitor's mail app with the same details, so
   the form still works before a service is set up. A hidden "company" field
   catches bots: real visitors never see it. */

const FORM_ENDPOINT = "https://formspree.io/f/mjyyokpw";
const EMAIL = "abhinesh.productdesign@gmail.com";

const TIMELINES = [
  "Just exploring",
  "Within a month",
  "One to three months",
  "Longer term",
];

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-neutral-500 focus:border-[#FF4B16] focus:outline-none";
const labelClass = "block text-[11px] uppercase tracking-[0.2em] text-neutral-400";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return;

    if (!FORM_ENDPOINT) {
      const body = [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Timeline: ${data.get("timeline")}`,
        "",
        String(data.get("message") ?? ""),
      ].join("\n");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Let's talk")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Form service responded ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-12 grid max-w-2xl gap-5">
      {/* Honeypot for bots. Hidden from people and from screen readers. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Name</span>
          <input name="name" required autoComplete="name" className={fieldClass} placeholder="Your name" />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className={labelClass}>What are you working on?</span>
        <textarea
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-y`}
          placeholder="A product, a problem, or an idea you want to explore."
        />
      </label>

      <label className="grid gap-2">
        <span className={labelClass}>Timeline</span>
        <select name="timeline" defaultValue={TIMELINES[0]} className={fieldClass}>
          {TIMELINES.map((t) => (
            <option key={t} value={t} className="bg-black">
              {t}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black glass-hover disabled:opacity-60 sm:text-base"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-neutral-400" role="status" aria-live="polite">
          {status === "sent" && "Thanks, your message is on its way."}
          {status === "error" && (
            <>
              Something went wrong. Please email{" "}
              <a href={`mailto:${EMAIL}`} className="text-white underline underline-offset-4">
                {EMAIL}
              </a>
              .
            </>
          )}
          {status === "idle" && (
            <>
              Or email{" "}
              <a href={`mailto:${EMAIL}`} className="text-white underline underline-offset-4">
                {EMAIL}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
