/* FanLoop V1
   Mobile-first local fan exchange web app prototype.
   No real backend. localStorage is used as a prototype data system.
*/

const STORE_KEY = "fanloop_v2_state";

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
    description: "This is a preorder item from the official mini program. The exchange can be arranged first, but it can only be completed after the item arrives.",
    locationNote: "New York local exchange. Exact location will be confirmed in chat.",
    lookingFor: "Same series Mydei collectible card x1.",
    detailRequirement: "Preorder item: detail image should include the purchase record before the item arrives.",
    cover: "assets/items/cyrene-card-cover.png",
    details: ["assets/items/cyrene-card-detail.png"],
    likes: 6,
    saved: 2,
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
    detailRequirement: "In-stock item: detail images should be real photos of the item, package, and identity card.",
    cover: "assets/items/flins-figure-cover.png",
    details: ["assets/items/flins-figure-detail.png"],
    likes: 9,
    saved: 4,
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
    claimFields: [
      { type: "text", label: "Nickname", required: true }
    ],
    cover: "assets/items/haikaveh-acrylic-cover.png",
    details: ["assets/items/haikaveh-acrylic-detail.png"],
    likes: 18,
    saved: 7,
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
    exchangePreference: "Looking for acrylic items, such as acrylic stands. Must also be Phaidei-related.",
    cover: "assets/items/phaidei-stick-cover.png",
    details: ["assets/items/phaidei-stick-detail.png"],
    likes: 21,
    saved: 9,
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
    updatedAt: "May 10, 2026 3:42 PM",
    meetingLocation: "New York local exchange location to be confirmed",
    meetingTime: "After preorder item arrives",
    yuzaItem: "Yuza gives: Cyrene Collectible Card x1",
    partnerItem: "Mika gives: Mydei Collectible Card x1",
    proofA: false,
    proofB: false,
    agreedA: false,
    agreedB: false,
    linkedItemId: "item_3001",
    timeline: [
      "Order request created from chat.",
      "Cyrene Collectible Card is a preorder item.",
      "Waiting for both users to agree."
    ]
  },
  {
    id: "FL-0526-002",
    type: "Freebie Exchange",
    partner: "Nora",
    status: "In Progress",
    region: { country: "United States", city: "New York" },
    createdAt: "May 05, 2026 1:20 PM",
    updatedAt: "May 05, 2026 1:45 PM",
    meetingLocation: "Times Square, New York",
    meetingTime: "May 11, 2026, 3:00–4:00 PM",
    yuzaItem: "Yuza gives: Phaidei Acrylic Check-in Stick x1",
    partnerItem: "Nora gives: Phaidei Acrylic Stand x1",
    proofA: false,
    proofB: false,
    agreedA: true,
    agreedB: true,
    linkedItemId: "item_2001",
    timeline: [
      "Order created from chat.",
      "Both users agreed to exchange.",
      "1 Phaidei Acrylic Check-in Stick reserved from Yuza's listing."
    ]
  },
  {
    id: "FL-0526-003",
    type: "Merchandise Exchange",
    partner: "Luna",
    status: "Pending Review",
    region: { country: "United States", city: "New York" },
    createdAt: "May 03, 2026 1:10 PM",
    updatedAt: "May 04, 2026 5:30 PM",
    meetingLocation: "Union Square, New York",
    meetingTime: "May 04, 2026, 4:00–5:00 PM",
    yuzaItem: "Yuza gives: Flins Blind Box Figure x1",
    partnerItem: "Luna gives: Columbina Blind Box Figure x1",
    proofA: true,
    proofB: true,
    agreedA: true,
    agreedB: true,
    completedAt: "May 04, 2026 5:30 PM",
    linkedItemId: "item_3002",
    timeline: [
      "Order created from chat.",
      "Both users agreed.",
      "Both users uploaded proof photos.",
      "Exchange confirmed, waiting for reviews."
    ]
  }
];

function defaultState() {
  return {
    user: {
      username: "Yuza",
      nickname: "Yuza",
      password: "611225abc",
      bio: "Local fan item collector and exchange beginner.",
      loggedIn: true,
      trust: {
        completed: 12,
        average: 4.8,
        lateCancellations: 1,
        unresolved: 1,
        noShowReports: 0,
        disputed: 0
      }
    },
    currentBoard: "giveaway",
    currentRegion: { country: "United States", city: "New York" },
    regions: initialRegions,
    boardThemeIndex: { giveaway: 0, freebieExchange: 0, merchExchange: 0 },
    tags: structuredClone(initialTags),
    items: structuredClone(sampleItems),
    liked: ["item_2002"],
    savedFolders: [
      { id: "folder_all", name: "All Saved", itemIds: ["item_2002", "item_3002"] },
      { id: "folder_claim", name: "Want to Claim", itemIds: ["item_1001"] },
      { id: "folder_exchange", name: "Exchange Ideas", itemIds: ["item_2001", "item_3002"] }
    ],
    notices: [
      { id: "n1", text: "Mika liked your Mydei Sticker Sheet.", unread: true, type: "like" },
      { id: "n2", text: "New online claim request for Furina Sticker Set.", unread: true, type: "claim" },
      { id: "n3", text: "Order #FL-0526-001 needs exchange confirmation after meetup.", unread: true, type: "order" },
      { id: "n4", text: "Please review your completed exchange with Luna.", unread: false, type: "review" }
    ],
    chats: [
      {
        id: "chat_nora",
        partner: "Nora",
        itemId: "item_2001",
        unread: true,
        messages: [
          { from: "Nora", text: "Hi! This postcard set is still available." },
          { from: "Yuza", text: "Can we exchange near Union Square?" },
          { from: "Nora", text: "Yes, that works for me." }
        ]
      },
      {
        id: "chat_mika",
        partner: "Mika",
        itemId: "item_3001",
        unread: false,
        messages: [
          { from: "Mika", text: "Auto-reply: Thanks for your interest. Please send your available meetup time." }
        ]
      }
    ],
    orders: structuredClone(sampleOrders),
    tagThemes: {
      "Furina": "sparkle",
      "Phaidei": "ribbon"
    },
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
    view: "home"
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      const s = defaultState();
      localStorage.setItem(STORE_KEY, JSON.stringify(s));
      return s;
    }
    const loaded = JSON.parse(raw);
    return { ...defaultState(), ...loaded };
  } catch (err) {
    console.warn("Failed to load state", err);
    return defaultState();
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
  return boardConfig[state.currentBoard];
}

function applyTheme() {
  const board = currentBoardConfig();
  const idx = state.boardThemeIndex[state.currentBoard] || 0;
  const theme = board.themes[idx];
  const root = document.documentElement;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-2", theme.accent2);
  root.style.setProperty("--accent-3", theme.accent3);
  root.style.setProperty("--accent-dark", theme.accentDark);
}

function setView(view) {
  state.view = view;
  saveState();
  render();
}

function setBoard(board) {
  state.currentBoard = board;
  state.view = "board";
  saveState();
  render();
  toast(`Switched to ${boardConfig[board].name}.`);
}

function cycleTheme() {
  const board = state.currentBoard;
  state.boardThemeIndex[board] = ((state.boardThemeIndex[board] || 0) + 1) % boardConfig[board].themes.length;
  saveState();
  render();
  const themeName = boardConfig[board].themeNames[state.boardThemeIndex[board]];
  toast(`Theme: ${themeName}`);
}

function setRegion(country, city) {
  state.currentRegion = { country, city };
  saveState();
  render();
  toast(`Local board changed to ${country} / ${city}.`);
}

function updateTopbar() {
  $("#regionPill").textContent = regionLabel();
  const loginBtn = $("#loginBtn");
  loginBtn.textContent = state.user.loggedIn ? `Hi, ${state.user.nickname}` : "Log in";
}

function render() {
  applyTheme();
  updateTopbar();
  updateToolActive();

  if (state.view === "home") renderHome();
  else if (state.view === "board") renderBoard();
  else if (state.view === "profile") renderProfile();
  else if (state.view === "orders") renderOrders();
  else if (state.view === "saved") renderSaved();
  else if (state.view === "tagBoard") renderTagBoard(state.activeTag || "Furina");
  else renderHome();
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
  const key = map[state.view];
  if (key) {
    const btn = $(`.tool[data-action="${key}"]`);
    if (btn) btn.classList.add("active");
  }
}

