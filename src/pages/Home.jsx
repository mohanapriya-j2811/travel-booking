import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { destinations, packages, getPackageByDestination } from "../data/mockData";
import DestinationCard from "../components/DestinationCard";
import PackageCard from "../components/PackageCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const popular = [...destinations].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/destinations?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)), url('/images/hero.jpg')",
        }}
      >
        <div className="container hero-content">
          <h1>Explore the World with WanderWay</h1>
          <p>Handpicked destinations and best-value travel packages for every traveller.</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search destination (Bali, Goa, Paris...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn" type="submit">Search</button>
          </form>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Popular Destinations</h2>
          <Link to="/destinations">View all →</Link>
        </div>
        <div className="grid">
          {popular.map((d) => (
            <DestinationCard key={d.id} destination={d} pkg={getPackageByDestination(d.id)} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Travel Packages</h2>
        </div>
        <div className="grid">
          {packages.slice(0, 6).map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </section>
    </>
  );
}