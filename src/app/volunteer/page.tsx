"use client";

import React, { useState } from "react";
import supabase from "@/lib/supabase";
import { FiSend, FiCheckCircle, FiAlertCircle, FiHeart } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function Volunteer() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
  });
  
  const [skills, setSkills] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const availableSkills = [
    "Food Distribution & Logistics",
    "Orphanage & Children Outreaches",
    "Educational Support & Supplies",
    "Healthcare & Basic Aid",
    "Media, Design & Content Creation",
    "Event Coordination",
  ];

  const handleCheckboxChange = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setStatus("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setStatus("submitting");

    try {
      const { error } = await supabase.from("volunteers").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        skills: skills,
        experience: formData.experience,
        status: "pending",
      });

      if (error) {
        throw new Error(error.message);
      }

      setStatus("success");
      setFormData({ fullName: "", email: "", phone: "", experience: "" });
      setSkills([]);
    } catch (err: any) {
      console.error("Error submitting volunteer form:", err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-background text-foreground overflow-hidden">
      {/* Page Hero */}
      <section className="relative bg-gradient-to-br from-brand-ink via-[#0d1c6e] to-brand-ink text-primary-foreground py-16 sm:py-20 grid-mesh">
        <div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-brand-yellow/15 blur-[100px]"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
            Join the Movement
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            Be the Light. <span className="text-brand-yellow">Volunteer.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 leading-relaxed sm:text-lg">
            We believe change happens when willing hearts and active hands come together. Join us in making a real difference across communities in Nigeria.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 relative">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Instructions Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl font-extrabold">Why volunteer with us?</h2>
            <p className="text-base leading-relaxed text-muted">
              Volunteers are the backbone of Maryann's Love and Light Foundation. Whether we are packing food boxes, reading to children, or driving supplies to remote communities, every action matters.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <FiCheckCircle className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Direct Hands-on Impact</h4>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">We bypass intermediaries and deliver support directly to people.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <FiCheckCircle className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Community of Kindness</h4>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">Collaborate with over 30 passionate, welcoming team members.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <FiCheckCircle className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Flexible Engagement</h4>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">Contribute whenever we launch an outreach that matches your schedule.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] p-6 glass-card border border-border/40 mt-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/10 rounded-bl-[2rem] -z-10"></div>
              <h3 className="font-display text-sm font-extrabold flex items-center gap-1.5 text-primary">
                <FiHeart className="h-4 w-4 fill-current text-brand-yellow animate-pulse" /> Note on Verification
              </h3>
              <p className="text-xs leading-relaxed text-muted mt-3">
                After you submit your registration, our outreach coordinator will contact you via WhatsApp or Email within 48 hours to share upcoming outreach plans.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 rounded-[2rem] border border-border bg-card p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[2rem] -z-10"></div>
            
            <h2 className="font-display text-xl font-bold mb-1.5">Volunteer Registration</h2>
            <p className="text-xs text-muted mb-8">Please fill in your details to join the outreach program.</p>
            
            {status === "success" ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-green/15 text-brand-green">
                  <FiCheckCircle className="h-10 w-10" />
                </div>
                <h3 className="font-display text-xl font-bold">Application Received!</h3>
                <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
                  Thank you for stepping up to spread light. We have received your volunteer application and will reach out to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary transition"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Error Banner */}
                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 animate-in shake duration-300">
                    <FiAlertCircle className="h-5 w-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Input Fields */}
                <div className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Maryann Johnson"
                      required
                      className="w-full rounded-2xl border border-border bg-transparent px-5 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-2xl border border-border bg-transparent px-5 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                        Phone (WhatsApp) <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234..."
                        required
                        className="w-full rounded-2xl border border-border bg-transparent px-5 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills Checklist */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-3">
                    Areas of Interest / Skills
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {availableSkills.map((skill) => (
                      <label
                        key={skill}
                        className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer text-xs font-semibold transition-all duration-200 ${
                          skills.includes(skill)
                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                            : "border-border hover:bg-secondary/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={skills.includes(skill)}
                          onChange={() => handleCheckboxChange(skill)}
                          className="mt-0.5 h-4 w-4 rounded text-primary border-border focus:ring-primary/20"
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Textarea */}
                <div>
                  <label htmlFor="experience" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Tell us about yourself / experience
                  </label>
                  <textarea
                    id="experience"
                    rows={4}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Tell us why you want to volunteer or share any details about past community activities..."
                    className="w-full rounded-2xl border border-border bg-transparent px-5 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/95 active:scale-[0.98] disabled:opacity-50 hover:shadow-primary/20"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-1">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending Application...
                    </span>
                  ) : (
                    <>
                      <FiSend className="h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