function renderHome() {
  const view = $("#view");
  const boardCards = Object.entries(boardConfig).map(([key, board]) => {
    const color = board.themes[0].accent2;
    return `
      <button class="board-card" style="--board-color:${color}" data-board="${key}">
        <h3>${board.emoji} ${board.name}</h3>
        <p>${board.description}</p>
        <div class="mini-tags">
          <span class="tag">${board.short}</span>
          <span class="tag">Local only</span>
        </div>
      </button>
    `;
  }).join("");

  view.innerHTML = `
    <section class="hero-grid">
      <div class="hero-card">
        <div class="hero-content">
          <p class="kicker">Mobile-first local fan exchange board</p>
          <h1>FanLoop</h1>
          <p class="lede">
            A local fan community prototype for freebies, fan-made exchanges, and purchased merchandise exchange.
            Users choose their region manually. FanLoop does not auto-detect location for privacy.
          </p>
          <div class="hero-actions">
            <button class="primary-btn" data-open-board="giveaway">Start with Freebies</button>
            <button class="ghost-btn" data-open-drawer="region">Change Local Board</button>
            <button class="ghost-btn" data-open-drawer="post">Post Item</button>
          </div>
          <div class="privacy-note">
            Current local board: <strong>${regionLabel()}</strong>. This prototype is local-only and does not support shipping.
          </div>
        </div>
      </div>

      <aside class="stats-panel card">
        <div class="stat-card">
          <div class="stat-number">${getItemsForRegion().length}</div>
          <div class="stat-label">items in this local board</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${state.notices.filter(n => n.unread).length}</div>
          <div class="stat-label">new notices for Yuza</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${state.orders.length}</div>
          <div class="stat-label">exchange order records</div>
        </div>
      </aside>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <h2>Main Boards</h2>
          <p>Choose one board first, then search by IP, character / CP, item type, and region.</p>
        </div>
      </div>
      <div class="board-switcher">${boardCards}</div>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <h2>Popular Categories</h2>
          <p>Built for fan-made goods, official merch duplicates, and local exchange records.</p>
        </div>
      </div>
      <div class="category-grid">
        ${categoryCard("✧", "Paper Goods", "Stickers, postcards, acrylic stands, acrylic check-in sticks, cards.")}
        ${categoryCard("◇", "Acrylic Goods", "Acrylic stands, acrylic keychains, acrylic charms.")}
        ${categoryCard("●", "Badges & Pins", "Can badges, button badges, enamel pins.")}
        ${categoryCard("▣", "Cards", "Photocards, trading cards, random character cards.")}
        ${categoryCard("☁", "Plush / Soft Goods", "Plush keychains, mini plush, fabric charms.")}
        ${categoryCard("✿", "Handmade Items", "Handmade charms, crochet items, DIY packaging.")}
        ${categoryCard("◆", "Official Merchandise", "Official cards, blind-box figures, badges, acrylic stands.")}
        ${categoryCard("⌾", "Local Boards", "New York, Shenzhen, Guangzhou, and other manually selected boards.")}
      </div>
    </section>
  `;

  $all("[data-board]").forEach(btn => btn.addEventListener("click", () => setBoard(btn.dataset.board)));
  $all("[data-open-board]").forEach(btn => btn.addEventListener("click", () => setBoard(btn.dataset.openBoard)));
  $all("[data-open-drawer]").forEach(btn => btn.addEventListener("click", () => openDrawer(btn.dataset.openDrawer)));
}

function categoryCard(icon, title, text) {
  return `
    <article class="category-card">
      <div class="category-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `;
}

function renderBoard() {
  const board = currentBoardConfig();
  const items = getFilteredItems();
  const otherRegionMatches = getOtherRegionMatches();

  $("#view").innerHTML = `
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

      ${renderSearchResultHint(items, otherRegionMatches)}

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
              ${state.tags.itemType.slice(0, 7).map(t => `<button class="filter-chip" data-quick-type="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join("")}
            </div>
          </div>
          <div class="filter-group">
            <label>Local Rule</label>
            <p style="color:var(--muted);line-height:1.5;margin:0;">FanLoop only shows items in the selected local board. If a search has no local results, the app suggests other regions instead of mixing global posts.</p>
          </div>
          <button class="ghost-btn" style="margin-top:16px;width:100%" data-clear-filters>Clear Filters</button>
        </aside>

        <section class="list-panel card">
          <div class="section-head">
            <div>
              <h2>${board.short} Items</h2>
              <p>Normal search reads title and tags. Advanced search can include and exclude tags.</p>
            </div>
          </div>
          ${items.length ? `<div class="items-grid">${items.map(renderItemCard).join("")}</div>` : emptyItemsHtml(otherRegionMatches)}
        </section>
      </div>
    </section>
  `;

  bindItemActions();
  $all("[data-board-filter]").forEach(btn => btn.addEventListener("click", () => setBoard(btn.dataset.boardFilter)));
  $all("[data-quick-type]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.quickType;
      state.filters.includeType = [type];
      saveState();
      render();
    });
  });
  $("[data-clear-filters]")?.addEventListener("click", () => {
    state.filters = defaultState().filters;
    state.normalSearch = "";
    $("#globalSearch").value = "";
    saveState();
    render();
  });
  $all("[data-open-drawer]").forEach(btn => btn.addEventListener("click", () => openDrawer(btn.dataset.openDrawer)));
  $all("[data-open-tag]").forEach(btn => btn.addEventListener("click", () => openTagBoard(btn.dataset.openTag)));
  $all("[data-switch-region]").forEach(btn => {
    btn.addEventListener("click", () => {
      const [country, city] = btn.dataset.switchRegion.split("||");
      setRegion(country, city);
    });
  });
}

function renderSearchResultHint(items, otherMatches) {
  const q = state.normalSearch.trim();
  const maybeTag = state.tags.subject.find(t => q && t.toLowerCase() === q.toLowerCase()) ||
    state.tags.subject.find(t => q && t.toLowerCase().includes(q.toLowerCase()));

  if (maybeTag && items.length) {
    return `
      <div class="panel" style="padding:16px;">
        Viewing results for “${escapeHtml(q)}”.
        <button class="small-btn" data-open-tag="${escapeHtml(maybeTag)}">Open #${escapeHtml(maybeTag)} Tag Board</button>
      </div>
    `;
  }

  if (!items.length && otherMatches.length) {
    const grouped = [...new Map(otherMatches.map(i => [regionLabel(i.region), i.region])).values()];
    return `
      <div class="panel" style="padding:16px;">
        No matching items in <strong>${regionLabel()}</strong>. Found matching items in:
        <div class="row-actions" style="margin-top:10px;">
          ${grouped.map(r => `<button class="small-btn" data-switch-region="${r.country}||${r.city}">Switch to ${r.country} / ${r.city}</button>`).join("")}
        </div>
      </div>
    `;
  }

  return "";
}

function emptyItemsHtml(otherRegionMatches = []) {
  return `
    <div class="empty-state">
      <h3>No matching items found.</h3>
      <p>Try another keyword, tag filter, or local board.</p>
      ${otherRegionMatches.length ? "<p>Some matches exist in other regions. Use the suggested region switch above.</p>" : ""}
    </div>
  `;
}

function getItemsForRegion() {
  return state.items.filter(item => sameRegion(item.region));
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
  const filters = state.filters;
  let items = state.items.filter(item => item.board === state.currentBoard && (allRegions || sameRegion(item.region)));

  // Hide private items unless owned by Yuza.
  items = items.filter(item => !item.private || item.owner === state.user.username);

  items = items.filter(item => {
    const tags = itemTags(item);
    const title = item.title.toLowerCase();
    const allSearchText = [item.title, ...tags].join(" ").toLowerCase();

    const advancedActive = [
      filters.includeIp, filters.excludeIp, filters.includeSubject, filters.excludeSubject,
      filters.includeType, filters.excludeType, filters.includeOrigin
    ].some(arr => arr.length) || filters.status !== "All" || filters.lookingFor;

    if (q) {
      if (advancedActive) {
        if (!title.includes(q)) return false;
      } else {
        if (!allSearchText.includes(q)) return false;
      }
    }

    if (!includesAll(item.ip, filters.includeIp)) return false;
    if (intersects(item.ip, filters.excludeIp)) return false;
    if (!includesAll(item.subject, filters.includeSubject)) return false;
    if (intersects(item.subject, filters.excludeSubject)) return false;
    if (!includesAll(item.itemType, filters.includeType)) return false;
    if (intersects(item.itemType, filters.excludeType)) return false;
    if (!includesAll(item.origin, filters.includeOrigin)) return false;
    if (filters.status !== "All" && item.status !== filters.status) return false;

    if (state.currentBoard === "merchExchange" && filters.lookingFor) {
      const lf = (item.lookingFor || "").toLowerCase();
      if (!lf.includes(filters.lookingFor.toLowerCase())) return false;
    }

    return true;
  });

  return items;
}

function getOtherRegionMatches() {
  return getFilteredItems({ allRegions: true }).filter(item => !sameRegion(item.region));
}

function includesAll(itemValues = [], filterValues = []) {
  return filterValues.every(v => itemValues.includes(v));
}

function intersects(itemValues = [], filterValues = []) {
  return filterValues.some(v => itemValues.includes(v));
}

function renderItemCard(item) {
  const liked = state.liked.includes(item.id);
  const saved = state.savedFolders.some(f => f.itemIds.includes(item.id));
  const disabledClass = ["Ended", "Exchanged"].includes(item.status) ? item.status.toLowerCase() : "";
  const privateClass = item.private ? "private" : "";
  const sticker = item.board === "giveaway" ? "✿" : item.board === "freebieExchange" ? "◇" : "◆";
  const cover = item.cover ? `<img src="${item.cover}" alt="${escapeHtml(item.title)}">` : initials(item.title);

  return `
    <article class="item-card ${disabledClass} ${privateClass}" data-item-id="${item.id}">
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
          ${(item.itemType || []).slice(0, 2).map(t => `<span class="tag clickable" data-open-tag="${escapeHtml((item.subject || [])[0] || t)}">${escapeHtml(t)}</span>`).join("")}
          <span class="tag">${escapeHtml(regionLabel(item.region))}</span>
        </div>
        <p class="item-sub">
          Available: ${item.quantityAvailable} · Reserved: ${item.quantityReserved || 0}
        </p>
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
  if (["Ended", "Exchanged", "Unresolved / Failed"].includes(status)) return "danger";
  if (["Reviewing", "In Exchange", "Pending", "Full"].includes(status)) return "warn";
  return "";
}

