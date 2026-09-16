/* =====================================================================
   PB&J  —  Parker + Julie
   ---------------------------------------------------------------------
   EVERYTHING YOU MIGHT WANT TO EDIT LIVES IN THIS FIRST BLOCK.
   The rest of the file just renders it.
   ===================================================================== */

/* ---- Names ---------------------------------------------------------- */
const NAMES = { him: "Parker", her: "Julie" };

/* ---- The big day ---------------------------------------------------- */
// The moment it became official (date as YYYY-MM-DD, time as 24h HH:MM), in this time zone.
const OFFICIAL_DATE = "2026-09-18";
const OFFICIAL_TIME = "20:00";
const TIME_ZONE = "America/Chicago";

// Hero copy.
const HERO_CAPTION = "the day I asked properly";

// Counter copy.
const COUNTER_LABEL = "days official";
const COUNTER_BEFORE_TEXT = "Day 0 — begins 9/18"; // shown until the official moment arrives

// Section headings and the small italic lines beneath them.
const SECTION_COPY = {
  milestonesTitle: "Milestones",
  anniversaryTitle: "Next anniversary",
  anniversarySub: "same day, same time, every year",
  flowersTitle: "The Flower Log",
  flowersSub: "every bouquet so far",
  flowersCount: "{n} bouquets and counting", // {n} becomes the number of entries in FLOWERS
  letterTitle: "A letter for you",
  letterTease: "tap to open",
  letterClose: "fold it back up",
  photosTitle: "Photos",
  footer: "for Julie, from Parker",
};

/* ---- Gate ----------------------------------------------------------- */
const GATE_QUESTION = "What is your childhood nickname?";
const GATE_ANSWER = "juju"; // case-insensitive; spaces and punctuation are ignored ("Ju Ju!" still opens)
const GATE_PLACEHOLDER = "your answer";
const GATE_BUTTON = "Come in";
const GATE_KICKER = "hi Julie";
const GATE_HELLO = "Hello, Julie."; // flashes on the button for a beat when the answer is right
const GATE_WRONG_TEXT = "Not quite — try again, no rush 💜";
const GATE_STORAGE_KEY = "pbj-gate-open"; // localStorage flag: each device only asks once

/* ---- Milestones ----------------------------------------------------- */
// Add a milestone = add one line. date is YYYY-MM-DD, time is 24h HH:MM (in TIME_ZONE).
// Each one shows a live clock of the time passed since it happened, down to the second.
// A milestone that is still in the future counts down to it, then flips to counting up by itself.
const MILESTONES = [
  { label: "First date", date: "2026-04-29", time: "16:30" },
  { label: "First kiss", date: "2026-06-27", time: "00:00" },
  { label: "Officially us", date: "2026-09-18", time: "20:00" },
];

/* ---- The letter ----------------------------------------------------- */
// Blank lines between paragraphs become paragraph breaks.
const LETTER_BODY = `I've been yearning my whole life for you and now with full confidence I'm able to say that you are and will be my forever. I've never cried from being too happy before and now you've made that happen several times. You have no idea how much I miss you when you're gone. You drive me crazy, I could never imagine life without you. I love you more than I'll ever be able to express. 🫶`;
const LETTER_SIGNOFF = "— Parker"; // set to "" for no signature

/* ---- The flower log ------------------------------------------------- */
// Add a bouquet = add one line. date is YYYY-MM-DD (or use when: "late July 2026" for a rough date).
// note may be "" and is shown in italics when present.
const FLOWERS = [
  { flower: "blue preserved roses", date: "2026-06-27", note: "" },
  { flower: "purple tulips", date: "2026-07-03", note: "" },
  { flower: "pink tulips", date: "2026-07-24", note: "" },
  { flower: "red roses", date: "2026-08-07", note: "" },
  { flower: "sunflowers", date: "2026-08-21", note: "" },
  { flower: "pink roses", date: "2026-08-28", note: "" },
  { flower: "pink lilies", date: "2026-09-11", note: "" },
  { flower: "pink & purple tulips", date: "2026-09-18", note: "" },
];

