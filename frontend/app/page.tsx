"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="flex items-center gap-3">
          {/* <Image
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=100&q=60"
            alt="FinChorus Logo"
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          <h1 className="font-semibold text-xl text-zinc-900 dark:text-white">
            FinChorus
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton forceRedirectUrl={"/dashboard"}>
              <button className="rounded-full px-5 py-2 bg-transparent border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton forceRedirectUrl={"/dashboard"}>
              <button className="rounded-full px-5 py-2 bg-[#6c47ff] text-white font-semibold text-sm hover:bg-[#5a39d6] transition">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* HERO */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-24 py-20 bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-900">
        <div className="max-w-xl flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-zinc-900 dark:text-white">
            Your AI-Powered Voice Banking Assistant
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <strong>FinChorus</strong> understands your voice, automates your
            banking workflows, navigates your UI, fetches balances, sets
            reminders, and provides secure real-time financial assistance.
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="/dashboard"
              className="px-6 py-3 rounded-full bg-[#6C47FF] text-white text-sm font-semibold hover:bg-[#5936e3] transition"
            >
              Launch Assistant
            </a>

            <a
              href="#features"
              className="px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <Image
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=400&auto=format&fit=crophttps://images.unsplash.com/photo-1642790551216-bf0e0eaa90bf?q=80&w=1200&auto=format&fit=crophttps://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop"
            width={520}
            height={400}
            alt="AI Voice Assistant"
            className="rounded-2xl shadow-xl object-cover"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="px-8 lg:px-24 py-20 bg-white dark:bg-black"
      >
        <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-16">
          Why FinChorus?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Feature
            title="Voice-Controlled UI"
            desc="Navigate banking pages, trigger workflows, open loan sections — using natural conversation."
            img="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&auto=format&fit=crop&w=800"
          />
          <Feature
            title="Secure & Compliant"
            desc="Clerk authentication + encrypted backend pipelines ensure bank-grade safety."
            img="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&auto=format&fit=crop&w=800"
          />
          <Feature
            title="Realtime Streaming"
            desc="SSE updates ensure instant UI changes with no reloads or lag."
            img="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=60"
          />
          <Feature
            title="Tool-Powered Agent"
            desc="FinChorus uses custom actions like fetch_balance & create_reminder to assist you."
            img="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=400&q=60"
          />
          <Feature
            title="Scalable Architecture"
            desc="Distributed microservices + serverless compute = lightning fast everywhere."
            img="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=60"
          />
          <Feature
            title="Action-Driven Intents"
            desc="Speak naturally — FinChorus understands your intent and updates the UI instantly."
            img="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=60"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 lg:px-24 py-20 bg-gradient-to-r from-[#6C47FF] to-[#4a2bd6] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Experience Smart, Voice-Driven Banking
        </h2>
        <p className="max-w-xl mx-auto text-lg opacity-90 mb-8">
          Talk to FinChorus — your secure, intelligent financial companion with
          realtime UI control.
        </p>

        <a
          href="/dashboard"
          className="inline-block px-8 py-4 bg-white text-[#6C47FF] rounded-full font-semibold text-lg hover:bg-zinc-100 transition"
        >
          Get Started
        </a>
      </section>
    </>
  );
}

function Feature({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <Image
        src={img}
        width={180}
        height={120}
        alt={title}
        className="rounded-xl shadow-md object-cover"
      />
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-300 text-sm">{desc}</p>
    </div>
  );
}