function initials(title) {
  return escapeHtml(title.split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase());
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
  const folderOptions = state.savedFolders.map(f => `
    <button class="list-item" data-save-to-folder="${f.id}" style="text-align:left;">
      <strong>${escapeHtml(f.name)}</strong><br>
      <span style="color:var(--muted);">${f.itemIds.length} saved items</span>
    </button>
  `).join("");

  openModal(`
    <div class="modal-head">
      <div>
        <h2>Save to Folder</h2>
        <p style="color:var(--muted);margin:6px 0 0;">Choose a folder for ${escapeHtml(item.title)}.</p>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>
    <div class="saved-list">${folderOptions}</div>
    <div class="form-field" style="margin-top:14px;">
      <label>Create new folder</label>
      <input class="input" id="newFolderName" placeholder="Folder name">
    </div>
    <div class="row-actions">
      <button class="primary-btn" id="createFolderSave">Create and Save</button>
    </div>
  `);

  $all("[data-save-to-folder]").forEach(btn => {
    btn.addEventListener("click", () => {
      const folder = state.savedFolders.find(f => f.id === btn.dataset.saveToFolder);
      if (folder && !folder.itemIds.includes(itemId)) folder.itemIds.push(itemId);
      addNotice(`${item.title} was saved into ${folder?.name || "a folder"}.`, "save", false);
      saveState();
      closeModal();
      render();
      toast("Saved.");
    });
  });

  $("#createFolderSave").addEventListener("click", () => {
    const name = $("#newFolderName").value.trim();
    if (!name) return toast("Please enter a folder name.");
    const folder = { id: `folder_${Date.now()}`, name, itemIds: [itemId] };
    state.savedFolders.push(folder);
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
    ? (item.onlineClaimEnabled
      ? `<button class="primary-btn" data-online-claim="${item.id}">Online Claim</button>`
      : `<button class="ghost-btn" disabled>Online Claim Off</button>`)
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
      <div class="detail-cover">${item.cover ? `<img src="${item.cover}" alt="${escapeHtml(item.title)}">` : initials(item.title)}</div>
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
          ${item.board === "merchExchange" ? infoRow("Detail Image Rule", escapeHtml(item.detailRequirement || "In-stock items use real photos. Preorder items use purchase records.")) : ""}
          ${infoRow("Location Note", escapeHtml(item.locationNote || "Discuss by chat."))}
        </div>
        <p style="color:var(--muted);line-height:1.55;">${escapeHtml(item.description || "")}</p>
        ${renderDetailImages(item)}
        <div class="mini-tags">
          ${itemTags(item).map(t => `<span class="tag clickable" data-open-tag="${escapeHtml(t)}">${escapeHtml(t)}</span>`).join("")}
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
    <div style="margin-top:14px;">
      <h3>Detail Images / Records</h3>
      <div class="preview-row">
        ${details.map((src, idx) => {
          const isImagePath = String(src).match(/\.(svg|png|jpg|jpeg|webp|gif)$/i);
          return `<div class="preview-thumb">${isImagePath ? `<img src="${escapeHtml(src)}" alt="detail image ${idx + 1}">` : escapeHtml(src)}</div>`;
        }).join("")}
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

  const disabled = ["Full", "Reviewing", "Ended"].includes(item.status) || item.quantityAvailable <= 0;
  openModal(`
    <div class="modal-head">
      <div>
        <p class="kicker">${escapeHtml(item.claimMode)} Mode</p>
        <h2>Online Claim: ${escapeHtml(item.title)}</h2>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>

    ${disabled ? `
      <div class="empty-state">
        <h3>This claim is not open.</h3>
        <p>Status: ${escapeHtml(item.status)}. If review slots open later, users can submit again.</p>
      </div>
    ` : `
      <p style="color:var(--muted);">The creator controls the claim form. Text and image questions can be required or optional.</p>
      <div class="form-grid">
        ${item.claimFields.map((field, index) => `
          <div class="form-field full">
            <label>${escapeHtml(field.label)} ${field.required ? "(required)" : "(optional)"}</label>
            ${field.type === "image"
              ? `<input class="input" type="file" accept="image/*" data-claim-field="${index}" ${field.required ? "required" : ""}>`
              : `<input class="input" data-claim-field="${index}" placeholder="${escapeHtml(field.label)}" ${field.required ? "required" : ""}>`
            }
          </div>
        `).join("")}
      </div>
      <div class="row-actions">
        <button class="primary-btn" id="submitClaim">Submit Claim</button>
        <button class="ghost-btn" id="cancelApprovedClaim">Cancel My Claim Demo</button>
      </div>
    `}
  `);

  $("#submitClaim")?.addEventListener("click", () => {
    if (item.claimMode === "Registration") {
      item.quantityAvailable = Math.max(0, item.quantityAvailable - 1);
      item.quantityReserved += 1;
      if (item.quantityAvailable === 0) item.status = "Full";
      addNotice(`Your claim for ${item.title} was registered. Show the success page onsite.`, "claim", true);
      toast("Claim registered.");
    } else {
      item.quantityReserved += 1;
      item.quantityAvailable = Math.max(0, item.quantityAvailable - 1);
      if (item.quantityAvailable === 0) item.status = "Reviewing";
      addNotice(`Your claim request for ${item.title} is waiting for creator review.`, "claim", true);
      toast("Claim submitted for review.");
    }
    saveState();
    closeModal();
    render();
  });

  $("#cancelApprovedClaim")?.addEventListener("click", () => {
    item.quantityAvailable += 1;
    item.quantityReserved = Math.max(0, item.quantityReserved - 1);
    item.status = "Open";
    addNotice(`Yuza cancelled a claim for ${item.title}.`, "claim", false);
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
      <div>
        <h2>Edit Item</h2>
        <p style="color:var(--muted);margin:6px 0 0;">Prototype controls for editing and visibility.</p>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>

    <div class="form-grid">
      <div class="form-field">
        <label>Title</label>
        <input class="input" id="editTitle" value="${escapeHtml(item.title)}">
      </div>
      <div class="form-field">
        <label>Status</label>
        <select class="select" id="editStatus">
          ${statusOptions(item.board).map(s => `<option ${s === item.status ? "selected" : ""}>${s}</option>`).join("")}
        </select>
      </div>
      <div class="form-field">
        <label>Available Quantity</label>
        <input class="input" id="editQty" type="number" min="0" value="${item.quantityAvailable}">
      </div>
      <div class="form-field">
        <label>Visibility</label>
        <select class="select" id="editPrivate">
          <option value="false" ${!item.private ? "selected" : ""}>Visible to others</option>
          <option value="true" ${item.private ? "selected" : ""}>Private only</option>
        </select>
      </div>
      <div class="form-field full">
        <label>Description</label>
        <textarea class="textarea" id="editDesc">${escapeHtml(item.description || "")}</textarea>
      </div>
    </div>
    <div class="row-actions">
      <button class="primary-btn" id="saveEditItem">Save Changes</button>
      <button class="ghost-btn" id="markUnavailable">Mark Unavailable</button>
    </div>
  `);

  $("#saveEditItem").addEventListener("click", () => {
    item.title = $("#editTitle").value.trim() || item.title;
    item.status = $("#editStatus").value;
    item.quantityAvailable = Number($("#editQty").value || 0);
    item.private = $("#editPrivate").value === "true";
    item.description = $("#editDesc").value.trim();
    addNotice(`${item.title} was edited.`, "item", false);
    saveState();
    closeModal();
    render();
    toast("Item updated.");
  });

  $("#markUnavailable").addEventListener("click", () => {
    item.status = "Unavailable";
    item.private = false;
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
      messages: [
        { from: item.owner, text: "Auto-reply: Thanks for your interest. Please send your available local meetup time." }
      ]
    };
    state.chats.push(chat);
  }
  openMessages(chat.id);
}

function openMessages(activeChatId = null) {
  openDrawer("messages", { activeChatId });
}

function openExchangeOrderForm(itemId, chatId = null) {
  const partnerItem = state.items.find(i => i.id === itemId);
  if (!partnerItem) return;

  const myItems = state.items.filter(i => i.owner === state.user.username && i.board !== "giveaway");
  openModal(`
    <div class="modal-head">
      <div>
        <p class="kicker">Exchange Order Request</p>
        <h2>Create Order with ${escapeHtml(partnerItem.owner)}</h2>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>

    <p style="color:var(--muted);line-height:1.55;">
      Orders are created after chat negotiation. Meeting location and time must be filled here because they are decided after both users talk.
    </p>

    <div class="form-grid">
      <div class="form-field full">
        <label>Choose my existing item or enter manually</label>
        <select class="select" id="orderMyItem">
          <option value="">Manual entry</option>
          ${myItems.map(i => `<option value="${i.id}">${escapeHtml(i.title)} · ${escapeHtml((i.itemType || []).join(", "))}</option>`).join("")}
        </select>
      </div>
      <div class="form-field">
        <label>My item name</label>
        <input class="input" id="orderItemName" placeholder="Item I will give" required>
      </div>
      <div class="form-field">
        <label>Quantity</label>
        <input class="input" id="orderQty" type="number" min="1" value="1" required>
      </div>
      <div class="form-field">
        <label>IP tag</label>
        ${tagSelectHtml("orderIp", state.tags.ip, true)}
      </div>
      <div class="form-field">
        <label>Character / CP tag</label>
        ${tagSelectHtml("orderSubject", state.tags.subject, true)}
      </div>
      <div class="form-field">
        <label>Item type tag</label>
        ${tagSelectHtml("orderType", state.tags.itemType, true)}
      </div>
      <div class="form-field">
        <label>Item condition</label>
        ${tagSelectHtml("orderCondition", state.tags.condition, true)}
      </div>
      <div class="form-field full">
        <label>Detail image</label>
        <input class="input" id="orderImage" type="file" accept="image/*" required>
      </div>
      <div class="form-field">
        <label>Exchange location</label>
        <input class="input" id="orderLocation" placeholder="Discussed meetup place" required>
      </div>
      <div class="form-field">
        <label>Exchange time window</label>
        <input class="input" id="orderTime" placeholder="May 17, 2:00–3:00 PM" required>
      </div>
      <div class="form-field full">
        <label>Agreement</label>
        <label class="checkbox-row"><input type="checkbox" id="orderConfirm"> I confirm this item information is accurate and this exchange creates a trust record.</label>
      </div>
    </div>

    <div class="row-actions">
      <button class="primary-btn" id="sendOrderRequest">Send Order Request</button>
    </div>
  `, "wide");

  $("#orderMyItem").addEventListener("change", (e) => {
    const selected = state.items.find(i => i.id === e.target.value);
    if (!selected) return;
    $("#orderItemName").value = selected.title;
    $("#orderQty").value = 1;
    $("#orderIp").value = selected.ip[0] || "";
    $("#orderSubject").value = selected.subject[0] || "";
    $("#orderType").value = selected.itemType[0] || "";
    $("#orderCondition").value = selected.condition || "";
  });

  $("#sendOrderRequest").addEventListener("click", () => {
    if (!$("#orderConfirm").checked) return toast("Please confirm the agreement checkbox.");
    const qty = Number($("#orderQty").value || 1);
    if (qty < 1) return toast("Quantity must be at least 1.");

    // Reserve partner item quantity immediately as prototype trace.
    if (partnerItem.quantityAvailable >= 1) {
      partnerItem.quantityAvailable -= 1;
      partnerItem.quantityReserved = (partnerItem.quantityReserved || 0) + 1;
      partnerItem.status = "In Exchange";
    }

    const order = {
      id: `FL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      type: partnerItem.board === "merchExchange" ? "Merchandise Exchange" : "Freebie Exchange",
      partner: partnerItem.owner,
      status: "Waiting for Agreement",
      region: structuredClone(state.currentRegion),
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      meetingLocation: $("#orderLocation").value.trim(),
      meetingTime: $("#orderTime").value.trim(),
      yuzaItem: `Yuza gives: ${$("#orderItemName").value.trim()} x${qty}`,
      partnerItem: `${partnerItem.owner} gives: ${partnerItem.title} x1`,
      proofA: false,
      proofB: false,
      agreedA: false,
      agreedB: false,
      timeline: [
        "Order request created from chat.",
        `Partner item reserved: ${partnerItem.title}.`,
        "Waiting for both users to agree."
      ],
      linkedItemId: partnerItem.id
    };

    state.orders.unshift(order);

    let chat = state.chats.find(c => c.itemId === partnerItem.id);
    if (!chat) {
      chat = { id: `chat_${Date.now()}`, partner: partnerItem.owner, itemId: partnerItem.id, unread: false, messages: [] };
      state.chats.push(chat);
    }
    chat.messages.push({ from: "System", text: `Exchange order ${order.id} was sent. Both users need to agree.` });

    addNotice(`Order ${order.id} is waiting for agreement.`, "order", true);
    saveState();
    closeModal();
    render();
    openMessages(chat.id);
    toast("Order request sent.");
  });
}

function tagSelectHtml(id, values, required = false) {
  return `
    <select class="select" id="${id}" ${required ? "required" : ""}>
      <option value="">Select...</option>
      ${values.map(v => `<option>${escapeHtml(v)}</option>`).join("")}
    </select>
  `;
}

function openDrawer(type, opts = {}) {
  const drawer = $("#drawer");
  const backdrop = $("#drawerBackdrop");
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

  drawer.innerHTML = html;
  drawer.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  bindDrawer(type, opts);
}

function closeDrawer() {
  $("#drawer").classList.add("hidden");
  $("#drawerBackdrop").classList.add("hidden");
  $("#drawer").innerHTML = "";
}

function drawerHead(title, sub = "") {
  return `
    <div class="drawer-head">
      <div>
        <h2>${title}</h2>
        ${sub ? `<p style="color:var(--muted);margin:6px 0 0;line-height:1.45;">${sub}</p>` : ""}
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
        <button class="list-item" data-region="${r.country}||${r.city}" style="text-align:left;">
          <strong>${r.country} / ${r.city}</strong>
          ${sameRegion(r) ? `<span class="status" style="margin-left:8px;">Current</span>` : ""}
        </button>
      `).join("")}
    </div>
  `;
}

function switchBoardDrawerHtml() {
  return `
    ${drawerHead("Switch Board", "Each board has a different purpose and color system.")}
    <div class="chat-list">
      ${Object.entries(boardConfig).map(([key, b]) => `
        <button class="list-item" data-switch-board="${key}" style="text-align:left;">
          <strong>${b.emoji} ${b.name}</strong>
          <p style="margin:6px 0 0;color:var(--muted);">${b.description}</p>
        </button>
      `).join("")}
    </div>
  `;
}

function filterDrawerHtml() {
  return `
    ${drawerHead("Advanced Search", "Include or exclude tags. When advanced filters are active, the search bar only reads item titles.")}
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
      ${state.currentBoard === "merchExchange" ? `
        <div class="form-field full">
          <label>Looking For keyword</label>
          <input class="input" id="filterLookingFor" value="${escapeHtml(state.filters.lookingFor || "")}" placeholder="Example: Sunday acrylic">
        </div>
      ` : ""}
    </div>
    <div class="row-actions">
      <button class="primary-btn" id="applyFilters">Apply Filters</button>
      <button class="ghost-btn" id="clearFilters">Clear</button>
    </div>
  `;
}

function multiSelectBlock(label, key, values) {
  return `
    <div class="form-field full">
      <label>${label}</label>
      <div class="filter-inline" data-filter-group="${key}">
        ${values.map(v => `
          <button class="filter-chip ${state.filters[key]?.includes(v) ? "active" : ""}" type="button" data-filter-value="${escapeHtml(v)}">${escapeHtml(v)}</button>
        `).join("")}
      </div>
    </div>
  `;
}

function postDrawerHtml() {
  const board = currentBoardConfig();
  return `
    ${drawerHead(`Post ${board.short}`, "Required tags: IP, character / CP, and item type. Users can create new tags during posting.")}
    <form id="postForm" class="form-grid">
      <div class="form-field full">
        <label>Board</label>
        <select class="select" id="postBoard" required>
          ${Object.entries(boardConfig).map(([key, b]) => `<option value="${key}" ${key === state.currentBoard ? "selected" : ""}>${b.name}</option>`).join("")}
        </select>
      </div>

      <div class="form-field full">
        <label>Cover image required</label>
        <div class="upload-box">
          <input class="input" id="postCover" type="file" accept="image/*">
          <div id="coverPreview" class="preview-row"></div>
          <small style="color:var(--muted);">Prototype: preview only. Large image files are not permanently uploaded.</small>
        </div>
      </div>

      <div class="form-field full">
        <label>Title required</label>
        <input class="input" id="postTitle" required placeholder="Item title">
      </div>

      <div class="form-field">
        <label>IP tag required</label>
        ${tagInputHtml("postIp", "ip", "Example: Genshin Impact")}
      </div>

      <div class="form-field">
        <label>Character / CP tag required</label>
        ${tagInputHtml("postSubject", "subject", "Example: Furina or Phaidei")}
      </div>

      <div class="form-field">
        <label>Item type tag required</label>
        ${tagInputHtml("postType", "itemType", "Example: Badge")}
      </div>

      <div class="form-field">
        <label>Origin / source</label>
        ${tagInputHtml("postOrigin", "origin", "Example: Fan-made Self-drawn")}
      </div>

      <div class="form-field" id="conditionField">
        <label>Condition required for exchange only</label>
        ${tagSelectHtml("postCondition", state.tags.condition, false)}
      </div>

      <div class="form-field">
        <label>Quantity required</label>
        <input class="input" id="postQuantity" type="number" min="1" value="1" required>
      </div>

      <div class="form-field full">
        <label>Description optional</label>
        <textarea class="textarea" id="postDescription" placeholder="Optional item description"></textarea>
      </div>

      <div class="form-field full">
        <label>Local location / arrangement note</label>
        <input class="input" id="postLocation" placeholder="Example: near Parsons, Shenzhen Futian, discuss in chat">
      </div>

      <div id="boardSpecificFields" class="form-field full"></div>

      <div class="form-field full">
        <label>At least one detail image required</label>
        <div class="upload-box">
          <input class="input" id="postDetails" type="file" accept="image/*" multiple>
          <div id="detailPreview" class="preview-row"></div>
        </div>
      </div>

      <div class="form-field full">
        <label>Visibility</label>
        <select class="select" id="postVisibility">
          <option value="public">Visible to others</option>
          <option value="private">Private only</option>
        </select>
      </div>

      <div class="form-field full">
        <button class="primary-btn" type="submit" style="width:100%;">Submit Item</button>
      </div>
    </form>
  `;
}

function tagInputHtml(id, tagKey, placeholder) {
  const listId = `${id}List`;
  return `
    <input class="input" id="${id}" list="${listId}" placeholder="${placeholder}" required>
    <datalist id="${listId}">
      ${state.tags[tagKey].map(t => `<option value="${escapeHtml(t)}"></option>`).join("")}
    </datalist>
    <small style="color:var(--muted);">If the tag does not exist, it will be remembered after posting.</small>
  `;
}

function messagesDrawerHtml(activeChatId = null) {
  const chat = state.chats.find(c => c.id === activeChatId) || state.chats[0];
  return `
    ${drawerHead("Messages", "Private chats and system notices are together here.")}
    <div class="tabs">
      <button class="tab-btn active" data-message-tab="chats">Chats</button>
      <button class="tab-btn" data-message-tab="notices">Notices (${state.notices.filter(n => n.unread).length})</button>
    </div>
    <div id="messagesContent">
      ${chatsHtml(chat?.id)}
    </div>
  `;
}

function chatsHtml(activeChatId) {
  const chat = state.chats.find(c => c.id === activeChatId) || state.chats[0];
  if (!chat) return `<div class="empty-state"><h3>No chats yet.</h3></div>`;
  const item = state.items.find(i => i.id === chat.itemId);

  return `
    <div class="chat-list" style="margin-bottom:14px;">
      ${state.chats.map(c => `
        <button class="list-item" data-open-chat="${c.id}" style="text-align:left;${c.id === chat.id ? "border-color:var(--accent);" : ""}">
          <strong>${escapeHtml(c.partner)}</strong>
          ${c.unread ? `<span class="status warn" style="margin-left:8px;">New</span>` : ""}
          <p style="margin:5px 0 0;color:var(--muted);">${escapeHtml(state.items.find(i => i.id === c.itemId)?.title || "General chat")}</p>
        </button>
      `).join("")}
    </div>

    <div class="panel" style="padding:14px;">
      <h3>Chat with ${escapeHtml(chat.partner)}</h3>
      <p style="color:var(--muted);margin-top:4px;">${escapeHtml(item?.title || "")}</p>
      <div class="chat-box" style="margin-top:14px;">
        ${chat.messages.map(m => `
          <div class="bubble ${m.from === "Yuza" ? "me" : ""}">
            <strong>${escapeHtml(m.from)}:</strong> ${escapeHtml(m.text)}
          </div>
        `).join("")}
      </div>
      <div class="row-actions">
        <input class="input" id="chatInput" placeholder="Type your message..." style="flex:1;min-width:180px;">
        <button class="primary-btn" data-send-chat="${chat.id}">Send</button>
      </div>
      ${item && item.board !== "giveaway" ? `
        <div class="row-actions">
          <button class="ghost-btn" data-create-order-from-chat="${item.id}">Create Exchange Order</button>
        </div>
      ` : `
        <p style="color:var(--muted);">Distribution posts do not create exchange orders.</p>
      `}
    </div>
  `;
}

function noticesHtml() {
  return `
    <div class="notice-list">
      ${state.notices.map(n => `
        <div class="list-item">
          <strong>${noticeIcon(n.type)} ${escapeHtml(n.text)}</strong>
          ${n.unread ? `<span class="status warn" style="margin-left:8px;">Unread</span>` : ""}
        </div>
      `).join("")}
    </div>
    <div class="row-actions">
      <button class="ghost-btn" id="markNoticesRead">Mark all as read</button>
    </div>
  `;
}

function noticeIcon(type) {
  return { like: "✦", save: "♡", claim: "✿", order: "◎", review: "★", item: "▣" }[type] || "•";
}

function ordersDrawerHtml() {
  return `
    ${drawerHead("Exchange Orders", "Only exchange boards generate orders. Distribution claims use claim records instead.")}
    ${ordersContentHtml()}
  `;
}

function ordersContentHtml() {
  const groups = ["Waiting for Agreement", "In Progress", "Pending Review", "Completed", "Unresolved / Failed", "Disputed"];
  return `
    <div class="order-list">
      ${groups.map(status => {
        const orders = state.orders.filter(o => o.status === status);
        return `
          <section class="list-item">
            <h3>${status} (${orders.length})</h3>
            ${orders.length ? orders.map(o => orderMiniHtml(o)).join("") : `<p style="color:var(--muted);">No orders in this category.</p>`}
          </section>
        `;
      }).join("")}
    </div>
  `;
}

function orderMiniHtml(order) {
  return `
    <div class="order-card" style="margin-top:10px;">
      <strong>${escapeHtml(order.id)}</strong>
      <span class="status ${statusClass(order.status)}">${escapeHtml(order.status)}</span>
      <p style="color:var(--muted);">${escapeHtml(order.partner)} · ${escapeHtml(order.type)} · ${escapeHtml(regionLabel(order.region))}</p>
      <button class="small-btn" data-order-detail="${order.id}">View Details</button>
    </div>
  `;
}

function savedDrawerHtml() {
  return `
    ${drawerHead("Saved Folders", "Save items into multiple folders.")}
    <div class="saved-list">
      ${state.savedFolders.map(f => `
        <div class="list-item">
          <h3>${escapeHtml(f.name)}</h3>
          <p style="color:var(--muted);">${f.itemIds.length} items</p>
          <div class="mini-tags">
            ${f.itemIds.map(id => state.items.find(i => i.id === id)).filter(Boolean).map(i => `<span class="tag">${escapeHtml(i.title)}</span>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function profileDrawerHtml() {
  return `
    ${drawerHead("Yuza Profile", "Edit nickname, password, bio, and view trust records. Username cannot be changed.")}
    ${profileFormHtml()}
  `;
}

function profileFormHtml() {
  return `
    <div class="profile-card panel">
      <div class="avatar">Y</div>
      <div class="form-grid" style="margin-top:16px;">
        <div class="form-field">
          <label>Username locked</label>
          <input class="input" value="${escapeHtml(state.user.username)}" disabled>
        </div>
        <div class="form-field">
          <label>Nickname</label>
          <input class="input" id="profileNickname" value="${escapeHtml(state.user.nickname)}">
        </div>
        <div class="form-field">
          <label>New password</label>
          <input class="input" id="profilePassword" value="${escapeHtml(state.user.password)}">
        </div>
        <div class="form-field full">
          <label>Bio</label>
          <textarea class="textarea" id="profileBio">${escapeHtml(state.user.bio || "")}</textarea>
        </div>
      </div>
      <div class="row-actions">
        <button class="primary-btn" id="saveProfile">Save Profile</button>
        <button class="ghost-btn" id="logoutBtn">Log out</button>
      </div>
    </div>
    <div class="section">
      <h3>Trust Record</h3>
      <div class="trust-grid">
        ${trustCard("Completed", state.user.trust.completed)}
        ${trustCard("Average Rating", state.user.trust.average)}
        ${trustCard("Late Cancellations", state.user.trust.lateCancellations)}
        ${trustCard("Unresolved", state.user.trust.unresolved)}
      </div>
    </div>
  `;
}

function themeDrawerHtml() {
  const board = currentBoardConfig();
  return `
    ${drawerHead("Board Theme", "Each main board has three soft color themes.")}
    <div class="chat-list">
      ${board.themeNames.map((name, idx) => `
        <button class="list-item" data-theme-index="${idx}" style="text-align:left;${idx === state.boardThemeIndex[state.currentBoard] ? "border-color:var(--accent);" : ""}">
          <strong>${escapeHtml(name)}</strong>
          <p style="color:var(--muted);margin:6px 0 0;">Apply this color set to ${board.short}.</p>
        </button>
      `).join("")}
    </div>
  `;
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
    $all("[data-filter-group]").forEach(group => {
      group.addEventListener("click", e => {
        const btn = e.target.closest("[data-filter-value]");
        if (!btn) return;
        btn.classList.toggle("active");
      });
    });

    $("#applyFilters").addEventListener("click", () => {
      $all("[data-filter-group]").forEach(group => {
        const key = group.dataset.filterGroup;
        state.filters[key] = $all(".filter-chip.active", group).map(btn => btn.dataset.filterValue);
      });
      state.filters.status = $("#filterStatus").value;
      if ($("#filterLookingFor")) state.filters.lookingFor = $("#filterLookingFor").value.trim();
      saveState();
      closeDrawer();
      render();
      toast("Filters applied.");
    });

    $("#clearFilters").addEventListener("click", () => {
      state.filters = defaultState().filters;
      saveState();
      closeDrawer();
      render();
      toast("Filters cleared.");
    });
  }

  if (type === "post") {
    const updateSpecific = () => renderBoardSpecificFields($("#postBoard").value);
    $("#postBoard").addEventListener("change", updateSpecific);
    updateSpecific();
    setupImagePreview("#postCover", "#coverPreview", false);
    setupImagePreview("#postDetails", "#detailPreview", true);
    $("#postForm").addEventListener("submit", handlePostSubmit);
  }

  if (type === "messages") {
    bindMessages();
  }

  if (type === "orders") {
    bindOrderButtons();
  }

  if (type === "saved") {}

  if (type === "profile") {
    bindProfileForm();
  }

  if (type === "theme") {
    $all("[data-theme-index]").forEach(btn => btn.addEventListener("click", () => {
      state.boardThemeIndex[state.currentBoard] = Number(btn.dataset.themeIndex);
      saveState();
      render();
      closeDrawer();
      toast(`Theme: ${currentBoardConfig().themeNames[state.boardThemeIndex[state.currentBoard]]}`);
    }));
  }
}

function renderBoardSpecificFields(board) {
  const box = $("#boardSpecificFields");
  if (!box) return;

  const conditionField = $("#conditionField");
  const conditionSelect = $("#postCondition");
  if (conditionField && conditionSelect) {
    if (board === "giveaway") {
      conditionField.classList.add("hidden");
      conditionSelect.required = false;
      conditionSelect.value = "";
    } else {
      conditionField.classList.remove("hidden");
      conditionSelect.required = true;
    }
  }

  if (board === "giveaway") {
    box.innerHTML = `
      <div class="form-grid">
        <div class="form-field">
          <label>Distribution address / location required</label>
          <input class="input" id="giveawayLocation" placeholder="Example: Union Square, New York" required>
        </div>
        <div class="form-field">
          <label>Distribution time / time range required</label>
          <input class="input" id="giveawayTime" placeholder="May 3, 12:00 PM–2:00 PM" required>
        </div>
        <div class="form-field">
          <label>Online claim</label>
          <select class="select" id="onlineClaim">
            <option value="off">Off</option>
            <option value="registration">Registration mode</option>
            <option value="approval">Approval mode</option>
          </select>
        </div>
        <div class="form-field">
          <label>Custom claim question demo</label>
          <input class="input" id="claimQuestion" placeholder="Example: Nickname">
        </div>
        <div class="form-field">
          <label>Question type</label>
          <select class="select" id="claimQuestionType">
            <option value="text">Text answer</option>
            <option value="image">Image upload</option>
          </select>
        </div>
        <div class="form-field">
          <label>Required?</label>
          <select class="select" id="claimQuestionRequired">
            <option value="true">Required</option>
            <option value="false">Optional</option>
          </select>
        </div>
      </div>
    `;
  } else if (board === "merchExchange") {
    box.innerHTML = `
      <div class="form-field full">
        <label>Looking for required</label>
        <input class="input" id="lookingFor" placeholder="Free text: what do you hope to exchange for?" required>
      </div>
      <div class="form-field full">
        <label>Detail image rule</label>
        <p style="color:var(--muted);line-height:1.5;margin:0;">
          In-stock merchandise should use real detail photos. Preorder merchandise should include a purchase record before the item arrives.
        </p>
      </div>
    `;
  } else {
    box.innerHTML = `
      <div class="form-field full">
        <label>Exchange preference</label>
        <input class="input" id="exchangePreference" placeholder="Example: looking for Phaidei acrylic items">
      </div>
    `;
  }
}

function setupImagePreview(inputSelector, previewSelector, multiple) {
  const input = $(inputSelector);
  const preview = $(previewSelector);
  if (!input || !preview) return;
  input.addEventListener("change", () => {
    preview.innerHTML = "";
    const files = Array.from(input.files || []);
    files.slice(0, multiple ? 8 : 1).forEach(file => {
      const url = URL.createObjectURL(file);
      const div = document.createElement("div");
      div.className = "preview-thumb";
      div.innerHTML = `<img src="${url}" alt="${escapeHtml(file.name)}">`;
      preview.appendChild(div);
    });
  });
}

function handlePostSubmit(e) {
  e.preventDefault();
  const board = $("#postBoard").value;
  const title = $("#postTitle").value.trim();
  const ip = $("#postIp").value.trim();
  const subject = $("#postSubject").value.trim();
  const itemType = $("#postType").value.trim();
  const origin = $("#postOrigin").value.trim();
  const condition = $("#postCondition").value;
  const qty = Number($("#postQuantity").value || 0);
  const locationNote = $("#postLocation").value.trim();
  const detailFiles = $("#postDetails").files;

  if (!title || !ip || !subject || !itemType || qty < 1) return toast("Please fill required fields.");
  if (board !== "giveaway" && !condition) return toast("Please select item condition for exchange posts.");
  if (!detailFiles || detailFiles.length < 1) return toast("At least one detail image is required.");
  // For prototype, cover image requirement can be satisfied by placeholder if not uploaded.
  // The interface still marks it as required.

  rememberTag("ip", ip);
  rememberTag("subject", subject);
  rememberTag("itemType", itemType);
  if (origin) rememberTag("origin", origin);

  const item = {
    id: `item_${Date.now()}`,
    board,
    region: structuredClone(state.currentRegion),
    title,
    owner: state.user.username,
    ip: [ip],
    subject: [subject],
    itemType: [itemType],
    origin: origin ? [origin] : [],
    condition,
    quantityTotal: qty,
    quantityAvailable: qty,
    quantityReserved: 0,
    status: board === "giveaway" ? "Open" : "Available",
    description: $("#postDescription").value.trim(),
    locationNote,
    cover: "",
    details: Array.from(detailFiles).map(f => f.name),
    likes: 0,
    saved: 0,
    private: $("#postVisibility").value === "private"
  };

  if (board === "giveaway") {
    item.locationNote = $("#giveawayLocation").value.trim() || locationNote;
    item.giveawayTime = $("#giveawayTime").value.trim();
    const mode = $("#onlineClaim").value;
    item.onlineClaimEnabled = mode !== "off";
    item.claimMode = mode === "approval" ? "Approval" : mode === "registration" ? "Registration" : "Off";
    const q = $("#claimQuestion").value.trim();
    item.claimFields = q ? [{ type: $("#claimQuestionType").value, label: q, required: $("#claimQuestionRequired").value === "true" }] : [];
  }

  if (board === "merchExchange") {
    item.lookingFor = $("#lookingFor").value.trim();
    item.detailRequirement = condition === "Preorder / not arrived yet"
      ? "Preorder item: detail image should include the purchase record before the item arrives."
      : "In-stock item: detail images should be real photos of the item and package.";
    if (condition === "Preorder / not arrived yet") item.status = "Preorder";
  }

  if (board === "freebieExchange") {
    item.exchangePreference = $("#exchangePreference").value.trim();
  }

  state.items.unshift(item);
  state.currentBoard = board;
  state.view = "board";
  addNotice(`${item.title} was submitted to ${boardConfig[board].name}.`, "item", true);
  saveState();
  closeDrawer();
  render();
  toast("Item submitted and displayed in the local board.");
}

function rememberTag(key, value) {
  if (!state.tags[key].includes(value)) {
    state.tags[key].push(value);
  }
}

function bindMessages() {
  const content = $("#messagesContent");

  $all("[data-message-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      $all("[data-message-tab]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      content.innerHTML = btn.dataset.messageTab === "notices" ? noticesHtml() : chatsHtml();
      bindMessages();
    });
  });

  $all("[data-open-chat]").forEach(btn => {
    btn.addEventListener("click", () => {
      const chat = state.chats.find(c => c.id === btn.dataset.openChat);
      if (chat) chat.unread = false;
      saveState();
      content.innerHTML = chatsHtml(btn.dataset.openChat);
      bindMessages();
    });
  });

  $("[data-send-chat]")?.addEventListener("click", (e) => {
    const chat = state.chats.find(c => c.id === e.target.dataset.sendChat);
    const input = $("#chatInput");
    if (!chat || !input.value.trim()) return;
    chat.messages.push({ from: "Yuza", text: input.value.trim() });
    chat.messages.push({ from: chat.partner, text: "Auto-reply: Thanks! I will check and reply soon." });
    saveState();
    content.innerHTML = chatsHtml(chat.id);
    bindMessages();
    toast("Message sent. Auto-reply displayed.");
  });

  $("[data-create-order-from-chat]")?.addEventListener("click", (e) => {
    openExchangeOrderForm(e.target.dataset.createOrderFromChat);
  });

  $("#markNoticesRead")?.addEventListener("click", () => {
    state.notices.forEach(n => n.unread = false);
    saveState();
    content.innerHTML = noticesHtml();
    bindMessages();
    updateTopbar();
    toast("Notices marked as read.");
  });
}

