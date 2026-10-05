/* ========================================
   ELATEVE — Client Application
   Fetches data from Express API
   ======================================== */

// ==================== STATE ====================
let currentPage = 'home';
let currentFilter = 'all';
let productsCache = null;


// ==================== CONTACT MODAL ====================
function initContactModal() {
  const overlay = document.getElementById('contactOverlay');
  if (!overlay) return;

  const open = (e) => {
    if (e) e.preventDefault();
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.getElementById('contactClose')?.focus();
  };
  const close = () => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  };

  // Any element marked data-contact opens the modal (mailto href is the no-JS fallback)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-contact]');
    if (trigger) open(e);
  });

  document.getElementById('contactClose')?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });
  // Close after picking an option
  overlay.querySelectorAll('.contact-opt').forEach((a) => a.addEventListener('click', () => setTimeout(close, 100)));
}

// ==================== API ====================
async function fetchProducts(category = 'all') {
  const url = category === 'all' ? '/api/products' : `/api/products?category=${category}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
}

async function fetchBlog() {
  const res = await fetch('/api/blog');
  const data = await res.json();
  return data.posts;
}

// ==================== ROUTER ====================
function navigateTo(page, category = null, season = null, { push = true, anchor = null } = {}) {
  const activePage = document.querySelector('.page.active');
  if (activePage) {
    activePage.classList.remove('visible');
    setTimeout(() => {
      activePage.classList.remove('active');

      const newPage = document.getElementById(`page-${page}`);
      if (newPage) {
        newPage.classList.add('active');
        requestAnimationFrame(() => newPage.classList.add('visible'));
      }

      if (page === 'shop') {
        const filter = category || 'all';
        const seasonVal = season || '';
        currentSeason = seasonVal;
        currentFilter = filter;
        document.querySelectorAll('.season-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.season === seasonVal);
        });
        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        loadFilteredProducts(filter, seasonVal);
      }

      if (page === 'blog') {
        resetBlogView();
        loadBlog();
      }

      currentPage = page;
      const target = anchor ? document.getElementById(anchor) : null;
      if (target) target.scrollIntoView({ block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      updateNavActive(page);
      if (window.ELATEVE_setTitle) window.ELATEVE_setTitle(page); // keep the tab title in step with the page and language

      // Update URL without reload
      const paths = { home: '/', shop: '/shop', blog: '/blog', projects: '/projects', machinery: '/machinery', whyus: '/why-us' };
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (season) params.set('season', season);
      const qs = params.toString();
      const url = (qs ? `${paths[page]}?${qs}` : paths[page]) + (anchor ? `#${anchor}` : '');
      if (push) history.pushState({ page, category, season }, "", url); // back/forward must not add new entries
    }, 300);
  }
}

function updateNavActive(page) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

