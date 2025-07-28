// Mobile navigation functionality
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const mobileNav = document.getElementById("mobileNav");
const overlay = document.getElementById("overlay");

function openMenu() {
  mobileNav.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileNav.classList.remove("open");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Carousel functionality
const carouselInner = document.querySelector(".carousel-inner");
const prevBtn = document.querySelector(".carousel-control.prev");
const nextBtn = document.querySelector(".carousel-control.next");
const indicators = document.querySelectorAll(".indicator");
const slides = carouselInner.querySelectorAll("img");
const totalSlides = slides.length;
let currentSlide = 0;
let autoSlideInterval;

function updateSlidePosition() {
  carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.remove("active");
    if (index === currentSlide) {
      indicator.classList.add("active");
    }
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateSlidePosition();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlidePosition();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Add click events to indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    goToSlide(index);
  });
});

// Auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

startAutoSlide();

// Pause auto slide when hovering over carousel
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);

// Back to top button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Image modal functionality
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imgSrc = item.querySelector("img").src;
    modalImg.src = imgSrc;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
});

// Set first nav link as active initially
document.querySelector(".desktop-nav a").classList.add("active");
