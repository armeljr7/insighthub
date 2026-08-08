/* ============================================
   InsightHub - Vanilla JavaScript
   Client-side search, navigation, animations
   ============================================ */

(function () {
  'use strict';

  // ---------- DOM Ready ----------
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupNavigation();
    setupSearch();
    setupCategories(); // <--- Added dynamic category renderer here
    setupScrollEffects();
    setupFadeInAnimations();
    setupFilters();
    setupNewsletter();
    setupSmoothScroll();
  }

  // ---------- Dynamic Categories ----------
  function setupCategories() {
    const categoriesData = [
      { name: "Tech", slug: "tech", icon: "💻", desc: "Laptops, monitors, TVs, tablets, and the latest gadgets." },
      { name: "Gaming", slug: "gaming", icon: "🎮", desc: "Consoles & accessories" },
      { name: "Home", slug: "home", icon: "🏠", desc: "Smart home & appliances" },
      { name: "Fitness", slug: "fitness", icon: "💪", desc: "Wearables & equipment" },
      { name: "Office", slug: "office", icon: "🪑", desc: "Chairs, desks & gear" },
      { name: "Mobile", slug: "mobile", icon: "📱", desc: "Phones & accessories" },
      { name: "Audio", slug: "audio", icon: "🎧", desc: "Headphones & speakers" },
      { name: "Lifestyle", slug: "lifestyle", icon: "✨", desc: "Everyday essentials" }
    ];

    function renderCategories(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = categoriesData.map(function(cat) {
        return '<a href="reviews.html?category=' + cat.slug + '" class="category-card fade-in" data-category="' + cat.slug + '">' +
          '<div class="category-icon">' + cat.icon + '</div>' +
          '<h3>' + cat.name + '</h3>' +
          '<p>' + cat.desc + '</p>' +
          '</a>';
      }).join('');
    }

    renderCategories("categories-grid");
    renderCategories("categories-page-grid");
  }

  // ---------- Navigation ----------
  function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
      });

      // Close on link click
      mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menuToggle.classList.remove('active');
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Sticky navbar shadow
    if (navbar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ---------- Search ----------
  function setupSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-box input');
    const searchResults = document.querySelector('.search-results');

    if (!searchBtn || !searchOverlay) return;

    const products = [
      { title: 'Sony WH-1000XM5 Headphones', category: 'Audio', page: 'reviews.html', rating: 9.4, price: '$348' },
      { title: 'Apple MacBook Pro 14" M3', category: 'Tech', page: 'reviews.html', rating: 9.6, price: '$1,599' },
      { title: 'Nintendo Switch OLED', category: 'Gaming', page: 'reviews.html', rating: 9.2, price: '$349' },
      { title: 'Dyson V15 Detect Vacuum', category: 'Home', page: 'reviews.html', rating: 9.1, price: '$749' },
      { title: 'Peloton Bike+', category: 'Fitness', page: 'reviews.html', rating: 8.9, price: '$2,495' },
      { title: 'Herman Miller Aeron Chair', category: 'Office', page: 'reviews.html', rating: 9.5, price: '$1,445' },
      { title: 'iPhone 16 Pro Max', category: 'Mobile', page: 'reviews.html', rating: 9.3, price: '$1,199' },
      { title: 'Samsung Galaxy S25 Ultra', category: 'Mobile', page: 'reviews.html', rating: 9.2, price: '$1,299' },
      { title: 'Bose QuietComfort Ultra', category: 'Audio', page: 'reviews.html', rating: 9.0, price: '$429' },
      { title: 'LG C3 OLED TV 65"', category: 'Tech', page: 'reviews.html', rating: 9.4, price: '$1,799' },
      { title: 'Logitech MX Master 3S', category: 'Office', page: 'reviews.html', rating: 9.1, price: '$99' },
      { title: 'Garmin Fenix 8', category: 'Fitness', page: 'reviews.html', rating: 9.0, price: '$999' },
      { title: 'Steam Deck OLED', category: 'Gaming', page: 'reviews.html', rating: 9.3, price: '$549' },
      { title: 'Kindle Paperwhite Signature', category: 'Lifestyle', page: 'reviews.html', rating: 9.0, price: '$189' },
      { title: 'Ninja Creami Ice Cream Maker', category: 'Home', page: 'reviews.html', rating: 8.7, price: '$199' }
    ];

    function openSearch() {
      searchOverlay.classList.add('active');
      if (searchInput) {
        setTimeout(function () { searchInput.focus(); }, 100);
      }
      document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
      searchOverlay.classList.remove('active');
      if (searchInput) searchInput.value = '';
      if (searchResults) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
      }
      document.body.style.overflow = '';
    }

    searchBtn.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) closeSearch();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    });

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        if (query.length < 2) {
          searchResults.classList.remove('active');
          searchResults.innerHTML = '';
          return;
        }

        const matches = products.filter(function (p) {
          return p.title.toLowerCase().indexOf(query) !== -1 ||
                 p.category.toLowerCase().indexOf(query) !== -1;
        });

        if (matches.length === 0) {
          searchResults.innerHTML = '<div class="search-result-item">No results found for "' + this.value + '"</div>';
        } else {
          searchResults.innerHTML = matches.map(function (p) {
            return '<a href="' + p.page + '" class="search-result-item" style="display:block;text-decoration:none;color:inherit;">' +
              '<strong>' + p.title + '</strong><br>' +
              '<span style="color:var(--text-muted);font-size:0.85rem;">' + p.category + ' · ★ ' + p.rating + ' · ' + p.price + '</span>' +
              '</a>';
          }).join('');
        }
        searchResults.classList.add('active');
      });
    }
  }

  // ---------- Scroll Effects ----------
  function setupScrollEffects() {}

  // ---------- Fade-in Animations ----------
  function setupFadeInAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      elements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  // ---------- Category / Review Filters ----------
  function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterableItems = document.querySelectorAll('[data-category]');

    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        filterableItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
            setTimeout(function () {
              item.classList.add('visible');
            }, 10);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------- Newsletter ----------
  function setupNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          const btn = form.querySelector('button');
          const originalText = btn ? btn.textContent : '';
          if (btn) {
            btn.textContent = 'Subscribed!';
            btn.disabled = true;
          }
          input.value = '';
          setTimeout(function () {
            if (btn) {
              btn.textContent = originalText;
              btn.disabled = false;
            }
          }, 3000);
        }
      });
    });
  }

  // ---------- Smooth Scroll ----------
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

})();