// ==================== COMING SOON MODAL ====================
function initComingSoonModal() {
  if (document.getElementById('comingSoonOverlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'comingSoonOverlay';
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="popup">
      <button class="popup-close" id="comingSoonClose">&times;</button>
      <span class="popup-eyebrow">ELATEVE</span>
      <h2 class="popup-title" style="font-size:clamp(1.4rem,3vw,2rem)">Coming Soon</h2>
      <p class="popup-text">We're still curating the best way to bring you this find.<br>Check back soon — it's worth the wait.</p>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
  document.getElementById('comingSoonClose')?.addEventListener('click', () => {
    overlay.classList.remove('active');
  });
}

function showComingSoon() {
  initComingSoonModal();
  document.getElementById('comingSoonOverlay')?.classList.add('active');
}

// ==================== PRODUCT RENDERING ====================
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.category = product.category;

  const tierBadge = product.badge
    ? `<span class="product-tier-badge product-tier-badge--${product.badge.toLowerCase()}">${product.badge}</span>`
    : '';

  const categoryLabels = { feelgood: 'Feel Good', homelongevity: 'Home Longevity' };
  const categoryLabel = categoryLabels[product.category] || product.category;

  const elateveLoves = product.whyElateveLoves
    ? `<div class="product-card-loves">
        <button class="loves-toggle" aria-expanded="false">
          <span class="loves-heart">♥</span> Why ELATEVE loves this
          <span class="loves-arrow">›</span>
        </button>
        <p class="loves-text">${product.whyElateveLoves}</p>
       </div>`
    : '';

  card.innerHTML = `
    <div class="product-card-img">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <span class="product-card-badge">${categoryLabel}</span>
      ${tierBadge}
    </div>
    <div class="product-card-body">
      <h3 class="product-card-name">${product.name}</h3>
      ${product.description ? `<p class="product-card-desc">${product.description}</p>` : ''}
      ${elateveLoves}
      <div class="product-card-bottom">
        <span class="product-card-price">${product.price}</span>
        <span class="product-card-link">${product.link ? 'Shop Now' : 'Coming Soon'}</span>
      </div>
    </div>
  `;

  // Handle click — open link or show coming soon modal
  card.addEventListener('click', (e) => {
    // Don't navigate if clicking the loves toggle
    if (e.target.closest('.loves-toggle')) return;

    if (product.link) {
      window.open(product.link, '_blank', 'noopener,noreferrer');
    } else {
      showComingSoon();
    }
  });

  // Toggle "Why ELATEVE loves this" accordion
  const toggle = card.querySelector('.loves-toggle');
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isOpen);
      toggle.classList.toggle('open', !isOpen);
    });
  }

  return card;
}

async function loadProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const products = await fetchProducts(filter);
  products.forEach((product, i) => {
    const card = createProductCard(product);
    card.style.animationDelay = `${i * 0.05}s`;
    grid.appendChild(card);
  });

  // Staggered reveal
  setTimeout(() => {
    document.querySelectorAll('#productsGrid .product-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 40);
    });
  }, 50);
}

// ==================== SHOP FILTERS ====================
let currentSeason = '';

function setFilter(category) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
  loadFilteredProducts(category, currentSeason);
}

function setSeason(season) {
  currentSeason = season;
  document.querySelectorAll('.season-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.season === season);
  });
  loadFilteredProducts(currentFilter, currentSeason);
}

async function loadFilteredProducts(category, season) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  let products = await fetchProducts(category === 'all' ? 'all' : category);

  // Apply season filter
  if (season) {
    products = products.filter(p => p.springTag === season);
  }

  if (products.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--grey);grid-column:1/-1;padding:3rem;">No products found for this filter. Try a different combination.</p>';
    return;
  }

  products.forEach((product, i) => {
    const card = createProductCard(product);
    card.style.animationDelay = `${i * 0.05}s`;
    grid.appendChild(card);
  });

  setTimeout(() => {
    document.querySelectorAll('#productsGrid .product-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 40);
    });
  }, 50);
}

// ==================== BLOG RENDERING ====================
// Parse a "Mon YYYY" label (e.g. "Aug 2026") to a sortable timestamp
function blogPostTime(label) {
  const t = Date.parse(String(label || '').replace(/^([A-Za-z]+)\s+(\d{4})$/, '$1 1, $2'));
  return Number.isNaN(t) ? 0 : t;
}

// ---- Spanish journal: English posts come from the API, Spanish copy from a static JSON keyed by post id ----
// Lightweight square thumbnails for the journal list (full-size originals stay in /images/partnership)
const THUMBS = {
  '/images/partnership/coast.jpg': '/images/web/p-coast-sm.jpg',
  '/images/partnership/lounge.jpg': '/images/web/p-lounge-sm.jpg',
  '/images/partnership/sauna.jpg': '/images/web/p-sauna-sm.jpg',
  '/images/partnership/barcelona.jpg': '/images/web/p-barcelona-sm.jpg'
};
const ES_MONTHS = { Jan: 'Ene', Feb: 'Feb', Mar: 'Mar', Apr: 'Abr', May: 'May', Jun: 'Jun', Jul: 'Jul', Aug: 'Ago', Sep: 'Sep', Oct: 'Oct', Nov: 'Nov', Dec: 'Dic' };
const ASSET_QS = (document.querySelector('script[src*="/js/app.js"]')?.src.split('?')[1]) || '';
let blogEsCache = null;
let blogListCache = null;
let openPostId = null;

