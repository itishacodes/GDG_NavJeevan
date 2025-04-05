document.addEventListener('DOMContentLoaded', () => {
  const marketData = [
    { crop: 'Wheat', state: 'Punjab', price: '₹18,000/acre', bestTime: 'March', netProfit: '₹6,000' },
    { crop: 'Rice', state: 'West Bengal', price: '₹20,000/acre', bestTime: 'September', netProfit: '₹7,500' },
    { crop: 'Maize', state: 'Bihar', price: '₹15,000/acre', bestTime: 'July', netProfit: '₹5,000' },
    { crop: 'Soybean', state: 'Madhya Pradesh', price: '₹25,000/acre', bestTime: 'October', netProfit: '₹9,000' },
    { crop: 'Sugarcane', state: 'Uttar Pradesh', price: '₹30,000/acre', bestTime: 'December', netProfit: '₹10,500' }
  ];
  
  const tableBody = document.getElementById('marketData');
  marketData.forEach(data => {
    const row = `<tr>
      <td>${data.crop}</td>
      <td>${data.state}</td>
      <td>${data.price}</td>
      <td>${data.bestTime}</td>
      <td>${data.netProfit}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
});

function submitPrice() {
  const crop = document.getElementById('cropType').value;
  const state = document.getElementById('state').value;
  const price = document.getElementById('price').value;
  
  if (!price || price <= 0) {
    alert('Please enter a valid price.');
    return;
  }
  
  const tableBody = document.getElementById('marketData');
  const newRow = `<tr>
    <td>${crop}</td>
    <td>${state}</td>
    <td>₹${price}/acre</td>
    <td>Updating...</td>
    <td>Updating...</td>
  </tr>`;
  tableBody.innerHTML += newRow;
  alert('Price submitted successfully!');
}

function sendViaWhatsApp() {
  const crop = document.getElementById('cropType').value;
  const state = document.getElementById('state').value;
  const price = document.getElementById('price').value;
  
  if (!price || price <= 0) {
    alert('Please enter a valid price.');
    return;
  }
  
  const message = `I am a farmer from ${state}. The current price for ${crop} is ₹${price}/acre.`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}
