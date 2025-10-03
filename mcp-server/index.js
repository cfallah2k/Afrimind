const express = require('express');
const cors = require('cors');
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');

class AfriContextMCPServer {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupMCP();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'healthy', timestamp: new Date().toISOString() });
    });

    // Agriculture endpoints
    this.app.get('/api/agriculture/weather', async (req, res) => {
      try {
        const weatherData = await this.getWeatherData(req.query.location || 'Nairobi');
        res.json(weatherData);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
      }
    });

    this.app.get('/api/agriculture/market-prices', async (req, res) => {
      try {
        const prices = await this.getMarketPrices();
        res.json(prices);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch market prices' });
      }
    });

    // Logistics endpoints
    this.app.get('/api/logistics/border-status', async (req, res) => {
      try {
        const borderData = await this.getBorderStatus(req.query.border || 'Malaba');
        res.json(borderData);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch border status' });
      }
    });

    this.app.get('/api/logistics/routes', async (req, res) => {
      try {
        const routes = await this.getTradeRoutes();
        res.json(routes);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trade routes' });
      }
    });

    // Culture endpoints
    this.app.get('/api/culture/languages', async (req, res) => {
      try {
        const languages = await this.getAfricanLanguages();
        res.json(languages);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch language data' });
      }
    });

    this.app.get('/api/culture/customs', async (req, res) => {
      try {
        const customs = await this.getCulturalCustoms(req.query.region || 'East Africa');
        res.json(customs);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cultural customs' });
      }
    });

    // AI Chat endpoint
    this.app.post('/api/chat', async (req, res) => {
      try {
        const { message, context } = req.body;
        const response = await this.processAIQuery(message, context);
        res.json({ response });
      } catch (error) {
        res.status(500).json({ error: 'Failed to process AI query' });
      }
    });
  }

  setupMCP() {
    this.mcpServer = new Server(
      {
        name: 'afri-context-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Register MCP tools
    this.mcpServer.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_weather',
          description: 'Get current weather and forecast for African locations',
          inputSchema: {
            type: 'object',
            properties: {
              location: { type: 'string', description: 'Location in Africa' }
            }
          }
        },
        {
          name: 'get_market_prices',
          description: 'Get current agricultural market prices in Africa',
          inputSchema: {
            type: 'object',
            properties: {
              crop: { type: 'string', description: 'Crop type (maize, beans, rice)' }
            }
          }
        },
        {
          name: 'get_border_status',
          description: 'Get current border crossing status and requirements',
          inputSchema: {
            type: 'object',
            properties: {
              border: { type: 'string', description: 'Border crossing name' }
            }
          }
        },
        {
          name: 'get_cultural_context',
          description: 'Get cultural information and customs for African regions',
          inputSchema: {
            type: 'object',
            properties: {
              region: { type: 'string', description: 'African region' }
            }
          }
        }
      ]
    }));

    this.mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'get_weather':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.getWeatherData(args.location))
            }]
          };

        case 'get_market_prices':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.getMarketPrices())
            }]
          };

        case 'get_border_status':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.getBorderStatus(args.border))
            }]
          };

        case 'get_cultural_context':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.getCulturalCustoms(args.region))
            }]
          };

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  // Data fetching methods
  async getWeatherData(location) {
    // Simulate weather API call
    return {
      location,
      current: {
        temperature: 28,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12
      },
      forecast: [
        { day: 'Today', high: 30, low: 22, condition: 'Sunny', rain: 10 },
        { day: 'Tomorrow', high: 28, low: 20, condition: 'Rainy', rain: 80 },
        { day: 'Day 3', high: 26, low: 18, condition: 'Cloudy', rain: 40 }
      ],
      timestamp: new Date().toISOString()
    };
  }

  async getMarketPrices() {
    // Simulate market data API call
    return {
      crops: {
        maize: { price: 280, change: 15, trend: 'up', unit: 'USD per 90kg bag' },
        beans: { price: 320, change: -5, trend: 'down', unit: 'USD per 90kg bag' },
        rice: { price: 180, change: 8, trend: 'up', unit: 'USD per 90kg bag' }
      },
      timestamp: new Date().toISOString()
    };
  }

  async getBorderStatus(border) {
    // Simulate border status API call
    return {
      border,
      status: 'Open',
      hours: '6:00 AM - 10:00 PM',
      waitTime: '1.5 hours',
      requirements: [
        'Valid Passport',
        'Certificate of Origin',
        'Commercial Invoice',
        'Phytosanitary Certificate'
      ],
      timestamp: new Date().toISOString()
    };
  }

  async getTradeRoutes() {
    return {
      routes: [
        {
          id: 'nairobi-kampala',
          from: 'Nairobi',
          to: 'Kampala',
          distance: '530 km',
          duration: '8-10 hours',
          cost: '$150-200',
          status: 'open'
        },
        {
          id: 'nairobi-dar',
          from: 'Nairobi',
          to: 'Dar es Salaam',
          distance: '650 km',
          duration: '10-12 hours',
          cost: '$180-250',
          status: 'delayed'
        }
      ]
    };
  }

  async getAfricanLanguages() {
    return {
      regions: {
        'East Africa': ['Swahili', 'English', 'Kinyarwanda', 'Amharic'],
        'West Africa': ['English', 'French', 'Yoruba', 'Hausa'],
        'Southern Africa': ['English', 'Zulu', 'Xhosa', 'Afrikaans']
      }
    };
  }

  async getCulturalCustoms(region) {
    const customs = {
      'East Africa': {
        greeting: 'Hujambo (Hello)',
        business: 'Start with small talk, use formal titles',
        communication: 'Speak clearly, avoid interrupting',
        tips: ['Respect elders', 'Use right hand for greetings', 'Dress conservatively']
      },
      'West Africa': {
        greeting: 'Sannu (Hello)',
        business: 'Allow time for relationship building',
        communication: 'Be patient, show respect',
        tips: ['Learn basic greetings', 'Respect hierarchy', 'Be punctual but flexible']
      },
      'Southern Africa': {
        greeting: 'Sawubona (Hello)',
        business: 'Direct but respectful communication',
        communication: 'Clear and straightforward',
        tips: ['Be direct but polite', 'Respect personal space', 'Dress appropriately']
      }
    };

    return customs[region] || customs['East Africa'];
  }

  async processAIQuery(message, context = {}) {
    // Simple AI processing - in production, this would use a real LLM
    const responses = {
      weather: "The current weather in Nairobi is 28°C with partly cloudy skies. Light rain is expected tomorrow afternoon.",
      prices: "Current market prices: Maize $280/90kg bag (+15%), Beans $320/90kg bag (-5%), Rice $180/90kg bag (+8%).",
      border: "Malaba border is currently open with 1.5 hour wait time. Required documents: Passport, Certificate of Origin, Commercial Invoice, and Phytosanitary Certificate.",
      culture: "In East Africa, greet with 'Hujambo' and shake hands. Business meetings start with 15 minutes of small talk. Swahili is widely spoken."
    };

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain')) {
      return responses.weather;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('market')) {
      return responses.prices;
    } else if (lowerMessage.includes('border') || lowerMessage.includes('trade')) {
      return responses.border;
    } else if (lowerMessage.includes('culture') || lowerMessage.includes('language')) {
      return responses.culture;
    } else {
      return "I can help you with weather, market prices, border information, and cultural context. What specific information do you need?";
    }
  }

  start(port = 3001) {
    this.app.listen(port, () => {
      console.log(`AfriContext MCP Server running on port ${port}`);
    });
  }
}

// Start the server
const server = new AfriContextMCPServer();
server.start();

module.exports = AfriContextMCPServer;