const isEs = () => window.__elateveLang === 'es';
const fmtBlogDate = (label) => isEs() ? String(label || '').replace(/^[A-Za-z]{3}/, (m) => ES_MONTHS[m] || m) : label;

async function fetchBlogEs() {
  if (blogEsCache) return blogEsCache;
  try {
    const res = await fetch(`/i18n/blog-es.json?${ASSET_QS}`);
    blogEsCache = res.ok ? await res.json() : {};
  } catch (err) { blogEsCache = {}; }
  return blogEsCache;
}

// Returns the post with Spanish copy laid over it when the site is in Spanish
async function localizePost(post) {
  if (!isEs()) return post;
  const es = (await fetchBlogEs())[String(post.id)];
  return es ? { ...post, content: undefined, htmlContent: undefined, ...es } : post;
}

async function loadBlog(force = false) {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  const lang = isEs() ? 'es' : 'en';
  if (!force && grid.children.length > 0 && grid.dataset.lang === lang) return;

  if (!blogListCache) blogListCache = await fetchBlog();
  // Newest first (the API already sorts, but keep the client honest if it didn't)
  const posts = [...blogListCache].sort((a, b) => blogPostTime(b.date) - blogPostTime(a.date));
  const localized = await Promise.all(posts.map(localizePost));
  grid.innerHTML = '';
  grid.dataset.lang = lang;
  localized.forEach(post => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.dataset.postId = post.id;
    const img = post.image
      ? `<img class="blog-card-img" src="${THUMBS[post.image] || post.image}" alt="" width="96" height="96" loading="lazy" decoding="async">`
      : `<span class="blog-card-img" aria-hidden="true"></span>`;
    card.innerHTML = `
      ${img}
      <span class="blog-card-date">${fmtBlogDate(post.date)}</span>
      <div class="blog-card-content">
        <span class="blog-card-tag">${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </div>
      <span class="blog-card-arrow">&rarr;</span>
    `;
    card.addEventListener('click', () => openArticle(post.id));
    grid.appendChild(card);
  });
}

