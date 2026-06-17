export default function TrustLedger() {
  return (
    <section className="trust">
      <div className="wrap">
        <div className="trust-grid">
          <div>
            <span className="label reveal">Where your kindness goes</span>
            <h2 className="reveal">
              Driven by kindness, <em>not contracts.</em>
            </h2>
            <p className="pledge reveal">
              <b>100% of every donation</b> goes directly to the people who
              need it — food in hands, fees paid, books delivered. Every
              outreach is documented, so you can see exactly where your love
              landed.
            </p>
          </div>
          <div className="ledger reveal">
            <div className="row">
              <div className="k">
                <span className="ic">♥</span> Goes directly to people in need
              </div>
              <div className="v">100%</div>
            </div>
            <div className="row">
              <div className="k">
                <span className="ic">⚲</span> Middlemen between you &amp; them
              </div>
              <div className="v">0</div>
            </div>
            <div className="row">
              <div className="k">
                <span className="ic">▦</span> CAC registration
              </div>
              <div className="v">No. 7663513</div>
            </div>
            <div className="row">
              <div className="k">
                <span className="ic">⊙</span> Outreaches documented
              </div>
              <div className="v">Every one</div>
            </div>
            <div className="row">
              <div className="k">
                <span className="ic">◴</span> Independent verification
              </div>
              <div className="v warn">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
