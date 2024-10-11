document.getElementById('investmentForm').addEventListener('submit', calculateInvestment);

function calculateInvestment(event) {
  event.preventDefault();

  // Obtendo os valores do formulário
  const initialInvestment = parseFloat(document.getElementById("initialInvestment").value);
  const annualInterestRate = parseFloat(document.getElementById("annualInterestRate").value) / 100;
  const investmentTerm = parseInt(document.getElementById("investmentTerm").value); // Em dias
  const targetAmount = parseFloat(document.getElementById("targetAmount").value);
  const exchangeRate = parseFloat(document.getElementById("exchangeRate").value) || 1;
  const monthlyContribution = parseFloat(document.getElementById("monthlyContribution").value) || 0;

  // Validação básica
  if (initialInvestment <= 0 || annualInterestRate <= 0 || targetAmount <= initialInvestment || investmentTerm <= 0) {
    alert("Por favor, verifique os valores inseridos. O investimento inicial, taxa de juros e valor-alvo devem ser válidos.");
    return;
  }

  // Calcula a taxa de juros mensal
  const monthlyInterestRate = annualInterestRate / 12;

  // Calcula o número de períodos (meses)
  const numberOfPeriods = investmentTerm / 30;

  let currentAmount = initialInvestment;
  let months = 0;

  // Loop para calcular o valor final
  while (currentAmount < targetAmount) {
    currentAmount *= (1 + monthlyInterestRate);
    currentAmount += monthlyContribution;
    months++;

    // Segurança para evitar loops infinitos
    if (months > 1200) {  // Limite de 100 anos para o cálculo (1200 meses)
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
    <p>Valor Final: ${formattedFinalAmount}</p>
    <p>Período Total: ${months} meses</p>
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

