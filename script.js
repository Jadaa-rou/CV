// script.js — 交互逻辑 (导航、画廊模态、平滑滚动)
document.addEventListener('DOMContentLoaded',()=>{
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click',()=>{
    const shown = navLinks.style.display === 'flex';
    navLinks.style.display = shown ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
  });

  // 平滑滚动
  document.querySelectorAll('.nav-links a, .hero-ctas a').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
        if(window.innerWidth<=900){navLinks.style.display='none'}
      }
    });
  });

  // Gallery modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.modal-close');
  const items = Array.from(document.querySelectorAll('.gallery-item'));

  function openModal(src, alt){
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  items.forEach((btn, idx)=>{
    btn.addEventListener('click', ()=> openModal(btn.dataset.full, btn.getAttribute('aria-label')));
  });
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

  // 键盘支持
  document.addEventListener('keydown', e=>{
    if(modal.getAttribute('aria-hidden')==='false'){
      if(e.key==='Escape') closeModal();
      if(e.key==='ArrowRight' || e.key==='ArrowLeft'){
        const current = items.findIndex(it=>it.dataset.full===modalImg.src || it.dataset.full===modalImg.getAttribute('src'));
        let next = current;
        if(e.key==='ArrowRight') next = (current+1)%items.length;
        if(e.key==='ArrowLeft') next = (current-1+items.length)%items.length;
        openModal(items[next].dataset.full, items[next].getAttribute('aria-label'));
      }
    }
  });

  // 基本懒加载（图片已使用 loading=lazy），可以增强为 IntersectionObserver
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img = entry.target;
          const src = img.dataset.src;
          if(src){ img.src = src; img.removeAttribute('data-src'); }
          io.unobserve(img);
        }
      });
    },{rootMargin:'100px'});
    document.querySelectorAll('img[data-src]').forEach(img=>io.observe(img));
  }
});