function bindOrderButtons(root = document) {
  $all("[data-order-detail]", root).forEach(btn => {
    btn.addEventListener("click", () => openOrderDetail(btn.dataset.orderDetail));
  });
}

function openOrderDetail(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  openModal(`
    <div class="modal-head">
      <div>
        <p class="kicker">${escapeHtml(order.type)}</p>
        <h2>Order ${escapeHtml(order.id)}</h2>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>

    <div class="detail-grid">
      <div class="panel" style="padding:16px;">
        <h3>Status</h3>
        <p><span class="status ${statusClass(order.status)}">${escapeHtml(order.status)}</span></p>
        <div class="info-list">
          ${infoRow("Partner", escapeHtml(order.partner))}
          ${infoRow("Region", escapeHtml(regionLabel(order.region)))}
          ${infoRow("Created", escapeHtml(order.createdAt))}
          ${infoRow("Updated", escapeHtml(order.updatedAt))}
          ${infoRow("Location", escapeHtml(order.meetingLocation))}
          ${infoRow("Time", escapeHtml(order.meetingTime))}
        </div>
      </div>
      <div class="panel" style="padding:16px;">
        <h3>Exchange Snapshot</h3>
        <p>${escapeHtml(order.yuzaItem)}</p>
        <p>${escapeHtml(order.partnerItem)}</p>
        <h3 style="margin-top:18px;">Completion Proof</h3>
        <p style="color:var(--muted);">Yuza proof: ${order.proofA ? "Uploaded" : "Waiting"} · Partner proof: ${order.proofB ? "Uploaded" : "Waiting"}</p>
        <div class="row-actions">
          <button class="ghost-btn" data-upload-proof="${order.id}">Upload Proof Photo</button>
          <button class="primary-btn" data-confirm-exchange="${order.id}">Confirm Exchange</button>
        </div>
      </div>
    </div>

    <section class="section">
      <h3>Order History</h3>
      <div class="timeline">
        ${order.timeline.map(t => `<div class="timeline-entry">${escapeHtml(t)}</div>`).join("")}
      </div>
    </section>

    <section class="section">
      <h3>Modify / Cancel Order</h3>
      <p style="color:var(--muted);">Any change needs partner approval. If rejected, the order keeps the original information.</p>
      <div class="row-actions">
        <button class="ghost-btn" data-request-change="${order.id}">Request Change</button>
        <button class="danger-btn" data-cancel-order="${order.id}">Request Cancel</button>
        <button class="ghost-btn" data-simulate-time="${order.id}">Simulate Time Passed</button>
      </div>
    </section>

    ${order.status === "Pending Review" ? reviewHtml(order.id) : ""}
  `, "wide");

  $("[data-upload-proof]")?.addEventListener("click", () => {
    order.proofA = true;
    order.timeline.push("Yuza uploaded proof photo.");
    order.updatedAt = new Date().toLocaleString();
    saveState();
    openOrderDetail(order.id);
    toast("Proof photo uploaded in prototype mode.");
  });

  $("[data-confirm-exchange]")?.addEventListener("click", () => {
    if (!order.proofA) return toast("Upload proof photo before confirming exchange.");
    order.proofB = true; // Simulate partner proof for demo.
    order.status = "Pending Review";
    order.completedAt = new Date().toLocaleString();
    order.timeline.push("Both users confirmed receipt. Order moved to Pending Review.");
    order.updatedAt = new Date().toLocaleString();
    saveState();
    openOrderDetail(order.id);
    toast("Exchange confirmed. Review is now required.");
  });

  $("[data-request-change]")?.addEventListener("click", () => {
    order.status = "Modification Pending";
    order.timeline.push("Yuza requested a change. Partner approval is required.");
    order.updatedAt = new Date().toLocaleString();
    saveState();
    openOrderDetail(order.id);
    toast("Change request sent.");
  });

  $("[data-cancel-order]")?.addEventListener("click", () => {
    releaseReservedItem(order);
    order.status = "Cancelled";
    order.timeline.push("Cancel request approved in prototype. Reserved quantity released.");
    order.updatedAt = new Date().toLocaleString();
    saveState();
    closeModal();
    render();
    toast("Order cancelled and inventory released.");
  });

  $("[data-simulate-time]")?.addEventListener("click", () => {
    order.status = "Unresolved / Failed";
    order.timeline.push("Exchange time passed. No proof uploaded after 24 hours. Unresolved record generated.");
    state.user.trust.unresolved += 1;
    addNotice(`Order ${order.id} has an unresolved issue. Please handle it.`, "order", true);
    saveState();
    openOrderDetail(order.id);
    toast("Unresolved record generated.");
  });

  $("#submitReview")?.addEventListener("click", () => {
    const rating = $("#reviewRating").value;
    const comment = $("#reviewComment").value.trim();
    order.status = "Completed";
    order.review = { rating, comment, time: new Date().toLocaleString() };
    order.timeline.push(`Yuza reviewed ${order.partner}: ${rating} stars.`);
    order.updatedAt = new Date().toLocaleString();
    state.user.trust.completed += 1;
    saveState();
    openOrderDetail(order.id);
    toast("Review submitted. Order completed.");
  });
}

