document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       PASSO 3: COMPORTAMENTO E INTERAÇÃO (ACCORDION)
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const isExpanded = header.getAttribute("aria-expanded") === "true";
            const panel = document.getElementById(header.getAttribute("aria-controls"));

            // Fecha todos os painéis abertos de forma limpa (Opcional - Estilo Accordion Único)
            accordionHeaders.forEach(otherHeader => {
                otherHeader.setAttribute("aria-expanded", "false");
                document.getElementById(otherHeader.getAttribute("aria-controls")).hidden = true;
            });

            // Alterna o estado do item clicado
            if (!isExpanded) {
                header.setAttribute("aria-expanded", "true");
                panel.hidden = false;
            } else {
                header.setAttribute("aria-expanded", "false");
                panel.hidden = true;
            }
        });
    });

    /* ==========================================================================
       PASSO 4: SISTEMA AVANÇADO DE ACESSIBILIDADE
       ========================================================================== */
    
    // 1. Controle de tamanho de Fonte Fluida Progressiva
    let currentScale = 100; // Porcentagem do tamanho base
    const rootElement = document.documentElement;
    const btnAumentar = document.getElementById("btn-aumentar-fonte");
    const btnDiminuir = document.getElementById("btn-diminuir-fonte");

    btnAumentar.addEventListener("click", () => {
        if (currentScale < 140) { // Limite máximo seguro
            currentScale += 10;
            rootElement.style.setProperty("--font-base-size", `${currentScale / 100}rem`);
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if (currentScale > 80) { // Limite mínimo seguro
            currentScale -= 10;
            rootElement.style.setProperty("--font-base-size", `${currentScale / 100}rem`);
        }
    });

    // 2. Alternância de Modo de Contraste
    const btnContraste = document.getElementById("btn-contraste");
    btnContraste.addEventListener("click", () => {
        document.body.classList.toggle("alto-contraste");
    });

    // 3. Leitura por Voz (Text-to-Speech API)
    const btnOuvir = document.getElementById("btn-ouvir");
    const btnPararOuvir = document.getElementById("btn-parar-ouvir");
    let synth = window.speechSynthesis;
    let utterance = null;

    btnOuvir.addEventListener("click", () => {
        // Cancela qualquer leitura em andamento antes de iniciar outra
        if (synth.speaking) {
            synth.cancel();
        }

        // Seleciona cirurgicamente apenas os elementos de texto do escopo principal
        const elementosTexto = document.querySelectorAll("#conteudo-principal p, #conteudo-principal h2");
        let textoCompleto = "";

        elementosTexto.forEach(el => {
            textoCompleto += el.textContent + " ";
        });

        if (textoCompleto.trim() !== "") {
            utterance = new SpeechSynthesisUtterance(textoCompleto);
            utterance.lang = "pt-BR";
            synth.speak(utterance);
        }
    });

    btnPararOuvir.addEventListener("click", () => {
        if (synth.speaking) {
            synth.cancel();
        }
    });


    /* ==========================================================================
       CONTEÚDOS INTERATIVOS COMPLEMENTARES (LÓGICA)
       ========================================================================== */

    // Submissão do Formulário de Inscrição
    const formInscricao = document.getElementById("cadastro-seminario");
    formInscricao.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Inscrição realizada com sucesso! Você receberá as credenciais do seminário por e-mail.");
        formInscricao.reset();
    });

    // Fluxo Dinâmico da Caixa de Comentários
    const formComentario = document.getElementById("form-comentario");
    const caixaTexto = document.getElementById("comentario");
    const listaComentarios = document.getElementById("lista-comentarios");

    formComentario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const texto = caixaTexto.value.trim();
        if (texto) {
            const novoComentario = document.createElement("div");
            novoComentario.classList.add("comentario-item");
            
            // Tratamento contra injeção de scripts maliciosos (XSS)
            novoComentario.textContent = `Anonimato Rural: "${texto}"`;
            
            listaComentarios.prepend(novoComentario);
            caixaTexto.value = "";
        }
    });
});