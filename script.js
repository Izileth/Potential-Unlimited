// Scroll Progress Indicator
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + "%";
});



// Header Scroll Effect
const header = document.getElementById("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("glass-effect");
    header.classList.add("glass-effect");
    return;
  }

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scroll Down
    header.classList.remove("glass-effect");
  } else {
    // Scroll Up
    header.classList.add("glass-effect");
  }

  lastScroll = currentScroll;
});


// Redirect Button 

