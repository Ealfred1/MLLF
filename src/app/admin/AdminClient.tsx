"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, Donation } from "@/lib/supabase";
import { CAMPAIGN, formatNaira } from "@/lib/campaign";

// Lightweight access gate for the review queue. Before real deployment this
// must be replaced with Supabase Auth + RLS so approvals are server-enforced.
const ACCESS_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE || "mllf-admin";

export default function AdminClient() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [gateError, setGateError] = useState("");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [approving, setApproving] = useState<string | null>(null);
  const [viewing, setViewing] = useState<Donation | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("mllf_admin_ok") === "1") setUnlocked(true);
  }, []);

  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewing(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewing]);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("donations").select("*");
    if (error || !data) return;
    setDonations(
      [...(data as Donation[])].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    );
  }, []);

  useEffect(() => {
    if (unlocked) load();
  }, [unlocked, load]);

  const unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      sessionStorage.setItem("mllf_admin_ok", "1");
      setUnlocked(true);
    } else {
      setGateError("Wrong access code.");
    }
  };

  const approve = async (donation: Donation) => {
    setApproving(donation.id);
    try {
      const { error } = await supabase
        .from("donations")
        .update({ status: "verified" })
        .eq("id", donation.id);
      if (error) throw new Error(error.message);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setApproving(null);
    }
  };

  if (!unlocked) {
    return (
      <main className="page active admin-page">
        <section className="sec" style={{ paddingTop: "140px" }}>
          <div className="wrap">
            <form className="admin-gate" onSubmit={unlock}>
              <span className="label">MLLF Admin</span>
              <h2 style={{ margin: "14px 0 20px" }}>Donation review queue</h2>
              <div className="field">
                <label>Access code</label>
                <input
                  type="password"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setGateError("");
                  }}
                  placeholder="Enter access code"
                  autoFocus
                />
              </div>
              {gateError && <p className="dm-error">{gateError}</p>}
              <button type="submit" className="btn btn-solid" style={{ width: "100%", justifyContent: "center" }}>
                Enter <span className="arrow">→</span>
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  const pending = donations.filter((d) => d.status === "processing");
  const verified = donations.filter((d) => d.status === "verified");
  const totalPending = pending.reduce((s, d) => s + Number(d.amount || 0), 0);
  const totalVerified = verified.reduce((s, d) => s + Number(d.amount || 0), 0);

  const methodLabel = (m: Donation["payment_method"]) =>
    m === "cheque" ? "Cheque" : "Bank transfer";

  return (
    <main className="page active admin-page">
      <section className="sec" style={{ paddingTop: "140px" }}>
        <div className="wrap">
          <span className="label">MLLF Admin</span>
          <h2 className="big" style={{ marginTop: "14px" }}>
            Donation <em>review queue.</em>
          </h2>

          <div className="aq-stats">
            <div className="aq-stat">
              <span>Verified</span>
              <b>{formatNaira(totalVerified)}</b>
            </div>
            <div className="aq-stat">
              <span>Processing</span>
              <b>{formatNaira(totalPending)}</b>
            </div>
            <div className="aq-stat">
              <span>Campaign goal</span>
              <b>{formatNaira(CAMPAIGN.targetNgn)}</b>
            </div>
          </div>

          <h3 className="aq-heading">Awaiting approval ({pending.length})</h3>
          {pending.length === 0 ? (
            <p className="sub">Nothing to review. New pledges appear here with their receipts.</p>
          ) : (
            <div className="aq-grid">
              {pending.map((d) => (
                <div className="aq-card" key={d.id}>
                  {d.receipt_url ? (
                    <button
                      type="button"
                      className="aq-receipt"
                      onClick={() => setViewing(d)}
                      aria-label="View receipt full size"
                    >
                      <img src={d.receipt_url} alt="Payment receipt" />
                    </button>
                  ) : (
                    <div className="aq-receipt none">No receipt</div>
                  )}
                  <div className="aq-meta">
                    <b className="aq-amount">{formatNaira(Number(d.amount || 0))}</b>
                    <span className="aq-chip">{methodLabel(d.payment_method)}</span>
                    <span className="aq-date">
                      {new Date(d.created_at).toLocaleString("en-NG", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-solid"
                    disabled={approving === d.id}
                    onClick={() => approve(d)}
                    style={{ justifyContent: "center" }}
                  >
                    {approving === d.id ? "Approving…" : "Approve Fund"}
                  </button>
                </div>
              ))}
            </div>
          )}

          <h3 className="aq-heading">Verified ({verified.length})</h3>
          {verified.length === 0 ? (
            <p className="sub">Approved donations will be listed here.</p>
          ) : (
            <div className="ledger" style={{ maxWidth: "560px" }}>
              {verified.map((d) => (
                <div className="row" key={d.id}>
                  <div className="k">
                    <span className="ic">✓</span>
                    {methodLabel(d.payment_method)} ·{" "}
                    {new Date(d.created_at).toLocaleDateString("en-NG", { dateStyle: "medium" })}
                  </div>
                  <div className="v">{formatNaira(Number(d.amount || 0))}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {viewing?.receipt_url && (
        <div className="dmodal-overlay" onClick={() => setViewing(null)}>
          <div className="dmodal aq-viewer" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <button type="button" className="dm-close" aria-label="Close" onClick={() => setViewing(null)}>
              ✕
            </button>
            <img src={viewing.receipt_url} alt="Payment receipt full size" />
            <p className="aq-viewer-cap">
              {formatNaira(Number(viewing.amount || 0))} · {methodLabel(viewing.payment_method)}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
