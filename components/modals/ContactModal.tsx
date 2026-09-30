"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Sparkles, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  "Web Design & Art Direction",
  "Creative Dev & GSAP",
  "High-Converting Landing Page",
  "UI/UX Design Systems",
  "Full Digital Flagship Rebuild",
];

const BUDGET_OPTIONS = ["$15k – $25k", "$25k – $50k", "$50k – $100k", "$100k+"];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_OPTIONS[1]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-stone-50 border border-white/80 p-6 sm:p-8 md:p-10 shadow-2xl text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close Contact Dialog"
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-950 mb-2">
              Inquiry Dispatched
            </h3>
            <p className="text-stone-600 max-w-md mx-auto mb-8 text-sm">
              Thank you, {name || "there"}. I've received your project brief. Expect a personal reply with strategic insights within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 uppercase tracking-widest mb-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initiate Collaboration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 mb-2">
              Let's build something unforgettable.
            </h2>
            <p className="text-sm text-stone-600 mb-6">
              Currently accepting 2 new flagship client engagements for Q4.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                  Primary Scope
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((svc) => (
                    <button
                      type="button"
                      key={svc}
                      onClick={() => setSelectedService(svc)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        selectedService === svc
                          ? "bg-stone-900 text-white shadow-sm"
                          : "bg-stone-200/70 text-stone-700 hover:bg-stone-300"
                      }`}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                  Estimated Investment
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setSelectedBudget(b)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                        selectedBudget === b
                          ? "bg-amber-600 text-white shadow-sm"
                          : "bg-stone-200/70 text-stone-700 hover:bg-stone-300"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maya@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                  Project Brief & Objectives
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your product, timeline, and goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs font-mono text-stone-500 hover:text-stone-900 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct email</span>
                </a>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>TRANSMIT BRIEF</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