// The little bloom drawn next to each flower-log entry, picked by matching the flower name.
// First match wins, so keep the specific ones above the general ones. Anything unmatched gets
// DEFAULT_SWATCH. To colour one entry by hand, give it a `swatch: "..."` field (any CSS background).
const FLOWER_SWATCHES = [
  [/blue|preserved/i,                        "radial-gradient(circle at 35% 35%, #a9c9ff, #2f5fb8)"],
  [/purple.*pink.*tulip|pink.*purple.*tulip/i, "linear-gradient(135deg, #ff7fbf 50%, #8b3fd9 50%)"],
  [/purple tulip/i,                          "radial-gradient(circle at 35% 35%, #d2b0f2, #6e3fa8)"],
  [/pink tulip/i,                            "radial-gradient(circle at 35% 35%, #ffc9de, #e05a9a)"],
  [/red rose/i,                              "radial-gradient(circle at 35% 35%, #ff8f8f, #c1121f)"],
  [/sunflower/i,                             "radial-gradient(circle, #5b3a1a 0 30%, #ffc531 34%)"],
  [/pink rose/i,                             "radial-gradient(circle at 35% 35%, #ffd6e6, #e24e92)"],
  [/lil(y|ies)|stargazer/i,                  "radial-gradient(circle at 40% 40%, #fff1f6 0 16%, #f49ac1 52%, #c9407f)"],
  [/coneflower/i,                            "radial-gradient(circle, #d08a3a 0 27%, #9b5de5 31%)"],
  [/tulip/i,                                 "linear-gradient(135deg, #8b3fd9 50%, #ff7fbf 50%)"],
];
const DEFAULT_SWATCH = "linear-gradient(160deg, #f6c2d8, #b46ac8)";

/* ---- Photos --------------------------------------------------------- */
// Put image files in the /photos folder, then list them here.
// Each entry is either a filename, or { file, caption } for a captioned photo.
// The whole section stays hidden while this list is empty.
const PHOTOS_FOLDER = "photos";
const PHOTOS = [
  // "first-date.jpg",
  // { file: "tulips.jpg", caption: "the ones I asked with" },
];

/* ---- Ambient petals ------------------------------------------------- */
const PETAL_COUNT = 12;

/* =====================================================================
   END OF EDITABLE VALUES.
   ===================================================================== */


/* ---------------------------------------------------------------------
   Small helpers
   --------------------------------------------------------------------- */
const $ = (sel, root) => (root || document).querySelector(sel);

function h(tag, attrs, children) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const key of Object.keys(attrs)) {
      const value = attrs[key];
      if (value === null || value === undefined || value === false) continue;
      if (key === "class") el.className = value;
      else if (key === "text") el.textContent = value;
      else el.setAttribute(key, value === true ? "" : value);
    }
  }
  if (children) {
    for (const child of [].concat(children)) {
      if (child === null || child === undefined || child === false) continue;
      el.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    }
  }
  return el;
}

function setText(el, text) {
  if (el && el.textContent !== text) el.textContent = text;
}

// localStorage can throw (private mode, storage disabled); never let that break the page.
const storage = {
  get(key) {
    try { return window.localStorage.getItem(key); } catch (err) { return null; }
  },
  set(key, value) {
    try { window.localStorage.setItem(key, value); } catch (err) { /* ignore */ }
  },
};

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------------
   Dates and times (wall-clock values are always read in TIME_ZONE)
   --------------------------------------------------------------------- */
function parseISODate(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  return { y, m, d };
}

function parseTime(hm) {
  const [hh, mm] = String(hm || "00:00").split(":").map(Number);
  return { hh: hh || 0, mm: mm || 0 };
}

// Formats YYYY-MM-DD as "September 17, 2026" without any time-zone drift.
function formatLongDate(iso) {
  const { y, m, d } = parseISODate(iso);
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC", year: "numeric", month: "long", day: "numeric",
    }).format(new Date(Date.UTC(y, m - 1, d)));
  } catch (err) {
    const months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    return months[m - 1] + " " + d + ", " + y;
  }
}

