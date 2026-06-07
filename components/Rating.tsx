import { Star } from "lucide-react";

export default function Rating() {
  return (
    <div className="rating">
      <div className="stars">
        <span className="stk">
          <Star size={20} fill="currentColor" stroke="none" />
        </span>
        <b>4.9</b>/5
      </div>
      <small>Rated by 40+ teams on Clutch &amp; Google</small>
    </div>
  );
}
