# AfriMind Platform - African Digital Sovereignty

> Empowering Africa through AI-driven solutions for agriculture, trade, culture, and financial inclusion.

[![MCP Hackathon Africa 2025](https://img.shields.io/badge/MCP%20Hackathon-Africa%202025-blue)](https://mcp-hackathon-africa-2025.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC)](https://tailwindcss.com)

## 🌍 Overview

AfriMind Platform is a comprehensive web application built for the MCP Hackathon Africa 2025, designed to address Africa's unique challenges through four integrated MCP (Model Context Protocol) servers:

### 🚀 Four Pillars of Digital Sovereignty

1. **🌾 Agricultural Intelligence** - AI-powered farming insights, weather forecasts, and market intelligence
2. **🚛 Cross-Border Trade** - Streamlined logistics, customs data, and trade facilitation
3. **🗣 Cultural Preservation** - Language translation, cultural practices, and local context understanding
4. **💰 Financial Inclusion** - Mobile money integration, banking services, and financial tools

## ✨ Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **African-Inspired Design**: Beautiful, responsive UI with cultural aesthetics
- **MCP Architecture**: Four specialized servers for different domains
- **Real-time Data**: Live weather, market prices, and trade information
- **Multi-language Support**: 50+ African languages
- **Mobile-First**: Optimized for African internet conditions
- **Enterprise Security**: Bank-grade security and compliance

## 🛠 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Heroicons** - Beautiful SVG icons
- **React Query** - Data fetching and caching

### Backend
- **MCP Servers** - Model Context Protocol implementation
- **Node.js** - Runtime environment
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **Docker** - Containerization

### Infrastructure
- **Docker Compose** - Local development environment
- **Nginx** - Reverse proxy and load balancer
- **SSL/TLS** - Secure communication
- **Rate Limiting** - API protection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/afrimind/platform.git
   cd platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

5. **Or run locally**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/         # Page sections
│   ├── ui/               # UI components
│   ├── navigation.tsx    # Navigation component
│   └── footer.tsx       # Footer component
├── mcp/                  # MCP server modules
│   └── core/
│       ├── server.ts     # Main MCP server
│       └── modules/      # Domain-specific modules
│           ├── agricultural.ts
│           ├── trade.ts
│           ├── culture.ts
│           └── finance.ts
└── lib/                  # Utility functions
```

## 🔧 MCP Server Architecture

### Agricultural Intelligence Server
- Weather forecasting and agricultural planning
- Crop recommendations based on location and season
- Market price intelligence for commodities
- Pest and disease information
- Farming tips and best practices

### Cross-Border Trade Server
- Customs regulations and requirements
- Route optimization and logistics
- Documentation requirements
- Real-time border conditions
- Tariff calculations

### Cultural Preservation Server
- Language translation between African languages
- Cultural practices and traditions database
- Local context for AI applications
- Language learning resources
- Historical context and background

### Financial Inclusion Server
- Mobile money services directory
- Banking services information
- Financial regulations guide
- Credit scoring and lending
- Investment opportunities

## 🌐 API Endpoints

### Agricultural Endpoints
- `GET /api/agricultural/weather` - Weather forecast
- `GET /api/agricultural/crops` - Crop recommendations
- `GET /api/agricultural/prices` - Market prices
- `GET /api/agricultural/pests` - Pest and disease info

### Trade Endpoints
- `GET /api/trade/customs` - Customs regulations
- `GET /api/trade/routes` - Route optimization
- `GET /api/trade/documents` - Documentation requirements
- `GET /api/trade/borders` - Border conditions

### Culture Endpoints
- `POST /api/culture/translate` - Language translation
- `GET /api/culture/practices` - Cultural practices
- `GET /api/culture/context` - Local context
- `GET /api/culture/languages` - Language resources

### Finance Endpoints
- `GET /api/finance/mobile-money` - Mobile money services
- `GET /api/finance/banking` - Banking services
- `GET /api/finance/regulations` - Financial regulations
- `GET /api/finance/credit` - Credit scoring

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for trust and technology
- **Secondary**: Gold/yellow for warmth and prosperity
- **Accent**: Purple for creativity and innovation
- **Earth**: Brown tones for connection to land
- **Success**: Green for growth and agriculture
- **Warning**: Orange for attention and energy
- **Danger**: Red for alerts and important actions

### Typography
- **Display**: Poppins for headings and emphasis
- **Body**: Inter for readability and accessibility
- **Mono**: JetBrains Mono for code and technical content

### Components
- **Buttons**: Primary, secondary, outline, and ghost variants
- **Cards**: Soft shadows with hover effects
- **Forms**: Accessible input components
- **Navigation**: Responsive with mobile-first design

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment
1. Set up environment variables
2. Configure SSL certificates
3. Set up database backups
4. Configure monitoring and logging
5. Set up CDN for static assets

## 🤝 Contributing

We welcome contributions from the African developer community!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Respect cultural sensitivities
- Consider African contexts in design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MCP Hackathon Africa 2025** for the platform and opportunity
- **African Developer Community** for inspiration and feedback
- **Open Source Contributors** for the amazing tools and libraries
- **African Cultural Experts** for guidance on cultural sensitivity

## 📞 Contact

- **Website**: [afrimind.africa](https://afrimind.africa)
- **Email**: hello@afrimind.africa
- **Twitter**: [@afrimind](https://twitter.com/afrimind)
- **GitHub**: [github.com/afrimind](https://github.com/afrimind)

---

**Built with ❤️ for Africa by the AfriMind Team**

*Empowering the continent through technology, one solution at a time.*
