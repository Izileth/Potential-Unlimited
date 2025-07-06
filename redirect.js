// External Redirect with Loading Animation
function handleExternalRedirect(event, url, delay = 800) {
  event.preventDefault();

  // Create overlay element if it doesn't exist
  let overlay = document.getElementById("redirect-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "redirect-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 1.0)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.5s ease-out";

    // Create loading spinner
    const spinner = document.createElement("div");
    spinner.style.width = "50px";
    spinner.style.height = "50px";
    spinner.style.border = "3px solid rgba(255, 255, 255, 0.3)";
    spinner.style.borderRadius = "50%";
    spinner.style.borderTopColor = "#fff";
    spinner.style.animation = "spin 1s ease-in-out infinite";

    // Create loading text
    const text = document.createElement("p");
    text.textContent = "Carregando...";
    text.style.color = "white";
    text.style.marginTop = "20px";
    text.style.fontFamily = "Inter, sans-serif";
    text.style.letterSpacing = "1px";

    overlay.appendChild(spinner);
    overlay.appendChild(text);
    document.body.appendChild(overlay);

    // Add spin animation
    const style = document.createElement("style");
    style.textContent = `
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
    document.head.appendChild(style);
  }

  // Show overlay with fade in
  overlay.style.opacity = "1";

  // Get the clicked button
  const button = event.currentTarget;

  // Add active class to button for visual feedback
  button.classList.add("redirecting");

  // Simulate loading delay
  setTimeout(() => {
    // Add fade out effect to overlay
    overlay.style.opacity = "0";

    // After fade out completes, redirect
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  }, delay);
}

// Apply to all elements with data-redirect attribute
document.querySelectorAll("[data-redirect]").forEach((element) => {
  element.addEventListener("click", function (e) {
    const url = this.getAttribute("data-redirect");
    const delay = parseInt(this.getAttribute("data-redirect-delay")) || 800;
    handleExternalRedirect(e, url, delay);
  });
});

// Optional: Add CSS for button states
const buttonStyles = document.createElement("style");
buttonStyles.textContent = `
        .redirecting {
            position: relative;
            overflow: hidden;
        }
        
        .redirecting::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 1.0);
            animation: redirecting-shimmer 1.5s infinite;
        }
        
        @keyframes redirecting-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
document.head.appendChild(buttonStyles);
