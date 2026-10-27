import { Link } from "react-router-dom";
import { getDestination } from "../data/mockData";
import { formatPrice } from "../utils/helpers";

export default function PackageCard({ pkg }) {
  const dest = getDestination(pkg.destinationId);
  return (
    <div className="card">
      <div className="card-img">
        <img src={dest.image} alt={pkg.title}
          onError={(e) => (e.target.style.display = "none")} />
        <span className="tag">{pkg.days} Days</span>
      </div>
      <div className="card-body">
        <h3>{pkg.title}</h3>
        <p className="muted">📍 {dest.name}, {dest.country} · ⭐ {pkg.rating}</p>
        <div className="row">
          <span className="price">{formatPrice(pkg.price)} <small>/person</small></span>
          <Link className="btn small" to={`/packages/${pkg.id}`}>Details</Link>
        </div>
      </div>
    </div>
  );
}