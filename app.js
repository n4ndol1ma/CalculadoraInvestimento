document.getElementById("calculoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const investimentoInicial = parseFloat(document.getElementById("investimento_inicial").value);
    const taxaLucro = parseFloat(document.getElementById("taxa_lucro").value) / 100;
    const prazoTipo = document.getElementById("prazo_tipo").value;
    const objetivoRetorno = parseFloat(document.getElementById("objetivo_retorno").value);
    const taxaCambio = parseFloat(document.getElementById("taxa_cambio").value) || 1;
    const aportesMensais = parseFloat(document.getElementById("aportes_mensais").value) || 0;

    let prazoDias = prazoTipo === "quinzenal" ? 15 : 30;

    let valorAtual = investimentoInicial;
    let reinvestimentos = 0;
    let totalDias = 0;

    while (valorAtual < objetivoRetorno) {
        valorAtual *= (1 + taxaLucro);
        valorAtual += aportesMensais;
        reinvestimentos++;
        totalDias += prazoDias;
    }

    const rendimentoTotalReais = valorAtual * taxaCambio;

    const totalMeses = Math.floor(totalDias / 30);
    const diasRestantes = totalDias % 30;

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h2>Resultados</h2>
        <p>Valor Atual: R$ ${valorAtual.toFixed(2)}</p>
        <p>Rendimento Total em Reais: R$ ${rendimentoTotalReais.toFixed(2)}</p>
        <p>Total de Reinvestimentos: ${reinvestimentos}</p>
        <p>Total de Dias: ${totalDias}</p>
        <p>Total de Meses: ${totalMeses}</p>
        <p>Dias Restantes: ${diasRestantes}</p>
        <p>Nota: Os valores podem variar devido à variação das taxas dos traders.</p>
    `;
});
