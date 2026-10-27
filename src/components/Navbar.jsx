import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={close}>✈ WanderWay</Link>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? "✕" : "☰"}
        </button>
        <nav className={`nav-links ${open ? "show" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/destinations" onClick={close}>Destinations</NavLink>
          <NavLink to="/my-bookings" onClick={close}>My Bookings</NavLink>
        </nav>
      </div>
    </header>
  );
}