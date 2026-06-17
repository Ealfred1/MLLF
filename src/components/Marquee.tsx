export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq-track">
        <span>
          food <span className="dot">✦</span> school fees <span className="dot">✦</span> books <span className="dot">✦</span> care <span className="dot">✦</span>{" "}
        </span>
        <span>
          food <span className="dot">✦</span> school fees <span className="dot">✦</span> books <span className="dot">✦</span> care <span className="dot">✦</span>{" "}
        </span>
      </div>
    </div>
  );
}
