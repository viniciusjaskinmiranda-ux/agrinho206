/**
 * PROJETO: Concurso Agrinho 2026
 * FUNÇÃO: Comportamento, Interatividade e Acessibilidade Avançada
 * EQUIPE: Engenharia de Front-End e Especialistas em UI/UX/Acessibilidade
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar módulos principais
    initAccordion();
    initAccessibilityMenu();
    initFormHandlers();
});

/**
 * PASSO 3: COMPORTAMENTO E INTERAÇÃO - SISTEMA EXPANSÍVEL (ACCORDION)
 */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Alterna o estado do item atual
            header.setAttribute('aria-expanded', !isExpanded);
            content.setAttribute('aria-hidden', isExpanded);

            if (!isExpanded) {
                content.style.maxHeight = `${content.scrollHeight}px`;
                item.classList.add('active');
            } else {
                content.style.maxHeight = '0px';
                item.classList.remove('active');
            }
        });

        // Acessibilidade por teclado (Enter e Espaço)
        header.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                header.click();
            }
        });
    });
}

/**
 * PASSO 4: SISTEMA AVANÇADO DE ACESSIBILIDADE
 */
function initAccessibilityMenu() {
    // Seletores dos botões do menu flutuante
    const btnAumentarTexto = document.getElementById('acc-aumentar');
    const btnDiminuirTexto = document.getElementById('acc-diminuir');
    const btnContraste = document.getElementById('acc-contraste');
    const btnOuvir = document.getElementById('acc-ouvir');
    const btnPararOuvir = document.getElementById('acc-parar');

    // Elemento alvo do redimensionamento de fonte (Seção Principal)
    const mainContent = document.querySelector('main');
    let fontSizeFactor = 100; // Percentual inicial da fonte

    // Configuração de síntese de voz (Text-to-Speech)
    const synth = window.speechSynthesis;
    let voiceUtterance = null;

    // 4.1 Aumento e diminuição progressiva do tamanho da fonte
    if (btnAumentarTexto && btnDiminuirTexto && mainContent) {
        btnAumentarTexto.addEventListener('click', () => {
            if (fontSizeFactor < 150) { // Limite máximo seguro
                fontSizeFactor += 10;
                mainContent.style.fontSize = `${fontSizeFactor}%`;
            }
        });

        btnDiminuirTexto.addEventListener('click', () => {
            if (fontSizeFactor > 80) { // Limite mínimo seguro
                fontSizeFactor -= 10;
                mainContent.style.fontSize = `${fontSizeFactor}%`;
            }
        });
    }

    // 4.2 Alternância de modo de alto contraste (Claro/Escuro)
    if (btnContraste) {
        btnContraste.addEventListener('click', () => {
            document.body.classList.toggle('alto-contraste');
            const isDark = document.body.classList.contains('alto-contraste');
            btnContraste.setAttribute('aria-pressed', isDark);
        });
    }

    // 4.3 Leitura por voz (SpeechSynthesis API)
    if (btnOuvir && btnPararOuvir) {
        btnOuvir.addEventListener('click', () => {
            // Se já estiver falando, interrompe antes de reiniciar
            if (synth.speaking) {
                synth.cancel();
            }

            // Seleciona sistematicamente apenas tags textuais (p, h2) dentro do conteúdo principal
            const textElements = document.querySelectorAll('main h2, main p');
            let textToRead = '';

            textElements.forEach(element => {
                // Ignora elementos ocultos ou de controle caso existam dentro do escopo
                if (element.offsetWidth > 0 && element.offsetHeight > 0) {
                    textToRead += `${element.innerText}. `;
                }
            });

            if (textToRead.trim() !== '') {
                voiceUtterance = new SpeechSynthesisUtterance(textToRead);
                voiceUtterance.lang = 'pt-BR';
                voiceUtterance.rate = 1.0; // Velocidade padrão

                // Feedback visual ou ativação de estado ativo
                voiceUtterance.onstart = () => btnOuvir.classList.add('lendo');
                voiceUtterance.onend = () => btnOuvir.classList.remove('lendo');
                voiceUtterance.onerror = () => btnOuvir.classList.remove('lendo');

                synth.speak(voiceUtterance);
            }
        });

        // Botão visível para interromper/parar a leitura de voz imediatamente
        btnPararOuvir.addEventListener('click', () => {
            if (synth.speaking) {
                synth.cancel();
                btnOuvir.classList.remove('lendo');
            }
        });
    }
}

/**
 * COMPONENTES INTERATIVOS LADO A LADO - FORMULÁRIO E COMENTÁRIOS
 */
function initFormHandlers() {
    const formInscricao = document.getElementById('form-seminario');
    const formComentarios = document.getElementById('form-comentarios');
    const listaComentarios = document.getElementById('lista-comentarios');

    // Manipulação do Formulário de Inscrição
    if (formInscricao) {
        formInscricao.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Captura dinâmica dos inputs obrigatórios
            const dados = {
                nome: document.getElementById('inp-nome')?.value,
                email: document.getElementById('inp-email')?.value,
                cidade: document.getElementById('inp-cidade')?.value,
                estado: document.getElementById('inp-estado')?.value,
                pais: document.getElementById('inp-pais')?.value
            };

            // Simulação de envio com validação nativa de sucesso
            console.log('Inscrição realizada com sucesso:', dados);
            alert(`Obrigado pela inscrição, ${dados.nome}! Você receberá os detalhes do seminário por e-mail.`);
            formInscricao.reset();
        });
    }

    // Área de Comentários Dinâmica
    if (formComentarios && listaComentarios) {
        formComentarios.addEventListener('submit', (e) => {
            e.preventDefault();

            const txtComentario = document.getElementById('txt-comentario');
            const texto = txtComentario?.value.trim();

            if (texto) {
                // Criação do elemento de