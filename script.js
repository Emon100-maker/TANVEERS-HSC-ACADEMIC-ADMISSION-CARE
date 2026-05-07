const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.card, .hero-card, .contact-card, .section-title');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => observer.observe(item));

function setActiveNav() {
  const scrollPosition = window.scrollY + window.innerHeight / 4;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const link = document.querySelector(`nav a[href="#${section.id}"]`);

    if (scrollPosition >= top && scrollPosition < bottom) {
      link?.classList.add('active');
    } else {
      link?.classList.remove('active');
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);
