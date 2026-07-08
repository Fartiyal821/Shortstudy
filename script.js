const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !burger.contains(event.target)) {
      nav.classList.remove('active');
      burger.classList.remove('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const current = window.location.pathname.split('/').filter(p => p).pop();
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (href === 'index.html' && current === '') || (href === 'web.html' && current === 'g')) {
      link.classList.add('active-link');
    }
  });
});
