import React, { useState } from "react";

const PROJECTS = [
  {
    name: "Yesod",
    description:
      "Experimental Ethereum library for writing hyper-efficient smart contracts. Minimal abstractions over raw EVM opcodes. Inspired by Solmate and Solady.",
    link: "https://github.com/0x11semprez/yesod",
  },
  {
    name: "Ein-Sof",
    description:
      "Pure C algorithmics laboratory. Sorting, searching, graph traversal, dynamic programming. No dependencies. No mercy.",
    link: "https://github.com/0x11semprez/ein-sof",
  },
  {
    name: "ASA.",
    description:
      "B2B SaaS platform for agency teams. Centralized messaging, meeting scheduling, task planning, and collaborative notes. Mac && IOS native. CTO & Solutions Architect. We helped businesses to scale millions dollars.",
    link: "https://asacore.xyz",
  },
];

const CONTACTS = [
  {
    label: "email",
    value: "traoresemprez@icloud.com",
    href: "mailto:traoresemprez@icloud.com",
  },
  {
    label: "github",
    value: "github.com/0x11semprez",
    href: "https://github.com/0x11semprez",
  },
  { label: "discord", value: "0x11semprez", copy: true },
  {
    label: "telegram",
    value: "pupp3tm4st3r",
    href: "https://t.me/pupp3tm4st3r",
  },
];

export default function Portfolio() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (value, label) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <style>{
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap');
      `}</style>

      <div
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        className="min-h-screen bg-white text-black selection:bg-black selection:text-white"
      >
        <section className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 max-w-3xl">
          <div className="text-sm leading-loose text-neutral-700 max-w-xl">
            <p>semprez's real name is kassim.</p>
            <p>kassim is a hard worker.</p>
            <p>kassim hits the GYM.</p>
            <p>kassim likes beretta guns.</p>
            <p>kassim hates people with no critical thinking.</p>
            <p>kassim miss his little cousin.</p>
            <p>kassim likes to suffer.</p>
            <p>kassim grew up with pnl && playboi carti && josman && liltjay </p>
            <p>kassim thinks a lot.</p>
            <p>kassim is kind.</p>
            <p>kassim likes ethereum.</p>
            <p>kassim hates to suffer.</p>
            <p>kassim likes basketball.</p>
            <p>kassim miss his father.</p>
            <p>kassim customizes weapons.</p>
            <p>kassim likes china.</p>
            <p>kassim is blunt.</p>
            <p>kassim hates liars.</p>
            <p>kassim likes building projects and starting from scratch.</p>
            <p>kassim is mean.</p>
            <p>kassim likes the usa.</p>
            <p>kassim has 5 women in his life they are the princesses of his heart.</p>
            <p>kassim knows and lives with it.</p>
            <p>kassim prays.</p>
            <p>kassim miss his little sister and his little brother.</p>
          </div>
        </section>

        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 max-w-3xl">
          <p className="text-2xl sm:text-3xl leading-relaxed tracking-tight">
            &gt; systems don't lie. i build the ones that prove it.
          </p>

          <p className="mt-12 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
            // cloud architect and systems engineer. rust, go, solidity, c. i
            design infrastructure that scales and contracts that execute. no
            abstractions without purpose.
          </p>
        </section>

        {/* PROJECTS */}
        <section className="px-6 sm:px-12 md:px-24 max-w-3xl pb-32">
          <p className="text-xs text-neutral-400 mb-16">// projects</p>

          <div className="space-y-20">
            {PROJECTS.map((project) => (
              <div key={project.name}>
                <p className="text-base font-medium">{project.name}</p>
                <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs text-neutral-400 underline underline-offset-4 decoration-neutral-300 block"
                >
                  {project.link.replace("https://", "")}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section className="px-6 sm:px-12 md:px-24 max-w-3xl pb-32">
          <p className="text-xs text-neutral-400 mb-8">// stack</p>
          <p className="text-sm">
            <span className="text-neutral-400">languages</span> — rust —
            solidity — noir — c
          </p>
          <p className="text-sm mt-3">
            <span className="text-neutral-400">tools</span> — aws — docker — k8s
            — git — ci/cd — finops
          </p>
        </section>

        {/* HACKATHONS */}
        <section className="px-6 sm:px-12 md:px-24 max-w-3xl pb-32">
          <p className="text-xs text-neutral-400 mb-6">// hackathons</p>
          <p className="text-sm">&gt; total_earnings:: 600€</p>
        </section>

        {/* CONTACT */}
        <section className="px-6 sm:px-12 md:px-24 max-w-3xl pb-24">
          <p className="text-xs text-neutral-400 mb-8">// contact</p>

          <div className="space-y-2">
            {CONTACTS.map((c) => (
              <p key={c.label} className="text-sm">
                <span className="text-neutral-400 inline-block w-24">
                  {c.label}
                </span>
                <span className="text-neutral-400 mr-2">—</span>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-neutral-300"
                  >
                    {c.value}
                  </a>
                ) : (
                  <span
                    onClick={() => handleCopy(c.value, c.label)}
                    className="cursor-pointer underline underline-offset-4 decoration-neutral-300"
                  >
                    {copied === c.label ? "copied" : c.value}
                  </span>
                )}
              </p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
