export const formatPrice = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

export const calcTotal = (price, adults, children) => {
  const subtotal = price * adults + price * 0.5 * children; // child = 50%
  const tax = subtotal * 0.05; // 5% GST
  return { subtotal, tax, total: subtotal + tax };
};

const KEY = "travel_bookings";

export const getBookings = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const addBooking = (booking) => {
  localStorage.setItem(KEY, JSON.stringify([booking, ...getBookings()]));
};

export const removeBooking = (id) => {
  localStorage.setItem(KEY, JSON.stringify(getBookings().filter((b) => b.id !== id)));
};