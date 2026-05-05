/* FanLoop Clean V2
   Stable mobile-first local fan exchange prototype.
   Files needed: index.html, styles.css, app.js only.
*/

const STORE_KEY = "fanloop_clean_v2_state";

const boardConfig = {
  giveaway: {
    name: "Freebie Distribution",
    short: "Distribution",
    description: "Post local freebies, open online claims, and manage distribution registration.",
    emoji: "✿",
    themeNames: ["Soft Lime", "Sage Cream", "Honey Garden"],
    themes: [
      { accent: "#9EB878", accent2: "#E8F0C7", accent3: "#F7EAB0", accentDark: "#657A4E" },
      { accent: "#8AA889", accent2: "#DCEBDD", accent3: "#EFE6C8", accentDark: "#57725A" },
      { accent: "#C5B66B", accent2: "#F1E9BD", accent3: "#DDE8C0", accentDark: "#7D7342" }
    ]
  },
  freebieExchange: {
    name: "Freebie Exchange",
    short: "Freebie Exchange",
    description: "Exchange fan-made freebies through chat, exchange orders, and trust records.",
    emoji: "◇",
    themeNames: ["Mist Lavender", "Cloud Blue", "Soft Violet"],
    themes: [
      { accent: "#8B86C7", accent2: "#E4E2F7", accent3: "#CDE5F4", accentDark: "#5F5AA0" },
      { accent: "#7CA6C9", accent2: "#DDECF6", accent3: "#E8DDF5", accentDark: "#517899" },
      { accent: "#A285BC", accent2: "#EEE2F5", accent3: "#D9E6F5", accentDark: "#755B90" }
    ]
  },
  merchExchange: {
    name: "Merchandise Exchange",
    short: "Merchandise Exchange",
    description: "Exchange purchased or official goods locally with item condition records.",
    emoji: "◆",
    themeNames: ["Peach Clay", "Coral Cream", "Warm Terracotta"],
    themes: [
      { accent: "#D89076", accent2: "#F7DFD2", accent3: "#F3E5BA", accentDark: "#9E604D" },
      { accent: "#CF817B", accent2: "#F7DCD9", accent3: "#F1E3C5", accentDark: "#985650" },
      { accent: "#C78A67", accent2: "#F4DECB", accent3: "#EED2BC", accentDark: "#925E45" }
    ]
  }
};

const initialRegions = [
  { country: "United States", city: "New York" },
  { country: "United States", city: "New Jersey" },
  { country: "United States", city: "Los Angeles" },
  { country: "United States", city: "Boston" },
  { country: "United States", city: "Seattle" },
  { country: "China", city: "Shenzhen" },
  { country: "China", city: "Guangzhou" },
  { country: "China", city: "Shanghai" },
  { country: "China", city: "Beijing" },
  { country: "China", city: "Chengdu" }
];

const initialTags = {
  ip: ["Genshin Impact", "Honkai StarRail", "Zenless Zone Zero"],
  subject: ["Cyrene", "Mydei", "Flins", "Columbina", "Haikaveh", "Phaidei", "General / No specific character"],
  itemType: ["Collectible Card", "Blind Box Figure", "Thick Acrylic Stand", "Acrylic Stand", "Acrylic Keychain", "Acrylic Check-in Stick", "Badge", "Sticker", "Postcard"],
  origin: ["Official Merch", "Fan-made Self-drawn", "Commissioned artwork", "Handmade"],
  condition: ["In stock", "Preorder / not arrived yet", "Opened for checking only", "Finished and opened only", "New", "Minor damage"]
};

const sampleItems = [
  {
    id: "item_3001",
    board: "merchExchange",
    region: { country: "United States", city: "New York" },
    title: "Cyrene Collectible Card",
    owner: "Yuza",
    ip: ["Honkai StarRail"],
    subject: ["Cyrene"],
    itemType: ["Collectible Card"],
    origin: ["Official Merch"],
    condition: "Preorder / not arrived yet",
    quantityTotal: 1,
    quantityAvailable: 1,
    quantityReserved: 0,
    status: "Preorder",
    description: "This is a preorder item. The exchange can be arranged first, but it can only be completed after the item arrives.",
    locationNote: "New York local exchange. Exact location will be confirmed in chat.",
    lookingFor: "Same series Mydei collectible card x1.",
    cover: "assets/items/cyrene-card-cover.png",
    details: ["assets/items/cyrene-card-detail.png"],
    likes: 6,
    private: false
  },
  {
    id: "item_3002",
    board: "merchExchange",
    region: { country: "United States", city: "New York" },
    title: "Flins Blind Box Figure",
    owner: "Yuza",
    ip: ["Genshin Impact"],
    subject: ["Flins"],
    itemType: ["Blind Box Figure"],
    origin: ["Official Merch"],
    condition: "Opened for checking only",
    quantityTotal: 1,
    quantityAvailable: 1,
    quantityReserved: 0,
    status: "Available",
    description: "In-stock official blind box figure. It has the original package and identity card.",
    locationNote: "New York local exchange. Exact location will be confirmed in chat.",
    lookingFor: "Same series Columbina blind box figure x1.",
    cover: "assets/items/flins-figure-cover.png",
    details: ["assets/items/flins-figure-detail.png"],
    likes: 9,
    private: false
  },
  {
    id: "item_1001",
    board: "giveaway",
    region: { country: "United States", city: "New York" },
    title: "Haikaveh Thick Acrylic Stand",
    owner: "Yuza",
    ip: ["Genshin Impact"],
    subject: ["Haikaveh"],
    itemType: ["Thick Acrylic Stand"],
    origin: ["Fan-made Self-drawn"],
    condition: "",
    quantityTotal: 30,
    quantityAvailable: 30,
    quantityReserved: 0,
    status: "Open",
    description: "I made some Haikaveh freebies. Feel free to come and say hi!",
    locationNote: "Union Square, New York. May 3, 12:00 PM–2:00 PM.",
    giveawayLocation: "Union Square, New York",
    giveawayTime: "May 3, 12:00 PM–2:00 PM",
    onlineClaimEnabled: true,
    claimMode: "Registration",
    cover: "assets/items/haikaveh-acrylic-cover.png",
    details: ["assets/items/haikaveh-acrylic-detail.png"],
    likes: 18,
    private: false
  },
  {
    id: "item_2001",
    board: "freebieExchange",
    region: { country: "United States", city: "New York" },
    title: "Phaidei Acrylic Check-in Stick",
    owner: "Yuza",
    ip: ["Honkai StarRail"],
    subject: ["Phaidei"],
    itemType: ["Acrylic Check-in Stick"],
    origin: ["Fan-made Self-drawn"],
    condition: "Finished and opened only",
    quantityTotal: 2,
    quantityAvailable: 2,
    quantityReserved: 0,
    status: "Available",
    description: "Finished fan-made acrylic check-in stick. It was only opened after production was completed.",
    locationNote: "Times Square, New York.",
    exchangePreference: "Looking for acrylic items. Must also be Phaidei-related.",
    cover: "assets/items/phaidei-stick-cover.png",
    details: ["assets/items/phaidei-stick-detail.png"],
    likes: 21,
    private: false
  }
];