// Formats 24h "16:30" as "4:30 pm".
function formatTime(hm) {
  const { hh, mm } = parseTime(hm);
  const suffix = hh >= 12 ? "pm" : "am";
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;
  return hour12 + ":" + (mm < 10 ? "0" : "") + mm + " " + suffix;
}

function ordinal(n) {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return n + "th";
  const rem10 = n % 10;
  return n + (rem10 === 1 ? "st" : rem10 === 2 ? "nd" : rem10 === 3 ? "rd" : "th");
}

const formatNumber = (n) => {
  try { return n.toLocaleString("en-US"); } catch (err) { return String(n); }
};

let zonedFormatter = null;
function getZonedFormatter() {
  if (zonedFormatter === null) {
    try {
      zonedFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: TIME_ZONE, hourCycle: "h23",
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      });
    } catch (err) {
      zonedFormatter = false; // Intl time zones unsupported: fall back to device time
    }
  }
  return zonedFormatter;
}

// The wall-clock in TIME_ZONE for a given instant, as { y, m, d, hour, minute, second }.
function wallClock(date) {
  const fmt = getZonedFormatter();
  if (fmt) {
    const parts = {};
    for (const p of fmt.formatToParts(date)) parts[p.type] = p.value;
    return {
      y: Number(parts.year), m: Number(parts.month), d: Number(parts.day),
      hour: Number(parts.hour) % 24, minute: Number(parts.minute), second: Number(parts.second),
    };
  }
  return {
    y: date.getFullYear(), m: date.getMonth() + 1, d: date.getDate(),
    hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds(),
  };
}

// The exact instant (ms since epoch) of a wall-clock date + time in TIME_ZONE.
// Works across daylight-saving changes: it corrects the guess against the zone's own clock.
const instantCache = {};
function zonedInstant(dateIso, timeHm) {
  const key = dateIso + "T" + (timeHm || "00:00");
  if (instantCache[key] !== undefined) return instantCache[key];
  const { y, m, d } = parseISODate(dateIso);
  const { hh, mm } = parseTime(timeHm);
  let result;
  if (getZonedFormatter()) {
    const wanted = Date.UTC(y, m - 1, d, hh, mm, 0);
    let guess = wanted;
    for (let i = 0; i < 2; i++) {
      const w = wallClock(new Date(guess));
      const got = Date.UTC(w.y, w.m - 1, w.d, w.hour, w.minute, w.second);
      guess += wanted - got;
    }
    result = guess;
  } else {
    result = new Date(y, m - 1, d, hh, mm, 0).getTime();
  }
  instantCache[key] = result;
  return result;
}

