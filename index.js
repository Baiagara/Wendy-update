document.addEventListener("DOMContentLoaded", () => {
  initCounters();
  initSwiper();
  initVolunteerStorySlider();
  initHamburgerMenu();
});

function initCounters() {
  const counters = document.querySelectorAll(".count");
  const speed = 200;

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / speed;

    const updateCount = () => {
      const count = +counter.innerText;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    requestAnimationFrame(updateCount);
  });
}

function initSwiper() {
  new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 40 },
      1024: { slidesPerView: 3, spaceBetween: 50 },
    },
  });
}

function initVolunteerStorySlider() {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".volunteer-story");
  const prevBtn = document.querySelector(".slider-nav.prev");
  const nextBtn = document.querySelector(".slider-nav.next");

  let currentIndex = 0;
  const slideWidth = slides[0].offsetWidth + 20;
  const totalSlides = slides.length;

  function moveSlider(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  let intervalId = setInterval(() => moveSlider(currentIndex + 1), 5000);

  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(() => moveSlider(currentIndex + 1), 5000);
  }

  prevBtn.addEventListener("click", () => {
    moveSlider(currentIndex - 1);
    resetInterval();
  });

  nextBtn.addEventListener("click", () => {
    moveSlider(currentIndex + 1);
    resetInterval();
  });

  slider.addEventListener("mouseenter", () => clearInterval(intervalId));
  slider.addEventListener("mouseleave", resetInterval);
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navBar = document.querySelector(".nav-bar");
  const body = document.body;

  hamburger.addEventListener("click", function () {
    navBar.classList.toggle("active");
    hamburger.classList.toggle("active");

    // Toggle body overflow to prevent scrolling when menu is open
    body.style.overflow = navBar.classList.contains("active") ? "hidden" : "";

    // Create or remove overlay
    if (navBar.classList.contains("active")) {
      const overlay = document.createElement("div");
      overlay.classList.add("menu-overlay");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
      overlay.style.zIndex = "999";
      body.appendChild(overlay);

      overlay.addEventListener("click", function () {
        navBar.classList.remove("active");
        hamburger.classList.remove("active");
        body.style.overflow = "";
        body.removeChild(overlay);
      });
    } else {
      const overlay = document.querySelector(".menu-overlay");
      if (overlay) {
        body.removeChild(overlay);
      }
    }
  });
});
