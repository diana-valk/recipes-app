let recipes = JSON.parse(localStorage.getItem("recipes")) || [];const tabs = document.querySelectorAll(".tab");
const header = document.querySelector(".header");
const content = document.getElementById("content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    if (index === 0) {
      header.textContent = "Рецепты";
      content.innerHTML = `
        <div class="card lavender">Омлет</div>
        <div class="card peach">Авокадо</div>
      `;
    }

    if (index === 1) {
      header.textContent = "Ингредиенты";
      content.innerHTML = `
        <div class="card green">Яйца</div>
        <div class="card blue">Авокадо</div>
        <div class="card yellow">Молоко</div>
      `;
    }

    if (index === 2) {
      header.textContent = "Меню";
      content.innerHTML = `
        <p style="color:#1f1f1f; text-align:center;">
          Раздел пока пуст
        </p>
      `;
    }
  });
});
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
  header.textContent = "Новый рецепт";
  content.innerHTML = `
    <div style="padding:16px; color:#1f1f1f;">
      <label>Название</label>
      <input placeholder="Например: Омлет" style="width:100%; margin-bottom:12px;" />

      <label>Описание</label>
      <textarea placeholder="Коротко про приготовление" style="width:100%; margin-bottom:12px;"></textarea>

      <label>Ингредиенты (каждый с новой строки)</label>
      <textarea placeholder="Яйца\nМолоко" style="width:100%; height:80px;"></textarea>

      <button style="margin-top:16px;">Сохранить</button>
    </div>
  `;
});
