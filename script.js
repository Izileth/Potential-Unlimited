const signInBtn = document.getElementById('signIn');

signInBtn.addEventListener('click', () => {
    window.open("https://tailwindcss.com/docs/place-content");

    event.preventDefault(); // Prevent the page from refreshing when the button is clicked.

    signInBtn.disabled = true; // Disable the button while the new tab is loading.

    setTimeout(() => {
        signInBtn.disabled = false; // Re-enable the button after 5 seconds.
    }, 5000); // 5 seconds delay before re-enabling the button.
});

const logOutBtn = document.getElementById('logOut');

logOutBtn.addEventListener('click', () => {
    window.open('https://www.tiktok.com/@potencial_marco_zero');

    event.preventDefault(); // Prevent the page from refreshing when the button is clicked.

    logOutBtn.disabled = true; // Disable the button while the new tab is loading.

    setTimeout(() => {
        signInBtn.disabled = false; // Re-enable the button after 5 seconds.
    }, 5000); // 5 seconds delay before re-enabling the button.
});

const nextInBtn = document.getElementById('nextIn');


nextInBtn.addEventListener('click', () => {
    // Seleciona o elemento pelo ID
    const destino = document.getElementById("section");
    
    // Scroll suave até o elemento
    destino.scrollIntoView({ behavior: "smooth" });

    nextInBtn.disabled = true; // Disable the button while the new tab is loading.

    setTimeout(() => {
        signInBtn.disabled = false; // Re-enable the button after 5 seconds.
    }, 2500); // 2.5 seconds delay before re-enabling the button.
});
