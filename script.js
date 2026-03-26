const SAVE_KEY = "kitchen_master_deluxe_save_v4";

const state = {
  money: 80,
  rating: 100,
  combo: 0,
  time: 240,
  highScore: Number(localStorage.getItem("kmd_high_score") || 0),

  dirtyDishes: 0,
  messes: 0,

  paused: false,
  gameOver: false,
  soundOn: true,

  selectedRecipeId: null,

  activeCooking: {
    busy: false,
    recipeId: null,
    tableId: null,
    orderId: null,
    stage: null,
    running: false,
    prepSelected: {}
  },

  queue: [],
  orders: [],
  readyDishes: [],

  upgrades: {
    prepLevel: 0,
    cookLevel: 0,
    patienceLevel: 0
  }
};

const faces = ["🧑", "👩", "👨", "👵", "🧔", "👧", "🧑‍🦱", "👨‍🦰", "👩‍🦰", "😋"];
const names = ["小林", "阿美", "老周", "小吴", "阿强", "安娜", "可可", "大壮", "阿星", "小雨"];

const ingredientMeta = {
  rice: { name: "米饭", icon: "🍚", cost: 3 },
  egg: { name: "鸡蛋", icon: "🥚", cost: 2 },
  scallion: { name: "葱花", icon: "🌿", cost: 2 },
  tomato: { name: "番茄", icon: "🍅", cost: 3 },
  noodle: { name: "面条", icon: "🍝", cost: 4 },
  meat: { name: "牛肉", icon: "🥩", cost: 8 },
  potato: { name: "土豆", icon: "🥔", cost: 3 },
  lettuce: { name: "生菜", icon: "🥬", cost: 3 },
  onion: { name: "洋葱", icon: "🧅", cost: 3 },
  bread: { name: "面包", icon: "🍞", cost: 4 },
  shrimp: { name: "虾仁", icon: "🦐", cost: 8 },
  mushroom: { name: "蘑菇", icon: "🍄", cost: 4 },

  cheese: { name: "奶酪", icon: "🧀", cost: 6 },
  durian: { name: "榴莲", icon: "🟡", cost: 10 },
  ham: { name: "火腿", icon: "🍖", cost: 6 },
  flour: { name: "面团", icon: "🥯", cost: 5 },
  strawberry: { name: "草莓", icon: "🍓", cost: 5 },
  chocolate: { name: "巧克力", icon: "🍫", cost: 5 },
  vanilla: { name: "香草", icon: "🌼", cost: 5 },
  milk: { name: "牛奶", icon: "🥛", cost: 4 }
};

const inventory = {
  rice: 6,
  egg: 8,
  scallion: 6,
  tomato: 7,
  noodle: 5,
  meat: 7,
  potato: 5,
  lettuce: 6,
  onion: 5,
  bread: 5,
  shrimp: 4,
  mushroom: 4,

  cheese: 4,
  durian: 3,
  ham: 4,
  flour: 5,
  strawberry: 4,
  chocolate: 4,
  vanilla: 4,
  milk: 6
};

