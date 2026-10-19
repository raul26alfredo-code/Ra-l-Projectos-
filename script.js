const header = document.querySelector('.site-header');
const toggleButton = document.querySelector('.nav-toggle');

if (toggleButton && header) {
  toggleButton.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}
