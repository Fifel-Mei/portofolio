/**
 * ============================================
 * FIFEL PORTFOLIO - MAIN SCRIPT
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 0. Theme Management (Light/Dark Mode) ---
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const themeColorMeta = document.getElementById('themeColorMeta');

  // Check Local Storage for saved theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeColorMeta.setAttribute('content', '#0a0a0f');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeColorMeta.setAttribute('content', '#f8f9fa');
  }

  // Toggle Theme Function
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      themeColorMeta.setAttribute('content', '#f8f9fa');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      themeColorMeta.setAttribute('content', '#0a0a0f');
    }
  });


  // --- 1. Page Loader ---
  const pageLoader = document.getElementById('pageLoader');
  setTimeout(() => {
    pageLoader.classList.add('hidden');
  }, 800);

  // --- 2. Custom Cursor Glow ---
  const cursorGlow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  });

  // --- 3. Navbar Scroll Effect & Active Link ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar__link');

  window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link update based on scroll position
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });

  // --- 4. Mobile Menu Toggle ---
  const navBurger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu a');

  function toggleMenu() {
    navBurger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = '';
    }
  }

  navBurger.addEventListener('click', toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // --- 5. Typing Effect ---
  const typedTextSpan = document.getElementById('typedText');
  const textArray = ["Mahasiswa Informatika", "Web Developer", "Laravel Enthusiast", "UI/UX Explorer"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  // Start typing effect
  setTimeout(type, 1500);

  // --- 6. Stats Counter Animation ---
  const stats = document.querySelectorAll('.stat__number');
  let hasCounted = false;

  function animateStats() {
    stats.forEach((stat) => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000; // ms
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.innerText = Math.ceil(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          stat.innerText = target + suffix;
        }
      };
      updateCounter();
    });
  }

  // Check if stats section is in view
  const heroSection = document.getElementById('hero');
  window.addEventListener('scroll', () => {
    if (!hasCounted && window.scrollY > 50) {
      animateStats();
      hasCounted = true;
    }
  });

  // --- 7. Project Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- 8. Certificate Modal ---
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".modal__close");
  const certItems = document.querySelectorAll(".cert-item");

  if(certItems.length > 0) {
    certItems.forEach(item => {
      item.addEventListener("click", function() {
        modal.classList.add("active");
        modalImg.src = this.getAttribute("data-img");
      });
    });
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
      if(e.target === modal) modal.classList.remove("active");
    });
  }

  // --- 9. Testimonial Slider ---
  const slides = document.querySelectorAll(".testimonial__slide");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    indicators.forEach(i => i.classList.remove("active"));
    slides[index].classList.add("active");
    indicators[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  if(slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);
    indicators.forEach((ind, i) => {
      ind.addEventListener("click", () => {
        clearInterval(slideInterval);
        showSlide(i);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // --- 10. Contact Form Validation & Handling ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if(!name) { alert("Nama wajib diisi."); return; }
      if(!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { alert("Email harus valid."); return; }
      if(!message) { alert("Pesan tidak boleh kosong."); return; }

      const submitBtn = contactForm.querySelector('.btn--submit');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Mengirim... <i class="fa-solid fa-spinner fa-spin" style="margin-left: 8px;"></i>';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        formSuccess.style.display = 'flex';
      }, 1500);
    });
  }

  // --- 9. Scroll to Top Button ---
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- 10. Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('revealed');
        
        // Trigger progress bars if inside this element
        const progressBars = entry.target.querySelectorAll('.skill-progress__bar-fill');
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        });

        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // --- 11. Footer Auto Year ---
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
