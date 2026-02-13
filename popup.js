const MOCK_DATA = {
  product: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
  confidence: 92,
  recommendation: {
    verdict: "Strong Buy",
    type: "buy", // "buy" | "dont-buy" | "consider"
    summary:
      "Overwhelmingly positive sentiment across all platforms. Reviewers consistently praise the noise cancellation and comfort, with minor concerns about price and durability.",
  },
  sentiment: {
    positive: 72,
    neutral: 18,
    negative: 10,
  },
  totalReviews: 196,
  value: {
    score: 85,
    description:
      "At its current price point, the XM5 delivers exceptional value. Superior ANC, 30-hour battery life, and multipoint connectivity justify the premium over competitors.",
  },
  pros: [
    "Industry-leading active noise cancellation",
    "Extremely comfortable for extended wear",
    "30-hour battery life with quick charging",
    "Excellent multipoint Bluetooth connectivity",
  ],
  cons: [
    "Premium price point vs competitors",
    "No foldable design — less portable",
    "Touch controls can be finicky",
    "Limited EQ customization without app",
  ],
  sources: [
    { platform: "tiktok", name: "TikTok", count: 45 },
    { platform: "reddit", name: "Reddit", count: 128 },
    { platform: "youtube", name: "YouTube", count: 23 },
  ],
};

const PLATFORM_ICONS = {
  tiktok: `<svg viewBox="0 0 16 16" width="14" height="14"><path d="M8.5 1v9.5a2.5 2.5 0 1 1-2-2.45V5.5A5 5 0 1 0 11 10V4.5a4.5 4.5 0 0 0 3 1.13V3.08A4.5 4.5 0 0 1 11 1H8.5Z" fill="#333"/></svg>`,
  reddit: `<svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm4.6 9.2a1.1 1.1 0 0 1-1.1 1.1c-.3 0-.6-.1-.8-.3-.7.5-1.7.8-2.7.8s-2-.3-2.7-.8c-.2.2-.5.3-.8.3a1.1 1.1 0 0 1 0-2.2c.3 0 .6.1.8.3.4-.3.9-.5 1.4-.6l.7-3.2 2.2.5a.8.8 0 1 1-.1.5l-1.8-.4-.6 2.6c.5.1 1 .3 1.4.6.2-.2.5-.3.8-.3a1.1 1.1 0 0 1 1.1 1.1ZM6 9.2a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6Zm4 0a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6Zm-.3 1.3c-.5.5-1.2.7-1.7.7s-1.2-.2-1.7-.7a.3.3 0 0 1 .4-.4c.3.4.8.5 1.3.5s1-.2 1.3-.5a.3.3 0 0 1 .4.4Z" fill="#FF4500"/></svg>`,
  youtube: `<svg viewBox="0 0 16 16" width="14" height="14"><path d="M14.7 4.3a1.8 1.8 0 0 0-1.3-1.3C12.2 2.7 8 2.7 8 2.7s-4.2 0-5.4.3A1.8 1.8 0 0 0 1.3 4.3C1 5.5 1 8 1 8s0 2.5.3 3.7c.2.7.7 1.1 1.3 1.3 1.2.3 5.4.3 5.4.3s4.2 0 5.4-.3c.6-.2 1.1-.6 1.3-1.3.3-1.2.3-3.7.3-3.7s0-2.5-.3-3.7ZM6.5 10.3V5.7L10.4 8l-3.9 2.3Z" fill="#FF0000"/></svg>`,
};

