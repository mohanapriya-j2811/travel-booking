import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPackage, getDestination } from "../data/mockData";
import { calcTotal, formatPrice, addBooking } from "../utils/helpers";

const today = new Date().toISOString().split("T")[0];

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 3) e.name = "Enter full name (min 3 characters)";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address";
  if (!/^[6-9]\d{9}$/.test(v.phone)) e.phone = "Enter a valid 10-digit mobile number";
  if (!v.date) e.date = "Select a travel date";
  else if (v.date < today) e.date = "Date cannot be in the past";
  const a = Number(v.adults);
  if (!Number.isInteger(a) || a < 1 || a > 10) e.adults = "Adults must be 1 to 10";
  const c = Number(v.children);
  if (!Number.isInteger(c) || c < 0 || c > 6) e.children = "Children must be 0 to 6";
  if (!v.agree) e.agree = "Please accept the terms";
  return e;
};

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = getPackage(id);

  const [values, setValues] = useState({
    name: "", email: "", phone: "", date: "", adults: 1, children: 0, agree: false,
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(values), [values]);
  const price = useMemo(
    () => (pkg ? calcTotal(pkg.price, Number(values.adults) || 0, Number(values.children) || 0) : null),
    [pkg, values.adults, values.children]
  );

  if (!pkg) {
    return (
      <div className="container empty">
        <h2>Package not found</h2>
        <Link className="btn" to="/destinations">Browse destinations</Link>
      </div>
    );
  }

  const dest = getDestination(pkg.destinationId);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  };
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });
  const showError = (f) => (touched[f] || submitted) && errors[f];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    addBooking({
      id: "TRV" + Date.now().toString().slice(-6),
      packageId: pkg.id,
      title: pkg.title,
      destination: `${dest.name}, ${dest.country}`,
      image: dest.image,
      days: pkg.days,
      name: values.name.trim(),
      email: values.email,
      phone: values.phone,
      date: values.date,
      adults: Number(values.adults),
      children: Number(values.children),
      total: price.total,
      bookedOn: new Date().toISOString(),
    });
    navigate("/my-bookings");
  };

  const Field = ({ label, name, type = "text", ...rest }) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={values[name]}
        onChange={handleChange} onBlur={handleBlur} {...rest} />
      {showError(name) && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="container section">
      <h2>Book: {pkg.title}</h2>
      <div className="details-layout">
        <form className="form" onSubmit={handleSubmit} noValidate>
          {Field({ label: "Full Name", name: "name", placeholder: "Your name" })}
          {Field({ label: "Email", name: "email", type: "email", placeholder: "you@example.com" })}
          {Field({ label: "Mobile Number", name: "phone", placeholder: "10-digit number", maxLength: 10 })}
          {Field({ label: "Travel Date", name: "date", type: "date", min: today })}
          <div className="two-col">
            {Field({ label: "Adults", name: "adults", type: "number", min: 1, max: 10 })}
            {Field({ label: "Children (50% price)", name: "children", type: "number", min: 0, max: 6 })}
          </div>

          <div className="field">
            <label className="checkbox">
              <input type="checkbox" name="agree" checked={values.agree}
                onChange={handleChange} onBlur={handleBlur} />
              I agree to the terms and cancellation policy
            </label>
            {showError("agree") && <span className="error">{errors.agree}</span>}
          </div>

          <button className="btn full" type="submit">Confirm Booking</button>
        </form>

        <aside className="price-box">
          <h3>Price Summary</h3>
          <div className="summary-row"><span>Package</span><span>{formatPrice(pkg.price)} / person</span></div>
          <div className="summary-row"><span>Adults × {Number(values.adults) || 0}</span>
            <span>{formatPrice(pkg.price * (Number(values.adults) || 0))}</span></div>
          <div className="summary-row"><span>Children × {Number(values.children) || 0}</span>
            <span>{formatPrice(pkg.price * 0.5 * (Number(values.children) || 0))}</span></div>
          <div className="summary-row"><span>GST (5%)</span><span>{formatPrice(price.tax)}</span></div>
          <hr />
          <div className="summary-row total"><span>Total</span><span>{formatPrice(price.total)}</span></div>
        </aside>
      </div>
    </div>
  );
}