const sampleOrders = [
  {
    id: "FL-0526-001",
    type: "Merchandise Exchange",
    partner: "Mika",
    status: "Waiting for Agreement",
    region: { country: "United States", city: "New York" },
    createdAt: "May 10, 2026 3:42 PM",
    meetingLocation: "New York local exchange location to be confirmed",
    meetingTime: "After preorder item arrives",
    yuzaItem: "Yuza gives: Cyrene Collectible Card x1",
    partnerItem: "Mika gives: Mydei Collectible Card x1",
    proofA: false,
    proofB: false,
    agreedA: false,
    agreedB: false,
    linkedItemId: "item_3001",
    timeline: ["Order request created from chat.", "Waiting for both users to agree."]
  },
  {
    id: "FL-0526-002",
    type: "Freebie Exchange",
    partner: "Nora",
    status: "In Progress",
    region: { country: "United States", city: "New York" },
    createdAt: "May 05, 2026 1:20 PM",
    meetingLocation: "Times Square, New York",
    meetingTime: "May 11, 2026, 3:00–4:00 PM",
    yuzaItem: "Yuza gives: Phaidei Acrylic Check-in Stick x1",
    partnerItem: "Nora gives: Phaidei Acrylic Stand x1",
    proofA: false,
    proofB: false,
    agreedA: true,
    agreedB: true,
    linkedItemId: "item_2001",
    timeline: ["Order created from chat.", "Both users agreed to exchange."]
  }
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function defaultState() {
  return {
    user: {
      username: "Yuza",
      nickname: "Yuza",
      password: "611225abc",
      bio: "Local fan item collector and exchange beginner.",
      loggedIn: true,
      trust: { completed: 12, average: 4.8, lateCancellations: 1, unresolved: 1, noShowReports: 0 }
    },
    currentBoard: "giveaway",
    currentRegion: { country: "United States", city: "New York" },
    regions: clone(initialRegions),
    boardThemeIndex: { giveaway: 0, freebieExchange: 0, merchExchange: 0 },
    tags: clone(initialTags),
    items: clone(sampleItems),
    liked: [],
    savedFolders: [
      { id: "folder_all", name: "All Saved", itemIds: ["item_3002"] },
      { id: "folder_claim", name: "Want to Claim", itemIds: ["item_1001"] },
      { id: "folder_exchange", name: "Exchange Ideas", itemIds: ["item_2001"] }
    ],
    notices: [
      { id: "n1", text: "Mika liked your Cyrene Collectible Card.", unread: true, type: "like" },
      { id: "n2", text: "New online claim request for Haikaveh Thick Acrylic Stand.", unread: true, type: "claim" },
      { id: "n3", text: "Order #FL-0526-001 needs agreement.", unread: true, type: "order" }
    ],
    chats: [
      {
        id: "chat_nora",
        partner: "Nora",
        itemId: "item_2001",
        unread: true,
        messages: [
          { from: "Nora", text: "Hi! This item is still available." },
          { from: "Yuza", text: "Can we exchange near Union Square?" },
          { from: "Nora", text: "Yes, that works for me." }
        ]
      }
    ],
    orders: clone(sampleOrders),
    tagThemes: { Furina: "sparkle", Phaidei: "ribbon" },
    filters: {
      includeIp: [],
      excludeIp: [],
      includeSubject: [],
      excludeSubject: [],
      includeType: [],
      excludeType: [],
      includeOrigin: [],
      status: "All",
      lookingFor: ""
    },
    normalSearch: "",
    activeTag: "",
    view: "home"
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      const fresh = defaultState();
      localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    const loaded = JSON.parse(raw);
    const base = defaultState();
    return {
      ...base,
      ...loaded,
      user: { ...base.user, ...(loaded.user || {}), trust: { ...base.user.trust, ...((loaded.user || {}).trust || {}) } },
      tags: { ...base.tags, ...(loaded.tags || {}) },
      filters: { ...base.filters, ...(loaded.filters || {}) },
      boardThemeIndex: { ...base.boardThemeIndex, ...(loaded.boardThemeIndex || {}) }
    };
  } catch (error) {
    console.warn("FanLoop state reset because localStorage was invalid.", error);
    const fresh = defaultState();
    localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
    return fresh;
  }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function resetDemo() {
  localStorage.removeItem(STORE_KEY);
  state = defaultState();
  saveState();
  render();
  toast("Demo data reset.");
}

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function regionLabel(region = state.currentRegion) {
  return `${region.country} / ${region.city}`;
}

function sameRegion(a, b = state.currentRegion) {
  return a?.country === b?.country && a?.city === b?.city;
}

function currentBoardConfig() {
  return boardConfig[state.currentBoard] || boardConfig.giveaway;
}

function applyTheme() {
  const board = currentBoardConfig();
  const idx = state.boardThemeIndex[state.currentBoard] || 0;
  const theme = board.themes[idx] || board.themes[0];
  const root = document.documentElement;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-2", theme.accent2);
  root.style.setProperty("--accent-3", theme.accent3);
  root.style.setProperty("--accent-dark", theme.accentDark);
}

function updateTopbar() {
  const regionPill = $("#regionPill");
  const loginBtn = $("#loginBtn");
  const globalSearch = $("#globalSearch");
  if (regionPill) regionPill.textContent = regionLabel();
  if (loginBtn) loginBtn.textContent = state.user.loggedIn ? `Hi, ${state.user.nickname}` : "Log in";
  if (globalSearch && globalSearch.value !== state.normalSearch) globalSearch.value = state.normalSearch;
}

function updateToolActive() {
  $all(".tool").forEach(btn => btn.classList.remove("active"));
  const map = {
    home: "home",
    board: "switch-board",
    profile: "profile",
    orders: "orders",
    saved: "saved",
    tagBoard: "filter"
  };
  const action = map[state.view];
  const btn = action ? $(`.tool[data-action="${action}"]`) : null;
  if (btn) btn.classList.add("active");
}

function render() {
  applyTheme();
  updateTopbar();
  updateToolActive();

  if (state.view === "home") renderHome();
  else if (state.view === "board") renderBoard();
  else if (state.view === "orders") renderOrdersPage();
  else if (state.view === "saved") renderSavedPage();
  else if (state.view === "profile") renderProfilePage();
  else if (state.view === "tagBoard") renderTagBoard(state.activeTag || "Phaidei");
  else renderHome();
}

function setView(view) {
  state.view = view;
  saveState();
  render();
}

function setBoard(boardKey) {
  if (!boardConfig[boardKey]) return;
  state.currentBoard = boardKey;
  state.view = "board";
  saveState();
  render();
  toast(`Switched to ${boardConfig[boardKey].name}.`);
}

function setRegion(country, city) {
  state.currentRegion = { country, city };
  saveState();
  render();
  toast(`Local board changed to ${country} / ${city}.`);
}

function cycleTheme() {
  const board = state.currentBoard;
  const count = boardConfig[board].themes.length;
  state.boardThemeIndex[board] = ((state.boardThemeIndex[board] || 0) + 1) % count;
  saveState();
  render();
  toast(`Theme: ${boardConfig[board].themeNames[state.boardThemeIndex[board]]}`);
}

function renderHome() {
  const view = $("#view");
  const boardCards = Object.entries(boardConfig).map(([key, board]) => `
    <button class="board-card home-board-card" data-board="${key}" style="--board-color:${board.themes[0].accent2}">
      <div>
        <div class="home-board-icon">${board.emoji}</div>
        <h3>${board.name}</h3>
        <p>${board.description}</p>
      </div>
      <div class="home-board-bottom">
        <span class="status">${board.short}</span>
        <span class="tag">Local only</span>
      </div>
    </button>
  `).join("");

  view.innerHTML = `
    <section class="home-simple">
      <div class="home-intro card">
        <p class="kicker">FanLoop Prototype</p>
        <h1>Choose a local fan board.</h1>
        <p class="lede">FanLoop helps users claim freebies, exchange fan-made items, and trade official merchandise in a selected local area.</p>
        <div class="hero-actions">
          <button class="primary-btn" data-open-drawer="region">Change Local Board</button>
          <button class="ghost-btn" data-open-drawer="post">Post Item</button>
          <button class="ghost-btn" data-open-drawer="diy">DIY Tag Board</button>
        </div>
        <div class="privacy-note">Current local board: <strong>${regionLabel()}</strong>. This prototype is local-only and does not support shipping.</div>
      </div>
      <div class="home-board-grid">${boardCards}</div>
    </section>
  `;

  $all("[data-board]", view).forEach(btn => btn.addEventListener("click", () => setBoard(btn.dataset.board)));
  $all("[data-open-drawer]", view).forEach(btn => btn.addEventListener("click", () => openDrawer(btn.dataset.openDrawer)));
}

function renderBoard() {
  const board = currentBoardConfig();
  const items = getFilteredItems();
  const otherMatches = getOtherRegionMatches();
  const view = $("#view");

  view.innerHTML = `
    <section class="board-dashboard">
      <div class="board-header card">
        <p class="kicker">${regionLabel()} local board</p>
        <h1>${board.emoji} ${board.name}</h1>
        <p class="lede">${board.description}</p>
        <div class="board-meta">
          <span class="status">${board.themeNames[state.boardThemeIndex[state.currentBoard] || 0]}</span>
          <span class="status">Local only</span>
          <span class="status">${items.length} shown</span>
        </div>
        <div class="hero-actions">
          <button class="primary-btn" data-open-drawer="post">Post ${board.short}</button>
          <button class="ghost-btn" data-open-drawer="filter">Advanced Filter</button>
          <button class="ghost-btn" data-open-drawer="region">Change Region</button>
        </div>
      </div>

      ${renderSearchResultHint(items, otherMatches)}

      <div class="content-grid">
        <aside class="sidebar-panel card">
          <h3>Quick Filters</h3>
          <div class="filter-group">
            <label>Board</label>
            <div class="filter-inline">
              ${Object.entries(boardConfig).map(([key, b]) => `
                <button class="filter-chip ${state.currentBoard === key ? "active" : ""}" data-board-filter="${key}">${b.short}</button>
              `).join("")}
            </div>
          </div>
          <div class="filter-group">
            <label>Item Type</label>
            <div class="filter-inline">
              ${state.tags.itemType.slice(0, 8).map(type => `
                <button class="filter-chip ${state.filters.includeType.includes(type) ? "active" : ""}" data-quick-type="${escapeHtml(type)}">${escapeHtml(type)}</button>
              `).join("")}
            </div>
          </div>
          <div class="filter-group">
            <label>Local Rule</label>
            <p class="muted-text">FanLoop only shows items in the selected local board. If there are matches in other cities, it suggests switching region.</p>
          </div>
          <button class="ghost-btn full-btn" data-clear-filters>Clear Filters</button>
        </aside>

        <section class="list-panel card">
          <div class="section-head">
            <div>
              <h2>${board.short} Items</h2>
              <p>Search reads title and tags. Advanced filter can include and exclude tags.</p>
            </div>
          </div>
          ${items.length ? `<div class="items-grid">${items.map(renderItemCard).join("")}</div>` : emptyItemsHtml(otherMatches)}
        </section>
      </div>
    </section>
  `;

  bindItemActions(view);
  $all("[data-board-filter]", view).forEach(btn => btn.addEventListener("click", () => setBoard(btn.dataset.boardFilter)));
  $all("[data-quick-type]", view).forEach(btn => btn.addEventListener("click", () => {
    const type = btn.dataset.quickType;
    state.filters.includeType = state.filters.includeType.includes(type) ? [] : [type];
    saveState();
    render();
  }));
  $all("[data-open-drawer]", view).forEach(btn => btn.addEventListener("click", () => openDrawer(btn.dataset.openDrawer)));
  $("[data-clear-filters]", view)?.addEventListener("click", () => clearFilters());
  $all("[data-switch-region]", view).forEach(btn => btn.addEventListener("click", () => {
    const [country, city] = btn.dataset.switchRegion.split("||");
    setRegion(country, city);
  }));
}

function renderSearchResultHint(items, otherMatches) {
  const q = state.normalSearch.trim();
  const maybeTag = state.tags.subject.find(tag => q && tag.toLowerCase().includes(q.toLowerCase()));
  if (maybeTag && items.length) {
    return `
      <div class="panel search-hint">
        Viewing results for “${escapeHtml(q)}”.
        <button class="small-btn" data-open-tag="${escapeHtml(maybeTag)}">Open #${escapeHtml(maybeTag)} Tag Board</button>
      </div>
    `;
  }

  if (!items.length && otherMatches.length) {
    const regions = [...new Map(otherMatches.map(item => [regionLabel(item.region), item.region])).values()];
    return `
      <div class="panel search-hint">
        No matching items in <strong>${regionLabel()}</strong>. Found matching items in:
        <div class="row-actions compact-actions">
          ${regions.map(r => `<button class="small-btn" data-switch-region="${r.country}||${r.city}">Switch to ${r.country} / ${r.city}</button>`).join("")}
        </div>
      </div>
    `;
  }

  return "";
}

function emptyItemsHtml(otherMatches = []) {
  return `
    <div class="empty-state">
      <h3>No matching items found.</h3>
      <p>Try another keyword, tag filter, or local board.</p>
      ${otherMatches.length ? "<p>Some matches exist in other regions. Use the suggestion above.</p>" : ""}
    </div>
  `;
}

function itemTags(item) {
  return [
    ...(item.ip || []),
    ...(item.subject || []),
    ...(item.itemType || []),
    ...(item.origin || []),
    item.condition,
    item.status
  ].filter(Boolean);
}

function getFilteredItems({ allRegions = false } = {}) {
  const q = (state.normalSearch || "").trim().toLowerCase();
  const f = state.filters;
  return state.items
    .filter(item => item.board === state.currentBoard)
    .filter(item => allRegions || sameRegion(item.region))
    .filter(item => !item.private || item.owner === state.user.username)
    .filter(item => {
      const tags = itemTags(item);
      const searchText = [item.title, item.description, item.lookingFor, ...tags].join(" ").toLowerCase();
      if (q && !searchText.includes(q)) return false;
      if (!includesAll(item.ip, f.includeIp)) return false;
      if (intersects(item.ip, f.excludeIp)) return false;
      if (!includesAll(item.subject, f.includeSubject)) return false;
      if (intersects(item.subject, f.excludeSubject)) return false;
      if (!includesAll(item.itemType, f.includeType)) return false;
      if (intersects(item.itemType, f.excludeType)) return false;
      if (!includesAll(item.origin, f.includeOrigin)) return false;
      if (f.status !== "All" && item.status !== f.status) return false;
      if (state.currentBoard === "merchExchange" && f.lookingFor) {
        if (!(item.lookingFor || "").toLowerCase().includes(f.lookingFor.toLowerCase())) return false;
      }
      return true;
    });
}

function getOtherRegionMatches() {
  return getFilteredItems({ allRegions: true }).filter(item => !sameRegion(item.region));
}

function includesAll(values = [], filters = []) {
  return filters.every(v => values.includes(v));
}

function intersects(values = [], filters = []) {
  return filters.some(v => values.includes(v));
}

function renderItemCard(item) {
  const liked = state.liked.includes(item.id);
  const saved = state.savedFolders.some(folder => folder.itemIds.includes(item.id));
  const sticker = item.board === "giveaway" ? "✿" : item.board === "freebieExchange" ? "◇" : "◆";
  const cover = item.cover
    ? `<img src="${escapeHtml(item.cover)}" alt="${escapeHtml(item.title)}" onerror="this.remove();">`
    : `<div class="cover-initials">${initials(item.title)}</div>`;

  return `
    <article class="item-card" data-item-id="${item.id}">
      <div class="item-cover">
        ${cover}
        <div class="card-sticker">${sticker}</div>
      </div>
      <div class="item-body">
        <div class="item-title-row">
          <div>
            <div class="item-title">${escapeHtml(item.title)}</div>
            <div class="item-sub">${escapeHtml((item.ip || []).join(", "))} · ${escapeHtml((item.subject || []).join(", "))}</div>
          </div>
          <span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
        </div>
        <div class="mini-tags">
          ${(item.itemType || []).slice(0, 2).map(tag => `<span class="tag clickable" data-open-tag="${escapeHtml((item.subject || [])[0] || tag)}">${escapeHtml(tag)}</span>`).join("")}
          <span class="tag">${escapeHtml(regionLabel(item.region))}</span>
        </div>
        <p class="item-sub">Available: ${item.quantityAvailable} · Reserved: ${item.quantityReserved || 0}</p>
        <div class="item-actions">
          <button class="small-btn" data-detail="${item.id}">Details</button>
          <button class="icon-btn ${liked ? "active" : ""}" data-like="${item.id}" aria-label="Like">${likeIcon()}</button>
          <button class="icon-btn ${saved ? "active" : ""}" data-save="${item.id}" aria-label="Save">${favoriteIcon()}</button>
          <button class="small-btn" data-message="${item.id}">Message</button>
        </div>
      </div>
    </article>
  `;
}

function statusClass(status) {
  if (["Ended", "Exchanged", "Unavailable", "Unresolved / Failed"].includes(status)) return "danger";
  if (["Reviewing", "In Exchange", "Pending", "Full", "Waiting for Agreement"].includes(status)) return "warn";
  return "";
}

function initials(title = "") {
  return escapeHtml(title.split(/\s+/).slice(0, 2).map(word => word[0] || "").join("").toUpperCase());
}

function likeIcon() {
  const theme = state.tagThemes[state.activeTag || ""] || "sparkle";
  if (theme === "ribbon") return "♡";
  if (theme === "ticket") return "★";
  return "✦";
}

function favoriteIcon() {
  const theme = state.tagThemes[state.activeTag || ""] || "sparkle";
  if (theme === "ribbon") return "୨୧";
  if (theme === "ticket") return "▣";
  return "◇";
}

function bindItemActions(root = document) {
  $all("[data-detail]", root).forEach(btn => btn.addEventListener("click", () => openItemDetail(btn.dataset.detail)));
  $all("[data-like]", root).forEach(btn => btn.addEventListener("click", () => toggleLike(btn.dataset.like)));
  $all("[data-save]", root).forEach(btn => btn.addEventListener("click", () => openSaveModal(btn.dataset.save)));
  $all("[data-message]", root).forEach(btn => btn.addEventListener("click", () => openChatForItem(btn.dataset.message)));
  $all("[data-open-tag]", root).forEach(btn => btn.addEventListener("click", () => openTagBoard(btn.dataset.openTag)));
}

function toggleLike(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;
  if (state.liked.includes(itemId)) {
    state.liked = state.liked.filter(id => id !== itemId);
    item.likes = Math.max(0, (item.likes || 0) - 1);
    toast("Like removed.");
  } else {
    state.liked.push(itemId);
    item.likes = (item.likes || 0) + 1;
    addNotice(`${state.user.nickname} liked ${item.title}.`, "like", false);
    toast("Liked.");
  }
  saveState();
  render();
}

function openSaveModal(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  openModal(`
    <div class="modal-head">
      <div>
        <h2>Save to Folder</h2>
        <p>Choose a folder for ${escapeHtml(item.title)}.</p>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>
    <div class="saved-list">
      ${state.savedFolders.map(folder => `
        <button class="list-item" data-save-to-folder="${folder.id}">
          <strong>${escapeHtml(folder.name)}</strong>
          <span>${folder.itemIds.length} saved items</span>
        </button>
      `).join("")}
    </div>
    <div class="form-field single-field">
      <label>Create new folder</label>
      <input class="input" id="newFolderName" placeholder="Folder name">
    </div>
    <div class="row-actions">
      <button class="primary-btn" id="createFolderSave">Create and Save</button>
    </div>
  `);

  $all("[data-save-to-folder]").forEach(btn => btn.addEventListener("click", () => {
    const folder = state.savedFolders.find(f => f.id === btn.dataset.saveToFolder);
    if (folder && !folder.itemIds.includes(itemId)) folder.itemIds.push(itemId);
    saveState();
    closeModal();
    render();
    toast("Saved.");
  }));

  $("#createFolderSave")?.addEventListener("click", () => {
    const name = $("#newFolderName").value.trim();
    if (!name) return toast("Please enter a folder name.");
    state.savedFolders.push({ id: `folder_${Date.now()}`, name, itemIds: [itemId] });
    saveState();
    closeModal();
    render();
    toast("Folder created.");
  });
}

function openItemDetail(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  const actionButton = item.board === "giveaway"
    ? (item.onlineClaimEnabled ? `<button class="primary-btn" data-online-claim="${item.id}">Online Claim</button>` : `<button class="ghost-btn" disabled>Online Claim Off</button>`)
    : `<button class="primary-btn" data-start-order="${item.id}">Create Exchange Order</button>`;

  openModal(`
    <div class="modal-head">
      <div>
        <p class="kicker">${escapeHtml(boardConfig[item.board].name)}</p>
        <h2>${escapeHtml(item.title)}</h2>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>
    <div class="detail-grid">
      <div class="detail-cover">
        ${item.cover ? `<img src="${escapeHtml(item.cover)}" alt="${escapeHtml(item.title)}" onerror="this.remove();">` : `<div class="cover-initials">${initials(item.title)}</div>`}
      </div>
      <div>
        <div class="info-list">
          ${infoRow("Owner", `${escapeHtml(item.owner)} · record visible in profile`)}
          ${infoRow("Region", escapeHtml(regionLabel(item.region)))}
          ${infoRow("IP", escapeHtml((item.ip || []).join(", ")))}
          ${infoRow("Character / CP", escapeHtml((item.subject || []).join(", ")))}
          ${infoRow("Item Type", escapeHtml((item.itemType || []).join(", ")))}
          ${infoRow("Origin", escapeHtml((item.origin || []).join(", ")))}
          ${item.board !== "giveaway" ? infoRow("Condition", escapeHtml(item.condition || "Not set")) : ""}
          ${infoRow("Quantity", `Available ${item.quantityAvailable} / Total ${item.quantityTotal} · Reserved ${item.quantityReserved || 0}`)}
          ${infoRow("Status", escapeHtml(item.status))}
          ${item.board === "giveaway" ? infoRow("Distribution Time", escapeHtml(item.giveawayTime || "")) : ""}
          ${item.board === "merchExchange" ? infoRow("Looking For", escapeHtml(item.lookingFor || "")) : ""}
          ${infoRow("Location Note", escapeHtml(item.locationNote || "Discuss by chat."))}
        </div>
        <p class="muted-text detail-desc">${escapeHtml(item.description || "")}</p>
        ${renderDetailImages(item)}
        <div class="mini-tags">
          ${itemTags(item).map(tag => `<span class="tag clickable" data-open-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="row-actions">
          ${actionButton}
          <button class="ghost-btn" data-message="${item.id}">Message Owner</button>
          <button class="ghost-btn" data-edit-item="${item.id}">Edit / Visibility</button>
        </div>
      </div>
    </div>
  `, "wide");

  bindItemActions($("#modal"));
  $("[data-online-claim]")?.addEventListener("click", () => openOnlineClaim(item.id));
  $("[data-start-order]")?.addEventListener("click", () => openExchangeOrderForm(item.id));
  $("[data-edit-item]")?.addEventListener("click", () => openEditItem(item.id));
}

function renderDetailImages(item) {
  const details = item.details || [];
  if (!details.length) return "";
  return `
    <div class="detail-images-block">
      <h3>Detail Images / Records</h3>
      <div class="preview-row">
        ${details.map((src, index) => `
          <div class="preview-thumb">
            <img src="${escapeHtml(src)}" alt="detail image ${index + 1}" onerror="this.parentElement.textContent='Image path: ${escapeHtml(src)}';">
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function infoRow(label, value) {
  return `
    <div class="info-row">
      <div class="info-label">${label}</div>
      <div class="info-value">${value}</div>
    </div>
  `;
}

function openOnlineClaim(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;
  const closed = ["Full", "Reviewing", "Ended"].includes(item.status) || item.quantityAvailable <= 0;

  openModal(`
    <div class="modal-head">
      <div>
        <p class="kicker">${escapeHtml(item.claimMode || "Registration")} Mode</p>
        <h2>Online Claim: ${escapeHtml(item.title)}</h2>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>
    ${closed ? `
      <div class="empty-state"><h3>This claim is not open.</h3><p>Status: ${escapeHtml(item.status)}.</p></div>
    ` : `
      <p class="muted-text">This is a prototype claim form. The creator can review claim records later.</p>
      <div class="form-grid">
        <div class="form-field full"><label>Nickname required</label><input class="input" id="claimNickname" placeholder="Your nickname"></div>
        <div class="form-field full"><label>Message optional</label><textarea class="textarea" id="claimMessage" placeholder="Optional message"></textarea></div>
      </div>
      <div class="row-actions">
        <button class="primary-btn" id="submitClaim">Submit Claim</button>
        <button class="ghost-btn" id="cancelApprovedClaim">Cancel My Claim Demo</button>
      </div>
    `}
  `);

  $("#submitClaim")?.addEventListener("click", () => {
    const nickname = $("#claimNickname")?.value.trim();
    if (!nickname) return toast("Please enter a nickname.");
    item.quantityAvailable = Math.max(0, item.quantityAvailable - 1);
    item.quantityReserved = (item.quantityReserved || 0) + 1;
    if (item.quantityAvailable === 0) item.status = "Full";
    addNotice(`Your claim for ${item.title} was registered.`, "claim", true);
    saveState();
    closeModal();
    render();
    toast("Claim registered.");
  });

  $("#cancelApprovedClaim")?.addEventListener("click", () => {
    item.quantityAvailable += 1;
    item.quantityReserved = Math.max(0, (item.quantityReserved || 0) - 1);
    item.status = "Open";
    saveState();
    closeModal();
    render();
    toast("Claim cancelled and slot released.");
  });
}

function openEditItem(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  openModal(`
    <div class="modal-head">
      <div><h2>Edit Item</h2><p>Prototype controls for editing and visibility.</p></div>
      <button class="close-btn" data-close-modal>×</button>
    </div>
    <div class="form-grid">
      <div class="form-field"><label>Title</label><input class="input" id="editTitle" value="${escapeHtml(item.title)}"></div>
      <div class="form-field"><label>Status</label><select class="select" id="editStatus">${statusOptions(item.board).map(s => `<option ${s === item.status ? "selected" : ""}>${s}</option>`).join("")}</select></div>
      <div class="form-field"><label>Available Quantity</label><input class="input" id="editQty" type="number" min="0" value="${item.quantityAvailable}"></div>
      <div class="form-field"><label>Visibility</label><select class="select" id="editPrivate"><option value="false" ${!item.private ? "selected" : ""}>Visible to others</option><option value="true" ${item.private ? "selected" : ""}>Private only</option></select></div>
      <div class="form-field full"><label>Description</label><textarea class="textarea" id="editDesc">${escapeHtml(item.description || "")}</textarea></div>
    </div>
    <div class="row-actions"><button class="primary-btn" id="saveEditItem">Save Changes</button><button class="ghost-btn" id="markUnavailable">Mark Unavailable</button></div>
  `);

  $("#saveEditItem")?.addEventListener("click", () => {
    item.title = $("#editTitle").value.trim() || item.title;
    item.status = $("#editStatus").value;
    item.quantityAvailable = Number($("#editQty").value || 0);
    item.private = $("#editPrivate").value === "true";
    item.description = $("#editDesc").value.trim();
    saveState();
    closeModal();
    render();
    toast("Item updated.");
  });

  $("#markUnavailable")?.addEventListener("click", () => {
    item.status = "Unavailable";
    saveState();
    closeModal();
    render();
    toast("Item marked unavailable.");
  });
}

function statusOptions(board) {
  if (board === "giveaway") return ["Open", "Full", "Reviewing", "Ended", "Private", "Cancelled"];
  if (board === "merchExchange") return ["Available", "Preorder", "In Exchange", "Exchanged", "Private", "Unavailable"];
  return ["Available", "In Exchange", "Exchanged", "Private", "Unavailable"];
}

function openChatForItem(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;
  let chat = state.chats.find(c => c.itemId === itemId);
  if (!chat) {
    chat = {
      id: `chat_${Date.now()}`,
      partner: item.owner,
      itemId: item.id,
      unread: false,
      messages: [{ from: item.owner, text: "Auto-reply: Thanks for your interest. Please send your available local meetup time." }]
    };
    state.chats.push(chat);
    saveState();
  }
  openDrawer("messages", { activeChatId: chat.id });
}

function openExchangeOrderForm(itemId) {
  const partnerItem = state.items.find(i => i.id === itemId);
  if (!partnerItem) return;
  const myItems = state.items.filter(item => item.owner === state.user.username && item.board !== "giveaway");

  openModal(`
    <div class="modal-head">
      <div><p class="kicker">Exchange Order Request</p><h2>Create Order with ${escapeHtml(partnerItem.owner)}</h2></div>
      <button class="close-btn" data-close-modal>×</button>
    </div>
    <p class="muted-text">Orders are created after chat negotiation. Meeting location and time are decided by both users.</p>
    <div class="form-grid">
      <div class="form-field full"><label>Choose my existing item or enter manually</label><select class="select" id="orderMyItem"><option value="">Manual entry</option>${myItems.map(i => `<option value="${i.id}">${escapeHtml(i.title)}</option>`).join("")}</select></div>
      <div class="form-field"><label>My item name</label><input class="input" id="orderItemName" placeholder="Item I will give"></div>
      <div class="form-field"><label>Quantity</label><input class="input" id="orderQty" type="number" min="1" value="1"></div>
      <div class="form-field"><label>Exchange location</label><input class="input" id="orderLocation" placeholder="Discussed meetup place"></div>
      <div class="form-field"><label>Exchange time window</label><input class="input" id="orderTime" placeholder="May 17, 2:00–3:00 PM"></div>
      <div class="form-field full"><label>Agreement</label><label class="checkbox-row"><input type="checkbox" id="orderConfirm"> I confirm this exchange creates a trust record.</label></div>
    </div>
    <div class="row-actions"><button class="primary-btn" id="sendOrderRequest">Send Order Request</button></div>
  `, "wide");

  $("#orderMyItem")?.addEventListener("change", e => {
    const selected = state.items.find(i => i.id === e.target.value);
    if (selected) $("#orderItemName").value = selected.title;
  });

  $("#sendOrderRequest")?.addEventListener("click", () => {
    if (!$("#orderConfirm").checked) return toast("Please confirm the agreement checkbox.");
    const itemName = $("#orderItemName").value.trim();
    const location = $("#orderLocation").value.trim();
    const time = $("#orderTime").value.trim();
    const qty = Number($("#orderQty").value || 1);
    if (!itemName || !location || !time) return toast("Please fill item, location, and time.");

    if (partnerItem.quantityAvailable > 0) {
      partnerItem.quantityAvailable -= 1;
      partnerItem.quantityReserved = (partnerItem.quantityReserved || 0) + 1;
      partnerItem.status = "In Exchange";
    }

    const order = {
      id: `FL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      type: partnerItem.board === "merchExchange" ? "Merchandise Exchange" : "Freebie Exchange",
      partner: partnerItem.owner,
      status: "Waiting for Agreement",
      region: clone(state.currentRegion),
      createdAt: new Date().toLocaleString(),
      meetingLocation: location,
      meetingTime: time,
      yuzaItem: `Yuza gives: ${itemName} x${qty}`,
      partnerItem: `${partnerItem.owner} gives: ${partnerItem.title} x1`,
      proofA: false,
      proofB: false,
      agreedA: false,
      agreedB: false,
      linkedItemId: partnerItem.id,
      timeline: ["Order request created from chat.", `Partner item reserved: ${partnerItem.title}.`, "Waiting for both users to agree."]
    };
    state.orders.unshift(order);
    addNotice(`Order ${order.id} is waiting for agreement.`, "order", true);
    saveState();
    closeModal();
    render();
    toast("Order request sent.");
  });
}

function openDrawer(type, opts = {}) {
  const drawer = $("#drawer");
  const backdrop = $("#drawerBackdrop");
  if (!drawer || !backdrop) return;

  let html = "";
  if (type === "region") html = regionDrawerHtml();
  if (type === "switch-board") html = switchBoardDrawerHtml();
  if (type === "filter") html = filterDrawerHtml();
  if (type === "post") html = postDrawerHtml();
  if (type === "messages") html = messagesDrawerHtml(opts.activeChatId);
  if (type === "orders") html = ordersDrawerHtml();
  if (type === "saved") html = savedDrawerHtml();
  if (type === "profile") html = profileDrawerHtml();
  if (type === "theme") html = themeDrawerHtml();
  if (type === "diy") html = diyDrawerHtml();
  if (!html) html = drawerHead("Not available", "This prototype section is not connected yet.");

  drawer.innerHTML = html;
  drawer.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  bindDrawer(type, opts);
}

function closeDrawer() {
  $("#drawer")?.classList.add("hidden");
  $("#drawerBackdrop")?.classList.add("hidden");
  const drawer = $("#drawer");
  if (drawer) drawer.innerHTML = "";
}

function drawerHead(title, sub = "") {
  return `
    <div class="drawer-head">
      <div>
        <h2>${title}</h2>
        ${sub ? `<p>${sub}</p>` : ""}
      </div>
      <button class="close-btn" data-close-drawer>×</button>
    </div>
  `;
}

function regionDrawerHtml() {
  return `
    ${drawerHead("Choose Local Board", "FanLoop does not auto-detect your location. Select your country and city manually.")}
    <div class="chat-list">
      ${state.regions.map(r => `
        <button class="list-item" data-region="${r.country}||${r.city}">
          <strong>${r.country} / ${r.city}</strong>
          ${sameRegion(r) ? `<span class="status">Current</span>` : ""}
        </button>
      `).join("")}
    </div>
  `;
}

function switchBoardDrawerHtml() {
  return `
    ${drawerHead("Switch Board", "Each board has a different purpose and color system.")}
    <div class="chat-list">
      ${Object.entries(boardConfig).map(([key, board]) => `
        <button class="list-item" data-switch-board="${key}">
          <strong>${board.emoji} ${board.name}</strong>
          <p>${board.description}</p>
        </button>
      `).join("")}
    </div>
  `;
}

function filterDrawerHtml() {
  return `
    ${drawerHead("Advanced Search", "Include or exclude tags. These controls affect the current board.")}
    <div class="form-grid">
      ${multiSelectBlock("Include IP Tags", "includeIp", state.tags.ip)}
      ${multiSelectBlock("Exclude IP Tags", "excludeIp", state.tags.ip)}
      ${multiSelectBlock("Include Character / CP Tags", "includeSubject", state.tags.subject)}
      ${multiSelectBlock("Exclude Character / CP Tags", "excludeSubject", state.tags.subject)}
      ${multiSelectBlock("Include Item Type Tags", "includeType", state.tags.itemType)}
      ${multiSelectBlock("Exclude Item Type Tags", "excludeType", state.tags.itemType)}
      ${multiSelectBlock("Origin Tags", "includeOrigin", state.tags.origin)}
      <div class="form-field">
        <label>Status</label>
        <select class="select" id="filterStatus">
          ${["All", ...new Set(state.items.filter(i => i.board === state.currentBoard).map(i => i.status))].map(s => `<option ${state.filters.status === s ? "selected" : ""}>${escapeHtml(s)}</option>`).join("")}
        </select>
      </div>
      ${state.currentBoard === "merchExchange" ? `<div class="form-field full"><label>Looking For keyword</label><input class="input" id="filterLookingFor" value="${escapeHtml(state.filters.lookingFor || "")}" placeholder="Example: acrylic"></div>` : ""}
    </div>
    <div class="row-actions"><button class="primary-btn" id="applyFilters">Apply Filters</button><button class="ghost-btn" id="clearFilters">Clear</button></div>
  `;
}

function multiSelectBlock(label, key, values) {
  return `
    <div class="form-field full">
      <label>${label}</label>
      <div class="filter-inline" data-filter-group="${key}">
        ${values.map(value => `<button class="filter-chip ${state.filters[key]?.includes(value) ? "active" : ""}" type="button" data-filter-value="${escapeHtml(value)}">${escapeHtml(value)}</button>`).join("")}
      </div>
    </div>
  `;
}

function postDrawerHtml() {
  const board = currentBoardConfig();
  return `
    ${drawerHead(`Post ${board.short}`, "Required tags: IP, character / CP, and item type. New tags will be remembered.")}
    <form id="postForm" class="form-grid">
      <div class="form-field full"><label>Board</label><select class="select" id="postBoard" required>${Object.entries(boardConfig).map(([key, b]) => `<option value="${key}" ${key === state.currentBoard ? "selected" : ""}>${b.name}</option>`).join("")}</select></div>
      <div class="form-field full"><label>Cover image</label><input class="input" id="postCover" type="file" accept="image/*"><div id="coverPreview" class="preview-row"></div><small>Prototype stores small image previews in localStorage.</small></div>
      <div class="form-field full"><label>Title required</label><input class="input" id="postTitle" required placeholder="Item title"></div>
      <div class="form-field"><label>IP tag required</label>${tagInputHtml("postIp", "ip", "Example: Genshin Impact")}</div>
      <div class="form-field"><label>Character / CP tag required</label>${tagInputHtml("postSubject", "subject", "Example: Phaidei")}</div>
      <div class="form-field"><label>Item type tag required</label>${tagInputHtml("postType", "itemType", "Example: Badge")}</div>
      <div class="form-field"><label>Origin / source</label>${tagInputHtml("postOrigin", "origin", "Example: Fan-made Self-drawn")}</div>
      <div class="form-field"><label>Condition</label>${tagSelectHtml("postCondition", state.tags.condition)}</div>
      <div class="form-field"><label>Quantity required</label><input class="input" id="postQuantity" type="number" min="1" value="1" required></div>
      <div class="form-field full"><label>Description optional</label><textarea class="textarea" id="postDescription" placeholder="Optional item description"></textarea></div>
      <div class="form-field full"><label>Local location / arrangement note</label><input class="input" id="postLocation" placeholder="Example: near Parsons, discuss in chat"></div>
      <div id="boardSpecificFields" class="form-field full"></div>
      <div class="form-field full"><label>Detail images</label><input class="input" id="postDetails" type="file" accept="image/*" multiple><div id="detailPreview" class="preview-row"></div></div>
      <div class="form-field full"><label>Visibility</label><select class="select" id="postVisibility"><option value="public">Visible to others</option><option value="private">Private only</option></select></div>
      <div class="form-field full"><button class="primary-btn full-btn" type="submit">Submit Item</button></div>
    </form>
  `;
}

function tagInputHtml(id, tagKey, placeholder) {
  const listId = `${id}List`;
  return `
    <input class="input" id="${id}" list="${listId}" placeholder="${placeholder}" required>
    <datalist id="${listId}">${state.tags[tagKey].map(tag => `<option value="${escapeHtml(tag)}"></option>`).join("")}</datalist>
    <small>If the tag does not exist, it will be added after posting.</small>
  `;
}

function tagSelectHtml(id, values) {
  return `<select class="select" id="${id}"><option value="">Select...</option>${values.map(v => `<option>${escapeHtml(v)}</option>`).join("")}</select>`;
}

function messagesDrawerHtml(activeChatId = null) {
  const chat = state.chats.find(c => c.id === activeChatId) || state.chats[0];
  return `
    ${drawerHead("Messages", "Private chats and system notices are together here.")}
    <div class="tabs"><button class="tab-btn active" data-message-tab="chats">Chats</button><button class="tab-btn" data-message-tab="notices">Notices (${state.notices.filter(n => n.unread).length})</button></div>
    <div id="messagesContent">${chatsHtml(chat?.id)}</div>
  `;
}

function chatsHtml(activeChatId) {
  const chat = state.chats.find(c => c.id === activeChatId) || state.chats[0];
  if (!chat) return `<div class="empty-state"><h3>No chats yet.</h3></div>`;
  const item = state.items.find(i => i.id === chat.itemId);
  return `
    <div class="chat-list compact-list">
      ${state.chats.map(c => `<button class="list-item ${c.id === chat.id ? "selected" : ""}" data-open-chat="${c.id}"><strong>${escapeHtml(c.partner)}</strong>${c.unread ? `<span class="status warn">New</span>` : ""}<p>${escapeHtml(state.items.find(i => i.id === c.itemId)?.title || "General chat")}</p></button>`).join("")}
    </div>
    <div class="panel chat-panel">
      <h3>Chat with ${escapeHtml(chat.partner)}</h3>
      <p>${escapeHtml(item?.title || "")}</p>
      <div class="chat-box">${chat.messages.map(m => `<div class="bubble ${m.from === "Yuza" ? "me" : ""}"><strong>${escapeHtml(m.from)}:</strong> ${escapeHtml(m.text)}</div>`).join("")}</div>
      <div class="row-actions"><input class="input chat-input" id="chatInput" placeholder="Type your message..."><button class="primary-btn" data-send-chat="${chat.id}">Send</button></div>
      ${item && item.board !== "giveaway" ? `<div class="row-actions"><button class="ghost-btn" data-create-order-from-chat="${item.id}">Create Exchange Order</button></div>` : `<p class="muted-text">Distribution posts do not create exchange orders.</p>`}
    </div>
  `;
}

function noticesHtml() {
  return `
    <div class="notice-list">
      ${state.notices.map(n => `<div class="list-item"><strong>${noticeIcon(n.type)} ${escapeHtml(n.text)}</strong>${n.unread ? `<span class="status warn">Unread</span>` : ""}</div>`).join("")}
    </div>
    <div class="row-actions"><button class="ghost-btn" id="markNoticesRead">Mark all as read</button></div>
  `;
}

function noticeIcon(type) {
  return { like: "✦", save: "♡", claim: "✿", order: "◎", review: "★", item: "▣" }[type] || "•";
}

function ordersDrawerHtml() {
  return `${drawerHead("Exchange Orders", "Only exchange boards generate orders. Distribution claims use claim records instead.")}${ordersContentHtml()}`;
}

function ordersContentHtml() {
  const groups = ["Waiting for Agreement", "In Progress", "Pending Review", "Completed", "Unresolved / Failed", "Disputed"];
  return `<div class="order-list">${groups.map(status => {
    const orders = state.orders.filter(order => order.status === status);
    return `<section class="list-item order-group"><h3>${status} (${orders.length})</h3>${orders.length ? orders.map(orderMiniHtml).join("") : `<p>No orders in this category.</p>`}</section>`;
  }).join("")}</div>`;
}

function orderMiniHtml(order) {
  return `
    <div class="order-card">
      <strong>${escapeHtml(order.id)}</strong>
      <span class="status ${statusClass(order.status)}">${escapeHtml(order.status)}</span>
      <p>${escapeHtml(order.partner)} · ${escapeHtml(order.type)} · ${escapeHtml(regionLabel(order.region))}</p>
      <button class="small-btn" data-order-detail="${order.id}">View Details</button>
    </div>
  `;
}

function savedDrawerHtml() {
  return `
    ${drawerHead("Saved Folders", "Save items into multiple folders.")}
    <div class="saved-list">${state.savedFolders.map(savedFolderHtml).join("")}</div>
  `;
}

function savedFolderHtml(folder) {
  return `
    <div class="list-item">
      <h3>${escapeHtml(folder.name)}</h3>
      <p>${folder.itemIds.length} items</p>
      <div class="mini-tags">${folder.itemIds.map(id => state.items.find(item => item.id === id)).filter(Boolean).map(item => `<span class="tag">${escapeHtml(item.title)}</span>`).join("")}</div>
    </div>
  `;
}

function profileDrawerHtml() {
  return `${drawerHead("Yuza Profile", "Edit nickname, password, bio, and view trust records. Username cannot be changed.")}${profileFormHtml()}`;
}

function profileFormHtml() {
  return `
    <div class="profile-card panel">
      <div class="avatar">Y</div>
      <div class="form-grid profile-grid">
        <div class="form-field"><label>Username locked</label><input class="input" value="${escapeHtml(state.user.username)}" disabled></div>
        <div class="form-field"><label>Nickname</label><input class="input" id="profileNickname" value="${escapeHtml(state.user.nickname)}"></div>
        <div class="form-field"><label>New password</label><input class="input" id="profilePassword" value="${escapeHtml(state.user.password)}"></div>
        <div class="form-field full"><label>Bio</label><textarea class="textarea" id="profileBio">${escapeHtml(state.user.bio || "")}</textarea></div>
      </div>
      <div class="row-actions"><button class="primary-btn" id="saveProfile">Save Profile</button><button class="ghost-btn" id="logoutBtn">Log out</button></div>
    </div>
    <div class="section"><h3>Trust Record</h3><div class="trust-grid">${trustCard("Completed", state.user.trust.completed)}${trustCard("Average Rating", state.user.trust.average)}${trustCard("Late Cancellations", state.user.trust.lateCancellations)}${trustCard("Unresolved", state.user.trust.unresolved)}</div></div>
  `;
}

function trustCard(label, value) {
  return `<div class="stat-card"><div class="stat-number">${escapeHtml(value)}</div><div class="stat-label">${escapeHtml(label)}</div></div>`;
}

function themeDrawerHtml() {
  const board = currentBoardConfig();
  return `
    ${drawerHead("Board Theme", "Each main board has three soft color themes.")}
    <div class="chat-list">
      ${board.themeNames.map((name, idx) => `
        <button class="list-item ${idx === (state.boardThemeIndex[state.currentBoard] || 0) ? "selected" : ""}" data-theme-index="${idx}">
          <strong>${escapeHtml(name)}</strong>
          <p>Apply this color set to ${board.short}.</p>
        </button>
      `).join("")}
    </div>
  `;
}

function diyDrawerHtml() {
  const tags = [...new Set([...state.tags.subject, ...Object.keys(state.tagThemes)])].filter(Boolean);
  return `
    ${drawerHead("DIY Tag Board", "Customize tag boards and board color themes in one place.")}
    <div class="diy-panel">
      <section class="diy-section">
        <h3>Main Board Theme</h3>
        <p>Change the color theme of the current main board.</p>
        <button class="primary-btn" data-diy-cycle-theme>Change Current Board Theme</button>
      </section>
      <section class="diy-section">
        <h3>Tag Board Customization</h3>
        <p>Choose a character / CP tag board and change its visual style.</p>
        <div class="chat-list">
          ${tags.map(tag => `
            <article class="list-item diy-tag-row">
              <div><strong>#${escapeHtml(tag)}</strong><p>Current style: ${themeName(state.tagThemes[tag] || "sparkle")}</p></div>
              <div class="row-actions compact-actions"><button class="small-btn" data-diy-open-tag="${escapeHtml(tag)}">Open Board</button><button class="small-btn" data-diy-customize="${escapeHtml(tag)}">Customize</button></div>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function themeName(theme) {
  return { sparkle: "Sparkle", ribbon: "Ribbon", ticket: "Ticket" }[theme] || "Sparkle";
}

function bindDrawer(type, opts = {}) {
  $("[data-close-drawer]")?.addEventListener("click", closeDrawer);

  if (type === "region") {
    $all("[data-region]").forEach(btn => btn.addEventListener("click", () => {
      const [country, city] = btn.dataset.region.split("||");
      setRegion(country, city);
      closeDrawer();
    }));
  }

  if (type === "switch-board") {
    $all("[data-switch-board]").forEach(btn => btn.addEventListener("click", () => {
      setBoard(btn.dataset.switchBoard);
      closeDrawer();
    }));
  }

  if (type === "filter") {
    $all("[data-filter-group]").forEach(group => group.addEventListener("click", e => {
      const btn = e.target.closest("[data-filter-value]");
      if (btn) btn.classList.toggle("active");
    }));

    $("#applyFilters")?.addEventListener("click", () => {
      $all("[data-filter-group]").forEach(group => {
        const key = group.dataset.filterGroup;
        state.filters[key] = $all(".filter-chip.active", group).map(btn => btn.dataset.filterValue);
      });
      state.filters.status = $("#filterStatus")?.value || "All";
      state.filters.lookingFor = $("#filterLookingFor")?.value.trim() || "";
      saveState();
      closeDrawer();
      render();
      toast("Filters applied.");
    });

    $("#clearFilters")?.addEventListener("click", clearFilters);
  }

  if (type === "post") {
    const postBoard = $("#postBoard");
    postBoard?.addEventListener("change", () => renderBoardSpecificFields(postBoard.value));
    renderBoardSpecificFields(postBoard?.value || state.currentBoard);
    setupImagePreview("#postCover", "#coverPreview", false);
    setupImagePreview("#postDetails", "#detailPreview", true);
    $("#postForm")?.addEventListener("submit", handlePostSubmit);
  }

  if (type === "messages") bindMessages();
  if (type === "orders") bindOrderButtons();
  if (type === "profile") bindProfileForm();

  if (type === "theme") {
    $all("[data-theme-index]").forEach(btn => btn.addEventListener("click", () => {
      state.boardThemeIndex[state.currentBoard] = Number(btn.dataset.themeIndex);
      saveState();
      render();
      closeDrawer();
      toast(`Theme: ${currentBoardConfig().themeNames[state.boardThemeIndex[state.currentBoard]]}`);
    }));
  }

  if (type === "diy") {
    $("[data-diy-cycle-theme]")?.addEventListener("click", () => {
      cycleTheme();
      closeDrawer();
    });
    $all("[data-diy-open-tag]").forEach(btn => btn.addEventListener("click", () => {
      closeDrawer();
      openTagBoard(btn.dataset.diyOpenTag);
    }));
    $all("[data-diy-customize]").forEach(btn => btn.addEventListener("click", () => {
      closeDrawer();
      openCustomizeTag(btn.dataset.diyCustomize);
    }));
  }
}

function clearFilters() {
  state.filters = defaultState().filters;
  state.normalSearch = "";
  saveState();
  closeDrawer();
  render();
  toast("Filters cleared.");
}

function renderBoardSpecificFields(boardKey) {
  const area = $("#boardSpecificFields");
  if (!area) return;

  if (boardKey === "giveaway") {
    area.innerHTML = `
      <div class="form-grid nested-grid">
        <div class="form-field"><label>Distribution location</label><input class="input" id="postGiveawayLocation" placeholder="Union Square, New York"></div>
        <div class="form-field"><label>Distribution time</label><input class="input" id="postGiveawayTime" placeholder="May 3, 12:00 PM–2:00 PM"></div>
        <div class="form-field full"><label class="checkbox-row"><input type="checkbox" id="postOnlineClaim" checked> Enable online claim</label></div>
      </div>
    `;
  } else if (boardKey === "merchExchange") {
    area.innerHTML = `<div class="form-field full"><label>Looking for</label><input class="input" id="postLookingFor" placeholder="What item do you want in exchange?"></div>`;
  } else {
    area.innerHTML = `<div class="form-field full"><label>Exchange preference</label><input class="input" id="postExchangePreference" placeholder="What kind of freebie do you want?"></div>`;
  }
}

function setupImagePreview(inputSelector, previewSelector, multiple = false) {
  const input = $(inputSelector);
  const preview = $(previewSelector);
  if (!input || !preview) return;

  input.addEventListener("change", () => {
    preview.innerHTML = "";
    const files = Array.from(input.files || []);
    const selected = multiple ? files.slice(0, 4) : files.slice(0, 1);
    selected.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const div = document.createElement("div");
        div.className = "preview-thumb";
        div.innerHTML = `<img src="${e.target.result}" alt="preview">`;
        preview.appendChild(div);
      };
      reader.readAsDataURL(file);
    });
  });
}