// Splits a span of milliseconds into whole days, hours, minutes and seconds.
function breakdown(ms) {
  const total = Math.floor(Math.abs(ms) / 1000);
  return {
    future: ms < 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

// The whole span between two instants expressed in ONE unit at a time (years and months follow
// the calendar in TIME_ZONE; the rest are exact elapsed time).
function totals(from, to) {
  const ms = Math.max(0, to - from);
  const a = wallClock(new Date(from));
  const b = wallClock(new Date(to));
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  const aRest = [a.d, a.hour, a.minute, a.second];
  const bRest = [b.d, b.hour, b.minute, b.second];
  for (let i = 0; i < 4; i++) {
    if (bRest[i] !== aRest[i]) { if (bRest[i] < aRest[i]) months -= 1; break; }
  }
  if (months < 0) months = 0;
  return {
    years: Math.floor(months / 12),
    months,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000),
    minutes: Math.floor(ms / 60000),
    seconds: Math.floor(ms / 1000),
  };
}

const pad2 = (n) => (n < 10 ? "0" : "") + n;

/* ---------------------------------------------------------------------
   Gate
   --------------------------------------------------------------------- */
// Lower-case and keep only letters and digits, so casing, spaces and punctuation never matter.
function normalizeAnswer(value) {
  return String(value || "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

function initGate() {
  const gate = $("#gate");
  const form = $("#gate-form");
  const input = $("#gate-input");
  const hint = $("#gate-hint");
  const question = $("#gate-question");
  const button = $("#gate-button");
  if (!gate || !form || !input) return;

  question.textContent = GATE_QUESTION;
  input.placeholder = GATE_PLACEHOLDER;
  button.textContent = GATE_BUTTON;
  const kicker = $("#gate-kicker");
  if (kicker) kicker.textContent = GATE_KICKER;

  if (storage.get(GATE_STORAGE_KEY) === "1") {
    gate.remove();
    document.body.classList.remove("is-gated");
    return;
  }

  document.body.classList.add("is-gated");
  gate.hidden = false;
  // Keep the page behind the gate out of the tab order / screen readers until it opens.
  $("#page").setAttribute("aria-hidden", "true");
  $("#page").setAttribute("inert", "");

  window.setTimeout(() => { try { input.focus({ preventScroll: true }); } catch (err) { /* ignore */ } }, 300);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (normalizeAnswer(input.value) === normalizeAnswer(GATE_ANSWER)) {
      openGate(gate);
    } else {
      rejectAnswer(gate, input, hint);
    }
  });

  input.addEventListener("input", () => {
    hint.textContent = "";
    gate.classList.remove("is-wrong");
  });

  // Belt and braces: make sure Enter / the keyboard's "go" key always submits.
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (typeof form.requestSubmit === "function") form.requestSubmit();
    else form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  });
}

function rejectAnswer(gate, input, hint) {
  hint.textContent = GATE_WRONG_TEXT;
  gate.classList.remove("is-wrong");
  // Force a reflow so the shake animation restarts on repeated wrong answers.
  void gate.offsetWidth;
  gate.classList.add("is-wrong");
  input.select();
}

function openGate(gate) {
  storage.set(GATE_STORAGE_KEY, "1");
  $("#page").removeAttribute("aria-hidden");
  $("#page").removeAttribute("inert");
  const button = $("#gate-button");
  const input = $("#gate-input");
  button.textContent = GATE_HELLO;
  button.disabled = true;
  input.disabled = true;
  const finish = () => {
    gate.remove();
    document.body.classList.remove("is-gated");
    // Land focus on the names, so keyboard and screen-reader users start at the top of the page.
    const title = $("#hero-title");
    if (title) { try { title.focus({ preventScroll: true }); } catch (err) { /* ignore */ } }
  };
  if (prefersReducedMotion()) { finish(); return; }
  // A warm half-second beat, then the gate fades away.
  window.setTimeout(() => gate.classList.add("is-open"), 550);
  window.setTimeout(finish, 550 + 700);
}

/* ---------------------------------------------------------------------
   Hero and section copy
   --------------------------------------------------------------------- */
function renderHero() {
  document.title = "PB&J 💜 " + NAMES.him + " & " + NAMES.her;
  $("#hero-him").textContent = NAMES.him;
  $("#hero-her").textContent = NAMES.her;
  $("#hero-est-date").textContent = formatLongDate(OFFICIAL_DATE);
  $("#hero-caption").textContent = HERO_CAPTION;
  const time = $("#hero-est-time");
  if (time) time.setAttribute("datetime", OFFICIAL_DATE + "T" + OFFICIAL_TIME);
}

function applyCopy() {
  // An emptied line disappears instead of falling back to the HTML default.
  const set = (sel, text) => { const el = $(sel); if (!el) return; el.textContent = text || ""; el.hidden = !text; };
  set("#milestones-title", SECTION_COPY.milestonesTitle);
  set("#anniversary-title", SECTION_COPY.anniversaryTitle);
  set("#anniversary-sub", SECTION_COPY.anniversarySub);
  set("#flowers-title", SECTION_COPY.flowersTitle);
  set("#flowers-sub", SECTION_COPY.flowersSub);
  const n = FLOWERS.length;
  set("#flowers-count", n ? String(SECTION_COPY.flowersCount || "").replace("{n}", String(n)).replace(/bouquets/, n === 1 ? "bouquet" : "bouquets") : "");
  set("#letter-title", SECTION_COPY.letterTitle);
  set("#letter-tease", SECTION_COPY.letterTease);
  set("#letter-close", SECTION_COPY.letterClose);
  set("#photos-title", SECTION_COPY.photosTitle);
  set("#footer-line", SECTION_COPY.footer);
}

