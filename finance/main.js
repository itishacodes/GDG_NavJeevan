function showLoanCalculator() {
    document.getElementById('loan-calculator').classList.remove('d-none');
    document.getElementById('crop-estimator').classList.add('d-none');
  }
  
  function showCropEstimator() {
    document.getElementById('crop-estimator').classList.remove('d-none');
    document.getElementById('loan-calculator').classList.add('d-none');
  }
  
  function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTenure = parseFloat(document.getElementById('loanTenure').value) * 12;
  
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTenure) || loanAmount <= 0 || loanTenure <= 0) {
      document.getElementById('loanResult').innerText = 'Please enter valid values.';
      return;
    }
  
    const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTenure)) / (Math.pow(1 + interestRate, loanTenure) - 1);
    document.getElementById('loanResult').innerText = `Your EMI is ₹${emi.toFixed(2)}.`;
  }
  
  function estimateCropPrice() {
    const cropType = document.getElementById('cropType').value;
    const landArea = parseFloat(document.getElementById('landArea').value);
  
    if (isNaN(landArea) || landArea <= 0) {
      document.getElementById('cropResult').innerText = 'Please enter a valid land area.';
      return;
    }
  
    const pricePerAcre = {
      wheat: 20000,
      rice: 25000,
      maize: 18000
    };
  
    const estimatedPrice = landArea * pricePerAcre[cropType];
    document.getElementById('cropResult').innerText = `Estimated crop price for ${landArea} acres of ${cropType} is ₹${estimatedPrice.toLocaleString()}.`;
  }
  