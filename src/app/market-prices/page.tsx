'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowTrendingDownIcon as TrendingDownIcon,
  ArrowPathIcon,
  MapPinIcon,
  CalculatorIcon,
  BanknotesIcon,
  GlobeAltIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

// West African countries with their currencies and exchange rates (approximate)
const countries = [
  { 
    id: 'liberia', 
    name: 'Liberia', 
    currency: 'LRD', 
    symbol: 'L$', 
    flag: '🇱🇷',
    rate: 1.0, // Base rate
    timezone: 'GMT'
  },
  { 
    id: 'nigeria', 
    name: 'Nigeria', 
    currency: 'NGN', 
    symbol: '₦', 
    flag: '🇳🇬',
    rate: 0.002, // 1 LRD = 500 NGN (approximate)
    timezone: 'WAT'
  },
  { 
    id: 'ghana', 
    name: 'Ghana', 
    currency: 'GHS', 
    symbol: '₵', 
    flag: '🇬🇭',
    rate: 0.15, // 1 LRD = 6.7 GHS (approximate)
    timezone: 'GMT'
  },
  { 
    id: 'senegal', 
    name: 'Senegal', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇸🇳',
    rate: 0.0008, // 1 LRD = 1250 XOF (approximate)
    timezone: 'GMT'
  },
  { 
    id: 'ivory-coast', 
    name: 'Ivory Coast', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇨🇮',
    rate: 0.0008,
    timezone: 'GMT'
  },
  { 
    id: 'mali', 
    name: 'Mali', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇲🇱',
    rate: 0.0008,
    timezone: 'GMT'
  },
  { 
    id: 'burkina-faso', 
    name: 'Burkina Faso', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇧🇫',
    rate: 0.0008,
    timezone: 'GMT'
  },
  { 
    id: 'guinea', 
    name: 'Guinea', 
    currency: 'GNF', 
    symbol: 'FG', 
    flag: '🇬🇳',
    rate: 0.0001, // 1 LRD = 10,000 GNF (approximate)
    timezone: 'GMT'
  },
  { 
    id: 'sierra-leone', 
    name: 'Sierra Leone', 
    currency: 'SLL', 
    symbol: 'Le', 
    flag: '🇸🇱',
    rate: 0.05, // 1 LRD = 20 SLL (approximate)
    timezone: 'GMT'
  },
  { 
    id: 'benin', 
    name: 'Benin', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇧🇯',
    rate: 0.0008,
    timezone: 'WAT'
  },
  { 
    id: 'togo', 
    name: 'Togo', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇹🇬',
    rate: 0.0008,
    timezone: 'GMT'
  },
  { 
    id: 'gambia', 
    name: 'Gambia', 
    currency: 'GMD', 
    symbol: 'D', 
    flag: '🇬🇲',
    rate: 0.12,
    timezone: 'GMT'
  },
  { 
    id: 'guinea-bissau', 
    name: 'Guinea-Bissau', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇬🇼',
    rate: 0.0008,
    timezone: 'GMT'
  },
  { 
    id: 'niger', 
    name: 'Niger', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇳🇪',
    rate: 0.0008,
    timezone: 'WAT'
  },
  { 
    id: 'cape-verde', 
    name: 'Cape Verde', 
    currency: 'CVE', 
    symbol: 'Esc', 
    flag: '🇨🇻',
    rate: 0.005,
    timezone: 'CVT'
  },
]