// Text with every "&" set as a small italic ampersand (the site's one typographic signature).
function withAmpersands(text) {
  const parts = String(text).split("&");
  const nodes = [];
  parts.forEach((part, i) => {
    if (i > 0) nodes.push(h("em", { class: "amp", text: "&" }));
    if (part) nodes.push(part);
  });
  return nodes;
}

/* ---------------------------------------------------------------------
   Days counter
   --------------------------------------------------------------------- */
function renderCounter() {
  const daysEl = $("#counter-days");
  const labelEl = $("#counter-label");
  const subEl = $("#counter-sub");
  const beforeEl = $("#counter-before");
  const liveEl = $("#counter-live");
  const spokenEl = $("#counter-spoken");
  if (!daysEl) return;

  const elapsed = Date.now() - zonedInstant(OFFICIAL_DATE, OFFICIAL_TIME);

  if (elapsed < 0) {
    liveEl.hidden = true;
    beforeEl.hidden = false;
    setText(beforeEl, COUNTER_BEFORE_TEXT);
    setText(spokenEl, COUNTER_BEFORE_TEXT);
    return;
  }

  const t = breakdown(elapsed);
  beforeEl.hidden = true;
  liveEl.hidden = false;
  const label = t.days === 1 ? COUNTER_LABEL.replace(/^days\b/, "day") : COUNTER_LABEL;
  setText(daysEl, String(t.days));
  setText(labelEl, label);
  setText(subEl,
    t.hours + (t.hours === 1 ? " hour " : " hours ") +
    t.minutes + (t.minutes === 1 ? " minute" : " minutes"));
  // One calm sentence for screen readers; it only changes once a day, not every minute.
  setText(spokenEl, t.days + " " + label);
}

/* ---------------------------------------------------------------------
   Live clocks (milestones and the anniversary countdown)
   --------------------------------------------------------------------- */
const TIMER_UNITS = ["years", "months", "days", "hours", "minutes", "seconds"];
const clocks = []; // every live clock on the page

// Builds the clock block: the "since / until" line, the d·h·m·s tiles, the single-unit total,
// and the little tabs that switch between them.
function buildClock(instant, host) {
  const cells = {};
  const tiles = h("p", { class: "timer-tiles" },
    ["days", "hours", "minutes", "seconds"].map((unit) => {
      cells[unit] = h("span", { class: "timer-num", text: "0" });
      return h("span", { class: "timer-cell timer-" + unit }, [cells[unit], h("span", { class: "timer-unit", text: unit })]);
    })
  );
  const totalNum = h("span", { class: "timer-total-num", text: "0" });
  const totalUnit = h("span", { class: "timer-total-unit", text: "" });
  const total = h("p", { class: "timer-total", hidden: true }, [totalNum, " ", totalUnit]);
  const since = h("p", { class: "milestone-since" });

  const tabs = {};
  const tabRow = h("div", { class: "timer-views", role: "group", "aria-label": "Show the time as" });
  const clock = { instant, host, cells, since, tiles, total, totalNum, totalUnit, tabs, view: "split" };
  const addTab = (view, label) => {
    const btn = h("button", { type: "button", class: "timer-view", "data-view": view, "aria-pressed": view === "split" ? "true" : "false", text: label });
    btn.addEventListener("click", () => selectView(clock, view));
    tabs[view] = btn;
    tabRow.appendChild(btn);
  };
  addTab("split", "d · h · m · s");
  for (const unit of TIMER_UNITS) addTab(unit, unit);

  host.appendChild(since);
  host.appendChild(tiles);
  host.appendChild(total);
  host.appendChild(tabRow);
  clocks.push(clock);
  tickClock(clock, Date.now());
  return clock;
}

