document.getElementById("calculoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const investimentoInicial = parseFloat(document.getElementById("investimento_inicial").value);
    const taxaLucro = parseFloat(document.getElementById("taxa_lucro").value) / 100;
    const prazoTipo = document.getElementById("prazo_tipo").value;
    const objetivoRetorno = parseFloat(document.getElementById("objetivo_retorno").value);
    const taxaCambio = parseFloat(document.getElementById("taxa_cambio").value) || 1;
    const aportesMensais = parseFloat(document.getElementById("aportes_mensais").value) || 0;

    let prazoMeses = prazoTipo === "quinzenal" ? 0.5 : 1; // 0.5 mês para quinzenal e 1 mês para mensal

    let valorAtual = investimentoInicial;
    let reinvestimentos = 0;
    let totalMeses = 0;

    while (valorAtual < objetivoRetorno) {
        valorAtual *= (1 + taxaLucro);
        valorAtual += aportesMensais;
        reinvestimentos++;
        totalMeses += prazoMeses; // Incrementa em meses
    }

    const rendimentoTotalReais = valorAtual * taxaCambio;

    const diasRestantes = Math.round((totalMeses % 1) * 30); // Converte a parte fracionária de meses em dias

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h2>Resultados</h2>
        <p>Valor Atual: R$ ${valorAtual.toFixed(2)}</p>
        <p>Rendimento Total em Reais: R$ ${rendimentoTotalReais.toFixed(2)}</p>
        <p>Total de Reinvestimentos: ${reinvestimentos}</p>
        <p>Total de Meses: ${Math.floor(totalMeses)}</p> <!-- Total de meses inteiros -->
        <p>Dias Restantes: ${diasRestantes}</p>
        <p>Nota: Os valores podem variar devido à variação das taxas dos traders.</p>
    `;
});
