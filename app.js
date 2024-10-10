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
    if (initialInvestment <= 0 || annualInterestRate <= 0 || targetAmount <= initialInvestment) {
      alert("Por favor, verifique os valores inseridos.");
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
    }
  
    // Converte para reais e formata
    const finalAmountInReal = currentAmount * exchangeRate;
    const formattedFinalAmount = finalAmountInReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
    // Exibe os resultados - Corrigido para 'resultContainer'
    const resultDiv = document.getElementById("resultContainer");
    resultDiv.innerHTML = `
      <h2>Resultados</h2>
      <p>Valor Final: ${formattedFinalAmount}</p>
      <p>Período Total: ${months} meses</p>
    `;
  }

// Adicionando o ouvinte de evento para o formulário
document.getElementById("investmentForm").addEventListener("submit", calculateInvestment);

