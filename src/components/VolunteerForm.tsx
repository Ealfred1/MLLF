"use client";

import React, { useState } from "react";
import { supabase, isRealSupabase } from "@/lib/supabase";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    source: "Instagram",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSuccess(false);

    const { name, phone, email, state, source } = formData;

    if (!name || !phone || !email || !state) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      if (isRealSupabase) {
        const { error } = await supabase.from("volunteers").insert({
          full_name: name,
          phone,
          email,
          state,
          source,
        });

        if (error) {
          throw new Error(error.message);
        }

        setSuccessMsg(
          "✦ Application submitted successfully! We will review and contact you within 48 hours."
        );
        setSuccess(true);
      } else {
        // Fallback to mailto
        console.warn("Supabase not configured. Falling back to mailto link.");
        
        const body = `Name: ${name}%0D%0APhone: ${phone}%0D%0AEmail: ${email}%0D%0AState: ${state}%0D%0AHeard via: ${source}`;
        
        setSuccessMsg("✦ Opening your email app — just hit send to reach our team.");
        setSuccess(true);

        window.location.href = `mailto:Maryannsloveandlight@gmail.com?subject=Volunteer%20Application&body=${body}`;
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="vform reveal" id="vform" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label>Full name *</label>
        <input
          name="name"
          required
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label>Phone number *</label>
        <input
          name="phone"
          required
          placeholder="+234 …"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label>Email address *</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label>State of residence *</label>
        <input
          name="state"
          required
          placeholder="e.g. Lagos"
          value={formData.state}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label>How did you hear about us?</label>
        <select name="source" value={formData.source} onChange={handleChange}>
          <option value="Instagram">Instagram</option>
          <option value="A friend">A friend</option>
          <option value="Search">Search</option>
          <option value="An outreach event">An outreach event</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      {errorMsg && (
        <p style={{ color: "red", fontSize: "14px", margin: "0 0 14px", fontFamily: "var(--disp)" }}>
          {errorMsg}
        </p>
      )}

      <p className="fnote">
        When you submit, your details are sent to our team. We typically
        respond within 24–48 hours.
      </p>
      
      <button
        type="submit"
        className="btn btn-solid"
        data-magnet
        disabled={loading}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {loading ? "Submitting..." : "Submit application"} <span className="arrow">→</span>
      </button>

      <div
        className="form-ok"
        id="formOk"
        style={{ display: success ? "flex" : "none" }}
      >
        {successMsg}
      </div>
    </form>
  );
}