const recipes = [
  {
    id: "fried_rice",
    name: "黄金蛋炒饭",
    icon: "🍚",
    desc: "粒粒分明，锅气十足。",
    price: 26,
    prepTime: 1700,
    cookTime: 2500,
    plateTime: 1100,
    ingredients: { rice: 1, egg: 1, scallion: 1 }
  },
  {
    id: "tomato_egg",
    name: "番茄炒蛋",
    icon: "🍅",
    desc: "酸甜开胃，家常经典。",
    price: 28,
    prepTime: 1600,
    cookTime: 2300,
    plateTime: 1000,
    ingredients: { tomato: 2, egg: 2 }
  },
  {
    id: "ramen",
    name: "豚骨拉面",
    icon: "🍜",
    desc: "热气腾腾，浓香四溢。",
    price: 38,
    prepTime: 1700,
    cookTime: 3200,
    plateTime: 1300,
    ingredients: { noodle: 1, meat: 1, egg: 1, scallion: 1 }
  },
  {
    id: "steak",
    name: "香煎牛排",
    icon: "🥩",
    desc: "外焦里嫩，肉汁丰沛。",
    price: 46,
    prepTime: 1900,
    cookTime: 3400,
    plateTime: 1400,
    ingredients: { meat: 2, potato: 1, mushroom: 1 }
  },
  {
    id: "salad",
    name: "缤纷沙拉",
    icon: "🥗",
    desc: "清爽轻盈，颜值在线。",
    price: 22,
    prepTime: 1300,
    cookTime: 1300,
    plateTime: 900,
    ingredients: { lettuce: 2, tomato: 1, onion: 1 }
  },
  {
    id: "burger",
    name: "招牌汉堡",
    icon: "🍔",
    desc: "层次丰富，香气十足。",
    price: 34,
    prepTime: 1600,
    cookTime: 2500,
    plateTime: 1100,
    ingredients: { bread: 1, meat: 1, lettuce: 1, tomato: 1 }
  },
  {
    id: "shrimp_pasta",
    name: "奶油虾仁意面",
    icon: "🍝",
    desc: "鲜香浓郁，口感顺滑。",
    price: 42,
    prepTime: 1800,
    cookTime: 2900,
    plateTime: 1300,
    ingredients: { noodle: 1, shrimp: 2, mushroom: 1 }
  },
  {
    id: "mushroom_omelet",
    name: "蘑菇蛋卷",
    icon: "🍳",
    desc: "软嫩香滑，早餐王者。",
    price: 30,
    prepTime: 1500,
    cookTime: 2100,
    plateTime: 1000,
    ingredients: { egg: 2, mushroom: 1, onion: 1 }
  },

  {
    id: "durian_pizza",
    name: "榴莲披萨",
    icon: "🍕",
    desc: "香甜浓郁，披萨界的争议王者。",
    price: 52,
    prepTime: 1900,
    cookTime: 3000,
    plateTime: 1200,
    ingredients: { flour: 1, cheese: 1, durian: 2 }
  },
  {
    id: "ham_pizza",
    name: "火腿披萨",
    icon: "🍕",
    desc: "经典口味，奶香与肉香交织。",
    price: 48,
    prepTime: 1800,
    cookTime: 2900,
    plateTime: 1200,
    ingredients: { flour: 1, cheese: 1, ham: 2, tomato: 1 }
  },
  {
    id: "strawberry_icecream",
    name: "草莓冰激凌",
    icon: "🍨",
    desc: "清甜绵密，少女心十足。",
    price: 24,
    prepTime: 1200,
    cookTime: 900,
    plateTime: 800,
    ingredients: { milk: 1, strawberry: 2 }
  },
  {
    id: "chocolate_icecream",
    name: "巧克力冰激凌",
    icon: "🍦",
    desc: "醇厚香浓，入口即化。",
    price: 26,
    prepTime: 1200,
    cookTime: 900,
    plateTime: 800,
    ingredients: { milk: 1, chocolate: 2 }
  },
  {
    id: "vanilla_icecream",
    name: "香草冰激凌",
    icon: "🍦",
    desc: "细腻柔和，经典百搭。",
    price: 25,
    prepTime: 1100,
    cookTime: 900,
    plateTime: 800,
    ingredients: { milk: 1, vanilla: 2 }
  }
];

const tables = [
  { id: 1, status: "empty", customer: null, orderId: null, dirty: false, eatTimer: null },
  { id: 2, status: "empty", customer: null, orderId: null, dirty: false, eatTimer: null },
  { id: 3, status: "empty", customer: null, orderId: null, dirty: false, eatTimer: null },
  { id: 4, status: "empty", customer: null, orderId: null, dirty: false, eatTimer: null }
];

