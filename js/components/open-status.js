(function (App) {
  'use strict';
  const { $, $$, clock, BRANCHES } = App;

  /** Returns [isOpen, label] for a branch, based on its per-weekday schedule. */
  function branchStatus(key) {
    const now = new Date();
    const day = now.getDay();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const sched = BRANCHES[key].sched;
    // Late-night service that started yesterday and runs past midnight
    const late = sched((day + 6) % 7).find((s) => s[1] > 1440 && minutes + 1440 < s[1]);
    if (late) return [1, `Open now · till ${clock(late[1])}`];
    const open = sched(day).find((s) => minutes >= s[0] && minutes < s[1]);
    if (open) return [1, `Open now · till ${clock(open[1])}`];
    const next = sched(day).find((s) => s[0] > minutes);
    return [0, next ? `Closed · opens ${clock(next[0])}` : `Closed · opens ${clock(sched((day + 1) % 7)[0][0])} tomorrow`];
  }

  /** "12:00 PM – 3:30 PM<br>7:00 PM – 11:30 PM" for today. */
  const todayHours = (key) =>
    BRANCHES[key].sched(new Date().getDay()).map((s) => `${clock(s[0])} – ${clock(s[1])}`).join('<br>');

  /** Fills every [data-bs="<branch>"] badge with live open/closed text. */
  function paintBranchStatus() {
    Object.keys(BRANCHES).forEach((key) => {
      const [open, text] = branchStatus(key);
      $$(`[data-bs="${key}"]`).forEach((el) => (el.innerHTML = `<i class="dot ${open ? '' : 'off'}"></i>${text}`));
    });
  }

  function paintTopbar() {
    const d = new Date();
    const m = d.getHours() * 60 + d.getMinutes();
    const open = [[720, 930, '3:30 PM'], [1140, 1410, '11:30 PM']].find((s) => m >= s[0] && m < s[1]);
    $('#stDot').classList.toggle('off', !open);
    $('#stTxt').textContent = open
      ? `Open now · until ${open[2]}`
      : m < 720 ? 'Closed · opens 12:00 PM' : m < 1140 ? 'Closed · opens 7:00 PM' : 'Closed · opens 12:00 PM tomorrow';
  }

  /** Keeps the top-bar and branch badges fresh every minute. */
  function startStatusTicker() {
    const tick = () => {
      paintTopbar();
      paintBranchStatus();
    };
    tick();
    setInterval(tick, 60000);
  }
  Object.assign(App, { branchStatus, todayHours, paintBranchStatus, startStatusTicker });
})(window.App = window.App || {});