function releaseReservedItem(order) {
  if (!order.linkedItemId) return;
  const item = state.items.find(i => i.id === order.linkedItemId);
  if (!item) return;
  item.quantityReserved = Math.max(0, (item.quantityReserved || 0) - 1);
  item.quantityAvailable += 1;
  if (item.quantityAvailable > 0 && item.status === "In Exchange") item.status = "Available";
}

function reviewHtml(orderId) {
  return `
    <section class="section panel" style="padding:16px;">
      <h3>Review Required</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Rating</label>
          <select class="select" id="reviewRating">
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
        </div>
        <div class="form-field full">
          <label>Comment</label>
          <textarea class="textarea" id="reviewComment" placeholder="Write a short review."></textarea>
        </div>
      </div>
      <button class="primary-btn" id="submitReview">Submit Review</button>
    </section>
  `;
}

function bindProfileForm() {
  $("#saveProfile")?.addEventListener("click", () => {
    state.user.nickname = $("#profileNickname").value.trim() || state.user.nickname;
    state.user.password = $("#profilePassword").value.trim() || state.user.password;
    state.user.bio = $("#profileBio").value.trim();
    saveState();
    updateTopbar();
    toast("Profile saved.");
  });

  $("#logoutBtn")?.addEventListener("click", () => {
    state.user.loggedIn = false;
    saveState();
    closeDrawer();
    render();
    toast("Logged out.");
  });
}

