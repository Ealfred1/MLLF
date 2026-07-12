"use client";

import { useEffect, useState } from "react";
import { fetchDonationTotals } from "@/lib/supabase";
import { CAMPAIGN, formatNaira } from "@/lib/campaign";

// Two-stage campaign tracker: pledges awaiting reconciliation render as a
// mint "processing" segment layered after the solid forest "verified" fill.
export default function DonationTracker({ refreshKey = 0 }: { refreshKey?: number }) {
  const [totals, setTotals] = useState({ verified: 0, processing: 0 });

  useEffect(() => {
    let cancelled = false;
    fetchDonationTotals().then((t) => {
      if (!cancelled) setTotals(t);
    });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const target = CAMPAIGN.targetNgn;
  const verifiedPct = Math.min(100, (totals.verified / target) * 100);
  const processingPct = Math.min(100 - verifiedPct, (totals.processing / target) * 100);
  const remaining = Math.max(0, target - totals.verified);

  return (
    <div className="tracker">
      <div className="track-top">
        <span className="track-title">{CAMPAIGN.title}</span>
        <span className="track-target">Goal: {formatNaira(target)}</span>
      </div>
      <div
        className="track-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={target}
        aria-valuenow={totals.verified}
        aria-label={`${formatNaira(totals.verified)} verified of ${formatNaira(target)}`}
      >
        <div className="track-fill verified" style={{ width: `${verifiedPct}%` }} />
        <div
          className="track-fill processing"
          style={{ left: `${verifiedPct}%`, width: `${processingPct}%` }}
        />
      </div>
      <div className="track-legend">
        <span className="tl-item">
          <i className="sw verified" /> Verified · <b>{formatNaira(totals.verified)}</b>
        </span>
        <span className="tl-item">
          <i className="sw processing" /> Processing · <b>{formatNaira(totals.processing)}</b>
        </span>
        <span className="tl-item remaining">{formatNaira(remaining)} to go</span>
      </div>
    </div>
  );
}
