// Current fundraising campaign shown on the donate page tracker.
// Update the target (in naira) whenever a new campaign begins.
export const CAMPAIGN = {
  title: "Next Outreach Fund",
  targetNgn: 5_000_000,
};

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
