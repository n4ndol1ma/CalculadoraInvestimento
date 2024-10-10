document.getElementById("calculoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtendo os valores do formulário
    const investimentoInicial = parseFloat(document.getElementById("investimento_inicial").value);
    const taxaLucro = parseFloat(document.getElementById("taxa_lucro").value) / 100;
    const prazoTipo = document.getElementById("prazo_tipo").value;
    const objetivoRetorno = parseFloat(document.getElementById("objetivo_retorno").value);
    const taxaCambio = parseFloat(document.getElementById("taxa_cambio").value) || 1;
    const aportesMensais = parseFloat(document.getElementById("aportes_mensais").value) || 0;

    // Define o número de meses de acordo com o prazo selecionado
    let prazoMeses = prazoTipo === "quinzenal" ? 0.5 : 1;

    let valorAtual = investimentoInicial;
    let reinvestimentos = 0;
    let totalMeses = 0;

    // Calcula o valor acumulado até atingir o objetivo de retorno
    while (valorAtual < objetivoRetorno) {
        valorAtual *= (1 + taxaLucro);
        valorAtual += aportesMensais;
        reinvestimentos++;
        totalMeses += prazoMeses;
    }

    // Converte o valor total para reais
    const rendimentoTotalReais = valorAtual * taxaCambio;

    // Calcula dias restantes a partir da parte fracionária dos meses
    const diasRestantes = Math.round((totalMeses % 1) * 30);

    // Exibe os resultados no HTML
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h2>Resultados</h2>
        <p>Valor Atual: R$ ${valorAtual.toFixed(2)}</p>
        <p>Rendimento Total em Reais: R$ ${rendimentoTotalReais.toFixed(2)}</p>
        <p>Total de Reinvestimentos: ${reinvestimentos}</p>
        <p>Total de Meses: ${Math.floor(totalMeses)}</p>
        <p>Dias Restantes: ${diasRestantes}</p>
        <p><strong>Nota:</strong> Os valores podem variar devido à variação das taxas de câmbio.</p>
    `;
});
