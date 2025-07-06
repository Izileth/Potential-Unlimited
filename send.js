// WhatsApp Form Submission with Visual Feedback
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());

      // Validate required fields
      if (!formValues.nome || !formValues.email || !formValues.mensagem || !formValues.assunto || formValues.assunto.trim() === "") {
        showFeedback(
          "Por favor, preencha todos os campos obrigatórios",
          "error"
        );
        return;
      }

      // Validate email format
      if (!validateEmail(formValues.email)) {
        showFeedback("Por favor, insira um email válido", "error");
        return;
      }

      // Show loading state
      const submitButton = form.querySelector('[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = `
                    <span class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                    </span>
                `;

      // Format WhatsApp message
      const phoneNumber = "5591993961874"; // Replace with your WhatsApp number
      const message = `
                    *Nova mensagem do site da Potencial Sem Limites:*
                    
                *Oi!, meu nome é* ${formValues.nome}
                    * & meu email é:* ${formValues.email}
                    ${
                      formValues.assunto
                        ? `*O assunto em questão é:* ${formValues.assunto}\n`
                        : ""
                    }
                    *& Eu tenho a seguinte mensagem:*
                    ${formValues.mensagem}
                `;

      // Encode for URL
      const encodedMessage = encodeURIComponent(message);

      // Create overlay
      const overlay = createOverlay();

      // Simulate processing delay (1-1.5s)
      setTimeout(() => {
        // Redirect to WhatsApp
        window.open(
          `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
          "_blank"
        );

        // Show success feedback
        showFeedback("Mensagem enviada com sucesso!", "success", form);

        // Reset form after delay
        setTimeout(() => {
          form.reset();
          overlay.remove();
        }, 2000);
      }, 1000 + Math.random() * 500);
    });
  });

  // Helper functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "form-overlay";
    overlay.className =
      "fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50 transition-opacity duration-500 opacity-0";

    const spinner = document.createElement("div");
    spinner.className =
      "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white";

    overlay.appendChild(spinner);
    document.body.appendChild(overlay);

    // Trigger fade in
    setTimeout(() => {
      overlay.classList.remove("opacity-0");
      overlay.classList.add("opacity-100");
    }, 10);

    return overlay;
  }

  function showFeedback(message, type, form = null) {
    // Remove existing feedback if any
    const existingFeedback = document.querySelector(".form-feedback");
    if (existingFeedback) existingFeedback.remove();

    const feedback = document.createElement("div");
    feedback.className = `form-feedback fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-500 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white`;
    feedback.textContent = message;

    // Start hidden and slide in
    feedback.style.opacity = "0";
    feedback.style.transform = "translateX(100%)";
    document.body.appendChild(feedback);

    // Animate in
    setTimeout(() => {
      feedback.style.opacity = "1";
      feedback.style.transform = "translateX(0)";
    }, 10);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      feedback.style.opacity = "0";
      setTimeout(() => feedback.remove(), 500);
    }, 5000);

    // Reset form button if success
    if (type === "success" && form) {
      const submitButton = form.querySelector('[type="submit"]');
      submitButton.disabled = false;
      submitButton.innerHTML = "Enviar Mensagem";
    }
  }
});
