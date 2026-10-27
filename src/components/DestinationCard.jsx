import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";

export default function DestinationCard({ destination, pkg }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={destination.image} alt={destination.name}
          onError={(e) => (e.target.style.display = "none")} />
        <span className="tag">{destination.category}</span>
      </div>
      <div className="card-body">
        <div className="row">
          <h3>{destination.name}</h3>
          <span className="rating">⭐ {destination.rating}</span>
        </div>
        <p className="muted">{destination.country}</p>
        <p className="desc">{destination.description}</p>
        <div className="row">
          <span className="price">From {formatPrice(pkg.price)}</span>
          <Link className="btn small" to={`/packages/${pkg.id}`}>View Package</Link>
        </div>
      </div>
    </div>
  );
}