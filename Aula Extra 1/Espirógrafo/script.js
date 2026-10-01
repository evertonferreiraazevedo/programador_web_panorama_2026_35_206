const canvas = document.getElementById('espiroCanvas');
const ctx = canvas.getContext('2d');

// Elementos de Entrada (Sliders)
const sliderR = document.getElementById('raioR');
const sliderr = document.getElementById('raior');
const sliderd = document.getElementById('distd');
const sliderVelocidade = document.getElementById('sliderVelocidade');
const sliderRed = document.getElementById('sliderRed');
const sliderGreen = document.getElementById('sliderGreen');
const sliderBlue = document.getElementById('sliderBlue');
const sliderAlpha = document.getElementById('sliderAlpha');

// Botão Limpar
const btnLimpar = document.getElementById('btnLimpar');

// Mostradores de Texto
const valR = document.getElementById('valR');
const valr = document.getElementById('valr');
const vald = document.getElementById('vald');
const valVelocidade = document.getElementById('valVelocidade');
const valRed = document.getElementById('valRed');
const valGreen = document.getElementById('valGreen');
const valBlue = document.getElementById('valBlue');
const valAlpha = document.getElementById('valAlpha');

// Centro geométrico do canvas
const cx = canvas.width / 2;
const cy = canvas.height / 2;

// Variáveis de controle de desenho contínuo
let t = 0;
let xAnterior = null;
let yAnterior = null;
let idAnimacao = null;

function atualizarInterfaceTextual() {
    valR.textContent = sliderR.value;
    valr.textContent = sliderr.value;
    vald.textContent = sliderd.value;
    valVelocidade.textContent = sliderVelocidade.value;
    valRed.textContent = sliderRed.value;
    valGreen.textContent = sliderGreen.value;
    valBlue.textContent = sliderBlue.value;
    valAlpha.textContent = sliderAlpha.value;
}

// Loop contínuo de desenho incremental
function desenharFluxoContinuo() {
    // Captura os valores EXATOS no milissegundo atual
    const R = Number(sliderR.value);
    const r = Number(sliderr.value);
    const d = Number(sliderd.value);
    const velocidade = Number(sliderVelocidade.value);
    const red = sliderRed.value;
    const green = sliderGreen.value;
    const blue = sliderBlue.value;
    const alpha = sliderAlpha.value;

    // Configura a cor atual da ponta da caneta
    ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";

    // O loop 'for' agora usa o valor do slider para definir quantos segmentos desenha por frame
    for (let i = 0; i < velocidade; i++) {
        // Equações matemáticas clássicas do hipotrocóide
        const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) * t) / r);
        const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) * t) / r);

        // Se for o início absoluto ou após limpar a tela, define o ponto inicial
        if (xAnterior === null || yAnterior === null) {
            xAnterior = cx + x;
            yAnterior = cy + y;
        }

        ctx.beginPath();
        ctx.moveTo(xAnterior, yAnterior);
        ctx.lineTo(cx + x, cy + y);
        ctx.stroke();

        // Atualiza a posição anterior com as coordenadas atuais
        xAnterior = cx + x;
        yAnterior = cy + y;

        // Avança o tempo/ângulo de forma constante para manter o traço suave
        t += 0.03;
    }

    idAnimacao = requestAnimationFrame(desenharFluxoContinuo);
}

// Evento do botão Limpar
btnLimpar.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    xAnterior = null;
    yAnterior = null;
});

// Impede riscos cortando o canvas no meio ao mudar bruscamente a geometria
[sliderR, sliderr, sliderd].forEach(input => {
    input.addEventListener('input', () => {
        xAnterior = null;
        yAnterior = null;
    });
});

// Ouvintes para atualizar as labels textuais
[sliderR, sliderr, sliderd, sliderVelocidade, sliderRed, sliderGreen, sliderBlue, sliderAlpha].forEach(input => {
    input.addEventListener('input', atualizarInterfaceTextual);
});

// Inicialização
atualizarInterfaceTextual();
idAnimacao = requestAnimationFrame(desenharFluxoContinuo);
