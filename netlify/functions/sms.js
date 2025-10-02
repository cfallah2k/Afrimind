exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: ''
    };
  }

  const { from, to, text } = JSON.parse(event.body);

  // Process SMS message
  const response = await processSMSMessage(text, from);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: from,
      from: to,
      text: response
    })
  };
};

async function processSMSMessage(message, phoneNumber) {
  const lowerMessage = message.toLowerCase().trim();

  // Weather queries
  if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('sunny')) {
    return `🌤️ WEATHER UPDATE
Nairobi: 28°C, Partly Cloudy
Humidity: 65%
Rain expected tomorrow 3PM
Perfect for planting maize!

Reply with:
- PRICES for market info
- BORDER for trade info
- CULTURE for cultural tips`;
  }

  // Market price queries
  if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('cost')) {
    return `💰 MARKET PRICES
Maize: $280/90kg (+15% ↗️)
Beans: $320/90kg (-5% ↘️)
Rice: $180/90kg (+8% ↗️)
Prices trending upward due to seasonal demand

Reply with:
- WEATHER for weather info
- BORDER for trade info
- CULTURE for cultural tips`;
  }

  // Border/trade queries
  if (lowerMessage.includes('border') || lowerMessage.includes('trade') || lowerMessage.includes('crossing')) {
    return `🚛 BORDER STATUS
Malaba Border: OPEN ✅
Hours: 6AM-10PM
Wait Time: 1.5 hours
Required docs: Passport, Certificate of Origin, Commercial Invoice, Phytosanitary Certificate

Reply with:
- WEATHER for weather info
- PRICES for market info
- CULTURE for cultural tips`;
  }

  // Cultural queries
  if (lowerMessage.includes('culture') || lowerMessage.includes('language') || lowerMessage.includes('custom')) {
    return `🌍 CULTURAL GUIDE
Swahili: Hujambo (Hello)
Asante (Thank you)
Kwaheri (Goodbye)
Business: Start with small talk, use formal titles, dress conservatively

Reply with:
- WEATHER for weather info
- PRICES for market info
- BORDER for trade info`;
  }

  // Help queries
  if (lowerMessage.includes('help') || lowerMessage.includes('info') || lowerMessage.includes('menu')) {
    return `🤖 AFRICONTEXT INTELLIGENCE
Your African context AI assistant!

Available commands:
- WEATHER - Get weather updates
- PRICES - Check market prices  
- BORDER - Border status & requirements
- CULTURE - Cultural tips & language
- HELP - Show this menu

Text any question for AI assistance!`;
  }

  // AI-powered responses for other queries
  if (lowerMessage.includes('plant') || lowerMessage.includes('farming') || lowerMessage.includes('crop')) {
    return `🌾 FARMING ADVICE
Maize planting: March 15-30 optimal
Soil prep: Add organic matter
Depth: 2-3cm, spacing 75cm
Watch for armyworms in 2 weeks
Water 2-3 times per week

Reply with:
- WEATHER for weather info
- PRICES for market info
- BORDER for trade info`;
  }

  if (lowerMessage.includes('route') || lowerMessage.includes('travel') || lowerMessage.includes('distance')) {
    return `🗺️ TRADE ROUTES
Nairobi → Kampala: 530km, 8-10hrs, $150-200
Nairobi → Dar: 650km, 10-12hrs, $180-250
Best time: 6-10AM
Route status: All open

Reply with:
- WEATHER for weather info
- PRICES for market info
- CULTURE for cultural tips`;
  }

  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('help me')) {
    return `🚨 EMERGENCY CONTACTS
Border Emergency: +254 700 123 456
Trade Support: +254 700 789 012
Police: 999
Ambulance: 999
Fire: 999

Reply with:
- WEATHER for weather info
- PRICES for market info
- BORDER for trade info`;
  }

  // Default AI response
  return `🤖 AI RESPONSE
I understand you're asking about: "${message}"

I can help with:
- Agriculture (weather, prices, farming)
- Logistics (borders, routes, trade)
- Culture (languages, customs, etiquette)
- Financial (payments, banking, currency)

Try these commands:
- WEATHER - Weather updates
- PRICES - Market prices
- BORDER - Trade information
- CULTURE - Cultural tips
- HELP - Show all commands`;
}
