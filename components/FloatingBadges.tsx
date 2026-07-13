import { Check } from "lucide-react";

export default function FloatingBadges() {
  return (
    <>
      <div className="fbadge b1">
        <div className="fb-ic" style={{ background: "var(--green)", color: "#06210f" }}>
          ★
        </div>
        <div className="fb-tx">
          <div className="fb-t">
            <span>No.1</span> design partner
          </div>
          <div className="fb-s">creative category</div>
        </div>
      </div>

      <div className="fbadge b2">
        <div className="fb-ic" style={{ background: "var(--green)", color: "#06210f" }}>
          <Check size={16} strokeWidth={2.6} />
        </div>
        <div className="fb-tx">
          <div className="fb-t">Shipped on time</div>
          <div className="fb-s">v2.0 · live</div>
        </div>
      </div>

      <div className="fbadge b3">
        <div className="fb-ic" style={{ background: "var(--green)", color: "#06210f" }}>
          +
        </div>
        <div className="fb-tx">
          <div className="fb-t">+5 happy teams</div>
          <div className="fb-s">since 2018</div>
        </div>
      </div>
    </>
  );
}