async function fileToDataUrl(file) {
  if (!file) return "";
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function rememberTag(key, value) {
  const clean = (value || "").trim();
  if (clean && !state.tags[key].includes(clean)) state.tags[key].push(clean);
  return clean;
}

async function handlePostSubmit(event) {
  event.preventDefault();
  const board = $("#postBoard").value;
  const quantity = Number($("#postQuantity").value || 1);
  const coverFile = $("#postCover")?.files?.[0];
  const detailFiles = Array.from($("#postDetails")?.files || []).slice(0, 4);
  const coverData = await fileToDataUrl(coverFile);
  const detailData = [];
  for (const file of detailFiles) detailData.push(await fileToDataUrl(file));

  const item = {
    id: `item_${Date.now()}`,
    board,
    region: clone(state.currentRegion),
    title: $("#postTitle").value.trim(),
    owner: state.user.username,
    ip: [rememberTag("ip", $("#postIp").value)],
    subject: [rememberTag("subject", $("#postSubject").value)],
    itemType: [rememberTag("itemType", $("#postType").value)],
    origin: [rememberTag("origin", $("#postOrigin").value || "Fan-made Self-drawn")],
    condition: $("#postCondition")?.value || "",
    quantityTotal: quantity,
    quantityAvailable: quantity,
    quantityReserved: 0,
    status: board === "giveaway" ? "Open" : "Available",
    description: $("#postDescription").value.trim(),
    locationNote: $("#postLocation").value.trim(),
    giveawayLocation: $("#postGiveawayLocation")?.value.trim() || "",
    giveawayTime: $("#postGiveawayTime")?.value.trim() || "",
    onlineClaimEnabled: $("#postOnlineClaim")?.checked || false,
    claimMode: "Registration",
    lookingFor: $("#postLookingFor")?.value.trim() || "",
    exchangePreference: $("#postExchangePreference")?.value.trim() || "",
    cover: coverData,
    details: detailData,
    likes: 0,
    private: $("#postVisibility")?.value === "private"
  };

  if (!item.title || !item.ip[0] || !item.subject[0] || !item.itemType[0]) return toast("Please fill all required fields.");

  state.currentBoard = board;
  state.items.unshift(item);
  state.view = "board";
  addNotice(`${item.title} was posted.`, "item", false);
  saveState();
  closeDrawer();
  render();
  toast("Item posted.");
}

function bindMessages() {
  $all("[data-message-tab]").forEach(btn => btn.addEventListener("click", () => {
    $all("[data-message-tab]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const content = $("#messagesContent");
    content.innerHTML = btn.dataset.messageTab === "notices" ? noticesHtml() : chatsHtml(state.chats[0]?.id);
    bindMessages();
  }));

  $all("[data-open-chat]").forEach(btn => btn.addEventListener("click", () => {
    const chat = state.chats.find(c => c.id === btn.dataset.openChat);
    if (chat) chat.unread = false;
    saveState();
    $("#messagesContent").innerHTML = chatsHtml(btn.dataset.openChat);
    bindMessages();
  }));

  $all("[data-send-chat]").forEach(btn => btn.addEventListener("click", () => {
    const input = $("#chatInput");
    const text = input?.value.trim();
    if (!text) return;
    const chat = state.chats.find(c => c.id === btn.dataset.sendChat);
    if (!chat) return;
    chat.messages.push({ from: "Yuza", text });
    input.value = "";
    saveState();
    $("#messagesContent").innerHTML = chatsHtml(chat.id);
    bindMessages();
  }));

  $all("[data-create-order-from-chat]").forEach(btn => btn.addEventListener("click", () => openExchangeOrderForm(btn.dataset.createOrderFromChat)));
  $("#markNoticesRead")?.addEventListener("click", () => {
    state.notices.forEach(n => n.unread = false);
    saveState();
    $("#messagesContent").innerHTML = noticesHtml();
    bindMessages();
    updateTopbar();
    toast("Notices marked as read.");
  });
}

function bindOrderButtons() {
  $all("[data-order-detail]").forEach(btn => btn.addEventListener("click", () => openOrderDetail(btn.dataset.orderDetail)));
}

function openOrderDetail(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;
  openModal(`
    <div class="modal-head">
      <div><p class="kicker">${escapeHtml(order.type)}</p><h2>${escapeHtml(order.id)}</h2></div>
      <button class="close-btn" data-close-modal>×</button>
    </div>
    <div class="info-list">
      ${infoRow("Status", escapeHtml(order.status))}
      ${infoRow("Partner", escapeHtml(order.partner))}
      ${infoRow("Region", escapeHtml(regionLabel(order.region)))}
      ${infoRow("Meeting Location", escapeHtml(order.meetingLocation))}
      ${infoRow("Meeting Time", escapeHtml(order.meetingTime))}
      ${infoRow("Yuza Item", escapeHtml(order.yuzaItem))}
      ${infoRow("Partner Item", escapeHtml(order.partnerItem))}
    </div>
    <div class="timeline-box">${(order.timeline || []).map(line => `<p>• ${escapeHtml(line)}</p>`).join("")}</div>
    <div class="row-actions">
      <button class="primary-btn" id="agreeOrder">Agree to Exchange</button>
      <button class="ghost-btn" id="completeOrder">Upload Proof Demo</button>
      <button class="danger-btn" id="failOrder">Mark Failed</button>
    </div>
  `);

  $("#agreeOrder")?.addEventListener("click", () => {
    order.agreedA = true;
    order.agreedB = true;
    order.status = "In Progress";
    order.timeline.push("Both users agreed to exchange.");
    saveState();
    closeModal();
    render();
    toast("Order agreed.");
  });

  $("#completeOrder")?.addEventListener("click", () => {
    order.proofA = true;
    order.proofB = true;
    order.status = "Pending Review";
    order.timeline.push("Both users uploaded proof photos.");
    saveState();
    closeModal();
    render();
    toast("Proof uploaded.");
  });

  $("#failOrder")?.addEventListener("click", () => {
    order.status = "Unresolved / Failed";
    order.timeline.push("Exchange marked as failed.");
    saveState();
    closeModal();
    render();
    toast("Order marked failed.");
  });
}

function bindProfileForm() {
  $("#saveProfile")?.addEventListener("click", () => {
    state.user.nickname = $("#profileNickname").value.trim() || state.user.nickname;
    state.user.password = $("#profilePassword").value.trim() || state.user.password;
    state.user.bio = $("#profileBio").value.trim();
    saveState();
    render();
    toast("Profile saved.");
  });

  $("#logoutBtn")?.addEventListener("click", () => {
    state.user.loggedIn = !state.user.loggedIn;
    saveState();
    render();
    toast(state.user.loggedIn ? "Logged in." : "Logged out.");
  });
}

function openTagBoard(tag) {
  state.activeTag = tag;
  state.view = "tagBoard";
  saveState();
  closeDrawer();
  closeModal();
  render();
}

function renderTagBoard(tag) {
  const items = state.items.filter(item => itemTags(item).includes(tag) && sameRegion(item.region));
  const theme = state.tagThemes[tag] || "sparkle";
  const view = $("#view");
  view.innerHTML = `
    <section class="tag-board tag-theme-${theme}">
      <div class="tag-hero card">
        <p class="kicker">Personal Tag Board</p>
        <h1>#${escapeHtml(tag)}</h1>
        <p class="lede">A local board collecting items tagged with ${escapeHtml(tag)}.</p>
        <div class="hero-actions"><button class="primary-btn" data-customize-current-tag>Customize This Board</button><button class="ghost-btn" data-back-board>Back to Main Board</button></div>
      </div>
      <section class="list-panel card">
        <div class="section-head"><div><h2>Tagged Items</h2><p>${items.length} item(s) in ${regionLabel()}.</p></div></div>
        ${items.length ? `<div class="items-grid">${items.map(renderItemCard).join("")}</div>` : emptyItemsHtml()}
      </section>
    </section>
  `;
  bindItemActions(view);
  $("[data-customize-current-tag]", view)?.addEventListener("click", () => openCustomizeTag(tag));
  $("[data-back-board]", view)?.addEventListener("click", () => setBoard(state.currentBoard));
}

function openCustomizeTag(tag) {
  openModal(`
    <div class="modal-head">
      <div><p class="kicker">DIY Tag Board</p><h2>Customize #${escapeHtml(tag)}</h2></div>
      <button class="close-btn" data-close-modal>×</button>
    </div>
    <p class="muted-text">This changes small visual details for the selected tag board, including like and save icons.</p>
    <div class="theme-options">
      ${["sparkle", "ribbon", "ticket"].map(theme => `
        <button class="theme-option ${state.tagThemes[tag] === theme ? "active" : ""}" data-set-tag-theme="${theme}">
          <strong>${themeName(theme)}</strong>
          <span>${theme === "sparkle" ? "✦ / ◇" : theme === "ribbon" ? "♡ / ୨୧" : "★ / ▣"}</span>
        </button>
      `).join("")}
    </div>
  `);

  $all("[data-set-tag-theme]").forEach(btn => btn.addEventListener("click", () => {
    state.tagThemes[tag] = btn.dataset.setTagTheme;
    state.activeTag = tag;
    saveState();
    closeModal();
    render();
    toast(`#${tag} style updated.`);
  }));
}

function renderOrdersPage() {
  $("#view").innerHTML = `<section class="page-card card"><h1>Exchange Orders</h1>${ordersContentHtml()}</section>`;
  bindOrderButtons();
}

function renderSavedPage() {
  $("#view").innerHTML = `<section class="page-card card"><h1>Saved Folders</h1><div class="saved-list">${state.savedFolders.map(savedFolderHtml).join("")}</div></section>`;
}

function renderProfilePage() {
  $("#view").innerHTML = `<section class="page-card card"><h1>Profile</h1>${profileFormHtml()}</section>`;
  bindProfileForm();
}

function openModal(html, size = "") {
  const modal = $("#modal");
  const backdrop = $("#modalBackdrop");
  if (!modal || !backdrop) return;
  modal.className = `modal ${size}`.trim();
  modal.innerHTML = html;
  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  $all("[data-close-modal]", modal).forEach(btn => btn.addEventListener("click", closeModal));
}

function closeModal() {
  $("#modal")?.classList.add("hidden");
  $("#modalBackdrop")?.classList.add("hidden");
  const modal = $("#modal");
  if (modal) modal.innerHTML = "";
}

function toast(message) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.remove("hidden");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => el.classList.add("hidden"), 2200);
}

