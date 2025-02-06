// Capturar o formulário e o botão de envio
const form = document.querySelector('form');

// Adicione um evento de envio ao formulário
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o reload da página

    // Coleta os valores dos campos
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('message').value;

    // Cria a mensagem que será enviada
    const texto = `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`;

    // Codifica a mensagem para uso em URL
    const textoCodificado = encodeURIComponent(texto);

    // Número de telefone para o qual a mensagem será enviada
    const numeroTelefone = '5591993961874'; // Substitua pelo seu número de telefone

    // Cria o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroTelefone}?text=${textoCodificado}`;

    // Abre o link do WhatsApp em uma nova aba
    window.open(linkWhatsApp, '_blank');
});