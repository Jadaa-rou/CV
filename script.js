document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-links a, .hero-ctas a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalYear = document.getElementById('modal-year');
  const closeBtn = document.querySelector('.modal-close');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = 0;

  function openModal(item) {
    currentIndex = items.indexOf(item);
    const src = item.dataset.full;
    modalImg.src = src;
    modalImg.alt = item.getAttribute('aria-label') || '';
    modalTitle.textContent = item.dataset.title;
    modalYear.textContent = item.dataset.year;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  items.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn));
  });
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  document.addEventListener('keydown', e => {
    if (modal.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        currentIndex = e.key === 'ArrowRight' ? (currentIndex + 1) % items.length : (currentIndex - 1 + items.length) % items.length;
        openModal(items[currentIndex]);
      }
    }
  });

  const progress = document.querySelector('.scroll-progress');
  const updateScroll = () => { progress.style.width = `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`; };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: .14 });
  document.querySelectorAll('.reveal').forEach(section => revealObserver.observe(section));

  const sections = document.querySelectorAll('header[id], main section[id]');
  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) document.querySelectorAll('.nav-links a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-40% 0px -50%' });
  sections.forEach(section => navObserver.observe(section));

  const cursor = document.querySelector('.cursor-dot');
  window.addEventListener('pointermove', event => { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; });
  document.querySelectorAll('a,button').forEach(element => element.addEventListener('mouseenter', () => { cursor.style.width = '32px'; cursor.style.height = '32px'; }));
  document.querySelectorAll('a,button').forEach(element => element.addEventListener('mouseleave', () => { cursor.style.width = '18px'; cursor.style.height = '18px'; }));

  document.querySelector('.contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const note = document.querySelector('.form-note');
    note.textContent = '谢谢你的消息，我会尽快回复。';
    event.target.reset();
  });
});
