"use client";

import React, { useState } from "react";
import supabase from "@/lib/supabase";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FaLandmark, FaCoins } from "react-icons/fa";

export default function Donate() {
  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    amount: "",
    paymentMethod: "Bank Transfer",
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.donorName || !formData.email || !formData.amount) {
      setStatus("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    const parsedAmount = parseFloat(formData.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setStatus("error");
      setErrorMessage("Please enter a valid donation amount.");
      return;
    }

    setStatus("submitting");

    try {
      const { error } = await supabase.from("donations").insert({
        donor_name: formData.donorName,
        email: formData.email,
        amount: parsedAmount,
        payment_method: formData.paymentMethod,
        notes: formData.notes,
        status: "pending",
      });

      if (error) {
        throw new Error(error.message);
      }

      setStatus("success");
      setFormData({
        donorName: "",
        email: "",
        amount: "",
        paymentMethod: "Bank Transfer",
        notes: "",
      });
    } catch (err: any) {
      console.error("Error submitting donation pledge:", err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit report. Please check your connection and try again.");
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
            Support Our Outreach
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            Empower Change. <span className="text-brand-yellow">Sponsor Hope.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 leading-relaxed sm:text-lg">
            100% of public donations are spent buying food, paying school fees, and purchasing books directly for children and families. No middlemen. No commissions.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 relative">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Bank Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl font-extrabold">Transfer Accounts</h2>
            <p className="text-base leading-relaxed text-muted">
              You can make a direct deposit or wire transfer to our registered foundation accounts. Once done, fill out the form on the right so we can acknowledge and confirm your receipt.
            </p>

            {/* Account Card (Naira) */}
            <div className="rounded-[2rem] border border-border bg-white p-6.5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 rounded-bl-[2rem] grid place-items-center text-primary">
                <FaLandmark className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Local Currency (NGN)
              </span>
              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Bank Name</p>
                  <p className="font-extrabold text-foreground text-base">Zenith Bank</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Account Name</p>
                  <p className="font-extrabold text-foreground text-base">Maryann’s Love & Light</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Account Number</p>
                  <p className="font-mono text-2xl font-black text-primary tracking-tight mt-0.5">1312734692</p>
                </div>
              </div>
            </div>

            {/* Account Card (USD/Domiciliary) */}
            <div className="rounded-[2rem] border border-border bg-white p-6.5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 rounded-bl-[2rem] grid place-items-center text-primary">
                <FaCoins className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-yellow bg-brand-yellow/15 px-2.5 py-1 rounded-md">
                Domiciliary (USD)
              </span>
              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Bank Name</p>
                  <p className="font-extrabold text-foreground text-base">Zenith Bank</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Account Name</p>
                  <p className="font-extrabold text-foreground text-base">Maryann’s Love & Light</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Account Number (USD)</p>
                  <p className="font-mono text-2xl font-black text-primary tracking-tight mt-0.5">1312734706</p>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Form Panel */}
          <div className="lg:col-span-7 rounded-[2rem] border border-border bg-card p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[2rem] -z-10"></div>
            
            <h2 className="font-display text-xl font-bold mb-1.5">Report a Donation</h2>
            <p className="text-xs text-muted mb-8">
              Let us know when you make a transfer so our team can verify it and update our metrics.
            </p>

            {status === "success" ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-green/15 text-brand-green">
                  <FiCheckCircle className="h-10 w-10" />
                </div>
                <h3 className="font-display text-xl font-bold">Thank You! 💛</h3>
                <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
                  Your donation report has been submitted. Our team will verify the bank logs and send a confirmation email once completed.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary transition"
                >
                  Report another donation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Box */}
                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 animate-in shake duration-300">
                    <FiAlertCircle className="h-5 w-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-5">
                  <div>
                    <label htmlFor="donorName" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                      Your Name / Organization <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="donorName"
                      value={formData.donorName}
                      onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                      placeholder="e.g. Oluwaseun Davies"
                      required
                      className="w-full rounded-2xl border border-border bg-transparent px-5 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

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

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="amount" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                        Amount Donated (NGN / USD) <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        placeholder="e.g. 15000"
                        min="1"
                        required
                        className="w-full rounded-2xl border border-border bg-transparent px-5 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="paymentMethod" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                        Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-full rounded-2xl border border-border bg-transparent px-5 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                      >
                        <option value="Bank Transfer">Bank Transfer / Deposit</option>
                        <option value="USD Wire Transfer">USD Wire Transfer</option>
                        <option value="Cash / Food Items">Pledge (Cash/Items)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                      Additional Message / Reference Info
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Optional. Mention transfer date, transaction reference, or any message you want to include..."
                      className="w-full rounded-2xl border border-border bg-transparent px-5 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                    ></textarea>
                  </div>
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
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending Report...
                    </span>
                  ) : (
                    <>
                      <FiSend className="h-4 w-4" />
                      Report Donation
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
