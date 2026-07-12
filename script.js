const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.menu-card');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tabs.forEach((item) => item.setAttribute('aria-pressed', 'false'));
    tab.classList.add('active');
    tab.setAttribute('aria-pressed', 'true');
    const category = tab.dataset.category;
    cards.forEach((card) => {
      const shouldHide = category !== 'all' && card.dataset.category !== category;
      card.classList.toggle('hidden', shouldHide);
      card.hidden = shouldHide;
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
