import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { destinations, getPackageByDestination } from "../data/mockData";
import DestinationCard from "../components/DestinationCard";
import { formatPrice } from "../utils/helpers";

const categories = ["All", ...new Set(destinations.map((d) => d.category))];

export default function Destinations() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(150000);
  const [sort, setSort] = useState("rating");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    return destinations
      .map((d) => ({ destination: d, pkg: getPackageByDestination(d.id) }))
      .filter(({ destination, pkg }) =>
        (destination.name.toLowerCase().includes(q) || destination.country.toLowerCase().includes(q)) &&
        (category === "All" || destination.category === category) &&
        pkg.price <= maxPrice
      )
      .sort((a, b) => {
        if (sort === "low") return a.pkg.price - b.pkg.price;
        if (sort === "high") return b.pkg.price - a.pkg.price;
        return b.destination.rating - a.destination.rating;
      });
  }, [search, category, maxPrice, sort]);

  const reset = () => {
    setSearch(""); setCategory("All"); setMaxPrice(150000); setSort("rating");
  };

  return (
    <div className="container section">
      <h2>Explore Destinations</h2>

      <div className="filters">
        <input type="text" placeholder="Search by name or country..."
          value={search} onChange={(e) => setSearch(e.target.value)} />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Top Rated</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

        <label className="range">
          Max price: <strong>{formatPrice(maxPrice)}</strong>
          <input type="range" min="10000" max="150000" step="5000"
            value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </label>

        <button className="btn outline" onClick={reset}>Reset</button>
      </div>

      {results.length === 0 ? (
        <div className="empty"><h3>No destinations found 😕</h3><p>Try changing your filters.</p></div>
      ) : (
        <div className="grid">
          {results.map(({ destination, pkg }) => (
            <DestinationCard key={destination.id} destination={destination} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}