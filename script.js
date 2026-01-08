// ===== ДАННЫЕ =====
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

// ===== ЭЛЕМЕНТЫ =====
const header = document.querySelector(".header");
const content = document.getElementById("content");
const tabs = document.querySelectorAll(".tab");
const addBtn = document.getElementById("add-btn");

// ===== ОТРИСОВКА РЕЦЕПТОВ =====
function renderRecipes() {
  header.textContent = "Рецепты";
  content.innerHTML = "";

  if (recipes.length === 0) {
    content.innerHTML = `
      <p style="text-align:center; color:#888;">
        Пока нет рецептов
      </p>
    `;
    return;
  }

  recipes.forEach(item => {
    const card = document.createElement("div");
    card.className = "card lavender";
    card.textContent =
      item.type === "product"
        ? `🟢 ${item.title}`
        : item.title;

    content.appendChild(card);
  });
}

// ===== ВКЛАДКИ =====
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    if (index === 0) {
      renderRecipes();
    }

    if (index === 1) {
      header.textContent = "Ингредиенты";
      content.innerHTML = `
        <p style="text-align:center; color:#888;">
          Раздел в разработке
        </p>
      `;
    }

    if (index === 2) {
      header.textContent = "Меню";
      content.innerHTML = `
        <p style="text-align:center; color:#888;">
          Раздел пока пуст
        </p>
      `;
    }
  });
});

// ===== ДОБАВЛЕНИЕ РЕЦЕПТА / ПРОДУКТА =====
addBtn.addEventListener("click", () => {
  header.textContent = "Новый";

  content.innerHTML = `
    <div style="padding:16px; color:#1f1f1f;">
      
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
      <input
        id="title-input"
        placeholder="Например: Омлет"
        style="width:100%; margin-bottom:12px;"
      />

      <label>Описание</label>
      <textarea
        id="description-input"
        placeholder="Коротко про приготовление"
        style="width:100%; margin-bottom:12px;"
      ></textarea>

      <label>Ингредиенты (каждый с новой строки)</label>
      <textarea
        id="ingredients-input"
        placeholder="Яйца\nМолоко"
        style="width:100%; height:80px;"
      ></textarea>

      <button id="save-btn" style="margin-top:16px;">
        Сохранить
      </button>
    </div>
  `;

  const saveBtn = document.getElementById("save-btn");

  saveBtn.addEventListener("click", () => {
    const title = document.getElementById("title-input").value.trim();
    const type = document.querySelector('input[name="type"]:checked').value;

    if (!title) return;

    recipes.push({
      title,
      type
    });

    localStorage.setItem("recipes", JSON.stringify(recipes));
    renderRecipes();
  });
});

// ===== СТАРТ =====
renderRecipes();