// Common crops with their prices in different countries
const cropPrices = [
  {
    id: 'rice',
    name: 'Rice',
    icon: '🌾',
    category: 'Staple',
    prices: {
      liberia: { buy: 0.85, sell: 0.95, unit: 'per kg' },
      nigeria: { buy: 425, sell: 475, unit: 'per kg' },
      ghana: { buy: 5.7, sell: 6.4, unit: 'per kg' },
      senegal: { buy: 1062, sell: 1188, unit: 'per kg' },
      'ivory-coast': { buy: 1062, sell: 1188, unit: 'per kg' },
      mali: { buy: 1062, sell: 1188, unit: 'per kg' },
      'burkina-faso': { buy: 1062, sell: 1188, unit: 'per kg' },
      benin: { buy: 1062, sell: 1188, unit: 'per kg' },
      togo: { buy: 1062, sell: 1188, unit: 'per kg' },
      guinea: { buy: 8500, sell: 9500, unit: 'per kg' },
      'sierra-leone': { buy: 17, sell: 19, unit: 'per kg' },
      'guinea-bissau': { buy: 1062, sell: 1188, unit: 'per kg' },
      niger: { buy: 1062, sell: 1188, unit: 'per kg' },
      'cape-verde': { buy: 95, sell: 110, unit: 'per kg' },
      gambia: { buy: 55, sell: 65, unit: 'per kg' }
    }
  },
  {
    id: 'cassava',
    name: 'Cassava',
    icon: '🥔',
    category: 'Staple',
    prices: {
      liberia: { buy: 0.35, sell: 0.45, unit: 'per kg' },
      nigeria: { buy: 175, sell: 225, unit: 'per kg' },
      ghana: { buy: 2.3, sell: 3.0, unit: 'per kg' },
      senegal: { buy: 437, sell: 562, unit: 'per kg' },
      'ivory-coast': { buy: 437, sell: 562, unit: 'per kg' },
      mali: { buy: 437, sell: 562, unit: 'per kg' },
      'burkina-faso': { buy: 437, sell: 562, unit: 'per kg' },
      benin: { buy: 437, sell: 562, unit: 'per kg' },
      togo: { buy: 437, sell: 562, unit: 'per kg' },
      guinea: { buy: 3500, sell: 4500, unit: 'per kg' },
      'sierra-leone': { buy: 7, sell: 9, unit: 'per kg' },
      'guinea-bissau': { buy: 437, sell: 562, unit: 'per kg' },
      niger: { buy: 437, sell: 562, unit: 'per kg' },
      'cape-verde': { buy: 40, sell: 52, unit: 'per kg' },
      gambia: { buy: 22, sell: 28, unit: 'per kg' }
    }
  },
  {
    id: 'maize',
    name: 'Maize',
    icon: '🌽',
    category: 'Cereal',
    prices: {
      liberia: { buy: 0.60, sell: 0.75, unit: 'per kg' },
      nigeria: { buy: 300, sell: 375, unit: 'per kg' },
      ghana: { buy: 4.0, sell: 5.0, unit: 'per kg' },
      senegal: { buy: 750, sell: 937, unit: 'per kg' },
      'ivory-coast': { buy: 750, sell: 937, unit: 'per kg' },
      mali: { buy: 750, sell: 937, unit: 'per kg' },
      'burkina-faso': { buy: 750, sell: 937, unit: 'per kg' },
      benin: { buy: 750, sell: 937, unit: 'per kg' },
      togo: { buy: 750, sell: 937, unit: 'per kg' },
      guinea: { buy: 6000, sell: 7500, unit: 'per kg' },
      'sierra-leone': { buy: 12, sell: 15, unit: 'per kg' },
      'guinea-bissau': { buy: 750, sell: 937, unit: 'per kg' },
      niger: { buy: 750, sell: 937, unit: 'per kg' },
      'cape-verde': { buy: 70, sell: 88, unit: 'per kg' },
      gambia: { buy: 35, sell: 44, unit: 'per kg' }
    }
  },
  {
    id: 'cocoa',
    name: 'Cocoa',
    icon: '🍫',
    category: 'Cash Crop',
    prices: {
      liberia: { buy: 2.50, sell: 3.20, unit: 'per kg' },
      nigeria: { buy: 1250, sell: 1600, unit: 'per kg' },
      ghana: { buy: 16.7, sell: 21.3, unit: 'per kg' },
      senegal: { buy: 3125, sell: 4000, unit: 'per kg' },
      'ivory-coast': { buy: 3125, sell: 4000, unit: 'per kg' },
      mali: { buy: 3125, sell: 4000, unit: 'per kg' },
      'burkina-faso': { buy: 3125, sell: 4000, unit: 'per kg' },
      benin: { buy: 3125, sell: 4000, unit: 'per kg' },
      togo: { buy: 3125, sell: 4000, unit: 'per kg' },
      guinea: { buy: 25000, sell: 32000, unit: 'per kg' },
      'sierra-leone': { buy: 50, sell: 64, unit: 'per kg' },
      'guinea-bissau': { buy: 3125, sell: 4000, unit: 'per kg' },
      niger: { buy: 3125, sell: 4000, unit: 'per kg' },
      'cape-verde': { buy: 295, sell: 380, unit: 'per kg' },
      gambia: { buy: 155, sell: 200, unit: 'per kg' }
    }
  },
  {
    id: 'palm-oil',
    name: 'Palm Oil',
    icon: '🫒',
    category: 'Oil',
    prices: {
      liberia: { buy: 1.20, sell: 1.50, unit: 'per liter' },
      nigeria: { buy: 600, sell: 750, unit: 'per liter' },
      ghana: { buy: 8.0, sell: 10.0, unit: 'per liter' },
      senegal: { buy: 1500, sell: 1875, unit: 'per liter' },
      'ivory-coast': { buy: 1500, sell: 1875, unit: 'per liter' },
      mali: { buy: 1500, sell: 1875, unit: 'per liter' },
      'burkina-faso': { buy: 1500, sell: 1875, unit: 'per liter' },
      benin: { buy: 1500, sell: 1875, unit: 'per liter' },
      togo: { buy: 1500, sell: 1875, unit: 'per liter' },
      guinea: { buy: 12000, sell: 15000, unit: 'per liter' },
      'sierra-leone': { buy: 24, sell: 30, unit: 'per liter' },
      'guinea-bissau': { buy: 1500, sell: 1875, unit: 'per liter' },
      niger: { buy: 1500, sell: 1875, unit: 'per liter' },
      'cape-verde': { buy: 140, sell: 175, unit: 'per liter' },
      gambia: { buy: 70, sell: 88, unit: 'per liter' }
    }
  },
  {
    id: 'coffee',
    name: 'Coffee',
    icon: '☕',
    category: 'Cash Crop',
    prices: {
      liberia: { buy: 3.80, sell: 4.50, unit: 'per kg' },
      nigeria: { buy: 1900, sell: 2250, unit: 'per kg' },
      ghana: { buy: 25.3, sell: 30.0, unit: 'per kg' },
      senegal: { buy: 4750, sell: 5625, unit: 'per kg' },
      'ivory-coast': { buy: 4750, sell: 5625, unit: 'per kg' },
      mali: { buy: 4750, sell: 5625, unit: 'per kg' },
      'burkina-faso': { buy: 4750, sell: 5625, unit: 'per kg' },
      benin: { buy: 4750, sell: 5625, unit: 'per kg' },
      togo: { buy: 4750, sell: 5625, unit: 'per kg' },
      guinea: { buy: 38000, sell: 45000, unit: 'per kg' },
      'sierra-leone': { buy: 76, sell: 90, unit: 'per kg' },
      'guinea-bissau': { buy: 4750, sell: 5625, unit: 'per kg' },
      niger: { buy: 4750, sell: 5625, unit: 'per kg' },
      'cape-verde': { buy: 460, sell: 550, unit: 'per kg' },
      gambia: { buy: 240, sell: 300, unit: 'per kg' }
    }
  },
  {
    id: 'yam',
    name: 'Yam',
    icon: '🍠',
    category: 'Staple',
    prices: {
      liberia: { buy: 0.45, sell: 0.60, unit: 'per kg' },
      nigeria: { buy: 225, sell: 300, unit: 'per kg' },
      ghana: { buy: 3.0, sell: 4.0, unit: 'per kg' },
      senegal: { buy: 562, sell: 750, unit: 'per kg' },
      'ivory-coast': { buy: 562, sell: 750, unit: 'per kg' },
      mali: { buy: 562, sell: 750, unit: 'per kg' },
      'burkina-faso': { buy: 562, sell: 750, unit: 'per kg' },
      benin: { buy: 562, sell: 750, unit: 'per kg' },
      togo: { buy: 562, sell: 750, unit: 'per kg' },
      guinea: { buy: 4500, sell: 6000, unit: 'per kg' },
      'sierra-leone': { buy: 9, sell: 12, unit: 'per kg' },
      'guinea-bissau': { buy: 562, sell: 750, unit: 'per kg' },
      niger: { buy: 562, sell: 750, unit: 'per kg' },
      'cape-verde': { buy: 55, sell: 70, unit: 'per kg' },
      gambia: { buy: 28, sell: 35, unit: 'per kg' }
    }
  },
  {
    id: 'plantain',
    name: 'Plantain',
    icon: '🍌',
    category: 'Staple',
    prices: {
      liberia: { buy: 0.25, sell: 0.35, unit: 'per kg' },
      nigeria: { buy: 125, sell: 175, unit: 'per kg' },
      ghana: { buy: 1.7, sell: 2.3, unit: 'per kg' },
      senegal: { buy: 312, sell: 437, unit: 'per kg' },
      'ivory-coast': { buy: 312, sell: 437, unit: 'per kg' },
      mali: { buy: 312, sell: 437, unit: 'per kg' },
      'burkina-faso': { buy: 312, sell: 437, unit: 'per kg' },
      benin: { buy: 312, sell: 437, unit: 'per kg' },
      togo: { buy: 312, sell: 437, unit: 'per kg' },
      guinea: { buy: 2500, sell: 3500, unit: 'per kg' },
      'sierra-leone': { buy: 5, sell: 7, unit: 'per kg' },
      'guinea-bissau': { buy: 312, sell: 437, unit: 'per kg' },
      niger: { buy: 312, sell: 437, unit: 'per kg' },
      'cape-verde': { buy: 30, sell: 40, unit: 'per kg' },
      gambia: { buy: 15, sell: 20, unit: 'per kg' }
    }
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    icon: '🥜',
    category: 'Oil Crop',
    prices: {
      liberia: { buy: 0.80, sell: 1.10, unit: 'per kg' },
      nigeria: { buy: 400, sell: 550, unit: 'per kg' },
      ghana: { buy: 5.3, sell: 7.3, unit: 'per kg' },
      senegal: { buy: 1000, sell: 1375, unit: 'per kg' },
      'ivory-coast': { buy: 1000, sell: 1375, unit: 'per kg' },
      mali: { buy: 1000, sell: 1375, unit: 'per kg' },
      'burkina-faso': { buy: 1000, sell: 1375, unit: 'per kg' },
      benin: { buy: 1000, sell: 1375, unit: 'per kg' },
      togo: { buy: 1000, sell: 1375, unit: 'per kg' },
      guinea: { buy: 8000, sell: 11000, unit: 'per kg' },
      'sierra-leone': { buy: 16, sell: 22, unit: 'per kg' },
      'guinea-bissau': { buy: 1000, sell: 1375, unit: 'per kg' },
      niger: { buy: 1000, sell: 1375, unit: 'per kg' },
      'cape-verde': { buy: 95, sell: 130, unit: 'per kg' },
      gambia: { buy: 50, sell: 65, unit: 'per kg' }
    }
  },
  {
    id: 'sorghum',
    name: 'Sorghum',
    icon: '🌾',
    category: 'Cereal',
    prices: {
      liberia: { buy: 0.50, sell: 0.70, unit: 'per kg' },
      nigeria: { buy: 250, sell: 350, unit: 'per kg' },
      ghana: { buy: 3.3, sell: 4.7, unit: 'per kg' },
      senegal: { buy: 625, sell: 875, unit: 'per kg' },
      'ivory-coast': { buy: 625, sell: 875, unit: 'per kg' },
      mali: { buy: 625, sell: 875, unit: 'per kg' },
      'burkina-faso': { buy: 625, sell: 875, unit: 'per kg' },
      benin: { buy: 625, sell: 875, unit: 'per kg' },
      togo: { buy: 625, sell: 875, unit: 'per kg' },
      guinea: { buy: 5000, sell: 7000, unit: 'per kg' },
      'sierra-leone': { buy: 10, sell: 14, unit: 'per kg' },
      'guinea-bissau': { buy: 625, sell: 875, unit: 'per kg' },
      niger: { buy: 625, sell: 875, unit: 'per kg' },
      'cape-verde': { buy: 60, sell: 80, unit: 'per kg' },
      gambia: { buy: 30, sell: 40, unit: 'per kg' }
    }
  },
  {
    id: 'millet',
    name: 'Millet',
    icon: '🌾',
    category: 'Cereal',
    prices: {
      liberia: { buy: 0.40, sell: 0.55, unit: 'per kg' },
      nigeria: { buy: 200, sell: 275, unit: 'per kg' },
      ghana: { buy: 2.7, sell: 3.7, unit: 'per kg' },
      senegal: { buy: 500, sell: 687, unit: 'per kg' },
      'ivory-coast': { buy: 500, sell: 687, unit: 'per kg' },
      mali: { buy: 500, sell: 687, unit: 'per kg' },
      'burkina-faso': { buy: 500, sell: 687, unit: 'per kg' },
      benin: { buy: 500, sell: 687, unit: 'per kg' },
      togo: { buy: 500, sell: 687, unit: 'per kg' },
      guinea: { buy: 4000, sell: 5500, unit: 'per kg' },
      'sierra-leone': { buy: 8, sell: 11, unit: 'per kg' },
      'guinea-bissau': { buy: 500, sell: 687, unit: 'per kg' },
      niger: { buy: 500, sell: 687, unit: 'per kg' },
      'cape-verde': { buy: 48, sell: 65, unit: 'per kg' },
      gambia: { buy: 24, sell: 32, unit: 'per kg' }
    }
  },
  {
    id: 'cowpea',
    name: 'Cowpea',
    icon: '🫘',
    category: 'Legume',
    prices: {
      liberia: { buy: 0.70, sell: 0.90, unit: 'per kg' },
      nigeria: { buy: 350, sell: 450, unit: 'per kg' },
      ghana: { buy: 4.7, sell: 6.0, unit: 'per kg' },
      senegal: { buy: 875, sell: 1125, unit: 'per kg' },
      'ivory-coast': { buy: 875, sell: 1125, unit: 'per kg' },
      mali: { buy: 875, sell: 1125, unit: 'per kg' },
      'burkina-faso': { buy: 875, sell: 1125, unit: 'per kg' },
      benin: { buy: 875, sell: 1125, unit: 'per kg' },
      togo: { buy: 875, sell: 1125, unit: 'per kg' },
      guinea: { buy: 7000, sell: 9000, unit: 'per kg' },
      'sierra-leone': { buy: 14, sell: 18, unit: 'per kg' },
      'guinea-bissau': { buy: 875, sell: 1125, unit: 'per kg' },
      niger: { buy: 875, sell: 1125, unit: 'per kg' },
      'cape-verde': { buy: 85, sell: 110, unit: 'per kg' },
      gambia: { buy: 42, sell: 55, unit: 'per kg' }
    }
  },
  {
    id: 'tomato',
    name: 'Tomato',
    icon: '🍅',
    category: 'Vegetable',
    prices: {
      liberia: { buy: 0.60, sell: 0.85, unit: 'per kg' },
      nigeria: { buy: 300, sell: 425, unit: 'per kg' },
      ghana: { buy: 4.0, sell: 5.7, unit: 'per kg' },
      senegal: { buy: 750, sell: 1062, unit: 'per kg' },
      'ivory-coast': { buy: 750, sell: 1062, unit: 'per kg' },
      mali: { buy: 750, sell: 1062, unit: 'per kg' },
      'burkina-faso': { buy: 750, sell: 1062, unit: 'per kg' },
      benin: { buy: 750, sell: 1062, unit: 'per kg' },
      togo: { buy: 750, sell: 1062, unit: 'per kg' },
      guinea: { buy: 6000, sell: 8500, unit: 'per kg' },
      'sierra-leone': { buy: 12, sell: 17, unit: 'per kg' },
      'guinea-bissau': { buy: 750, sell: 1062, unit: 'per kg' },
      niger: { buy: 750, sell: 1062, unit: 'per kg' },
      'cape-verde': { buy: 72, sell: 100, unit: 'per kg' },
      gambia: { buy: 36, sell: 50, unit: 'per kg' }
    }
  },
  {
    id: 'onion',
    name: 'Onion',
    icon: '🧅',
    category: 'Vegetable',
    prices: {
      liberia: { buy: 0.45, sell: 0.65, unit: 'per kg' },
      nigeria: { buy: 225, sell: 325, unit: 'per kg' },
      ghana: { buy: 3.0, sell: 4.3, unit: 'per kg' },
      senegal: { buy: 562, sell: 812, unit: 'per kg' },
      'ivory-coast': { buy: 562, sell: 812, unit: 'per kg' },
      mali: { buy: 562, sell: 812, unit: 'per kg' },
      'burkina-faso': { buy: 562, sell: 812, unit: 'per kg' },
      benin: { buy: 562, sell: 812, unit: 'per kg' },
      togo: { buy: 562, sell: 812, unit: 'per kg' },
      guinea: { buy: 4500, sell: 6500, unit: 'per kg' },
      'sierra-leone': { buy: 9, sell: 13, unit: 'per kg' },
      'guinea-bissau': { buy: 562, sell: 812, unit: 'per kg' },
      niger: { buy: 562, sell: 812, unit: 'per kg' },
      'cape-verde': { buy: 54, sell: 75, unit: 'per kg' },
      gambia: { buy: 27, sell: 38, unit: 'per kg' }
    }
  },
  {
    id: 'pepper',
    name: 'Pepper',
    icon: '🌶️',
    category: 'Spice',
    prices: {
      liberia: { buy: 1.20, sell: 1.60, unit: 'per kg' },
      nigeria: { buy: 600, sell: 800, unit: 'per kg' },
      ghana: { buy: 8.0, sell: 10.7, unit: 'per kg' },
      senegal: { buy: 1500, sell: 2000, unit: 'per kg' },
      'ivory-coast': { buy: 1500, sell: 2000, unit: 'per kg' },
      mali: { buy: 1500, sell: 2000, unit: 'per kg' },
      'burkina-faso': { buy: 1500, sell: 2000, unit: 'per kg' },
      benin: { buy: 1500, sell: 2000, unit: 'per kg' },
      togo: { buy: 1500, sell: 2000, unit: 'per kg' },
      guinea: { buy: 12000, sell: 16000, unit: 'per kg' },
      'sierra-leone': { buy: 24, sell: 32, unit: 'per kg' },
      'guinea-bissau': { buy: 1500, sell: 2000, unit: 'per kg' },
      niger: { buy: 1500, sell: 2000, unit: 'per kg' },
      'cape-verde': { buy: 140, sell: 190, unit: 'per kg' },
      gambia: { buy: 70, sell: 90, unit: 'per kg' }
    }
  },
  {
    id: 'okra',
    name: 'Okra',
    icon: '🥬',
    category: 'Vegetable',
    prices: {
      liberia: { buy: 0.55, sell: 0.75, unit: 'per kg' },
      nigeria: { buy: 275, sell: 375, unit: 'per kg' },
      ghana: { buy: 3.7, sell: 5.0, unit: 'per kg' },
      senegal: { buy: 687, sell: 937, unit: 'per kg' },
      'ivory-coast': { buy: 687, sell: 937, unit: 'per kg' },
      mali: { buy: 687, sell: 937, unit: 'per kg' },
      'burkina-faso': { buy: 687, sell: 937, unit: 'per kg' },
      benin: { buy: 687, sell: 937, unit: 'per kg' },
      togo: { buy: 687, sell: 937, unit: 'per kg' },
      guinea: { buy: 5500, sell: 7500, unit: 'per kg' },
      'sierra-leone': { buy: 11, sell: 15, unit: 'per kg' },
      'guinea-bissau': { buy: 687, sell: 937, unit: 'per kg' },
      niger: { buy: 687, sell: 937, unit: 'per kg' },
      'cape-verde': { buy: 65, sell: 85, unit: 'per kg' },
      gambia: { buy: 32, sell: 42, unit: 'per kg' }
    }
  },
  {
    id: 'eggplant',
    name: 'Eggplant',
    icon: '🍆',
    category: 'Vegetable',
    prices: {
      liberia: { buy: 0.65, sell: 0.90, unit: 'per kg' },
      nigeria: { buy: 325, sell: 450, unit: 'per kg' },
      ghana: { buy: 4.3, sell: 6.0, unit: 'per kg' },
      senegal: { buy: 812, sell: 1125, unit: 'per kg' },
      'ivory-coast': { buy: 812, sell: 1125, unit: 'per kg' },
      mali: { buy: 812, sell: 1125, unit: 'per kg' },
      'burkina-faso': { buy: 812, sell: 1125, unit: 'per kg' },
      benin: { buy: 812, sell: 1125, unit: 'per kg' },
      togo: { buy: 812, sell: 1125, unit: 'per kg' },
      guinea: { buy: 6500, sell: 9000, unit: 'per kg' },
      'sierra-leone': { buy: 13, sell: 18, unit: 'per kg' },
      'guinea-bissau': { buy: 812, sell: 1125, unit: 'per kg' },
      niger: { buy: 812, sell: 1125, unit: 'per kg' },
      'cape-verde': { buy: 77, sell: 105, unit: 'per kg' },
      gambia: { buy: 38, sell: 52, unit: 'per kg' }
    }
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    icon: '🍠',
    category: 'Staple',
    prices: {
      liberia: { buy: 0.30, sell: 0.45, unit: 'per kg' },
      nigeria: { buy: 150, sell: 225, unit: 'per kg' },
      ghana: { buy: 2.0, sell: 3.0, unit: 'per kg' },
      senegal: { buy: 375, sell: 562, unit: 'per kg' },
      'ivory-coast': { buy: 375, sell: 562, unit: 'per kg' },
      mali: { buy: 375, sell: 562, unit: 'per kg' },
      'burkina-faso': { buy: 375, sell: 562, unit: 'per kg' },
      benin: { buy: 375, sell: 562, unit: 'per kg' },
      togo: { buy: 375, sell: 562, unit: 'per kg' },
      guinea: { buy: 3000, sell: 4500, unit: 'per kg' },
      'sierra-leone': { buy: 6, sell: 9, unit: 'per kg' },
      'guinea-bissau': { buy: 375, sell: 562, unit: 'per kg' },
      niger: { buy: 375, sell: 562, unit: 'per kg' },
      'cape-verde': { buy: 36, sell: 52, unit: 'per kg' },
      gambia: { buy: 18, sell: 26, unit: 'per kg' }
    }
  },
  {
    id: 'ginger',
    name: 'Ginger',
    icon: '🫚',
    category: 'Spice',
    prices: {
      liberia: { buy: 2.00, sell: 2.80, unit: 'per kg' },
      nigeria: { buy: 1000, sell: 1400, unit: 'per kg' },
      ghana: { buy: 13.3, sell: 18.7, unit: 'per kg' },
      senegal: { buy: 2500, sell: 3500, unit: 'per kg' },
      'ivory-coast': { buy: 2500, sell: 3500, unit: 'per kg' },
      mali: { buy: 2500, sell: 3500, unit: 'per kg' },
      'burkina-faso': { buy: 2500, sell: 3500, unit: 'per kg' },
      benin: { buy: 2500, sell: 3500, unit: 'per kg' },
      togo: { buy: 2500, sell: 3500, unit: 'per kg' },
      guinea: { buy: 20000, sell: 28000, unit: 'per kg' },
      'sierra-leone': { buy: 40, sell: 56, unit: 'per kg' },
      'guinea-bissau': { buy: 2500, sell: 3500, unit: 'per kg' },
      niger: { buy: 2500, sell: 3500, unit: 'per kg' },
      'cape-verde': { buy: 240, sell: 330, unit: 'per kg' },
      gambia: { buy: 120, sell: 165, unit: 'per kg' }
    }
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    icon: '🫚',
    category: 'Spice',
    prices: {
      liberia: { buy: 1.80, sell: 2.40, unit: 'per kg' },
      nigeria: { buy: 900, sell: 1200, unit: 'per kg' },
      ghana: { buy: 12.0, sell: 16.0, unit: 'per kg' },
      senegal: { buy: 2250, sell: 3000, unit: 'per kg' },
      'ivory-coast': { buy: 2250, sell: 3000, unit: 'per kg' },
      mali: { buy: 2250, sell: 3000, unit: 'per kg' },
      'burkina-faso': { buy: 2250, sell: 3000, unit: 'per kg' },
      benin: { buy: 2250, sell: 3000, unit: 'per kg' },
      togo: { buy: 2250, sell: 3000, unit: 'per kg' },
      guinea: { buy: 18000, sell: 24000, unit: 'per kg' },
      'sierra-leone': { buy: 36, sell: 48, unit: 'per kg' },
      'guinea-bissau': { buy: 2250, sell: 3000, unit: 'per kg' },
      niger: { buy: 2250, sell: 3000, unit: 'per kg' },
      'cape-verde': { buy: 215, sell: 285, unit: 'per kg' },
      gambia: { buy: 108, sell: 142, unit: 'per kg' }
    }
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    icon: '🥬',
    category: 'Vegetable',
    prices: {
      liberia: { buy: 0.40, sell: 0.60, unit: 'per kg' },
      nigeria: { buy: 200, sell: 300, unit: 'per kg' },
      ghana: { buy: 2.7, sell: 4.0, unit: 'per kg' },
      senegal: { buy: 500, sell: 750, unit: 'per kg' },
      'ivory-coast': { buy: 500, sell: 750, unit: 'per kg' },
      mali: { buy: 500, sell: 750, unit: 'per kg' },
      'burkina-faso': { buy: 500, sell: 750, unit: 'per kg' },
      benin: { buy: 500, sell: 750, unit: 'per kg' },
      togo: { buy: 500, sell: 750, unit: 'per kg' },
      guinea: { buy: 4000, sell: 6000, unit: 'per kg' },
      'sierra-leone': { buy: 8, sell: 12, unit: 'per kg' },
      'guinea-bissau': { buy: 500, sell: 750, unit: 'per kg' },
      niger: { buy: 500, sell: 750, unit: 'per kg' },
      'cape-verde': { buy: 48, sell: 70, unit: 'per kg' },
      gambia: { buy: 24, sell: 35, unit: 'per kg' }
    }
  },
  {
    id: 'carrot',
    name: 'Carrot',
    icon: '🥕',
    category: 'Vegetable',
    prices: {
      liberia: { buy: 0.70, sell: 1.00, unit: 'per kg' },
      nigeria: { buy: 350, sell: 500, unit: 'per kg' },
      ghana: { buy: 4.7, sell: 6.7, unit: 'per kg' },
      senegal: { buy: 875, sell: 1250, unit: 'per kg' },
      'ivory-coast': { buy: 875, sell: 1250, unit: 'per kg' },
      mali: { buy: 875, sell: 1250, unit: 'per kg' },
      'burkina-faso': { buy: 875, sell: 1250, unit: 'per kg' },
      benin: { buy: 875, sell: 1250, unit: 'per kg' },
      togo: { buy: 875, sell: 1250, unit: 'per kg' },
      guinea: { buy: 7000, sell: 10000, unit: 'per kg' },
      'sierra-leone': { buy: 14, sell: 20, unit: 'per kg' },
      'guinea-bissau': { buy: 875, sell: 1250, unit: 'per kg' },
      niger: { buy: 875, sell: 1250, unit: 'per kg' },
      'cape-verde': { buy: 85, sell: 120, unit: 'per kg' },
      gambia: { buy: 42, sell: 60, unit: 'per kg' }
    }
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    icon: '🥬',
    category: 'Vegetable',
    prices: {
      liberia: { buy: 0.50, sell: 0.75, unit: 'per kg' },
      nigeria: { buy: 250, sell: 375, unit: 'per kg' },
      ghana: { buy: 3.3, sell: 5.0, unit: 'per kg' },
      senegal: { buy: 625, sell: 937, unit: 'per kg' },
      'ivory-coast': { buy: 625, sell: 937, unit: 'per kg' },
      mali: { buy: 625, sell: 937, unit: 'per kg' },
      'burkina-faso': { buy: 625, sell: 937, unit: 'per kg' },
      benin: { buy: 625, sell: 937, unit: 'per kg' },
      togo: { buy: 625, sell: 937, unit: 'per kg' },
      guinea: { buy: 5000, sell: 7500, unit: 'per kg' },
      'sierra-leone': { buy: 10, sell: 15, unit: 'per kg' },
      'guinea-bissau': { buy: 625, sell: 937, unit: 'per kg' },
      niger: { buy: 625, sell: 937, unit: 'per kg' },
      'cape-verde': { buy: 60, sell: 90, unit: 'per kg' },
      gambia: { buy: 30, sell: 45, unit: 'per kg' }
    }
  },
  {
    id: 'spinach',
    name: 'Spinach',
    icon: '🥬',
    category: 'Vegetable',
    prices: {
      liberia: { buy: 0.35, sell: 0.50, unit: 'per kg' },
      nigeria: { buy: 175, sell: 250, unit: 'per kg' },
      ghana: { buy: 2.3, sell: 3.3, unit: 'per kg' },
      senegal: { buy: 437, sell: 625, unit: 'per kg' },
      'ivory-coast': { buy: 437, sell: 625, unit: 'per kg' },
      mali: { buy: 437, sell: 625, unit: 'per kg' },
      'burkina-faso': { buy: 437, sell: 625, unit: 'per kg' },
      benin: { buy: 437, sell: 625, unit: 'per kg' },
      togo: { buy: 437, sell: 625, unit: 'per kg' },
      guinea: { buy: 3500, sell: 5000, unit: 'per kg' },
      'sierra-leone': { buy: 7, sell: 10, unit: 'per kg' },
      'guinea-bissau': { buy: 437, sell: 625, unit: 'per kg' },
      niger: { buy: 437, sell: 625, unit: 'per kg' },
      'cape-verde': { buy: 42, sell: 60, unit: 'per kg' },
      gambia: { buy: 21, sell: 30, unit: 'per kg' }
    }
  },
  {
    id: 'banana',
    name: 'Banana',
    icon: '🍌',
    category: 'Fruit',
    prices: {
      liberia: { buy: 0.25, sell: 0.40, unit: 'per kg' },
      nigeria: { buy: 125, sell: 200, unit: 'per kg' },
      ghana: { buy: 1.7, sell: 2.7, unit: 'per kg' },
      senegal: { buy: 312, sell: 500, unit: 'per kg' },
      'ivory-coast': { buy: 312, sell: 500, unit: 'per kg' },
      mali: { buy: 312, sell: 500, unit: 'per kg' },
      'burkina-faso': { buy: 312, sell: 500, unit: 'per kg' },
      benin: { buy: 312, sell: 500, unit: 'per kg' },
      togo: { buy: 312, sell: 500, unit: 'per kg' },
      guinea: { buy: 2500, sell: 4000, unit: 'per kg' },
      'sierra-leone': { buy: 5, sell: 8, unit: 'per kg' },
      'guinea-bissau': { buy: 312, sell: 500, unit: 'per kg' },
      niger: { buy: 312, sell: 500, unit: 'per kg' },
      'cape-verde': { buy: 30, sell: 48, unit: 'per kg' },
      gambia: { buy: 15, sell: 24, unit: 'per kg' }
    }
  },
  {
    id: 'mango',
    name: 'Mango',
    icon: '🥭',
    category: 'Fruit',
    prices: {
      liberia: { buy: 0.60, sell: 0.90, unit: 'per kg' },
      nigeria: { buy: 300, sell: 450, unit: 'per kg' },
      ghana: { buy: 4.0, sell: 6.0, unit: 'per kg' },
      senegal: { buy: 750, sell: 1125, unit: 'per kg' },
      'ivory-coast': { buy: 750, sell: 1125, unit: 'per kg' },
      mali: { buy: 750, sell: 1125, unit: 'per kg' },
      'burkina-faso': { buy: 750, sell: 1125, unit: 'per kg' },
      benin: { buy: 750, sell: 1125, unit: 'per kg' },
      togo: { buy: 750, sell: 1125, unit: 'per kg' },
      guinea: { buy: 6000, sell: 9000, unit: 'per kg' },
      'sierra-leone': { buy: 12, sell: 18, unit: 'per kg' },
      'guinea-bissau': { buy: 750, sell: 1125, unit: 'per kg' },
      niger: { buy: 750, sell: 1125, unit: 'per kg' },
      'cape-verde': { buy: 72, sell: 108, unit: 'per kg' },
      gambia: { buy: 36, sell: 54, unit: 'per kg' }
    }
  },
  {
    id: 'orange',
    name: 'Orange',
    icon: '🍊',
    category: 'Fruit',
    prices: {
      liberia: { buy: 0.45, sell: 0.70, unit: 'per kg' },
      nigeria: { buy: 225, sell: 350, unit: 'per kg' },
      ghana: { buy: 3.0, sell: 4.7, unit: 'per kg' },
      senegal: { buy: 562, sell: 875, unit: 'per kg' },
      'ivory-coast': { buy: 562, sell: 875, unit: 'per kg' },
      mali: { buy: 562, sell: 875, unit: 'per kg' },
      'burkina-faso': { buy: 562, sell: 875, unit: 'per kg' },
      benin: { buy: 562, sell: 875, unit: 'per kg' },
      togo: { buy: 562, sell: 875, unit: 'per kg' },
      guinea: { buy: 4500, sell: 7000, unit: 'per kg' },
      'sierra-leone': { buy: 9, sell: 14, unit: 'per kg' },
      'guinea-bissau': { buy: 562, sell: 875, unit: 'per kg' },
      niger: { buy: 562, sell: 875, unit: 'per kg' },
      'cape-verde': { buy: 54, sell: 84, unit: 'per kg' },
      gambia: { buy: 27, sell: 42, unit: 'per kg' }
    }
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    icon: '🍍',
    category: 'Fruit',
    prices: {
      liberia: { buy: 0.80, sell: 1.20, unit: 'per kg' },
      nigeria: { buy: 400, sell: 600, unit: 'per kg' },
      ghana: { buy: 5.3, sell: 8.0, unit: 'per kg' },
      senegal: { buy: 1000, sell: 1500, unit: 'per kg' },
      'ivory-coast': { buy: 1000, sell: 1500, unit: 'per kg' },
      mali: { buy: 1000, sell: 1500, unit: 'per kg' },
      'burkina-faso': { buy: 1000, sell: 1500, unit: 'per kg' },
      benin: { buy: 1000, sell: 1500, unit: 'per kg' },
      togo: { buy: 1000, sell: 1500, unit: 'per kg' },
      guinea: { buy: 8000, sell: 12000, unit: 'per kg' },
      'sierra-leone': { buy: 16, sell: 24, unit: 'per kg' },
      'guinea-bissau': { buy: 1000, sell: 1500, unit: 'per kg' },
      niger: { buy: 1000, sell: 1500, unit: 'per kg' },
      'cape-verde': { buy: 95, sell: 140, unit: 'per kg' },
      gambia: { buy: 48, sell: 72, unit: 'per kg' }
    }
  },
  {
    id: 'papaya',
    name: 'Papaya',
    icon: '🥭',
    category: 'Fruit',
    prices: {
      liberia: { buy: 0.35, sell: 0.55, unit: 'per kg' },
      nigeria: { buy: 175, sell: 275, unit: 'per kg' },
      ghana: { buy: 2.3, sell: 3.7, unit: 'per kg' },
      senegal: { buy: 437, sell: 687, unit: 'per kg' },
      'ivory-coast': { buy: 437, sell: 687, unit: 'per kg' },
      mali: { buy: 437, sell: 687, unit: 'per kg' },
      'burkina-faso': { buy: 437, sell: 687, unit: 'per kg' },
      benin: { buy: 437, sell: 687, unit: 'per kg' },
      togo: { buy: 437, sell: 687, unit: 'per kg' },
      guinea: { buy: 3500, sell: 5500, unit: 'per kg' },
      'sierra-leone': { buy: 7, sell: 11, unit: 'per kg' },
      'guinea-bissau': { buy: 437, sell: 687, unit: 'per kg' },
      niger: { buy: 437, sell: 687, unit: 'per kg' },
      'cape-verde': { buy: 42, sell: 65, unit: 'per kg' },
      gambia: { buy: 21, sell: 32, unit: 'per kg' }
    }
  }
]

