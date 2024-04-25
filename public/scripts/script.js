const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

const onToggleMenu = () => {
  navLinks.classList.toggle('hide-element');
}

mobileMenuButton.addEventListener('click', onToggleMenu);
