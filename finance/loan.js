// Loan details for each bank
const bankDetails = {
  bankA: { name: "Bank A", interestRate: 7.5, maxLoanAmount: "₹50,00,000", tenure: "5 - 20 years" },
  bankB: { name: "Bank B", interestRate: 8.2, maxLoanAmount: "₹30,00,000", tenure: "5 - 15 years" },
  bankC: { name: "Bank C", interestRate: 6.9, maxLoanAmount: "₹40,00,000", tenure: "10 - 25 years" },
  bankD: { name: "Bank D", interestRate: 9.1, maxLoanAmount: "₹60,00,000", tenure: "5 - 25 years" },
  bankE: { name: "Bank E", interestRate: 7.8, maxLoanAmount: "₹45,00,000", tenure: "3 - 15 years" },
  bankF: { name: "Bank F", interestRate: 6.5, maxLoanAmount: "₹35,00,000", tenure: "5 - 18 years" },
  bankG: { name: "Bank G", interestRate: 8.5, maxLoanAmount: "₹55,00,000", tenure: "4 - 22 years" }
};

// Update bank details based on selection
function updateLoanDetails() {
  const selectedBank = document.getElementById('bankSelect').value;
  if (!selectedBank) {
      document.getElementById('bankDetails').innerText = "Select a bank to view loan details.";
      return;
  }

  const bankInfo = bankDetails[selectedBank];
  const bankInfoText = `
    <strong>Bank Name:</strong> ${bankInfo.name} <br>
    <strong>Interest Rate:</strong> ${bankInfo.interestRate}% per annum <br>
    <strong>Maximum Loan Amount:</strong> ${bankInfo.maxLoanAmount} <br>
    <strong>Loan Tenure:</strong> ${bankInfo.tenure}
  `;

  document.getElementById('bankDetails').innerHTML = bankInfoText;
}

// Calculate EMI
function calculateLoan() {
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const loanTenure = parseFloat(document.getElementById('loanTenure').value) * 12;
  const selectedBank = document.getElementById('bankSelect').value;

  if (!selectedBank) {
      document.getElementById('loanResult').innerText = '❌ Please select a bank.';
      return;
  }

  if (isNaN(loanAmount) || isNaN(loanTenure) || loanAmount <= 0 || loanTenure <= 0) {
      document.getElementById('loanResult').innerText = '❌ Please enter valid values.';
      return;
  }

  const interestRate = bankDetails[selectedBank].interestRate / 100 / 12;

  const emi = loanAmount * interestRate * Math.pow(1 + interestRate, loanTenure) /
              (Math.pow(1 + interestRate, loanTenure) - 1);

  document.getElementById('loanResult').innerHTML = `
      <strong>EMI:</strong> ₹${emi.toFixed(2)} per month
  `;
}