function selectView(clock, view) {
  clock.view = view;
  for (const key of Object.keys(clock.tabs)) {
    clock.tabs[key].setAttribute("aria-pressed", key === view ? "true" : "false");
  }
  clock.tiles.hidden = view !== "split";
  clock.total.hidden = view === "split";
  tickClock(clock, Date.now());
}

function tickClock(clock, now) {
  const diff = now - clock.instant;
  const future = diff < 0;
  if (clock.view === "split") {
    const t = breakdown(diff);
    setText(clock.cells.days, String(t.days));
    setText(clock.cells.hours, pad2(t.hours));
    setText(clock.cells.minutes, pad2(t.minutes));
    setText(clock.cells.seconds, pad2(t.seconds));
  }
  // Totals decide which tabs exist (only units with at least 1) and feed the single-unit view.
  const all = future ? totals(now, clock.instant) : totals(clock.instant, now);
  for (const unit of TIMER_UNITS) {
    const show = all[unit] >= 1;
    if (clock.tabs[unit].hidden === show) clock.tabs[unit].hidden = !show;
  }
  if (clock.view !== "split") {
    if (all[clock.view] < 1) { selectView(clock, "split"); return; }
    const n = all[clock.view];
    setText(clock.totalNum, formatNumber(n));
    setText(clock.totalUnit, n === 1 ? clock.view.replace(/s$/, "") : clock.view);
  }
  setText(clock.since, future ? "counting down to it" : "and counting, since then");
  clock.host.classList.toggle("is-future", future);
}

/* ---------------------------------------------------------------------
   Milestones
   --------------------------------------------------------------------- */
function renderMilestones() {
  const list = $("#milestones-list");
  if (!list) return;
  list.textContent = "";

  const sorted = MILESTONES.slice().sort((a, b) => {
    const ka = a.date + "T" + (a.time || "00:00");
    const kb = b.date + "T" + (b.time || "00:00");
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });

  sorted.forEach((item, index) => {
    const newest = index === sorted.length - 1;
    // The newest milestone gets the tulip itself; the others get a dot.
    const node = newest ? tulipNode("milestone-tulip") : h("span", { class: "milestone-dot", "aria-hidden": "true" });
    const body = h("div", { class: "milestone-body" }, [
      h("p", { class: "milestone-label" }, withAmpersands(item.label)),
      h("p", { class: "milestone-meta" }, [
        h("time", { datetime: item.date + (item.time ? "T" + item.time : ""), text: formatLongDate(item.date) }),
        item.time ? h("span", { class: "milestone-time", text: " · " + formatTime(item.time) }) : null,
      ]),
    ]);
    const li = h("li", { class: "milestone" + (newest ? " milestone-newest" : "") }, [node, body]);
    list.appendChild(li);
    const clock = buildClock(zonedInstant(item.date, item.time), body);
    clock.li = li;
  });
}

/* ---------------------------------------------------------------------
   Anniversary countdown (yearly, from the official moment)
   --------------------------------------------------------------------- */
let anniversaryClock = null;

// The soonest yearly repeat of ANY milestone (the official day, the first date, ...).
function nextAnniversary(now) {
  let best = null;
  for (const item of MILESTONES) {
    const { y } = parseISODate(item.date);
    const monthDay = item.date.slice(4); // "-09-17"
    const time = item.time || "00:00";
    for (let year = y + 1; year < y + 500; year++) {
      const iso = String(year) + monthDay;
      const instant = zonedInstant(iso, time);
      if (instant <= now) continue;
      const official = item.date === OFFICIAL_DATE && time === OFFICIAL_TIME;
      if (!best || instant < best.instant || (instant === best.instant && official)) {
        best = { iso, time, instant, nth: year - y, label: item.label, official };
      }
      break;
    }
  }
  return best;
}

