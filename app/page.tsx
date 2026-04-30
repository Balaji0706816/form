"use client";

import { useState } from "react";

const websiteTypes = [
  "Business Website",
  "E-commerce Store",
  "Landing Page",
  "Portfolio Website",
  "Website Redesign",
  "Custom Web Application",
];

const goals = [
  "Get more leads",
  "Sell products online",
  "Improve brand image",
  "Promote services",
  "Accept bookings",
  "Launch a new business",
];

const budgets = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000+",
];

const timelines = ["ASAP", "2-4 weeks", "1-2 months", "Flexible"];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      setSuccess(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#03030a] px-4 py-8 text-white">
      <section className="mx-auto grid max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[#090912] shadow-2xl lg:grid-cols-[0.9fr_1.25fr]">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2b0d63] via-[#40158f] to-[#080812] p-8 lg:p-12">
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-purple-400/30 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-fuchsia-500/30 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-14 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-black text-violet-700">
                W
              </div>
              <div>
                <h2 className="text-2xl font-bold">WebAigen Studio</h2>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  We design. You grow.
                </p>
              </div>
            </div>

            <h1 className="max-w-md text-4xl font-black leading-tight lg:text-5xl">
              Build a Website That Helps Your{" "}
              <span className="text-violet-300">Business Grow</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-white/75">
              Tell us about your business, goals, and website needs. We’ll review
              your details and prepare a clear project plan with design direction,
              features, timeline, and estimated cost.
            </p>

            <div className="mt-10 border-t border-white/15 pt-8">
              <h3 className="mb-5 text-lg font-bold">What We Can Help With</h3>
              <div className="grid gap-3 text-white/90">
                {[
                  "Business Website",
                  "E-commerce Store",
                  "Landing Page",
                  "Website Redesign",
                  "Branding & UI Design",
                  "SEO Setup",
                  "Custom Web Features",
                ].map((item) => (
                  <p key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-violet-700">
                      ✓
                    </span>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <h3 className="mb-3 text-lg font-bold">Why WebAigen?</h3>
              <p className="leading-7 text-white/75">
                We create modern, fast, and professional websites designed to
                attract customers, build trust, and convert visitors into real
                business leads.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0d0d15] p-6 lg:p-12">
          <div className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
              Website Project Intake
            </p>
            <h2 className="text-3xl font-black">Start Your Website Project</h2>
            <p className="mt-3 max-w-2xl text-white/60">
              Share a few details with us. Our team will review your information
              and get back to you with the next steps.
            </p>
          </div>

          {success && (
            <div className="mb-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-green-300">
              <h3 className="text-lg font-bold">Request Submitted Successfully</h3>
              <p className="mt-2 text-sm text-green-200">
                Thank you! We received your project details. Our team will contact
                you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-5 rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-green-400"
              >
                Submit Another Request
              </button>
            </div>
          )}

          {error && (
            <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
              {error}
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-10">
              <FormSection title="Contact Information">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input name="firstName" label="First Name *" placeholder="Enter your first name" />
                  <Input name="lastName" label="Last Name *" placeholder="Enter your last name" />
                  <Input name="email" type="email" label="Email Address *" placeholder="you@company.com" />
                  <Input name="phone" type="tel" label="Phone Number *" placeholder="Enter your phone number" />
                </div>
              </FormSection>

              <FormSection title="Business Information">
                <div className="grid gap-4">
                  <Input name="company" label="Company / Business Name *" placeholder="Enter your company name" />
                  <Input name="businessType" label="Business Type *" placeholder="Restaurant, Real Estate, Healthcare, Retail" />
                  <Input name="currentWebsite" label="Current Website" placeholder="https://yourwebsite.com" required={false} />
                </div>
              </FormSection>

              <FormSection title="Project Details">
                <div className="grid gap-4 md:grid-cols-2">
                  <Select name="websiteType" label="What type of website do you need? *" options={websiteTypes} />
                  <Select name="goal" label="What is your main goal? *" options={goals} />
                  <Select name="budget" label="Estimated Budget *" options={budgets} />
                  <Select name="timeline" label="Project Timeline *" options={timelines} />
                </div>
              </FormSection>

              <FormSection title="Message">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-white/85">
                    Tell us about your project *
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Briefly describe what you want to build, your goals, and any features you need."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  />
                </label>
              </FormSection>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl px-6 py-4 font-bold text-white transition disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-700 opacity-100 group-hover:opacity-90" />
                <span className="absolute inset-0 bg-violet-600 opacity-40 blur-xl group-hover:opacity-60" />
                <span className="relative z-10">
                  {loading ? "Submitting..." : "Get My Project Plan"}
                </span>
              </button>

              <p className="text-center text-sm text-white/40">
                Your information is safe with us. We never share your details.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/10 pt-6">
      <h3 className="mb-4 text-lg font-bold text-white">{title}</h3>
      {children}
    </section>
  );
}

function Input({
  name,
  label,
  placeholder,
  type = "text",
  required = true,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/85">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/85">
        {label}
      </span>

      <div className="relative">
        <select
          name={name}
          required
          defaultValue=""
          className="w-full appearance-none rounded-2xl border border-white/10 bg-[#11111b] px-4 py-3 pr-10 text-white outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-[#11111b] text-white">
              {option}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50">
          ▼
        </span>
      </div>
    </label>
  );
}