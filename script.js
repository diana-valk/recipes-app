// ===== ДАННЫЕ =====
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

// ===== ЭЛЕМЕНТЫ =====
const content = document.getElementById("content");
const tabs = document.querySelectorAll(".tab");
const header = document.querySelector(".header");

// ===== ХЕДЕР =====
function renderHeader(title, showAdd = false) {
  header.innerHTML = `
    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      width:100%;
    ">
      <span>${title}</span>
      ${showAdd ? `<button id="add-btn" style="font-size:24px;">＋</button>` : ``}
    </div>
  `;

  if (showAdd) {
    document.getElementById("add-btn").addEventListener("click", openAddScreen);
  }
}

// ===== РЕЦЕПТЫ =====
function renderRecipes() {
  renderHeader("Рецепты", true);
  content.innerHTML = "";

  if (recipes.length === 0) {
    content.innerHTML = `
      <p style="text-align:center; color:#777;">
        Пока нет рецептов
      </p>
    `;
    return;
  }

  recipes.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent =
      item.type === "product"
        ? `🟢 ${item.title}`
        : item.title;

    content.appendChild(card);
  });
}

// ===== ЭКРАН ДОБАВЛЕНИЯ =====
function openAddScreen() {
  renderHeader("Новый", false);

  content.innerHTML = `
    <div style="padding:16px;">
      <label>Тип</label>
      <div style="margin-bottom:12px;">
        <label>
          <input type="radio" name="type" value="recipe" checked />
          Рецепт
        </label>
        <label style="margin-left:12px;">
          <input type="radio" name="type" value="product" />
          Продукт
        </label>
      </div>

      <label>Название</label>
      <input id="title-input" style="width:100%; margin-bottom:12px;" />

      <button id="save-btn" style="margin-top:16px;">
        Сохранить
      </button>
    </div>
  `;

  document.getElementById("save-btn").addEventListener("click", () => {
    const title = document.getElementById("title-input").value.trim();
    const type = document.querySelector('input[name="type"]:checked').value;

    if (!title) return;

    recipes.push({ title, type });
    localStorage.setItem("recipes", JSON.stringify(recipes));

    renderRecipes();
  });
}

// ===== ВКЛАДКИ =====
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    if (index === 0) renderRecipes();

    if (index === 1) {
      renderHeader("Ингредиенты");
      content.innerHTML = `<p style="text-align:center; color:#777;">В разработке</p>`;
    }

    if (index === 2) {
      renderHeader("Меню");
      content.innerHTML = `<p style="text-align:center; color:#777;">Пусто</p>`;
    }
  });
});

// ===== СТАРТ =====
renderRecipes();