function renderProfile() {
  const myItems = state.items.filter(i => i.owner === state.user.username);
  $("#view").innerHTML = `
    <section class="profile-grid">
      <aside class="profile-card card">
        <div class="avatar">Y</div>
        <h2 style="margin-top:14px;">${escapeHtml(state.user.nickname)}</h2>
        <p style="color:var(--muted);">Username: ${escapeHtml(state.user.username)} · username cannot be changed.</p>
        <p style="line-height:1.55;color:var(--muted);">${escapeHtml(state.user.bio)}</p>
        <button class="primary-btn" data-open-drawer="profile">Edit Profile</button>
      </aside>
      <section>
        <div class="card profile-card">
          <h2>Trust Record</h2>
          <div class="trust-grid">
            ${trustCard("Completed", state.user.trust.completed)}
            ${trustCard("Average Rating", state.user.trust.average)}
            ${trustCard("Late Cancellations", state.user.trust.lateCancellations)}
            ${trustCard("Unresolved", state.user.trust.unresolved)}
            ${trustCard("No-show Reports", state.user.trust.noShowReports)}
            ${trustCard("Disputed Orders", state.user.trust.disputed)}
          </div>
        </div>
        <div class="section card profile-card">
          <h2>My Posted Items</h2>
          ${myItems.length ? `<div class="items-grid" style="margin-top:14px;">${myItems.map(renderItemCard).join("")}</div>` : `<p style="color:var(--muted);">No posts yet. Use Post Item to create one.</p>`}
        </div>
        <div class="section card profile-card">
          <h2>My Custom Tag Boards</h2>
          <div class="mini-tags">
            ${Object.keys(state.tagThemes).map(tag => `<span class="tag clickable" data-open-tag="${escapeHtml(tag)}">#${escapeHtml(tag)}</span>`).join("")}
          </div>
        </div>
      </section>
    </section>
  `;
  bindItemActions();
  $all("[data-open-drawer]").forEach(btn => btn.addEventListener("click", () => openDrawer(btn.dataset.openDrawer)));
}

function trustCard(label, value) {
  return `
    <div class="trust-card">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
    </div>
  `;
}

function renderOrders() {
  $("#view").innerHTML = `
    <section class="card profile-card">
      <div class="section-head">
        <div>
          <h1>Exchange Orders</h1>
          <p>Orders track item snapshots, meeting details, confirmation proof, reviews, and unresolved records.</p>
        </div>
      </div>
      ${ordersContentHtml()}
    </section>
  `;
  bindOrderButtons();
}

function renderSaved() {
  $("#view").innerHTML = `
    <section class="card profile-card">
      <div class="section-head">
        <div>
          <h1>Saved Folders</h1>
          <p>Users can organize saved items into multiple folders.</p>
        </div>
      </div>
      ${state.savedFolders.map(folder => `
        <section class="section">
          <h2>${escapeHtml(folder.name)}</h2>
          <div class="items-grid">
            ${folder.itemIds.map(id => state.items.find(i => i.id === id)).filter(Boolean).map(renderItemCard).join("") || `<div class="empty-state">No items in this folder.</div>`}
          </div>
        </section>
      `).join("")}
    </section>
  `;
  bindItemActions();
}

function openTagBoard(tag) {
  state.activeTag = tag;
  state.view = "tagBoard";
  saveState();
  render();
}

function renderTagBoard(tag) {
  const theme = state.tagThemes[tag] || "sparkle";
  const allMatches = state.items.filter(item => itemTags(item).includes(tag) && sameRegion(item.region));
  $("#view").innerHTML = `
    <section class="tag-board ${theme}">
      <div class="section-head">
        <div>
          <p class="kicker">Personal tag board</p>
          <h1>#${escapeHtml(tag)}</h1>
          <p style="color:var(--muted);line-height:1.55;">
            This board customization is private to Yuza. Other users cannot see or share this visual theme.
          </p>
        </div>
        <button class="primary-btn" id="customizeTag">Customize this board</button>
      </div>

      <div class="mini-tags">
        <span class="status">${escapeHtml(theme)} theme</span>
        <span class="tag">custom search border</span>
        <span class="tag">card stickers</span>
        <span class="tag">custom like / favorite icons</span>
      </div>

      <section class="section">
        ${allMatches.length ? `<div class="items-grid">${allMatches.map(renderItemCard).join("")}</div>` : `<div class="empty-state"><h3>No local items in this tag board.</h3><p>Try another local region.</p></div>`}
      </section>
    </section>
  `;
  bindItemActions();
  $("#customizeTag").addEventListener("click", () => openCustomizeTag(tag));
}

function openCustomizeTag(tag) {
  openModal(`
    <div class="modal-head">
      <div>
        <h2>Customize #${escapeHtml(tag)}</h2>
        <p style="color:var(--muted);margin:6px 0 0;">Choose a private theme pack for this character / group / CP board.</p>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>

    <div class="chat-list">
      ${["sparkle", "ribbon", "ticket"].map(theme => `
        <button class="list-item" data-tag-theme="${theme}" style="text-align:left;">
          <strong>${themeName(theme)}</strong>
          <p style="color:var(--muted);margin:6px 0 0;">Changes banner style, search border, card stickers, tag chips, and action icons.</p>
        </button>
      `).join("")}
    </div>
  `);

  $all("[data-tag-theme]").forEach(btn => btn.addEventListener("click", () => {
    state.tagThemes[tag] = btn.dataset.tagTheme;
    saveState();
    closeModal();
    renderTagBoard(tag);
    toast(`#${tag} theme updated.`);
  }));
}