function anniversaryLabel(next) {
  if (next.official) return "our " + ordinal(next.nth) + " anniversary";
  const label = String(next.label);
  const lower = label.charAt(0).toLowerCase() + label.slice(1); // "First date" -> "first date"
  return next.nth + (next.nth === 1 ? " year since " : " years since ") + lower;
}

function renderAnniversary() {
  const host = $("#anniversary-body");
  if (!host) return;
  host.textContent = "";
  const next = nextAnniversary(Date.now());
  if (!next) return;
  host.appendChild(h("p", { class: "milestone-label" }, withAmpersands(anniversaryLabel(next))));
  host.appendChild(h("p", { class: "milestone-meta" }, [
    h("time", { datetime: next.iso + "T" + next.time, text: formatLongDate(next.iso) }),
    h("span", { class: "milestone-time", text: " · " + formatTime(next.time) }),
  ]));
  if (anniversaryClock) {
    const at = clocks.indexOf(anniversaryClock);
    if (at >= 0) clocks.splice(at, 1);
  }
  anniversaryClock = buildClock(next.instant, host);
  anniversaryClock.isAnniversary = true;
}

/* ---------------------------------------------------------------------
   The shared ticker
   --------------------------------------------------------------------- */
function tickAll() {
  const now = Date.now();
  for (const clock of clocks) tickClock(clock, now);
  renderCounter();
  // The moment an anniversary passes, start counting down to the next one.
  if (anniversaryClock && now >= anniversaryClock.instant) renderAnniversary();
}

function initClocks() {
  renderCounter();
  renderMilestones();
  renderAnniversary();
  window.setInterval(tickAll, 1000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tickAll(); });
  window.addEventListener("pageshow", tickAll);
}

// A small inline tulip head (the same drawing as the app icon), for decoration only.
function tulipNode(className) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("viewBox", "120 84 272 224");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const use = document.createElementNS(svgNS, "use");
  use.setAttribute("href", "#tulip-bud");
  use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#tulip-bud");
  svg.appendChild(use);
  return svg;
}

/* ---------------------------------------------------------------------
   The letter
   --------------------------------------------------------------------- */
