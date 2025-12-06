// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href !== '#') {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Bio section typewriter scroll reveal effect
const bioText = document.querySelector('.bio-text');

if (bioText) {
  // Get original text
  const originalText = bioText.textContent;
  
  // Wrap each character in a span
  const wrappedText = originalText.split('').map((char, index) => {
    return `<span class="bio-char" data-index="${index}" style="color: rgba(0, 0, 0, 0.2);">${char}</span>`;
  }).join('');
  
  bioText.innerHTML = wrappedText;
  
  const bioChars = document.querySelectorAll('.bio-char');
  const totalChars = bioChars.length;
  
  const typewriterOnScroll = () => {
    const rect = bioText.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress (0 to 1)
    const startReveal = windowHeight;          // starts when element is at bottom of screen
    const endReveal = windowHeight * 0.2;      // fully revealed when at top 20% of screen
    const progress = (startReveal - rect.top) / (startReveal - endReveal);
    
    // Clamp progress between 0 and 1
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    // Calculate how many characters should be visible
    const visibleChars = Math.ceil(clampedProgress * totalChars);
    
    // Update each character's opacity
    bioChars.forEach((char, index) => {
      if (index < visibleChars) {
        char.style.color = `rgba(0, 0, 0, 1)`;  // fully visible (black)
      } else {
        char.style.color = `rgba(0, 0, 0, 0.2)`;  // greyed out
      }
    });
  };
  
  window.addEventListener('scroll', typewriterOnScroll);
  typewriterOnScroll();  // initial call
}

// Portfolio overlay effect
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.portfolio-item');
  if (items.length === 0) return;

  items.forEach(item => {
    const descEl = item.querySelector('.portfolio-desc');
    if (!descEl) return;

    const overlay = document.createElement('div');
    overlay.className = 'portfolio-overlay';
    overlay.innerHTML = `<p class="portfolio-desc">${descEl.textContent}</p>`;
    item.appendChild(overlay);
  });

  // Touch support
  if ('ontouchstart' in window) {
    const grid = document.querySelector('.portfolio-grid');
    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.portfolio-item');
      if (!item) return;
      if (!item.classList.contains('active')) {
        e.preventDefault();
        grid.querySelectorAll('.portfolio-item.active').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.portfolio-item')) {
        const grid = document.querySelector('.portfolio-grid');
        grid.querySelectorAll('.portfolio-item.active').forEach(i => i.classList.remove('active'));
      }
    });
  }
});