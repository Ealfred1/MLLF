"use client";

import React, { useState } from "react";
import supabase from "@/lib/supabase";
import { FiSend, FiCheckCircle, FiAlertCircle, FiHeart } from "react-icons/fi";

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
    "Educational Tutoring & Mentoring",
    "Healthcare / First Aid Support",
    "Photography & Social Media Content",
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
    <div className="flex flex-col bg-background text-foreground">
      {/* Page Hero */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
            Join the Movement
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            Be the Light. <span className="text-brand-yellow">Volunteer.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 leading-relaxed sm:text-lg">
            We believe change happens when willing hearts and active hands come together. Join us in making a real difference across communities in Nigeria.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-5 items-start">
          
          {/* Instructions Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display text-2xl font-bold">Why volunteer with us?</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Volunteers are the backbone of Maryann's Love and Light Foundation. Whether we are packing food boxes, reading to children, or driving supplies to remote communities, every action matters.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <FiCheckCircle className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold">Direct Hands-on Impact</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">We bypass intermediaries and deliver support directly to people.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <FiCheckCircle className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold">Community of Kindness</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Collaborate with over 30 passionate, welcoming team members.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <FiCheckCircle className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold">Flexible Engagement</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Contribute whenever we launch an outreach that matches your schedule.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-5 border border-border/40">
              <h3 className="font-display text-sm font-bold flex items-center gap-1.5 text-primary">
                <FiHeart className="h-4 w-4 fill-current text-brand-yellow" /> Note on Verification
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                After you submit your registration, our outreach coordinator will contact you via WhatsApp or Email within 48 hours to share upcoming outreach plans.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-3 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold mb-6">Volunteer Registration Form</h2>
            
            {status === "success" ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-green/15 text-brand-green">
                  <FiCheckCircle className="h-10 w-10" />
                </div>
                <h3 className="font-display text-xl font-bold">Application Received!</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Thank you for stepping up to spread light. We have received your volunteer application and will reach out to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Error Banner */}
                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 animate-in shake duration-300">
                    <FiAlertCircle className="h-5 w-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Input Fields */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Maryann Johnson"
                      required
                      className="w-full rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Phone Number (WhatsApp) <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234..."
                        required
                        className="w-full rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills/Interests Checklist */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Areas of Interest / Skills
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {availableSkills.map((skill) => (
                      <label
                        key={skill}
                        className={`flex items-start gap-2.5 rounded-xl border p-3 cursor-pointer text-xs font-medium transition ${
                          skills.includes(skill)
                            ? "border-primary bg-primary/5 text-primary font-semibold"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={skills.includes(skill)}
                          onChange={() => handleCheckboxChange(skill)}
                          className="mt-0.5 h-3.5 w-3.5 rounded text-primary border-border focus:ring-primary/20"
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Bio Textarea */}
                <div>
                  <label htmlFor="experience" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Tell us about yourself / experience
                  </label>
                  <textarea
                    id="experience"
                    rows={4}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Tell us why you want to volunteer or share any details about past community activities..."
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/95 active:scale-[0.98] disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-1">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
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
