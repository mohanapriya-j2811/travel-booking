import { useState } from "react";
import { Link } from "react-router-dom";
import { getBookings, removeBooking, formatPrice } from "../utils/helpers";

export default function MyBookings() {
  const [bookings, setBookings] = useState(getBookings());

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      removeBooking(id);
      setBookings(getBookings());
    }
  };

  return (
    <div className="container section">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="empty">
          <h3>No bookings yet ✈</h3>
          <p>Start exploring and book your dream trip!</p>
          <Link className="btn" to="/destinations">Explore Destinations</Link>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div className="booking-card" key={b.id}>
              <div className="booking-img">
                <img src={b.image} alt={b.title} onError={(e) => (e.target.style.display = "none")} />
              </div>
              <div className="booking-info">
                <div className="row">
                  <h3>{b.title}</h3>
                  <span className="badge">Confirmed</span>
                </div>
                <p className="muted">Booking ID: {b.id} · 📍 {b.destination}</p>
                <p>📅 Travel date: <strong>{b.date}</strong> · {b.days} Days</p>
                <p>👥 {b.adults} Adult(s), {b.children} Child(ren)</p>
                <p>👤 {b.name} · {b.phone}</p>
                <div className="row">
                  <span className="price">{formatPrice(b.total)}</span>
                  <button className="btn danger small" onClick={() => handleCancel(b.id)}>Cancel</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}