async function openArticle(postId, { relang = false } = {}) {
  openPostId = postId;
  const res = await fetch(`/api/blog/${postId}`);
  const post = await localizePost(await res.json());
  if (openPostId !== postId) return; // user moved on while this was loading

  const grid = document.getElementById('blogGrid');
  const hero = document.querySelector('.blog-hero');
  const article = document.getElementById('blogArticle');

  document.getElementById('articleTag').textContent = post.tag;
  document.getElementById('articleDate').textContent = fmtBlogDate(post.date);
  document.getElementById('articleRead').textContent = post.readTime || '';
  document.getElementById('articleTitle').textContent = post.title;

  const body = document.getElementById('articleBody');
  body.innerHTML = '';
  if (post.htmlContent) {
    body.innerHTML = post.htmlContent;
  } else if (post.content) {
    post.content.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      body.appendChild(p);
    });
  }

  grid.style.display = 'none';
  hero.style.display = 'none';
  article.style.display = 'block';
  if (!relang) {
    article.querySelector('.blog-article-inner').style.animation = 'none';
    requestAnimationFrame(() => {
      article.querySelector('.blog-article-inner').style.animation = 'fadeUp 0.6s var(--ease-out) forwards';
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function closeArticle() {
  const grid = document.getElementById('blogGrid');
  const hero = document.querySelector('.blog-hero');
  const article = document.getElementById('blogArticle');

  openPostId = null;
  if (article) article.style.display = 'none';
  if (hero) hero.style.display = '';
  if (grid) grid.style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Also reset blog article state when navigating to blog page
function resetBlogView() {
  const grid = document.getElementById('blogGrid');
  const hero = document.querySelector('.blog-hero');
  const article = document.getElementById('blogArticle');

  openPostId = null;
  if (article) article.style.display = 'none';
  if (hero) hero.style.display = '';
  if (grid) grid.style.display = '';
}

// Switching language re-renders the journal (list and any open article) in place
document.addEventListener('elateve:lang', async () => {
  const grid = document.getElementById('blogGrid');
  if (grid && grid.children.length) await loadBlog(true);
  const article = document.getElementById('blogArticle');
  if (openPostId != null && article && article.style.display !== 'none') await openArticle(openPostId, { relang: true });
});

// ==================== EVENT LISTENERS ====================
function initNavigation() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-page]');
    if (link) {
      e.preventDefault();
      const page = link.dataset.page;
      const category = link.dataset.category || null;
      const season = link.dataset.season || null;
      navigateTo(page, category, season, { anchor: link.dataset.anchor || null });

      document.getElementById('navLinks')?.classList.remove('open');
      document.getElementById('navToggle')?.classList.remove('active');
    }
  });

  // In-page jumps: [data-jump] scrolls to an element id (machinery index, "pairs with" links), [data-scroll] likewise
  document.addEventListener('click', (e) => {
    const jump = e.target.closest('[data-jump],[data-scroll]');
    if (!jump) return;
    const el = document.getElementById(jump.dataset.jump || jump.dataset.scroll);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      setFilter(e.target.dataset.filter);
    }
    if (e.target.classList.contains('season-btn')) {
      setSeason(e.target.dataset.season || '');
    }
  });

  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      document.getElementById('navLinks')?.classList.toggle('open');
    });
  }

  const blogBack = document.getElementById('blogBack');
  if (blogBack) {
    blogBack.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeArticle();
    });
  }

  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput?.value;
      if (email) {
        try {
          await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
        } catch (err) { /* still show toast */ }
      }
      showToast(isEs() ? 'Gracias por suscribirse. Revise su bandeja de entrada.' : 'Welcome to the elevation. Check your inbox.');
      form.reset();
    });
  }

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state) {
      navigateTo(e.state.page, e.state.category, e.state.season, { push: false });
    }
  });
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
  const nav = document.getElementById('nav');
  const floatBook = document.querySelector('.kx-float-book');
  let footerInView = false;
  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
    // Floating "Book 30 Minutes" appears once the hero is behind you, and steps aside at the footer
    floatBook?.classList.toggle('show', window.scrollY > 420 && !footerInView);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  const footer = document.querySelector('.footer');
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      footerInView = entries[0].isIntersecting;
      onScroll();
    }, { threshold: 0.05 }).observe(footer);
  }
  onScroll();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.section-header, .category-card, .about-block, .about-value, .about-disclosure').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Partnership sections use their own .kx-reveal hook
  document.querySelectorAll('.kx-reveal').forEach(el => observer.observe(el));
}

// ==================== TOAST ====================
function showToast(message) {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', async () => {
  // Determine initial page from URL
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const pageMap = { '/': 'home', '/blog': 'blog', '/projects': 'projects', '/machinery': 'machinery', '/why-us': 'whyus' };
  let initialPage = pageMap[path] || 'home';
  // Fall back to home if a retired page (e.g. /shop) is requested
  if (!document.getElementById(`page-${initialPage}`)) initialPage = 'home';

  // Activate initial page
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active', 'visible');
  });
  const page = document.getElementById(`page-${initialPage}`);
  if (page) {
    page.classList.add('active');
    requestAnimationFrame(() => page.classList.add('visible'));
  }

  currentPage = initialPage;
  updateNavActive(initialPage);

  // Deep link such as /why-us#team: scroll once the page is laid out
  if (location.hash.length > 1) {
    const anchorEl = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (anchorEl && page && page.contains(anchorEl)) setTimeout(() => anchorEl.scrollIntoView({ block: 'start' }), 350);
  }

  // Load data
  if (initialPage === 'shop') {
    const cat = params.get('category') || 'all';
    const season = params.get('season') || '';
    currentSeason = season;
    currentFilter = cat;
    document.querySelectorAll('.season-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.season === season);
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === cat);
    });
    loadFilteredProducts(cat, season);
  }

  if (initialPage === 'blog') {
    loadBlog();
  }

  initNavigation();
  initScrollEffects();
  initContactModal();

  // Push initial state
  history.replaceState({ page: initialPage, category: params.get('category') }, '', window.location.href);

});
