// Smooth Scroll Function with Enhanced Effects
function smoothScrollTo(targetId) {
  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;

  const headerHeight = document.querySelector("header").offsetHeight;
  const targetPosition =
    targetElement.getBoundingClientRect().top +
    window.pageYOffset -
    headerHeight;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800; // milliseconds
  let startTime = null;

  // Easing function for smooth acceleration/deceleration
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  // Animation function
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  // Add a subtle opacity effect to the target section
  if (targetElement.classList.contains("fade-in-observed")) {
    targetElement.style.opacity = "0";
    targetElement.style.transform = "translateY(20px)";
  }

  // Start the animation
  requestAnimationFrame(animation);

  // After scroll completes, trigger a focus effect
  setTimeout(() => {
    if (targetElement.classList.contains("fade-in-observed")) {
      targetElement.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
      targetElement.style.opacity = "1";
      targetElement.style.transform = "translateY(0)";

      // Remove the inline styles after animation completes
      setTimeout(() => {
        targetElement.style.transition = "";
        targetElement.style.opacity = "";
        targetElement.style.transform = "";
      }, 600);
    }

    // Add a temporary highlight effect
    targetElement.classList.add("highlight-section");
    setTimeout(() => {
      targetElement.classList.remove("highlight-section");
    }, 2000);
  }, duration);
}

// Apply to all buttons with data-scroll attribute
document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("data-scroll");
    smoothScrollTo(targetId);

    // Close mobile menu if open
    const mobileSidebar = document.getElementById("mobileSidebar");
    if (!mobileSidebar.classList.contains("hidden")) {
      const sidebarContent = document.getElementById("sidebarContent");
      sidebarContent.classList.add("translate-x-full");
      setTimeout(() => {
        mobileSidebar.classList.add("hidden");
      }, 300);
    }
  });
});

// Apply to all anchor links that point to sections
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Skip if it's a different anchor behavior
    if (this.hasAttribute("data-scroll") || this.getAttribute("href") === "#")
      return;

    e.preventDefault();
    const targetId = this.getAttribute("href");
    smoothScrollTo(targetId);

    // Close mobile menu if open
    const mobileSidebar = document.getElementById("mobileSidebar");
    if (!mobileSidebar.classList.contains("hidden")) {
      const sidebarContent = document.getElementById("sidebarContent");
      sidebarContent.classList.add("translate-x-full");
      setTimeout(() => {
        mobileSidebar.classList.add("hidden");
      }, 300);
    }
  });
});

// Add highlight effect style
const style = document.createElement("style");
style.textContent = `
        .highlight-section {
            animation: highlight-fade 2s ease-out;
        }
        
        @keyframes highlight-fade {
            0% { background-color: rgba(0, 0, 0, 0.05); }
            100% { background-color: transparent; }
        }
    `;
document.head.appendChild(style);