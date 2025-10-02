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

  const { sessionId, serviceCode, phoneNumber, text } = JSON.parse(event.body);

  let response = '';

  if (text === '') {
    // Initial USSD menu
    response = `CON Welcome to AfriContext Intelligence
1. Agriculture Info
2. Trade & Logistics  
3. Cultural Context
4. Financial Advice
5. Emergency Help
6. Exit`;
  } else {
    const textArray = text.split('*');
    const userResponse = textArray[textArray.length - 1];

    switch (userResponse) {
      case '1':
        response = `CON Agriculture Information
1. Weather Update
2. Market Prices
3. Farming Tips
4. Back to Main Menu`;
        break;

      case '1*1':
        response = `END Weather Update:
Nairobi: 28°C, Partly Cloudy
Humidity: 65%
Rain expected tomorrow 3PM
Good for planting maize`;
        break;

      case '1*2':
        response = `END Market Prices:
Maize: $280/90kg (+15%)
Beans: $320/90kg (-5%)
Rice: $180/90kg (+8%)
Prices trending upward`;
        break;

      case '1*3':
        response = `END Farming Tips:
- Plant maize March 15-30
- Watch for armyworms in 2 weeks
- Prepare soil with organic matter
- Space 75cm between rows`;
        break;

      case '2':
        response = `CON Trade & Logistics
1. Border Status
2. Route Information
3. Documentation
4. Back to Main Menu`;
        break;

      case '2*1':
        response = `END Border Status:
Malaba Border: OPEN
Hours: 6AM-10PM
Wait Time: 1.5 hours
Status: Normal operations`;
        break;

      case '2*2':
        response = `END Route Information:
Nairobi → Kampala: 530km, 8-10hrs, $150-200
Nairobi → Dar: 650km, 10-12hrs, $180-250
Best time: 6-10AM`;
        break;

      case '2*3':
        response = `END Required Documents:
1. Valid Passport
2. Certificate of Origin
3. Commercial Invoice
4. Phytosanitary Certificate`;
        break;

      case '3':
        response = `CON Cultural Context
1. Language Guide
2. Business Etiquette
3. Local Customs
4. Back to Main Menu`;
        break;

      case '3*1':
        response = `END Language Guide:
Swahili: Hujambo (Hello)
Asante (Thank you)
Kwaheri (Goodbye)
Habari yako? (How are you?)`;
        break;

      case '3*2':
        response = `END Business Etiquette:
- Greet with handshake
- Use formal titles (Mr./Mrs.)
- Allow time for small talk
- Dress conservatively`;
        break;

      case '3*3':
        response = `END Local Customs:
- Respect elders
- Use right hand for greetings
- Learn basic greetings
- Be patient and respectful`;
        break;

      case '4':
        response = `CON Financial Advice
1. Payment Methods
2. Currency Exchange
3. Banking Info
4. Back to Main Menu`;
        break;

      case '4*1':
        response = `END Payment Methods:
- Mobile Money (95% usage)
- Bank Transfers
- Cash (limited)
- Digital Wallets`;
        break;

      case '4*2':
        response = `END Currency Exchange:
USD: 1 = 150 KES
EUR: 1 = 165 KES
GBP: 1 = 190 KES
Best rates at banks`;
        break;

      case '4*3':
        response = `END Banking Info:
Major banks: KCB, Equity, Co-op
Mobile banking: M-Pesa, Airtel Money
Business hours: 8AM-4PM
ATMs: 24/7 available`;
        break;

      case '5':
        response = `END Emergency Contacts:
Border Emergency: +254 700 123 456
Trade Support: +254 700 789 012
Police: 999
Ambulance: 999`;
        break;

      case '6':
        response = `END Thank you for using AfriContext Intelligence!
For more info, visit our website or text us.`;
        break;

      default:
        response = `END Invalid option. Please try again by dialing *123#`;
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionId,
      serviceCode,
      phoneNumber,
      response
    })
  };
};
