const tabsContainer = document.querySelector('.tabs');
const menuGrid = document.querySelector('.menu-grid');

const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function makeCard(item) {
  const card = document.createElement('article');
  card.className = `menu-card theme-${item.theme || 'mango'}`;
  card.dataset.category = slugify(item.category);

  if (item.image) {
    const image = document.createElement('img');
    image.className = 'menu-image';
    image.src = item.image;
    image.alt = item.imageAlt || item.title;
    image.loading = 'lazy';
    image.width = 92;
    image.height = 92;
    card.append(image);
  } else {
    const icon = document.createElement('div');
    icon.className = 'menu-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = item.emoji || '🍓';
    card.append(icon);
  }

  const info = document.createElement('div');
  info.className = 'menu-info';
  const titleWrap = document.createElement('div');
  titleWrap.className = 'item-title';
  const title = document.createElement('h3');
  title.textContent = item.title;
  titleWrap.append(title);
  info.append(titleWrap);

  if (item.ingredients) {
    const ingredients = document.createElement('p');
    ingredients.className = 'ingredients';
    const label = document.createElement('strong');
    label.textContent = 'Ingredients: ';
    ingredients.append(label, document.createTextNode(item.ingredients));
    info.append(ingredients);
  }

  const description = document.createElement('p');
  description.textContent = item.description;
  info.append(description);
  card.append(info);
  return card;
}

function filterMenu(category, activeButton) {
  tabsContainer.querySelectorAll('.tab').forEach((button) => {
    const active = button === activeButton;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  menuGrid.querySelectorAll('.menu-card').forEach((card) => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  });
}

function makeTab(label, category, active = false) {
  const button = document.createElement('button');
  button.className = `tab${active ? ' active' : ''}`;
  button.type = 'button';
  button.textContent = label;
  button.setAttribute('aria-pressed', String(active));
  button.addEventListener('click', () => filterMenu(category, button));
  return button;
}

async function loadMenu() {
  try {
    const response = await fetch('data/menu.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Menu request failed: ${response.status}`);
    const items = (await response.json()).filter((item) => item.available !== false);
    const categories = [...new Set(items.map((item) => item.category))];

    tabsContainer.replaceChildren(makeTab('All', 'all', true));
    categories.forEach((category) => tabsContainer.append(makeTab(category, slugify(category))));
    menuGrid.replaceChildren(...items.map(makeCard));
    menuGrid.setAttribute('aria-busy', 'false');
  } catch (error) {
    console.error(error);
    const message = document.createElement('p');
    message.className = 'menu-status';
    message.textContent = 'The menu could not be loaded. Please refresh or contact us for today’s options.';
    menuGrid.replaceChildren(message);
    menuGrid.setAttribute('aria-busy', 'false');
  }
}

loadMenu();
document.getElementById('year').textContent = new Date().getFullYear();