const $ = (id) => document.getElementById(id);
const els = {
  money: $("money"),
  rating: $("rating"),
  combo: $("combo"),
  time: $("time"),
  highScore: $("highScore"),

  tables: $("tables"),
  queue: $("queue"),
  dirtyDishes: $("dirtyDishes"),
  messes: $("messes"),
  ingredients: $("ingredients"),
  menu: $("menu"),
  orders: $("orders"),
  readyList: $("readyList"),
  upgrades: $("upgrades"),
  log: $("log"),

  spawnBtn: $("spawnBtn"),
  washBtn: $("washBtn"),
  cleanBtn: $("cleanBtn"),
  prepBtn: $("prepBtn"),
  cookBtn: $("cookBtn"),
  plateBtn: $("plateBtn"),
  startCookBtn: $("startCookBtn"),

  prepBar: $("prepBar"),
  cookBar: $("cookBar"),
  plateBar: $("plateBar"),

  prepState: $("prepState"),
  cookState: $("cookState"),
  plateState: $("plateState"),

  currentRecipe: $("currentRecipe"),
  currentTable: $("currentTable"),
  cookHint: $("cookHint"),

  fxLayer: $("fxLayer"),

  pauseBtn: $("pauseBtn"),
  soundBtn: $("soundBtn"),
  saveBtn: $("saveBtn"),

  gameOver: $("gameOver"),
  finalMoney: $("finalMoney"),
  finalRating: $("finalRating"),
  finalHighScore: $("finalHighScore"),
  restartBtn: $("restartBtn"),
  clearSaveBtn: $("clearSaveBtn")
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function getRecipe(id) {
  return recipes.find(r => r.id === id);
}
function canAct() {
  return !state.gameOver && !state.paused;
}
function log(msg) {
  const div = document.createElement("div");
  div.className = "log-item";
  div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  els.log.prepend(div);
}
function beep(type = "ok") {
  if (!state.soundOn) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type === "bad" ? "sawtooth" : type === "serve" ? "triangle" : "sine";
    osc.frequency.value = type === "bad" ? 180 : type === "serve" ? 560 : 420;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {}
}

function updateTop() {
  els.money.textContent = state.money;
  els.rating.textContent = Math.max(0, Math.round(state.rating));
  els.combo.textContent = state.combo;
  els.time.textContent = state.time;
  els.highScore.textContent = state.highScore;
  els.dirtyDishes.textContent = state.dirtyDishes;
  els.messes.textContent = state.messes;
  els.soundBtn.textContent = `音效：${state.soundOn ? "开" : "关"}`;
  els.pauseBtn.textContent = state.paused ? "继续" : "暂停";
}

function setKitchenStageState(prep, cook, plate) {
  els.prepState.textContent = prep;
  els.cookState.textContent = cook;
  els.plateState.textContent = plate;
}

function refreshKitchenButtons() {
  const active = state.activeCooking;
  els.startCookBtn.disabled = state.paused || state.gameOver || active.busy;
  els.prepBtn.disabled = !(active.busy && active.stage === "prep" && !active.running && !state.paused && !state.gameOver);
  els.cookBtn.disabled = !(active.busy && active.stage === "cook" && !active.running && !state.paused && !state.gameOver);
  els.plateBtn.disabled = !(active.busy && active.stage === "plate" && !active.running && !state.paused && !state.gameOver);
}

function hasIngredients(recipe) {
  return Object.entries(recipe.ingredients).every(([k, v]) => inventory[k] >= v);
}
function consumeIngredients(recipe) {
  Object.entries(recipe.ingredients).forEach(([k, v]) => inventory[k] -= v);
}

function isPrepPickingMode() {
  return state.activeCooking.busy && state.activeCooking.stage === "prep" && state.activeCooking.running;
}

function renderIngredients() {
  els.ingredients.innerHTML = "";
  const activeRecipe = state.activeCooking.recipeId ? getRecipe(state.activeCooking.recipeId) : null;
  const picking = isPrepPickingMode();

  Object.entries(inventory).forEach(([key, amount]) => {
    const meta = ingredientMeta[key];
    const required = activeRecipe?.ingredients?.[key] || 0;
    const selected = state.activeCooking.prepSelected[key] || 0;
    const done = required > 0 && selected >= required;
    const clickable = picking;

    const div = document.createElement("div");
    div.className = `ingredient ${clickable ? "ingredient-clickable" : ""} ${required > 0 ? "ingredient-required" : ""} ${done ? "ingredient-done" : ""}`;

    let prepInfo = "";
    if (picking && required > 0) {
      prepInfo = `<div class="small prep-need">备料：${selected}/${required}</div>`;
    } else if (required > 0) {
      prepInfo = `<div class="small prep-need">需要：${required}</div>`;
    }

    div.innerHTML = `
      <div class="icon">${meta.icon}</div>
      <b>${meta.name}</b>
      <div class="small">库存：${amount}</div>
      <div class="small">补货价：💰${meta.cost}</div>
      ${prepInfo}
    `;

    if (clickable) {
      div.addEventListener("click", () => handlePrepIngredientClick(key));
    }

    els.ingredients.appendChild(div);
  });
}

function handlePrepIngredientClick(key) {
  if (!canAct()) return;
  if (!isPrepPickingMode()) return;

  const recipe = getRecipe(state.activeCooking.recipeId);
  if (!recipe) return;

  const need = recipe.ingredients[key] || 0;

  if (need <= 0) {
    log(`${ingredientMeta[key].name} 不是 ${recipe.name} 所需食材。`);
    beep("bad");
    return;
  }

  const current = state.activeCooking.prepSelected[key] || 0;
  if (current >= need) {
    log(`${ingredientMeta[key].name} 已经选够了。`);
    return;
  }

  state.activeCooking.prepSelected[key] = current + 1;
  beep("ok");
  log(`备料完成一项：${ingredientMeta[key].name} ${state.activeCooking.prepSelected[key]}/${need}`);
  renderIngredients();
  updatePrepProgressBySelection();
}

function updatePrepProgressBySelection() {
  const recipe = getRecipe(state.activeCooking.recipeId);
  if (!recipe) return;

  const totalNeed = Object.values(recipe.ingredients).reduce((a, b) => a + b, 0);
  const totalSelected = Object.entries(recipe.ingredients).reduce((sum, [key, need]) => {
    return sum + Math.min(need, state.activeCooking.prepSelected[key] || 0);
  }, 0);

  const percent = totalNeed > 0 ? (totalSelected / totalNeed) * 100 : 0;
  els.prepBar.style.width = `${percent}%`;

  if (totalSelected >= totalNeed) {
    completePrep();
  }
}

function completePrep() {
  const recipe = getRecipe(state.activeCooking.recipeId);
  state.activeCooking.running = false;
  state.activeCooking.stage = "cook";
  els.prepBar.style.width = "100%";
  log(`${recipe.name} 备料完成，请点击“开始烹饪”。`);
  updateCookStatus();
  renderIngredients();
  saveGame();
}

function renderMenu() {
  els.menu.innerHTML = "";
  recipes.forEach(recipe => {
    const selected = state.selectedRecipeId === recipe.id;
    const pendingCount = state.orders.filter(o => o.recipeId === recipe.id && (o.status === "pending" || o.status === "cooking")).length;
    const req = Object.entries(recipe.ingredients)
      .map(([k, v]) => `${ingredientMeta[k].icon}${ingredientMeta[k].name}x${v}`)
      .join(" / ");

    const div = document.createElement("div");
    div.className = `card menu-item ${selected ? "selected" : ""}`;
    div.innerHTML = `
      <div class="menu-icon">${recipe.icon}</div>
      <div class="row"><b>${recipe.name}</b><span>💰${recipe.price}</span></div>
      <div class="small">${recipe.desc}</div>
      <div class="small">需要：${req}</div>
      <div class="small">相关订单：${pendingCount}</div>
      <button class="btn btn-gold">选择制作</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      state.selectedRecipeId = recipe.id;
      renderMenu();
      const order = state.orders.find(o => o.recipeId === recipe.id && o.status === "pending");
      els.cookHint.textContent = order ? `已锁定 ${recipe.name}，建议给 ${order.tableId} 号桌` : `已选择 ${recipe.name}，但暂无待制作订单`;
      log(`已选择菜品：${recipe.name}`);
    });
    els.menu.appendChild(div);
  });
}

function renderTables() {
  els.tables.innerHTML = "";
  tables.forEach(table => {
    let statusText = "空桌";
    let statusClass = "s-empty";
    let body = `<div class="customer-avatar">🪑</div><div class="subtle">等待安排客人</div>`;

    if (table.status === "waiting" && table.customer) {
      statusText = "等待上菜";
      statusClass = "s-waiting";
      const recipe = getRecipe(table.customer.recipeId);
      body = `
        <div class="customer-avatar">${table.customer.face}</div>
        <div><b>${table.customer.name}</b></div>
        <div class="subtle">想吃：${recipe.name}</div>
        <div class="patience-wrap">
          <div class="patience" style="width:${Math.max(0, table.customer.patience)}%"></div>
        </div>
      `;
    } else if (table.status === "eating" && table.customer) {
      statusText = "正在用餐";
      statusClass = "s-eating";
      const recipe = getRecipe(table.customer.recipeId);
      body = `
        <div class="customer-avatar">😋</div>
        <div><b>${table.customer.name}</b></div>
        <div class="subtle">正在享用：${recipe.name}</div>
      `;
    } else if (table.status === "dirty") {
      statusText = "待清理";
      statusClass = "s-dirty";
      body = `
        <div class="customer-avatar">🍽️</div>
        <div><b>桌面脏乱</b></div>
        <div class="subtle">需要擦桌和整理</div>
      `;
    }

    const div = document.createElement("div");
    div.className = "table-card";
    div.innerHTML = `
      <div class="table-top">
        <div class="table-no">桌号 #${table.id}</div>
        <div class="status-pill ${statusClass}">${statusText}</div>
      </div>
      ${body}
    `;
    els.tables.appendChild(div);
  });
}

function renderQueue() {
  els.queue.innerHTML = "";
  if (state.queue.length === 0) {
    els.queue.innerHTML = `<div class="card">当前没有排队顾客。</div>`;
    return;
  }
  state.queue.forEach(customer => {
    const recipe = getRecipe(customer.recipeId);
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="row">
        <div style="font-size:30px">${customer.face}</div>
        <div><b>${customer.name}</b></div>
      </div>
      <div class="small">想吃：${recipe.icon} ${recipe.name}</div>
      <button class="btn btn-primary">安排入座</button>
    `;
    div.querySelector("button").addEventListener("click", () => seatCustomer(customer.id));
    els.queue.appendChild(div);
  });
}

function renderOrders() {
  els.orders.innerHTML = "";
  const active = state.orders.filter(o => ["pending", "cooking"].includes(o.status));
  if (active.length === 0) {
    els.orders.innerHTML = `<div class="card">暂无订单。</div>`;
    return;
  }
  active.forEach(order => {
    const recipe = getRecipe(order.recipeId);
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="row"><b>${recipe.icon} ${recipe.name}</b><span>${order.status === "pending" ? "待制作" : "制作中"}</span></div>
      <div class="small">桌号：${order.tableId}</div>
      <div class="small">顾客：${order.customerName}</div>
    `;
    els.orders.appendChild(div);
  });
}

function renderReady() {
  els.readyList.innerHTML = "";
  if (state.readyDishes.length === 0) {
    els.readyList.innerHTML = `<div class="card">暂无待上菜品。</div>`;
    return;
  }
  state.readyDishes.forEach(dish => {
    const recipe = getRecipe(dish.recipeId);
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="row"><b>${recipe.icon} ${recipe.name}</b><span>桌号 #${dish.tableId}</span></div>
      <div class="small">已完成，尽快送餐</div>
      <button class="btn btn-primary">上菜</button>
    `;
    div.querySelector("button").addEventListener("click", () => serveDish(dish.id));
    els.readyList.appendChild(div);
  });
}

function renderUpgrades() {
  els.upgrades.innerHTML = "";
  const list = [
    {
      name: "备料效率",
      icon: "🔪",
      level: state.upgrades.prepLevel,
      desc: "每级备料体验更流畅",
      cost: 40 + state.upgrades.prepLevel * 30,
      buy() {
        if (state.money < this.cost) return log("金币不足，无法升级备料效率。");
        state.money -= this.cost;
        state.upgrades.prepLevel++;
        log("升级成功：备料效率提升。");
        updateAll();
        saveGame();
      }
    },
    {
      name: "炉灶火候",
      icon: "🔥",
      level: state.upgrades.cookLevel,
      desc: "每级烹饪速度提升 12%",
      cost: 50 + state.upgrades.cookLevel * 35,
      buy() {
        if (state.money < this.cost) return log("金币不足，无法升级炉灶火候。");
        state.money -= this.cost;
        state.upgrades.cookLevel++;
        log("升级成功：烹饪效率提升。");
        updateAll();
        saveGame();
      }
    },
    {
      name: "大厅服务",
      icon: "🪑",
      level: state.upgrades.patienceLevel,
      desc: "每级顾客初始耐心 +10",
      cost: 45 + state.upgrades.patienceLevel * 30,
      buy() {
        if (state.money < this.cost) return log("金币不足，无法升级大厅服务。");
        state.money -= this.cost;
        state.upgrades.patienceLevel++;
        log("升级成功：顾客更有耐心。");
        updateAll();
        saveGame();
      }
    }
  ];

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="row"><b>${item.icon} ${item.name}</b><span>Lv.${item.level}</span></div>
      <div class="small">${item.desc}</div>
      <div class="row" style="margin-top:8px">
        <span class="small">花费：💰${item.cost}</span>
        <button class="btn btn-gold">升级</button>
      </div>
    `;
    div.querySelector("button").addEventListener("click", () => item.buy());
    els.upgrades.appendChild(div);
  });
}

function updateCookStatus() {
  const recipe = state.activeCooking.recipeId ? getRecipe(state.activeCooking.recipeId) : null;
  els.currentRecipe.textContent = recipe ? `${recipe.icon} ${recipe.name}` : "无";
  els.currentTable.textContent = state.activeCooking.tableId || "-";

  if (!state.activeCooking.busy) {
    setKitchenStageState("空闲", "空闲", "空闲");
    els.cookHint.textContent = "请选择订单对应菜品";
  } else if (state.activeCooking.stage === "prep") {
    if (state.activeCooking.running) {
      setKitchenStageState("选材中", "空闲", "空闲");
      els.cookHint.textContent = "请在食材仓库中把这道菜需要的材料全部点出来";
    } else {
      setKitchenStageState("待执行", "空闲", "空闲");
      els.cookHint.textContent = "点击“进行备料”进入选材";
    }
  } else if (state.activeCooking.stage === "cook") {
    setKitchenStageState("完成", state.activeCooking.running ? "进行中" : "待执行", "空闲");
    els.cookHint.textContent = "备料完成，点击开始烹饪";
  } else if (state.activeCooking.stage === "plate") {
    setKitchenStageState("完成", "完成", state.activeCooking.running ? "进行中" : "待执行");
    els.cookHint.textContent = "烹饪完成，点击精致装盘";
  }

  refreshKitchenButtons();
}

function updateAll() {
  updateTop();
  renderTables();
  renderQueue();
  renderIngredients();
  renderMenu();
  renderOrders();
  renderReady();
  renderUpgrades();
  updateCookStatus();
}

function spawnCustomer() {
  if (!canAct()) return;
  const recipe = pick(recipes);
  const customer = {
    id: uid("cus"),
    name: pick(names) + rand(10, 99),
    face: pick(faces),
    recipeId: recipe.id,
    patience: 100 + state.upgrades.patienceLevel * 10
  };
  state.queue.push(customer);
  log(`${customer.name} 来了，想点 ${recipe.name}。`);
  renderQueue();
  saveGame();
}

function seatCustomer(customerId) {
  if (!canAct()) return;
  const index = state.queue.findIndex(c => c.id === customerId);
  if (index === -1) return;

  const table = tables.find(t => t.status === "empty" && !t.dirty);
  if (!table) {
    state.rating -= 2;
    state.combo = 0;
    updateTop();
    log("没有空桌，顾客暂时无法入座。");
    return;
  }

  const customer = state.queue.splice(index, 1)[0];
  table.status = "waiting";
  table.customer = customer;
  table.orderId = uid("ord");

  state.orders.push({
    id: table.orderId,
    tableId: table.id,
    customerName: customer.name,
    recipeId: customer.recipeId,
    status: "pending",
    fulfilled: false
  });

  log(`${customer.name} 已在 ${table.id} 号桌入座并完成点餐。`);
  updateAll();
  saveGame();
}

function runProgress(barEl, duration, onDone) {
  let elapsed = 0;
  const step = 30;
  barEl.style.width = "0%";

  const timer = setInterval(() => {
    if (state.gameOver) {
      clearInterval(timer);
      return;
    }
    if (state.paused) return;

    elapsed += step;
    const p = Math.min(elapsed / duration, 1);
    barEl.style.width = `${p * 100}%`;

    if (p >= 1) {
      clearInterval(timer);
      onDone();
    }
  }, step);

  return timer;
}

function fxBurst() {
  const icons = ["🔥", "✨", "💨", "🍳", "🍨", "🍕"];
  for (let i = 0; i < 8; i++) {
    const f = document.createElement("div");
    f.className = "fx";
    f.textContent = pick(icons);
    f.style.left = `${rand(8, 84)}%`;
    f.style.bottom = `${rand(0, 18)}px`;
    f.style.fontSize = `${rand(16, 26)}px`;
    f.style.animationDuration = `${(0.8 + Math.random() * 0.6).toFixed(2)}s`;
    els.fxLayer.appendChild(f);
    setTimeout(() => f.remove(), 1400);
  }
}

function resetCooking(clearSelection = true) {
  state.activeCooking = {
    busy: false,
    recipeId: null,
    tableId: null,
    orderId: null,
    stage: null,
    running: false,
    prepSelected: {}
  };
  els.prepBar.style.width = "0%";
  els.cookBar.style.width = "0%";
  els.plateBar.style.width = "0%";
  if (clearSelection) state.selectedRecipeId = null;
  updateCookStatus();
  renderMenu();
  renderIngredients();
}

function startCookingFlow() {
  if (!canAct()) return;
  if (state.activeCooking.busy) {
    log("已有菜品在制作中。");
    return;
  }
  if (!state.selectedRecipeId) {
    log("请先在菜单中选择菜品。");
    return;
  }

  const recipe = getRecipe(state.selectedRecipeId);
  const order = state.orders.find(o => o.recipeId === recipe.id && o.status === "pending" && !o.fulfilled);
  if (!order) {
    log("当前没有该菜品对应的待制作订单。");
    return;
  }

  const table = tables.find(t => t.id === order.tableId);
  if (!table || table.status !== "waiting" || !table.customer) {
    log("对应顾客已不在等待状态，无法开始该订单。");
    return;
  }

  if (!hasIngredients(recipe)) {
    state.rating -= 3;
    updateTop();
    log(`食材不足，无法制作 ${recipe.name}。`);
    return;
  }

  consumeIngredients(recipe);
  order.status = "cooking";

  state.activeCooking.busy = true;
  state.activeCooking.recipeId = recipe.id;
  state.activeCooking.tableId = order.tableId;
  state.activeCooking.orderId = order.id;
  state.activeCooking.stage = "prep";
  state.activeCooking.running = false;
  state.activeCooking.prepSelected = {};

  els.prepBar.style.width = "0%";
  els.cookBar.style.width = "0%";
  els.plateBar.style.width = "0%";

  log(`开始制作 ${recipe.name}，对应 ${order.tableId} 号桌。请点击“进行备料”后逐个选择食材。`);
  updateAll();
  saveGame();
}

function getCookDuration(recipe) {
  return Math.max(800, Math.floor(recipe.cookTime * (1 - state.upgrades.cookLevel * 0.12)));
}
function getPlateDuration(recipe) {
  return recipe.plateTime;
}

function doPrep() {
  if (!canAct()) return;
  if (!state.activeCooking.busy || state.activeCooking.stage !== "prep" || state.activeCooking.running) {
    log("当前不能进行备料。");
    return;
  }

  const recipe = getRecipe(state.activeCooking.recipeId);
  if (!recipe) {
    log("未找到当前菜谱，备料失败。");
    resetCooking();
    return;
  }

  state.activeCooking.running = true;
  state.activeCooking.prepSelected = {};
  els.prepBar.style.width = "0%";
  log(`开始备料：${recipe.name}。请点击所需食材。`);
  updateCookStatus();
  renderIngredients();
}

function doCook() {
  if (!canAct()) return;
  if (!state.activeCooking.busy || state.activeCooking.stage !== "cook" || state.activeCooking.running) {
    log("当前不能开始烹饪。");
    return;
  }

  const recipe = getRecipe(state.activeCooking.recipeId);
  if (!recipe) {
    log("未找到当前菜谱，烹饪失败。");
    resetCooking();
    return;
  }

  state.activeCooking.running = true;
  updateCookStatus();
  log(`开始烹饪：${recipe.name}`);

  const fxTimer = setInterval(() => {
    if (!state.paused && !state.gameOver) fxBurst();
  }, 320);

  runProgress(els.cookBar, getCookDuration(recipe), () => {
    clearInterval(fxTimer);
    state.activeCooking.running = false;
    state.activeCooking.stage = "plate";
    updateCookStatus();
    log(`${recipe.name} 烹饪完成，请点击“精致装盘”。`);
    saveGame();
  });
}

function doPlate() {
  if (!canAct()) return;
  if (!state.activeCooking.busy || state.activeCooking.stage !== "plate" || state.activeCooking.running) {
    log("当前不能进行装盘。");
    return;
  }

  const recipe = getRecipe(state.activeCooking.recipeId);
  const order = state.orders.find(o => o.id === state.activeCooking.orderId);

  if (!recipe) {
    log("未找到当前菜谱，装盘失败。");
    resetCooking();
    return;
  }

  state.activeCooking.running = true;
  updateCookStatus();
  log(`开始装盘：${recipe.name}`);

  runProgress(els.plateBar, getPlateDuration(recipe), () => {
    state.activeCooking.running = false;

    if (!order || order.fulfilled) {
      log("订单已失效或已完成，装盘结果作废。");
      resetCooking();
      renderOrders();
      renderReady();
      saveGame();
      return;
    }

    const table = tables.find(t => t.id === state.activeCooking.tableId);
    const validWaitingTable = table && (table.status === "waiting" || table.status === "eating");

    if (!validWaitingTable) {
      order.status = "failed";
      order.fulfilled = true;
      state.combo = 0;
      state.rating -= 4;
      updateTop();
      log(`${recipe.name} 虽已做好，但顾客已离开，造成损耗。`);
      resetCooking();
      updateAll();
      saveGame();
      return;
    }

    state.readyDishes.push({
      id: uid("dish"),
      recipeId: recipe.id,
      tableId: state.activeCooking.tableId,
      orderId: state.activeCooking.orderId,
      served: false
    });

    log(`${recipe.name} 已装盘完成，等待上菜。`);
    resetCooking(false);
    renderReady();
    renderOrders();
    saveGame();
  });
}

function serveDish(dishId) {
  if (!canAct()) return;
  const idx = state.readyDishes.findIndex(d => d.id === dishId);
  if (idx === -1) return;

  const dish = state.readyDishes[idx];
  const order = state.orders.find(o => o.id === dish.orderId);
  const table = tables.find(t => t.id === dish.tableId);
  const recipe = getRecipe(dish.recipeId);

  if (!order || order.fulfilled || !table || table.status !== "waiting" || !table.customer) {
    state.readyDishes.splice(idx, 1);
    log("上菜失败：该订单或桌位状态已失效，菜品已移除。");
    renderReady();
    saveGame();
    return;
  }

  order.status = "served";
  order.fulfilled = true;
  dish.served = true;
  state.readyDishes.splice(idx, 1);

  const patienceBonus = Math.max(0, Math.round(table.customer.patience / 12));
  const comboBonus = state.combo;
  const income = recipe.price + patienceBonus + comboBonus;

  state.money += income;
  state.combo += 1;
  state.rating = Math.min(100, state.rating + 1);

  const customerName = table.customer.name;
  table.status = "eating";

  log(`已向 ${table.id} 号桌上菜：${recipe.name}，获得 ${income} 金币。`);

  if (table.eatTimer) clearTimeout(table.eatTimer);
  table.eatTimer = setTimeout(() => {
    if (state.gameOver) return;
    table.status = "dirty";
    table.dirty = true;
    table.customer = null;
    table.orderId = null;
    state.dirtyDishes += 1;
    state.messes += 1;
    renderTables();
    updateTop();
    log(`${customerName} 用餐结束离开，${table.id} 号桌留下脏盘与污渍。`);
    saveGame();
  }, rand(4500, 6500));

  updateAll();
  saveGame();
}

function washDishes() {
  if (!canAct()) return;
  if (state.dirtyDishes <= 0) {
    log("没有脏盘可洗。");
    return;
  }
  const washed = Math.min(2, state.dirtyDishes);
  state.dirtyDishes -= washed;
  state.money += washed * 2;
  state.rating = Math.min(100, state.rating + 0.3);
  updateTop();
  log(`你清洗了 ${washed} 组碗盘。`);
  saveGame();
}

function cleanMesses() {
  if (!canAct()) return;
  if (state.messes <= 0) {
    log("当前没有污渍需要清理。");
    return;
  }
  const dirtyTable = tables.find(t => t.status === "dirty");
  if (!dirtyTable) {
    log("没有待擦拭桌位。");
    return;
  }

  dirtyTable.status = "empty";
  dirtyTable.dirty = false;
  state.messes -= 1;
  state.money += 3;
  state.rating = Math.min(100, state.rating + 0.5);

  renderTables();
  updateTop();
  log(`你完成了 ${dirtyTable.id} 号桌的擦桌与整理。`);
  saveGame();
}

function customerTick() {
  if (!canAct()) return;
  tables.forEach(table => {
    if (table.status === "waiting" && table.customer) {
      table.customer.patience -= rand(2, 5);
      if (table.customer.patience <= 0) {
        const leavingName = table.customer.name;
        const order = state.orders.find(o => o.id === table.orderId && !o.fulfilled);

        if (order && order.status === "pending") {
          order.status = "failed";
          order.fulfilled = true;
        }
        if (order && order.status === "cooking") {
          order.status = "failed";
        }

        table.status = "dirty";
        table.dirty = true;
        table.customer = null;
        table.orderId = null;

        state.messes += 1;
        state.combo = 0;
        state.rating -= 10;
        log(`${leavingName} 等得太久，生气离开了！`);
      }
    }
  });
  renderTables();
  renderOrders();
  updateTop();
  saveGame();
}

function restockOneIngredient() {
  const key = pick(Object.keys(inventory));
  const cost = ingredientMeta[key].cost;

  if (state.money >= cost) {
    state.money -= cost;
    inventory[key] += 1;
    log(`市场采购：${ingredientMeta[key].name} +1，花费 💰${cost}`);
    updateTop();
    renderIngredients();
    renderMenu();
    saveGame();
  } else {
    log(`资金不足，无法采购 ${ingredientMeta[key].name}（需要 💰${cost}）。`);
  }
}

function autoSpawnLoop() {
  setInterval(() => {
    if (!canAct()) return;
    if (state.queue.length < 4 && Math.random() < 0.72) spawnCustomer();
  }, 7000);
}

function timerLoop() {
  const timer = setInterval(() => {
    if (state.gameOver) {
      clearInterval(timer);
      return;
    }
    if (state.paused) return;

    state.time -= 1;

    if (state.money > state.highScore) {
      state.highScore = state.money;
      localStorage.setItem("kmd_high_score", String(state.highScore));
    }

    if (state.time <= 0) {
      state.time = 0;
      endGame();
    }

    updateTop();
  }, 1000);
}

function customerLoop() {
  setInterval(customerTick, 2000);
}

function refillLoop() {
  setInterval(() => {
    if (!canAct()) return;
    restockOneIngredient();
  }, 11000);
}

function pauseToggle() {
  if (state.gameOver) return;
  state.paused = !state.paused;
  updateCookStatus();
  updateTop();
  log(state.paused ? "游戏已暂停。" : "游戏继续。");
}

function saveGame() {
  const save = {
    state: {
      money: state.money,
      rating: state.rating,
      combo: state.combo,
      time: state.time,
      highScore: state.highScore,
      dirtyDishes: state.dirtyDishes,
      messes: state.messes,
      soundOn: state.soundOn,
      selectedRecipeId: state.selectedRecipeId,
      upgrades: state.upgrades,
      orders: state.orders,
      queue: state.queue,
      readyDishes: state.readyDishes,
      activeCooking: state.activeCooking
    },
    inventory,
    tables: tables.map(t => ({
      id: t.id,
      status: t.status,
      customer: t.customer,
      orderId: t.orderId,
      dirty: t.dirty
    }))
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return false;
  try {
    const save = JSON.parse(raw);
    Object.assign(state, {
      money: save.state.money,
      rating: save.state.rating,
      combo: save.state.combo,
      time: save.state.time,
      highScore: save.state.highScore,
      dirtyDishes: save.state.dirtyDishes,
      messes: save.state.messes,
      soundOn: save.state.soundOn,
      selectedRecipeId: save.state.selectedRecipeId,
      upgrades: save.state.upgrades,
      orders: save.state.orders,
      queue: save.state.queue,
      readyDishes: save.state.readyDishes,
      activeCooking: {
        ...save.state.activeCooking,
        running: false,
        prepSelected: save.state.activeCooking?.prepSelected || {}
      }
    });

    Object.keys(inventory).forEach(k => {
      if (save.inventory[k] != null) inventory[k] = save.inventory[k];
    });

    save.tables.forEach(saved => {
      const t = tables.find(x => x.id === saved.id);
      if (!t) return;
      t.status = saved.status;
      t.customer = saved.customer;
      t.orderId = saved.orderId;
      t.dirty = saved.dirty;
    });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function clearSave() {
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem("kmd_high_score");
  location.reload();
}

function endGame() {
  state.gameOver = true;
  els.finalMoney.textContent = state.money;
  els.finalRating.textContent = Math.round(state.rating);
  els.finalHighScore.textContent = state.highScore;
  els.gameOver.classList.remove("hidden");
  log("营业结束。");
  saveGame();
}

function bind() {
  els.spawnBtn.addEventListener("click", spawnCustomer);
  els.washBtn.addEventListener("click", washDishes);
  els.cleanBtn.addEventListener("click", cleanMesses);
  els.startCookBtn.addEventListener("click", startCookingFlow);
  els.prepBtn.addEventListener("click", doPrep);
  els.cookBtn.addEventListener("click", doCook);
  els.plateBtn.addEventListener("click", doPlate);
  els.pauseBtn.addEventListener("click", pauseToggle);
  els.soundBtn.addEventListener("click", () => {
    state.soundOn = !state.soundOn;
    updateTop();
    saveGame();
  });
  els.saveBtn.addEventListener("click", () => {
    saveGame();
    log("已手动保存。");
  });
  els.restartBtn.addEventListener("click", () => {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  });
  els.clearSaveBtn.addEventListener("click", clearSave);
}

function init() {
  const loaded = loadGame();
  updateAll();
  bind();

  if (!loaded) {
    spawnCustomer();
    spawnCustomer();
    log("欢迎来到 厨房大师 Deluxe，开始今天的营业吧！");
    log("提示：现在食材补货需要花钱，注意控制成本。");
  } else {
    log("已读取本地存档。");
  }

  autoSpawnLoop();
  timerLoop();
  customerLoop();
  refillLoop();

  setInterval(() => {
    if (!state.gameOver) saveGame();
  }, 10000);
}

init();
