import { useParams, Link } from "react-router-dom";
import { getPackage, getDestination } from "../data/mockData";
import { formatPrice } from "../utils/helpers";

export default function PackageDetails() {
  const { id } = useParams();
  const pkg = getPackage(id);

  if (!pkg) {
    return (
      <div className="container empty">
        <h2>Package not found</h2>
        <Link className="btn" to="/destinations">Browse destinations</Link>
      </div>
    );
  }

  const dest = getDestination(pkg.destinationId);

  return (
    <div className="container section">
      <div className="details-img">
        <img src={dest.image} alt={pkg.title} onError={(e) => (e.target.style.display = "none")} />
      </div>

      <div className="details-layout">
        <div>
          <h1>{pkg.title}</h1>
          <p className="muted">📍 {dest.name}, {dest.country} · ⭐ {pkg.rating} · {pkg.days} Days / {pkg.days - 1} Nights</p>
          <p>{dest.description}</p>

          <h3>What's included</h3>
          <ul className="check-list">
            {pkg.inclusions.map((item) => <li key={item}>✅ {item}</li>)}
          </ul>

          <h3>Itinerary</h3>
          <ol className="itinerary">
            {pkg.itinerary.map((step, i) => (
              <li key={i}><strong>Day {i + 1}:</strong> {step}</li>
            ))}
          </ol>
        </div>

        <aside className="price-box">
          <p className="muted">Starting from</p>
          <h2>{formatPrice(pkg.price)}</h2>
          <p className="muted">per person · taxes extra</p>
          <Link className="btn full" to={`/book/${pkg.id}`}>Book Now</Link>
        </aside>
      </div>
    </div>
  );
}