export default function MarketPricesPage() {
  const [selectedCountry, setSelectedCountry] = useState('liberia')
  const [selectedCrop, setSelectedCrop] = useState('rice')
  const [fromCountry, setFromCountry] = useState('liberia')
  const [toCountry, setToCountry] = useState('nigeria')
  const [quantity, setQuantity] = useState(100)
  const [showConverter, setShowConverter] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Update prices every hour (simulate real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 3600000) // 1 hour

    return () => clearInterval(interval)
  }, [])

  const currentCountry = countries.find(c => c.id === selectedCountry)
  const currentCrop = cropPrices.find(c => c.id === selectedCrop)
  const fromCountryData = countries.find(c => c.id === fromCountry)
  const toCountryData = countries.find(c => c.id === toCountry)

  // Calculate conversion between currencies
  const convertPrice = (price: number, fromCountryId: string, toCountryId: string) => {
    const fromRate = countries.find(c => c.id === fromCountryId)?.rate || 1
    const toRate = countries.find(c => c.id === toCountryId)?.rate || 1
    return (price * fromRate) / toRate
  }

  // Calculate profit potential
  const calculateProfit = (crop: any, fromCountryId: string, toCountryId: string, quantity: number) => {
    const fromPrices = crop.prices[fromCountryId as keyof typeof crop.prices]
    const toPrices = crop.prices[toCountryId as keyof typeof crop.prices]
    
    if (!fromPrices || !toPrices) return null

    const buyPrice = fromPrices.buy
    const sellPrice = toPrices.sell
    
    const buyCost = buyPrice * quantity
    const sellRevenue = convertPrice(sellPrice, toCountryId, fromCountryId) * quantity
    const profit = sellRevenue - buyCost
    const profitMargin = (profit / buyCost) * 100

    return {
      buyCost,
      sellRevenue,
      profit,
      profitMargin,
      fromCurrency: countries.find(c => c.id === fromCountryId)?.symbol || '',
      toCurrency: countries.find(c => c.id === toCountryId)?.symbol || ''
    }
  }

  const profitData = calculateProfit(currentCrop, fromCountry, toCountry, quantity)

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Market Prices 🌍</h1>
              <p className="text-sm text-gray-600">West African Markets</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowConverter(!showConverter)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Currency Converter"
              >
                <CalculatorIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Market Prices</h1>
              <p className="text-gray-600">Real-time prices across West Africa</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowConverter(!showConverter)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CalculatorIcon className="w-4 h-4" />
                <span>Currency Converter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-md lg:max-w-7xl mx-auto px-4 py-6"
      >
        {/* Country Selector */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Select Country</h2>
          <div className="grid grid-cols-3 lg:grid-cols-9 gap-2 lg:gap-3">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className={`p-2 lg:p-3 rounded-lg border-2 transition-colors ${
                  selectedCountry === country.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg lg:text-xl mb-1">{country.flag}</div>
                  <div className="font-medium text-gray-900 text-xs lg:text-sm">{country.name}</div>
                  <div className="text-xs text-gray-500">{country.currency}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Crop Prices */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
            Current Prices in {currentCountry?.name} ({currentCountry?.currency})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {cropPrices.map((crop) => {
              const prices = crop.prices[selectedCountry as keyof typeof crop.prices]
              if (!prices) return null

              return (
                <div key={crop.id} className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{crop.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{crop.name}</h3>
                      <div className="text-sm text-gray-500">{crop.category}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Buy Price</span>
                      <span className="font-semibold text-green-600">
                        {currentCountry?.symbol}{prices.buy.toFixed(2)} {prices.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sell Price</span>
                      <span className="font-semibold text-blue-600">
                        {currentCountry?.symbol}{prices.sell.toFixed(2)} {prices.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Profit Margin</span>
                      <span className="font-semibold text-purple-600">
                        {(((prices.sell - prices.buy) / prices.buy) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Currency Converter */}
        {showConverter && (
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Currency Converter & Profit Calculator</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Converter Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Country</label>
                    <select
                      value={fromCountry}
                      onChange={(e) => setFromCountry(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.flag} {country.name} ({country.currency})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To Country</label>
                    <select
                      value={toCountry}
                      onChange={(e) => setToCountry(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.flag} {country.name} ({country.currency})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Crop</label>
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {cropPrices.map((crop) => (
                        <option key={crop.id} value={crop.id}>
                          {crop.icon} {crop.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                </div>

                {/* Profit Analysis */}
                {profitData && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Profit Analysis</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Buy Cost ({fromCountryData?.currency})</span>
                        <span className="font-semibold">
                          {fromCountryData?.symbol}{profitData.buyCost.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sell Revenue ({toCountryData?.currency})</span>
                        <span className="font-semibold">
                          {toCountryData?.symbol}{profitData.sellRevenue.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Net Profit</span>
                          <span className={`font-bold ${profitData.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {fromCountryData?.symbol}{profitData.profit.toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between mt-2">
                          <span className="text-gray-600">Profit Margin</span>
                          <span className={`font-bold ${profitData.profitMargin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {profitData.profitMargin.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
                      {profitData.profitMargin > 20 ? (
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircleIcon className="w-5 h-5" />
                          <span className="text-sm">Excellent profit opportunity! Consider this trade.</span>
                        </div>
                      ) : profitData.profitMargin > 10 ? (
                        <div className="flex items-center space-x-2 text-yellow-700">
                          <ExclamationTriangleIcon className="w-5 h-5" />
                          <span className="text-sm">Moderate profit. Consider market risks.</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-red-700">
                          <ExclamationTriangleIcon className="w-5 h-5" />
                          <span className="text-sm">Low profit margin. Consider other options.</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Market Trends */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Market Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUpIcon className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-900">Rising Prices</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rice</span>
                  <span className="text-sm font-semibold text-green-600">+5.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cocoa</span>
                  <span className="text-sm font-semibold text-green-600">+3.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Coffee</span>
                  <span className="text-sm font-semibold text-green-600">+2.1%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingDownIcon className="w-6 h-6 text-red-600" />
                <h3 className="font-semibold text-gray-900">Falling Prices</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cassava</span>
                  <span className="text-sm font-semibold text-red-600">-2.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Maize</span>
                  <span className="text-sm font-semibold text-red-600">-1.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Palm Oil</span>
                  <span className="text-sm font-semibold text-red-600">-0.9%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center space-x-3 mb-3">
                <StarIcon className="w-6 h-6 text-yellow-600" />
                <h3 className="font-semibold text-gray-900">Best Opportunities</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Liberia → Nigeria</span>
                  <span className="text-sm font-semibold text-blue-600">Rice</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ghana → Liberia</span>
                  <span className="text-sm font-semibold text-blue-600">Cocoa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Senegal → Guinea</span>
                  <span className="text-sm font-semibold text-blue-600">Coffee</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <ArrowPathIcon className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleString()}</span>
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}
