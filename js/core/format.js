(function (App) {
  'use strict';

  /** Formatting helpers (currency, dates, clock time). */

  /** 3499 -> "₹3,499" */
  const inr = (n) => '₹' + n.toLocaleString('en-IN');

  /** Date -> "YYYY-MM-DD" in the user's local timezone (for <input type="date">). */
  const isoDate = (d) =>
    new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

  /** Minutes since midnight -> "7:30 PM" (wraps past midnight). */
  function clock(minutes) {
    minutes %= 1440;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
  }
  Object.assign(App, { inr, isoDate, clock });
})(window.App = window.App || {});
