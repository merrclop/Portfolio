// =============================================================================
// assets/js/main.js
// Portfolio JavaScript — Mykhailo Kabar
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------------------------
  // Initialize Lucide Icons (З перевіркою на випадок збою CDN)
  // ---------------------------------------------------------------------------
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }


  // ---------------------------------------------------------------------------
  // Mobile Menu Toggle
  // ---------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu    = document.getElementById('mobile-menu');
  let menuOpen = false;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('hidden', !menuOpen);

      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', menuOpen ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });

    // Close mobile menu when clicking any mobile nav link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.add('hidden');

        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
      });
    });
  }


  // ---------------------------------------------------------------------------
  // Header Background on Scroll
  // ---------------------------------------------------------------------------
  const header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background      = 'rgba(10, 14, 23, 0.85)';
        header.style.backdropFilter  = 'blur(20px)';
        header.style.borderBottom    = '1px solid rgba(26, 36, 56, 0.5)';
      } else {
        header.style.background      = 'transparent';
        header.style.backdropFilter  = 'none';
        header.style.borderBottom    = '1px solid transparent';
      }
    }, { passive: true });
  }


  // ---------------------------------------------------------------------------
  // Active Navigation Link (IntersectionObserver)
  // ---------------------------------------------------------------------------
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      root:       null,
      rootMargin: '-20% 0px -70% 0px',
      threshold:  0,
    });

    sections.forEach(section => sectionObserver.observe(section));
  }


  // ---------------------------------------------------------------------------
  // Typing Animation
  // ---------------------------------------------------------------------------
  const typedTextEl = document.getElementById('typed-text');

  if (typedTextEl) {
    const phrases = [
      'cat /etc/os-release',
      'systemctl status career',
      'journalctl -f --since="today"',
      'bash ~/automate.sh',
      'ssh devops@opportunity',
    ];

    let phraseIndex  = 0;
    let charIndex    = 0;
    let isDeleting   = false;
    let typingSpeed  = 60;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
      } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 60;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting  = true;
        typingSpeed = 2000; // pause before deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        typingSpeed  = 400; // pause before typing next phrase
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1000);
  }


  // ---------------------------------------------------------------------------
  // Scroll-Triggered Animations for Skill Badges (FIXED & OPTIMIZED)
  // ---------------------------------------------------------------------------
  const animateOnScroll = () => {
    const elements    = document.querySelectorAll('.skill-badge');
    const windowHeight = window.innerHeight;

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      
      // Анімуємо тільки якщо елемент увійшов у в'юпорт і ЩЕ НЕ має opacity '1'
      if (rect.top < windowHeight * 0.9 && el.style.opacity !== '1') {
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;

        requestAnimationFrame(() => {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
        });
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll, { passive: true });
  // Запуск через невеликий таймаут після повного рендерингу базових стилей
  setTimeout(animateOnScroll, 400);


  // ---------------------------------------------------------------------------
  // Current Year in Footer
  // ---------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
