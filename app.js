document.getElementById('investmentForm').addEventListener('submit', calculateInvestment);

function calculateInvestment(event) {
  event.preventDefault();

  // Obtendo os valores do formulário
  const initialInvestment = parseFloat(document.getElementById("initialInvestment").value);
  const annualInterestRate = parseFloat(document.getElementById("annualInterestRate").value) / 100;
  const investmentTerm = parseInt(document.getElementById("investmentTerm").value); // Em dias (15 ou 30)
  const targetAmount = parseFloat(document.getElementById("targetAmount").value);
  const exchangeRate = parseFloat(document.getElementById("exchangeRate").value) || 1;
  const monthlyContribution = parseFloat(document.getElementById("monthlyContribution").value) || 0;

  // Validação básica
  if (initialInvestment <= 0 || annualInterestRate <= 0 || targetAmount <= initialInvestment || investmentTerm <= 0) {
    alert("Por favor, verifique os valores inseridos. O investimento inicial, taxa de juros e valor-alvo devem ser válidos.");
    return;
  }

  // Calcula a taxa de juros diária (baseado no prazo anual)
  const dailyInterestRate = annualInterestRate / 365;

  let currentAmount = initialInvestment;
  let days = 0;
  let months = 0;
  let tableRows = ''; // Para armazenar as linhas da tabela
  let previousAmount = initialInvestment;

  // Loop para calcular o valor final, a cada ciclo de reinvestimento
  while (currentAmount < targetAmount) {
    for (let i = 0; i < investmentTerm; i++) {
      currentAmount *= (1 + dailyInterestRate);
    }
    currentAmount += monthlyContribution;
    days += investmentTerm;
    months = Math.floor(days / 30);

    // Calcula a porcentagem de ganho no ciclo
    const percentGain = ((currentAmount - previousAmount) / previousAmount) * 100;
    previousAmount = currentAmount; // Atualiza o valor anterior para o próximo ciclo

    // Adiciona os dados na tabela
    const amountInReal = currentAmount * exchangeRate;
    tableRows += `<tr>
                    <td>${days} dias (${months} meses)</td>
                    <td>${currentAmount.toFixed(2)} USD</td>
                    <td>${amountInReal.toFixed(2)} BRL</td>
                    <td>${percentGain.toFixed(2)}%</td>
                  </tr>`;

    // Segurança para evitar loops infinitos
    if (days > 36500) {  // Limite de 100 anos para o cálculo
      alert("O cálculo ultrapassou o limite de tempo possível.");
      return;
    }
  }

  // Converte para reais e formata
  const finalAmountInReal = currentAmount * exchangeRate;
  const formattedFinalAmount = finalAmountInReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Exibe os resultados
  const resultDiv = document.getElementById("resultContainer");
  resultDiv.innerHTML = `
    <h2>Resultados</h2>
    <p>Valor Final: ${currentAmount.toFixed(2)} USD (${formattedFinalAmount} BRL)</p>
    <p>Período Total: ${days} dias (${months} meses)</p>
    <table>
      <thead>
        <tr>
          <th>Dia</th>
          <th>Montante Acumulado (USD)</th>
          <th>Montante Acumulado (BRL)</th>
          <th>% Ganho no Ciclo</th>
        </tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>
  `;
}

function share() {
  if (navigator.share) {
    navigator.share({
      title: 'Calculadora de Investimento',
      text: 'Calcule o tempo necessário para atingir seus objetivos de investimento com nossa calculadora!',
      url: window.location.href,
    }).catch(error => console.error('Erro ao tentar compartilhar:', error));
  } else {
    alert('Compartilhamento não disponível neste navegador.');
  }
}

