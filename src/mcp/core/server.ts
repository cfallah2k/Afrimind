import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'

// Import MCP modules
import { AgriculturalMCP } from './modules/agricultural'
import { TradeMCP } from './modules/trade'
import { CultureMCP } from './modules/culture'
import { FinanceMCP } from './modules/finance'

export class AfriMindMCPServer {
  private server: Server
  private agricultural: AgriculturalMCP
  private trade: TradeMCP
  private culture: CultureMCP
  private finance: FinanceMCP

  constructor() {
    this.server = new Server(
      {
        name: 'afrimind-platform',
        version: '1.0.0',
      }
    )

    // Initialize MCP modules
    this.agricultural = new AgriculturalMCP()
    this.trade = new TradeMCP()
    this.culture = new CultureMCP()
    this.finance = new FinanceMCP()

    this.setupHandlers()
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          // Agricultural tools
          ...this.agricultural.getTools(),
          // Trade tools
          ...this.trade.getTools(),
          // Culture tools
          ...this.culture.getTools(),
          // Finance tools
          ...this.finance.getTools(),
        ],
      }
    })

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params

      try {
        // Route to appropriate module
        if (name.startsWith('agricultural_')) {
          return await this.agricultural.handleTool(name, args)
        } else if (name.startsWith('trade_')) {
          return await this.trade.handleTool(name, args)
        } else if (name.startsWith('culture_')) {
          return await this.culture.handleTool(name, args)
        } else if (name.startsWith('finance_')) {
          return await this.finance.handleTool(name, args)
        }

        throw new Error(`Unknown tool: ${name}`)
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing tool ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
        }
      }
    })
  }

  async start() {
    const transport = new StdioServerTransport()
    await this.server.connect(transport)
    console.log('AfriMind MCP Server started successfully')
  }
}

// Start server if run directly (only in Node.js environment)
if (typeof window === 'undefined' && typeof process !== 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  const server = new AfriMindMCPServer()
  server.start().catch(console.error)
}
