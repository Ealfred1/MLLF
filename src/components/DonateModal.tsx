"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase, uploadReceipt } from "@/lib/supabase";
import { formatNaira } from "@/lib/campaign";

type Tab = "bank_transfer" | "cheque";

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
  onPledged: () => void;
}

export default function DonateModal({ open, onClose, onPledged }: DonateModalProps) {
  const [tab, setTab] = useState<Tab>("bank_transfer");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setDone(false);
      setErrorMsg("");
      setAmount("");
      setFile(null);
      setPreview("");
    }
  }, [open]);

  const pickFile = (f: File | null) => {
    setErrorMsg("");
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(amount);

    if (!value || value <= 0) {
      setErrorMsg("Enter the amount you sent.");
      return;
    }
    if (!file) {
      setErrorMsg("Attach your payment receipt screenshot.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      const receiptUrl = await uploadReceipt(file);
      const { error } = await supabase.from("donations").insert({
        amount: value,
        payment_method: tab,
        receipt_url: receiptUrl,
        status: "processing",
      });
      if (error) throw new Error(error.message);

      onPledged();
      setDone(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="dmodal-overlay" onClick={onClose}>
      <div
        className="dmodal"
        role="dialog"
        aria-modal="true"
        aria-label="Donate"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="dm-close" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        {done ? (
          <div className="dm-done">
            <div className="dm-done-mark">✦</div>
            <h3>You're on the tracker!</h3>
            <p>
              {formatNaira(Number(amount))} is now showing as processing. It turns
              solid green once our finance team confirms it in the account.
            </p>
            <button type="button" className="btn btn-solid" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="dm-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "bank_transfer"}
                className={`dm-tab${tab === "bank_transfer" ? " active" : ""}`}
                onClick={() => setTab("bank_transfer")}
              >
                Bank Transfer
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "cheque"}
                className={`dm-tab${tab === "cheque" ? " active" : ""}`}
                onClick={() => setTab("cheque")}
              >
                Cheque Delivery
              </button>
            </div>

            {tab === "bank_transfer" ? (
              <div className="dm-details">
                {/* TODO: real Naira account details when provided */}
                <div className="dm-row">
                  <span>Bank</span>
                  <b>[Bank Name Placeholder]</b>
                </div>
                <div className="dm-row">
                  <span>Account name</span>
                  <b>Maryann's Love &amp; Light Foundation</b>
                </div>
                <div className="dm-row">
                  <span>Account number (NGN)</span>
                  <b>[Account Number Placeholder]</b>
                </div>
              </div>
            ) : (
              <div className="dm-details">
                <div className="dm-row">
                  <span>Payable to</span>
                  <b>Maryann's Love &amp; Light Foundation</b>
                </div>
                <div className="dm-row">
                  <span>Arrange delivery</span>
                  <b>
                    <a href="https://wa.me/2347063472279" target="_blank" rel="noopener noreferrer">
                      WhatsApp +234 706 347 2279
                    </a>
                  </b>
                </div>
              </div>
            )}

            <form className="dm-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label>Amount sent (₦) *</label>
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  placeholder="e.g. 20000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div
                className={`drop${dragging ? " drag" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  pickFile(e.dataTransfer.files?.[0] ?? null);
                }}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Receipt preview" />
                    <span className="drop-name">{file?.name} — tap to change</span>
                  </>
                ) : (
                  <span>
                    Drop your receipt screenshot here, <u>or tap to upload</u> *
                  </span>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {errorMsg && <p className="dm-error">{errorMsg}</p>}

              <button
                type="submit"
                className="btn btn-solid"
                disabled={loading}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {loading ? "Sending…" : "I've sent it"} <span className="arrow">→</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