const REC_ICONS = {
  buy: `<svg viewBox="0 0 28 28" fill="none"><path d="M7 14.5L12 19.5L21 9.5" stroke="#2E7D32" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  "dont-buy": `<svg viewBox="0 0 28 28" fill="none"><path d="M9 9L19 19M19 9L9 19" stroke="#C62828" stroke-width="3" stroke-linecap="round"/></svg>`,
  consider: `<svg viewBox="0 0 28 28" fill="none"><path d="M14 7v8M14 19v1" stroke="#F9A825" stroke-width="3" stroke-linecap="round"/></svg>`,
};

// ── DOM refs ──
const sidePanel = document.getElementById("side-panel");
const backdrop = document.getElementById("backdrop");
const expandedPanel = document.getElementById("expanded-panel");
const collapsedBar = document.getElementById("collapsed-bar");
const expandBtn = document.getElementById("expand-btn");
const collapseBtns = document.querySelectorAll(".collapse-btn");
const collapsedLogo = document.querySelector(".collapsed-logo");

// ── Panel state ──
let panelExpanded = false;

function expandPanel() {
  panelExpanded = true;
  sidePanel.classList.add("expanded");
  backdrop.classList.add("visible");
}

function collapsePanel() {
  panelExpanded = false;
  sidePanel.classList.remove("expanded");
  backdrop.classList.remove("visible");
}

function togglePanel() {
  if (panelExpanded) {
    collapsePanel();
  } else {
    expandPanel();
  }
}

// Expand button on collapsed bar
expandBtn.addEventListener("click", expandPanel);

// Collapsed logo also expands
collapsedLogo.addEventListener("click", expandPanel);

// All collapse buttons inside expanded panel
collapseBtns.forEach((btn) => btn.addEventListener("click", collapsePanel));

// Click backdrop to close
backdrop.addEventListener("click", collapsePanel);

// Escape key to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && panelExpanded) {
    collapsePanel();
  }
});

// ── Populate results ──
function populateResults(data) {
  // Confidence
  document.getElementById("confidence-value").textContent = data.confidence + "%";

  // Product name
  document.getElementById("product-name").textContent = data.product;

  // Recommendation card
  const card = document.getElementById("recommendation-card");
  const type = data.recommendation.type;
  card.classList.add(type);
  document.getElementById("rec-icon").innerHTML = REC_ICONS[type];
  document.getElementById("rec-verdict").textContent = data.recommendation.verdict;
  document.getElementById("rec-summary").textContent = data.recommendation.summary;

  // Sentiment bars (start at 0, animate in)
  requestAnimationFrame(() => {
    document.getElementById("bar-positive").style.width = data.sentiment.positive + "%";
    document.getElementById("bar-neutral").style.width = data.sentiment.neutral + "%";
    document.getElementById("bar-negative").style.width = data.sentiment.negative + "%";
  });

  document.getElementById("pct-positive").textContent = data.sentiment.positive + "%";
  document.getElementById("pct-neutral").textContent = data.sentiment.neutral + "%";
  document.getElementById("pct-negative").textContent = data.sentiment.negative + "%";
  document.getElementById("total-reviews").textContent = data.totalReviews.toLocaleString();

  // Value meter
  requestAnimationFrame(() => {
    document.getElementById("value-meter-fill").style.width = data.value.score + "%";
    document.getElementById("value-meter-thumb").style.left = data.value.score + "%";
  });
  document.getElementById("value-score-text").textContent = data.value.score + "/100 — Great Value";
  document.getElementById("value-description").textContent = data.value.description;

  // Pros
  const prosList = document.getElementById("pros-list");
  data.pros.forEach((pro) => {
    const li = document.createElement("li");
    li.textContent = pro;
    prosList.appendChild(li);
  });

  // Cons
  const consList = document.getElementById("cons-list");
  data.cons.forEach((con) => {
    const li = document.createElement("li");
    li.textContent = con;
    consList.appendChild(li);
  });

  // Sources
  const sourcesList = document.getElementById("sources-list");
  data.sources.forEach((source) => {
    const pill = document.createElement("div");
    pill.className = "source-pill";
    pill.dataset.platform = source.platform;
    pill.innerHTML = `${PLATFORM_ICONS[source.platform]} ${source.name} <span class="source-count">${source.count}</span>`;
    sourcesList.appendChild(pill);
  });
}

// ── Init: simulate loading → expand → results ──
function init() {
  const loadingState = document.getElementById("loading-state");
  const resultsState = document.getElementById("results-state");

  // Auto-expand the panel on load (simulates context menu trigger)
  setTimeout(() => {
    expandPanel();
  }, 300);

  // Show loading for 2.5s, then transition to results
  setTimeout(() => {
    loadingState.classList.add("hidden");
    resultsState.classList.remove("hidden");
    populateResults(MOCK_DATA);
  }, 2800);
}

document.addEventListener("DOMContentLoaded", init);