function addNotice(text, type = "item", unread = true) {
  state.notices.unshift({ id: `n_${Date.now()}`, text, type, unread });
}

function initEvents() {
  $all(".tool").forEach(btn => btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    if (action === "home") setView("home");
    if (action === "switch-board") openDrawer("switch-board");
    if (action === "filter") openDrawer("filter");
    if (action === "post") openDrawer("post");
    if (action === "messages") openDrawer("messages");
    if (action === "orders") setView("orders");
    if (action === "saved") setView("saved");
    if (action === "profile") setView("profile");
    if (action === "region") openDrawer("region");
    if (action === "diy") openDrawer("diy");
    if (action === "theme") cycleTheme();
  }));

  $("#advancedBtn")?.addEventListener("click", () => openDrawer("filter"));
  $("#regionPill")?.addEventListener("click", () => openDrawer("region"));
  $("#loginBtn")?.addEventListener("click", () => openDrawer("profile"));
  $("#drawerBackdrop")?.addEventListener("click", closeDrawer);
  $("#modalBackdrop")?.addEventListener("click", closeModal);

  $("#globalSearch")?.addEventListener("input", event => {
    state.normalSearch = event.target.value;
    if (state.view === "home") state.view = "board";
    saveState();
    render();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeDrawer();
      closeModal();
    }
    if (event.altKey && event.key.toLowerCase() === "r") {
      event.preventDefault();
      resetDemo();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initEvents();
  render();
});