function themeName(theme) {
  return {
    sparkle: "Sparkle Theme",
    ribbon: "Ribbon Theme",
    ticket: "Ticket Theme"
  }[theme] || theme;
}

function openModal(html, extraClass = "") {
  const modal = $("#modal");
  $("#modalBackdrop").classList.remove("hidden");
  modal.className = `modal ${extraClass}`;
  modal.innerHTML = html;
  modal.classList.remove("hidden");
  $all("[data-close-modal]", modal).forEach(btn => btn.addEventListener("click", closeModal));
}

function closeModal() {
  $("#modal").classList.add("hidden");
  $("#modalBackdrop").classList.add("hidden");
  $("#modal").innerHTML = "";
  $("#modal").className = "modal hidden";
}

function addNotice(text, type = "item", unread = true) {
  state.notices.unshift({ id: `notice_${Date.now()}`, text, type, unread });
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => el.classList.add("hidden"), 2400);
}

function handleLogin() {
  if (state.user.loggedIn) {
    openDrawer("profile");
    return;
  }
  openModal(`
    <div class="modal-head">
      <div>
        <h2>Log in</h2>
        <p style="color:var(--muted);margin:6px 0 0;">Prototype account: Yuza / 611225abc</p>
      </div>
      <button class="close-btn" data-close-modal>×</button>
    </div>
    <div class="form-grid">
      <div class="form-field full">
        <label>Username</label>
        <input class="input" id="loginUsername" value="Yuza">
      </div>
      <div class="form-field full">
        <label>Password</label>
        <input class="input" id="loginPassword" type="password" placeholder="Password">
      </div>
    </div>
    <div class="row-actions">
      <button class="primary-btn" id="submitLogin">Log in</button>
      <button class="ghost-btn" id="continueGuest">Continue as Guest</button>
    </div>
  `);

  $("#submitLogin").addEventListener("click", () => {
    const u = $("#loginUsername").value.trim();
    const p = $("#loginPassword").value.trim();
    if (u === state.user.username && p === state.user.password) {
      state.user.loggedIn = true;
      saveState();
      closeModal();
      render();
      toast("Logged in as Yuza.");
    } else {
      toast("Wrong username or password.");
    }
  });

  $("#continueGuest").addEventListener("click", () => {
    closeModal();
    toast("Continuing as guest. Posting and orders need Yuza login in this prototype.");
  });
}

function initEvents() {
  $("#drawerBackdrop").addEventListener("click", closeDrawer);
  $("#modalBackdrop").addEventListener("click", closeModal);

  $all(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
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
      if (action === "theme") cycleTheme();
    });
  });

  $("#advancedBtn").addEventListener("click", () => openDrawer("filter"));
  $("#regionPill").addEventListener("click", () => openDrawer("region"));
  $("#loginBtn").addEventListener("click", handleLogin);

  $("#globalSearch").value = state.normalSearch || "";
  $("#globalSearch").addEventListener("input", (e) => {
    state.normalSearch = e.target.value;
    if (state.view !== "board") state.view = "board";
    saveState();
    render();
    $("#globalSearch").focus();
    $("#globalSearch").value = state.normalSearch;
  });

  // Keyboard shortcut for resetting demo data during presentation.
  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.key.toLowerCase() === "r") {
      resetDemo();
    }
  });
}

initEvents();
render();
