let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

const content = document.getElementById("content");
const tabs = document.querySelectorAll(".tab");
const headerTitle = document.getElementById("header-title");
const addBtn = document.getElementById("add-btn");

// ===== РЕНДЕР =====
function renderRecipes() {
  headerTitle.textContent = "Рецепты";
  addBtn.style.display = "block";
  content.innerHTML = "";

  if (recipes.length === 0) {
    content.innerHTML = `<p style="color:#8e8e93;">Пока нет рецептов</p>`;
    return;
  }

  recipes.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = item.title;
    content.appendChild(div);
  });
}

function openAddScreen() {
  headerTitle.textContent = "Новый";
  addBtn.style.display = "none";

  content.innerHTML = `
    <label>Тип</label>
    <div style="margin-bottom:12px;">
      <label><input type="radio" name="type" value="recipe" checked> Рецепт</label>
      <label style="margin-left:12px;"><input type="radio" name="type" value="product"> Продукт</label>
    </div>

    <label>Название</label>
    <input id="title-input" />

    <button id="save-btn">Сохранить</button>
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

// ===== EVENTS =====
addBtn.addEventListener("click", openAddScreen);

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    if (index === 0) renderRecipes();

    if (index === 1) {
      headerTitle.textContent = "Ингредиенты";
      addBtn.style.display = "none";
      content.innerHTML = `<p style="color:#8e8e93;">В разработке</p>`;
    }

    if (index === 2) {
      headerTitle.textContent = "Меню";
      addBtn.style.display = "none";
      content.innerHTML = `<p style="color:#8e8e93;">Пусто</p>`;
    }
  });
});

// ===== START =====
renderRecipes();
