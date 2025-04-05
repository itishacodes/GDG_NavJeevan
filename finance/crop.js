function estimateCropPrice() {
  const cropType = document.getElementById('cropType').value;
  const landArea = parseFloat(document.getElementById('landArea').value);
  const state = document.getElementById('state').value;

  if (isNaN(landArea) || landArea <= 0) {
    document.getElementById('cropResult').innerText = '❌ Please enter a valid land area.';
    return;
  }

  // State-wise crop prices per acre (in ₹)
  const statePricePerAcre = {
    wheat: { UP: 16000, MH: 15000, PB: 17000, RJ: 15500, MP: 15800, GJ: 16500, TN: 14500, AP: 15000, KA: 15500, WB: 16200 },
    rice: { UP: 19000, MH: 18500, PB: 20000, RJ: 18000, MP: 18800, GJ: 19500, TN: 17500, AP: 18200, KA: 18900, WB: 19800 },
    maize: { UP: 13000, MH: 12500, PB: 14000, RJ: 12000, MP: 12800, GJ: 13200, TN: 11800, AP: 12400, KA: 12900, WB: 13600 },
    soybean: { UP: 14500, MH: 14000, PB: 15000, RJ: 13500, MP: 14200, GJ: 14700, TN: 13800, AP: 14400, KA: 14800, WB: 15300 },
    cotton: { UP: 21000, MH: 20000, PB: 22000, RJ: 19500, MP: 20500, GJ: 21500, TN: 19800, AP: 20800, KA: 21800, WB: 22500 },
    sugarcane: { UP: 25000, MH: 24000, PB: 26000, RJ: 23000, MP: 24500, GJ: 25500, TN: 23500, AP: 24800, KA: 25800, WB: 26500 },
    barley: { UP: 14000, MH: 13500, PB: 14500, RJ: 13000, MP: 13800, GJ: 14200, TN: 12800, AP: 13400, KA: 13900, WB: 14600 },
    millets: { UP: 12000, MH: 11500, PB: 12500, RJ: 11000, MP: 11800, GJ: 12200, TN: 10800, AP: 11400, KA: 11900, WB: 12600 },
    groundnut: { UP: 18000, MH: 17500, PB: 18500, RJ: 17000, MP: 17800, GJ: 18200, TN: 16800, AP: 17400, KA: 17900, WB: 18600 },
    sunflower: { UP: 20000, MH: 19500, PB: 21000, RJ: 19000, MP: 19800, GJ: 20500, TN: 18800, AP: 19400, KA: 19900, WB: 20800 }
  };

  // Best selling season for crops
  const bestSellingTime = {
    wheat: "March - May",
    rice: "October - December",
    maize: "July - September",
    soybean: "August - October",
    cotton: "November - January",
    sugarcane: "December - February",
    barley: "March - April",
    millets: "June - August",
    groundnut: "September - November",
    sunflower: "January - March"
  };

  // Average production cost per acre for each crop (in ₹)
  const productionCostPerAcre = {
    wheat: 8000,
    rice: 9000,
    maize: 7000,
    soybean: 7500,
    cotton: 12000,
    sugarcane: 15000,
    barley: 6500,
    millets: 6000,
    groundnut: 8500,
    sunflower: 9500
  };

  // Get the price for the selected state
  const cropPrices = statePricePerAcre[cropType];
  const pricePerAcre = cropPrices[state];

  // Calculate total estimated price
  const estimatedPrice = landArea * pricePerAcre;

  // Calculate net profit (Revenue - Cost)
  const totalProductionCost = landArea * productionCostPerAcre[cropType];
  const netProfit = estimatedPrice - totalProductionCost;

  // Display result
  document.getElementById('cropResult').innerHTML = `
    <strong>Estimated Crop Price:</strong> ₹${estimatedPrice.toLocaleString()} <br>
    <strong>Best Time to Sell:</strong> ${bestSellingTime[cropType]} <br>
    <strong>Net Profit:</strong> ₹${netProfit.toLocaleString()}
  `;
}