function renderLetter() {
  const section = $("#letter");
  const text = $("#letter-text");
  const signoff = $("#letter-signoff");
  const open = $("#letter-open");
  const close = $("#letter-close");
  const body = $("#letter-body");
  if (!section || !text) return;

  const paragraphs = String(LETTER_BODY).trim().split(/\n\s*\n/);
  text.textContent = "";
  for (const para of paragraphs) text.appendChild(h("p", { text: para.trim() }));
  signoff.textContent = LETTER_SIGNOFF || "";
  signoff.hidden = !LETTER_SIGNOFF;
  if (!String(LETTER_BODY).trim()) { section.hidden = true; return; }

  const setOpen = (isOpen) => {
    section.classList.toggle("is-open", isOpen);
    open.setAttribute("aria-expanded", isOpen ? "true" : "false");
    body.hidden = !isOpen;
    open.hidden = isOpen;
    if (isOpen) {
      try { close.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
    } else {
      try { open.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
    }
  };
  open.addEventListener("click", () => setOpen(true));
  close.addEventListener("click", () => setOpen(false));
}

/* ---------------------------------------------------------------------
   The flower log
   --------------------------------------------------------------------- */
function swatchFor(item) {
  if (item.swatch) return item.swatch;
  for (const [pattern, background] of FLOWER_SWATCHES) {
    if (pattern.test(item.flower)) return background;
  }
  return DEFAULT_SWATCH;
}

function renderFlowers() {
  const list = $("#flowers-list");
  if (!list) return;
  list.textContent = "";
  FLOWERS.forEach((item, index) => {
    const note = item.note && item.note.trim();
    const when = item.when || (item.date ? formatLongDate(item.date) : "");
    list.appendChild(
      h("li", { class: "flower" + (index === FLOWERS.length - 1 ? " flower-latest" : "") }, [
        h("span", { class: "flower-bud", "aria-hidden": "true", style: "--swatch:" + swatchFor(item) }),
        h("div", { class: "flower-body" }, [
          h("p", { class: "flower-name" }, withAmpersands(item.flower)),
          when ? h("p", { class: "flower-when" }, [
            item.date && !item.when ? h("time", { datetime: item.date, text: when }) : when,
          ]) : null,
          note ? h("p", { class: "flower-note", text: "“" + note + "”" }) : null,
        ]),
      ])
    );
  });
}

/* ---------------------------------------------------------------------
   Photos
   --------------------------------------------------------------------- */
function renderPhotos() {
  const section = $("#photos");
  const grid = $("#photos-grid");
  if (!section || !grid) return;
  const items = PHOTOS.map((p) => (typeof p === "string" ? { file: p, caption: "" } : p))
    .filter((p) => p && p.file);
  if (items.length === 0) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  grid.textContent = "";
  items.forEach((photo, index) => {
    const src = PHOTOS_FOLDER + "/" + photo.file;
    const alt = photo.caption || (NAMES.him + " and " + NAMES.her + ", photo " + (index + 1));
    const img = h("img", { src, alt, loading: "lazy", decoding: "async" });
    const button = h("button", { type: "button", class: "photo-open", "aria-label": "Open photo: " + alt }, [img]);
    button.addEventListener("click", () => openLightbox(src, photo.caption || ""));
    grid.appendChild(
      h("figure", { class: "photo" }, [
        button,
        photo.caption ? h("figcaption", { class: "photo-caption", text: photo.caption }) : null,
      ])
    );
  });
}

let lightboxOpener = null;

function openLightbox(src, caption) {
  const box = $("#lightbox");
  const img = $("#lightbox-img");
  const cap = $("#lightbox-caption");
  lightboxOpener = document.activeElement;
  img.src = src;
  img.alt = caption || "";
  cap.textContent = caption;
  cap.hidden = !caption;
  box.hidden = false;
  document.body.classList.add("has-lightbox");
  $("#lightbox-close").focus({ preventScroll: true });
}

function closeLightbox() {
  const box = $("#lightbox");
  if (!box || box.hidden) return;
  box.hidden = true;
  $("#lightbox-img").removeAttribute("src");
  document.body.classList.remove("has-lightbox");
  // Hand focus back to the photo that opened the lightbox.
  if (lightboxOpener && typeof lightboxOpener.focus === "function") {
    try { lightboxOpener.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
  }
  lightboxOpener = null;
}

function initLightbox() {
  const box = $("#lightbox");
  if (!box) return;
  box.addEventListener("click", (event) => {
    if (event.target === box || event.target.closest("#lightbox-close")) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

/* ---------------------------------------------------------------------
   Ambient petals
   --------------------------------------------------------------------- */
function initPetals() {
  const field = $("#petals");
  if (!field) return;
  field.textContent = "";
  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = h("span", {
      class: "petal " + (i % 3 === 0 ? "petal-purple" : "petal-pink"),
      "aria-hidden": "true",
      style:
        "--x:" + Math.round(Math.random() * 100) + "vw;" +
        "--size:" + Math.round(13 + Math.random() * 12) + "px;" +
        "--duration:" + Math.round(22 + Math.random() * 18) + "s;" +
        "--delay:" + Math.round(-Math.random() * 40) + "s;" +
        "--sway:" + Math.round(20 + Math.random() * 40) + "px;" +
        "--spin:" + Math.round(Math.random() * 360) + "deg;" +
        "--rest:" + Math.round(8 + Math.random() * 84) + "vh",
    });
    field.appendChild(petal);
  }
}

/* ---------------------------------------------------------------------
   Boot
   --------------------------------------------------------------------- */
function init() {
  document.documentElement.classList.add("js");
  // The gate goes first, on its own: whatever else happens below, the door must still open.
  try { initGate(); } catch (err) { console.error(err); }
  const steps = [renderHero, applyCopy, initClocks, renderFlowers, renderLetter, renderPhotos, initLightbox, initPetals];
  for (const step of steps) {
    try { step(); } catch (err) { console.error(err); }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
