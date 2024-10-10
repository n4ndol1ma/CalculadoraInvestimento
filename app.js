document.getElementById('tipo_calculo').addEventListener('change', function() {
    const tipoCalculo = this.value;
    const todosCampos = document.querySelectorAll('.calculo_campos');

    // Esconder todos os campos específicos
    todosCampos.forEach((campo) => campo.style.display = 'none');

    // Mostrar apenas os campos relevantes para o cálculo selecionado
    document.getElementById(`${tipoCalculo}_campos`).style.display = 'block';
});

document.getElementById('calculationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tipoCalculo = document.getElementById('tipo_calculo').value;
    const investimentoInicial = parseFloat(document.getElementById('investimento_inicial').value);
    const taxaLucro = parseFloat(document.getElementById('taxa_lucro').value) / 100;
    const objetivoRetorno = parseFloat(document.getElementById('objetivo_retorno').value);

    let rendimentoTotal = investimentoInicial;
    let totalMeses = 0;
    let resultado;

    switch(tipoCalculo) {
        case 'juros_compostos':
            const taxaCambio = parseFloat(document.getElementById('taxa_cambio').value);

            while (rendimentoTotal < objetivoRetorno) {
                rendimentoTotal += rendimentoTotal * taxaLucro;
                totalMeses += 1;
            }

            const rendimentoTotalReais = rendimentoTotal * taxaCambio;
            resultado = `Total de Rendimento: $${rendimentoTotal.toFixed(2)} / R$ ${rendimentoTotalReais.toFixed(2)}<br>
                         Meses necessários: ${totalMeses}`;
            break;

        case 'depositos_regulares':
            const aporteMensal = parseFloat(document.getElementById('aporte_mensal').value);

            while (rendimentoTotal < objetivoRetorno) {
                rendimentoTotal += rendimentoTotal * taxaLucro;
                rendimentoTotal += aporteMensal;
                totalMeses += 1;
            }

            resultado = `Total de Rendimento: $${rendimentoTotal.toFixed(2)}<br>
                         Meses necessários: ${totalMeses}`;
            break;

        case 'comparacao_taxas':
            const taxaComparacao1 = parseFloat(document.getElementById('taxa_comparacao1').value) / 100;
            const taxaComparacao2 = parseFloat(document.getElementById('taxa_comparacao2').value) / 100;

            let rendimentoTaxa1 = investimentoInicial;
            let rendimentoTaxa2 = investimentoInicial;

            while (rendimentoTaxa1 < objetivoRetorno || rendimentoTaxa2 < objetivoRetorno) {
                if (rendimentoTaxa1 < objetivoRetorno) rendimentoTaxa1 += rendimentoTaxa1 * taxaComparacao1;
                if (rendimentoTaxa2 < objetivoRetorno) rendimentoTaxa2 += rendimentoTaxa2 * taxaComparacao2;
                totalMeses += 1;
            }

            resultado = `Rendimento com Taxa 1: $${rendimentoTaxa1.toFixed(2)}<br>
                         Rendimento com Taxa 2: $${rendimentoTaxa2.toFixed(2)}<br>
                         Meses necessários: ${totalMeses}`;
            break;

        case 'calculo_impostos':
            const taxaImposto = parseFloat(document.getElementById('taxa_imposto').value) / 100;

            while (rendimentoTotal < objetivoRetorno) {
                rendimentoTotal += rendimentoTotal * taxaLucro;
                totalMeses += 1;
            }

            const rendimentoLiquido = rendimentoTotal - (rendimentoTotal * taxaImposto);
            resultado = `Rendimento Bruto: $${rendimentoTotal.toFixed(2)}<br>
                         Rendimento Líquido (após impostos): $${rendimentoLiquido.toFixed(2)}<br>
                         Meses necessários: ${totalMeses}`;
            break;

        default:
            resultado = 'Selecione um tipo de cálculo válido.';
            break;
    }

    // Exibir os resultados no container de resultado
    document.getElementById('resultContainer').innerHTML = `<div class="result"><h2>Resultados</h2><p>${resultado}</p></div>`;
});

