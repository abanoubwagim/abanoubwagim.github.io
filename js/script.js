function createParticles() {
  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';

    const keyframes = `
      @keyframes float${i} {
       0%, 100% { transform: translate(0, 0); }
       25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
       50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
       75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
       }
        `;              

    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    particle.style.animation = `float${i} ${Math.random() * 15 + 10}s infinite`;
    document.body.appendChild(particle);
  }
}

createParticles();

function reveal() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal();

const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('error');
  input.classList.remove('success');
  error.textContent = message;
}

function setSuccess(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('success');
  input.classList.remove('error');
  error.textContent = '';
}

function clearValidation() {
  ['nameInput', 'emailInput', 'subjectInput', 'messageInput'].forEach(id => {
    const input = document.getElementById(id);
    input.classList.remove('error', 'success');
  });
  ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  clearValidation();

  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const subject = document.getElementById('subjectInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  let isValid = true;

  if (name === '') {
    setError('nameInput', 'nameError', 'Please write here your name');
    isValid = false;
  } else if (name.length < 3) {
    setError('nameInput', 'nameError', 'Name must be at least 3 characters');
    isValid = false;
  } else {
    setSuccess('nameInput', 'nameError');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    setError('emailInput', 'emailError', 'Please write here your email');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    setError('emailInput', 'emailError', 'Please enter a valid email address');
    isValid = false;
  } else {
    setSuccess('emailInput', 'emailError');
  }

  if (subject === '') {
    setError('subjectInput', 'subjectError', 'Please write here your subject');
    isValid = false;
  } else if (subject.length < 3) {
    setError('subjectInput', 'subjectError', 'Subject must be at least 3 characters');
    isValid = false;
  } else {
    setSuccess('subjectInput', 'subjectError');
  }

  if (message === '') {
    setError('messageInput', 'messageError', 'Please write here your message');
    isValid = false;
  } else if (message.length < 10) {
    setError('messageInput', 'messageError', 'Message must be at least 10 characters');
    isValid = false;
  } else {
    setSuccess('messageInput', 'messageError');
  }

  if (!isValid) return;

  formStatus.innerHTML = '<div class="loader"></div>';

  // Submit form to FormSubmit
  try {
    const response = await fetch('https://formsubmit.co/abanoubwagim@gmail.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: new FormData(contactForm)
    });

    if (response.ok) {
      formStatus.innerHTML = `
     <div class="alert-custom" style="background: rgba(0, 119, 182, 0.2); border: 1px solid #0077B6; color: #D7E6F3;">
      <i class="fa-solid fa-check-circle me-2"></i>
      Message sent successfully! I'll get back to you soon.
      </div>
      `;
      contactForm.reset();
      clearValidation();
    } else {
      formStatus.innerHTML = `
     <div class="alert-custom" style="background: rgba(231, 76, 60, 0.2); border: 1px solid #e74c3c; color: #D7E6F3;">
     <i class="fa-solid fa-exclamation-circle me-2"></i>
     Something went wrong. Please try again.
     </div>
     `;
    }
  } catch (error) {
    formStatus.innerHTML = `
     <div class="alert-custom" style="background: rgba(231, 76, 60, 0.2); border: 1px solid #e74c3c; color: #D7E6F3;">
     <i class="fa-solid fa-exclamation-circle me-2"></i>
     Network error. Please check your connection.
     </div>
      `;
  }

  setTimeout(() => {
    formStatus.innerHTML = '';
  }, 5000);
});

const track = document.getElementById('projectsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');

let currentIndex = 0;
let allSlides = Array.from(document.querySelectorAll('.project-slide'));
let activeFilter = 'all';

function getSlidesPerView() {
  const width = window.innerWidth;
  if (width >= 992) return 3;
  if (width >= 768) return 2;
  return 1;
}



function getVisibleSlides() {
  if (activeFilter === 'all') {
    return allSlides;
  }
  return allSlides.filter(slide => slide.dataset.category === activeFilter);
}
function rebuildTrack() {
  const visibleSlides = getVisibleSlides();

  track.innerHTML = '';

  visibleSlides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
  });
}

function updateCarousel() {
  const visibleSlides = getVisibleSlides();
  const slidesPerView = getSlidesPerView();

  const slide = track.querySelector('.project-slide');
  const slideWidth = slide.offsetWidth;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const moveX = currentIndex * (slideWidth + gap) * slidesPerView;

  track.style.transform = `translateX(-${moveX}px)`;
  track.style.transition = 'transform 0.6s ease';

  const totalPages = Math.ceil(visibleSlides.length / slidesPerView);
  const maxIndex = totalPages - 1;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;

  updateDots();
  currentSlideSpan.textContent = currentIndex + 1;
  totalSlidesSpan.textContent = totalPages;
}


function createDots() {
  const visibleSlides = getVisibleSlides();
  const slidesPerView = getSlidesPerView();
  dotsContainer.innerHTML = '';
  const totalPages = Math.ceil(visibleSlides.length / slidesPerView);

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  const visibleSlides = getVisibleSlides();
  const slidesPerView = getSlidesPerView();
  const totalPages = Math.ceil(visibleSlides.length / slidesPerView);
  const maxIndex = totalPages - 1;
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

const filterBtns = document.querySelectorAll('.filter-btn');
const filterInfoMessage = document.getElementById('filterInfoMessage');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeFilter = btn.dataset.filter;
    currentIndex = 0;

    if (activeFilter === 'frontend') {
      filterInfoMessage.style.display = 'flex';
    } else {
      filterInfoMessage.style.display = 'none';
    }

    rebuildTrack();

    track.style.transform = 'translateX(0)';

    createDots();
    updateCarousel();
  });
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const visibleSlides = getVisibleSlides();
    const slidesPerView = getSlidesPerView();
    const totalPages = Math.ceil(visibleSlides.length / slidesPerView);
    const maxIndex = totalPages - 1;

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    createDots();
    updateCarousel();
  }, 150);
});

document.addEventListener('keydown', (e) => {
  const visibleSlides = getVisibleSlides();
  const slidesPerView = getSlidesPerView();
  const totalPages = Math.ceil(visibleSlides.length / slidesPerView);
  const maxIndex = totalPages - 1;

  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  isDragging = true;
}, { passive: true });

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  touchEndX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;

  const diff = touchStartX - touchEndX;
  const swipeThreshold = 75;

  if (Math.abs(diff) > swipeThreshold) {
    const visibleSlides = getVisibleSlides();
    const slidesPerView = getSlidesPerView();
    const totalPages = Math.ceil(visibleSlides.length / slidesPerView);
    const maxIndex = totalPages - 1;

    if (diff > 0 && currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    } else if (diff < 0 && currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  touchStartX = 0;
  touchEndX = 0;
});

function init() {
  createDots();
  updateCarousel();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 100);
}
document.getElementById('currentYear').textContent = new Date().getFullYear();
