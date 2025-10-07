'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowTrendingDownIcon as TrendingDownIcon,
  CalendarIcon,
  MapPinIcon,
  SunIcon,
  CloudIcon as CloudRainIcon,
  SparklesIcon as SeedlingIcon,
  ScissorsIcon,
  CurrencyDollarIcon,
  ClockIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  LightBulbIcon,
  EyeIcon,
  ArrowDownTrayIcon as DownloadIcon,
  ShareIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  BellIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
  MapIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  AdjustmentsHorizontalIcon,
  ViewColumnsIcon,
  Bars3Icon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function FarmingAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('yield')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'chart'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [realTimeData, setRealTimeData] = useState(true)
  
  const chartRef = useRef<HTMLDivElement>(null)

  const periods = [
    { id: '1month', name: '1 Month', days: 30 },
    { id: '3months', name: '3 Months', days: 90 },
    { id: '6months', name: '6 Months', days: 180 },
    { id: '1year', name: '1 Year', days: 365 },
    { id: '2years', name: '2 Years', days: 730 },
    { id: 'custom', name: 'Custom Range', days: 0 }
  ]

  const metrics = [
    { id: 'yield', name: 'Yield', icon: TrendingUpIcon, color: 'green', unit: 'tons' },
    { id: 'profit', name: 'Profit', icon: CurrencyDollarIcon, color: 'blue', unit: '₦' },
    { id: 'growth', name: 'Growth Rate', icon: ChartBarIcon, color: 'purple', unit: '%' },
    { id: 'efficiency', name: 'Efficiency', icon: StarIcon, color: 'yellow', unit: '%' },
    { id: 'cost', name: 'Cost Analysis', icon: CurrencyDollarIcon, color: 'red', unit: '₦' },
    { id: 'weather', name: 'Weather Impact', icon: SunIcon, color: 'orange', unit: '%' }
  ]

  const viewModes = [
    { id: 'grid', name: 'Grid View', icon: Squares2X2Icon },
    { id: 'list', name: 'List View', icon: ListBulletIcon },
    { id: 'chart', name: 'Chart View', icon: PresentationChartLineIcon }
  ]

  const exportFormats = [
    { id: 'pdf', name: 'PDF Report', icon: DocumentChartBarIcon },
    { id: 'excel', name: 'Excel Spreadsheet', icon: TableCellsIcon },
    { id: 'csv', name: 'CSV Data', icon: TableCellsIcon },
    { id: 'image', name: 'Image Export', icon: ArrowDownTrayIcon }
  ]

  // Enhanced farming cycles with all West African market products (Liberia as default)
  const [farmingCycles] = useState([
    // Staple Crops
    {
      id: 1,
      crop: 'Rice',
      variety: 'NERICA Rice (Liberia)',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-07-15'),
      yield: 3.2,
      profit: 1,250,
      cost: 450,
      status: 'completed',
      season: 'rainy',
      location: 'Bong County, Liberia',
      area: 2.0,
      weatherImpact: 88,
      efficiency: 94,
      quality: 'A+',
      marketPrice: 320,
      notes: 'Excellent yield in Liberia\'s rainy season. Ready for export to Nigeria.'
    },
    {
      id: 2,
      crop: 'Cassava',
      variety: 'TMS Cassava (West Africa)',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      yield: 0,
      profit: 0,
      cost: 280,
      status: 'ongoing',
      season: 'all',
      location: 'Lofa County, Liberia',
      area: 3.5,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 120,
      notes: 'Long-term crop. High demand in Ghana and Nigeria markets.'
    },
    {
      id: 3,
      crop: 'Yam',
      variety: 'White Yam (Liberia)',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-10-15'),
      yield: 4.5,
      profit: 1,350,
      cost: 600,
      status: 'completed',
      season: 'rainy',
      location: 'Grand Gedeh County, Liberia',
      area: 2.2,
      weatherImpact: 90,
      efficiency: 92,
      quality: 'A+',
      marketPrice: 300,
      notes: 'High-quality yam. Strong demand in Nigeria and Ghana markets.'
    },
    {
      id: 4,
      crop: 'Plantain',
      variety: 'Horn Plantain (Liberia)',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-09-30'),
      yield: 6.8,
      profit: 1,190,
      cost: 340,
      status: 'completed',
      season: 'rainy',
      location: 'River Cess County, Liberia',
      area: 1.8,
      weatherImpact: 85,
      efficiency: 88,
      quality: 'A',
      marketPrice: 175,
      notes: 'Good yield for local consumption and regional trade.'
    },
    {
      id: 5,
      crop: 'Sweet Potato',
      variety: 'Orange Sweet Potato',
      startDate: new Date('2024-05-15'),
      endDate: new Date('2024-11-30'),
      yield: 3.5,
      profit: 1,050,
      cost: 420,
      status: 'completed',
      season: 'rainy',
      location: 'Maryland County, Liberia',
      area: 2.0,
      weatherImpact: 87,
      efficiency: 91,
      quality: 'A',
      marketPrice: 225,
      notes: 'Nutritious crop with good market demand across West Africa.'
    },
    
    // Cereal Crops
    {
      id: 6,
      crop: 'Maize',
      variety: 'Improved Maize (Liberia)',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-08-30'),
      yield: 2.1,
      profit: 420,
      cost: 250,
      status: 'completed',
      season: 'rainy',
      location: 'Montserrado County, Liberia',
      area: 1.5,
      weatherImpact: 82,
      efficiency: 87,
      quality: 'A',
      marketPrice: 200,
      notes: 'Good yield for local consumption and regional trade.'
    },
    {
      id: 7,
      crop: 'Sorghum',
      variety: 'Red Sorghum (Liberia)',
      startDate: new Date('2024-04-15'),
      endDate: new Date('2024-09-15'),
      yield: 1.8,
      profit: 630,
      cost: 350,
      status: 'completed',
      season: 'rainy',
      location: 'Grand Kru County, Liberia',
      area: 1.2,
      weatherImpact: 83,
      efficiency: 86,
      quality: 'A',
      marketPrice: 350,
      notes: 'Drought-resistant crop. Good for dry season farming.'
    },
    {
      id: 8,
      crop: 'Millet',
      variety: 'Pearl Millet (Liberia)',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-08-30'),
      yield: 1.5,
      profit: 525,
      cost: 300,
      status: 'completed',
      season: 'rainy',
      location: 'River Gee County, Liberia',
      area: 1.0,
      weatherImpact: 80,
      efficiency: 84,
      quality: 'A',
      marketPrice: 275,
      notes: 'Traditional grain crop. High nutritional value.'
    },
    
    // Cash Crops
    {
      id: 9,
      crop: 'Cocoa',
      variety: 'Forastero Cocoa',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-11-30'),
      yield: 0,
      profit: 0,
      cost: 400,
      status: 'ongoing',
      season: 'all',
      location: 'Sinoe County, Liberia',
      area: 2.5,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 800,
      notes: 'Long-term crop. High export potential to Ghana and Ivory Coast.'
    },
    {
      id: 10,
      crop: 'Coffee',
      variety: 'Liberica Coffee (Liberia)',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-12-15'),
      yield: 0,
      profit: 0,
      cost: 500,
      status: 'ongoing',
      season: 'all',
      location: 'Bomi County, Liberia',
      area: 1.8,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 450,
      notes: 'Premium Liberian coffee. High export value to Europe and America.'
    },
    
    // Oil Crops
    {
      id: 11,
      crop: 'Palm Oil',
      variety: 'Tenera Palm (Liberia)',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-09-30'),
      yield: 2.8,
      profit: 1,680,
      cost: 520,
      status: 'completed',
      season: 'rainy',
      location: 'Grand Bassa County, Liberia',
      area: 1.2,
      weatherImpact: 92,
      efficiency: 96,
      quality: 'A+',
      marketPrice: 600,
      notes: 'Premium quality palm oil. High export demand to Senegal and Mali.'
    },
    {
      id: 12,
      crop: 'Groundnut',
      variety: 'Virginia Groundnut',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-08-15'),
      yield: 1.5,
      profit: 750,
      cost: 300,
      status: 'completed',
      season: 'rainy',
      location: 'Nimba County, Liberia',
      area: 1.8,
      weatherImpact: 85,
      efficiency: 89,
      quality: 'A',
      marketPrice: 500,
      notes: 'Good yield. High demand in Senegal and Mali for export.'
    },
    
    // Legumes
    {
      id: 13,
      crop: 'Cowpea',
      variety: 'Black-eyed Pea (Liberia)',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-09-15'),
      yield: 1.2,
      profit: 540,
      cost: 360,
      status: 'completed',
      season: 'rainy',
      location: 'Gbarpolu County, Liberia',
      area: 1.5,
      weatherImpact: 88,
      efficiency: 90,
      quality: 'A',
      marketPrice: 450,
      notes: 'High protein legume. Good for soil nitrogen fixation.'
    },
    
    // Vegetables
    {
      id: 14,
      crop: 'Tomato',
      variety: 'Cherry Tomato (Liberia)',
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-09-15'),
      yield: 3.2,
      profit: 1,360,
      cost: 680,
      status: 'completed',
      season: 'dry',
      location: 'Margibi County, Liberia',
      area: 0.8,
      weatherImpact: 95,
      efficiency: 96,
      quality: 'A+',
      marketPrice: 425,
      notes: 'Premium quality tomatoes. High market demand locally and regionally.'
    },
    {
      id: 15,
      crop: 'Onion',
      variety: 'Red Onion (Liberia)',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-09-30'),
      yield: 2.5,
      profit: 1,125,
      cost: 650,
      status: 'completed',
      season: 'rainy',
      location: 'Grand Cape Mount County, Liberia',
      area: 1.0,
      weatherImpact: 89,
      efficiency: 92,
      quality: 'A',
      marketPrice: 325,
      notes: 'Essential kitchen crop. Strong local and regional demand.'
    },
    {
      id: 16,
      crop: 'Okra',
      variety: 'Green Okra (Liberia)',
      startDate: new Date('2024-04-15'),
      endDate: new Date('2024-10-15'),
      yield: 2.8,
      profit: 1,050,
      cost: 420,
      status: 'completed',
      season: 'rainy',
      location: 'Bong County, Liberia',
      area: 1.2,
      weatherImpact: 87,
      efficiency: 89,
      quality: 'A',
      marketPrice: 375,
      notes: 'Popular vegetable. Good for local markets and regional trade.'
    },
    {
      id: 17,
      crop: 'Eggplant',
      variety: 'Purple Eggplant (Liberia)',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-10-30'),
      yield: 2.2,
      profit: 990,
      cost: 440,
      status: 'completed',
      season: 'rainy',
      location: 'Lofa County, Liberia',
      area: 1.0,
      weatherImpact: 85,
      efficiency: 88,
      quality: 'A',
      marketPrice: 450,
      notes: 'Nutritious vegetable. Growing demand in urban markets.'
    },
    {
      id: 18,
      crop: 'Cabbage',
      variety: 'Green Cabbage (Liberia)',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-11-30'),
      yield: 3.5,
      profit: 1,225,
      cost: 525,
      status: 'completed',
      season: 'rainy',
      location: 'Montserrado County, Liberia',
      area: 1.5,
      weatherImpact: 90,
      efficiency: 93,
      quality: 'A',
      marketPrice: 300,
      notes: 'Cool season crop. Good for highland areas.'
    },
    {
      id: 19,
      crop: 'Carrot',
      variety: 'Orange Carrot (Liberia)',
      startDate: new Date('2024-05-15'),
      endDate: new Date('2024-10-15'),
      yield: 2.8,
      profit: 1,400,
      cost: 700,
      status: 'completed',
      season: 'rainy',
      location: 'Bong County, Liberia',
      area: 1.0,
      weatherImpact: 88,
      efficiency: 91,
      quality: 'A',
      marketPrice: 500,
      notes: 'High-value vegetable. Strong demand in urban markets.'
    },
    {
      id: 20,
      crop: 'Lettuce',
      variety: 'Green Lettuce (Liberia)',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-11-15'),
      yield: 4.2,
      profit: 1,260,
      cost: 420,
      status: 'completed',
      season: 'rainy',
      location: 'Margibi County, Liberia',
      area: 1.2,
      weatherImpact: 92,
      efficiency: 94,
      quality: 'A',
      marketPrice: 375,
      notes: 'Leafy green vegetable. Popular in urban markets.'
    },
    {
      id: 21,
      crop: 'Spinach',
      variety: 'Green Spinach (Liberia)',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-10-30'),
      yield: 3.8,
      profit: 1,140,
      cost: 380,
      status: 'completed',
      season: 'rainy',
      location: 'Grand Bassa County, Liberia',
      area: 1.0,
      weatherImpact: 89,
      efficiency: 92,
      quality: 'A',
      marketPrice: 250,
      notes: 'Nutritious leafy green. High demand for health-conscious consumers.'
    },
    
    // Spices
    {
      id: 22,
      crop: 'Pepper',
      variety: 'Hot Pepper (Liberia)',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-11-30'),
      yield: 1.8,
      profit: 1,440,
      cost: 720,
      status: 'completed',
      season: 'rainy',
      location: 'Nimba County, Liberia',
      area: 0.8,
      weatherImpact: 86,
      efficiency: 89,
      quality: 'A',
      marketPrice: 800,
      notes: 'High-value spice crop. Strong demand in local and regional markets.'
    },
    {
      id: 23,
      crop: 'Ginger',
      variety: 'Fresh Ginger (Liberia)',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-12-31'),
      yield: 0,
      profit: 0,
      cost: 600,
      status: 'ongoing',
      season: 'all',
      location: 'Grand Gedeh County, Liberia',
      area: 1.5,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 1400,
      notes: 'Long-term spice crop. High export value to international markets.'
    },
    {
      id: 24,
      crop: 'Turmeric',
      variety: 'Yellow Turmeric (Liberia)',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-12-31'),
      yield: 0,
      profit: 0,
      cost: 500,
      status: 'ongoing',
      season: 'all',
      location: 'River Cess County, Liberia',
      area: 1.2,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 1200,
      notes: 'Medicinal spice crop. Growing demand in health markets.'
    },
    
    // Fruits
    {
      id: 25,
      crop: 'Banana',
      variety: 'Plantain Banana (Liberia)',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      yield: 0,
      profit: 0,
      cost: 200,
      status: 'ongoing',
      season: 'all',
      location: 'Grand Cape Mount County, Liberia',
      area: 2.0,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 200,
      notes: 'Perennial fruit crop. Year-round production for local markets.'
    },
    {
      id: 26,
      crop: 'Mango',
      variety: 'Sweet Mango (Liberia)',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      yield: 0,
      profit: 0,
      cost: 300,
      status: 'ongoing',
      season: 'all',
      location: 'Maryland County, Liberia',
      area: 1.5,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 450,
      notes: 'Tropical fruit tree. High value for local and export markets.'
    },
    {
      id: 27,
      crop: 'Orange',
      variety: 'Sweet Orange (Liberia)',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      yield: 0,
      profit: 0,
      cost: 250,
      status: 'ongoing',
      season: 'all',
      location: 'Grand Kru County, Liberia',
      area: 1.2,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 350,
      notes: 'Citrus fruit tree. Good for vitamin C and local consumption.'
    },
    {
      id: 28,
      crop: 'Pineapple',
      variety: 'Sweet Pineapple (Liberia)',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      yield: 0,
      profit: 0,
      cost: 400,
      status: 'ongoing',
      season: 'all',
      location: 'River Gee County, Liberia',
      area: 1.8,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 600,
      notes: 'Tropical fruit. High export potential to regional markets.'
    },
    {
      id: 29,
      crop: 'Papaya',
      variety: 'Red Papaya (Liberia)',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      yield: 0,
      profit: 0,
      cost: 150,
      status: 'ongoing',
      season: 'all',
      location: 'Gbarpolu County, Liberia',
      area: 1.0,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 275,
      notes: 'Fast-growing fruit tree. Good for local markets and nutrition.'
    }
  ])

  // Real-time data simulation
  useEffect(() => {
    if (realTimeData) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        console.log('Updating real-time data...')
      }, 30000) // Update every 30 seconds

      return () => clearInterval(interval)
    }
  }, [realTimeData])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const handleExport = (format: string) => {
    console.log(`Exporting data as ${format}`)
    setShowExport(false)
  }

  const toggleCropSelection = (crop: string) => {
    setSelectedCrops(prev => 
      prev.includes(crop) 
        ? prev.filter(c => c !== crop)
        : [...prev, crop]
    )
  }

  const filteredCycles = farmingCycles.filter(cycle => {
    const matchesSearch = cycle.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cycle.variety.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCrops = selectedCrops.length === 0 || selectedCrops.includes(cycle.crop)
    return matchesSearch && matchesCrops
  })

  const weatherData = [
    { month: 'Jan', rainfall: 45, temperature: 28, humidity: 75 },
    { month: 'Feb', rainfall: 38, temperature: 30, humidity: 70 },
    { month: 'Mar', rainfall: 52, temperature: 32, humidity: 80 },
    { month: 'Apr', rainfall: 68, temperature: 31, humidity: 85 },
    { month: 'May', rainfall: 75, temperature: 29, humidity: 90 },
    { month: 'Jun', rainfall: 42, temperature: 27, humidity: 75 },
    { month: 'Jul', rainfall: 35, temperature: 26, humidity: 70 },
    { month: 'Aug', rainfall: 28, temperature: 28, humidity: 65 },
    { month: 'Sep', rainfall: 32, temperature: 30, humidity: 70 },
    { month: 'Oct', rainfall: 48, temperature: 31, humidity: 75 },
    { month: 'Nov', rainfall: 55, temperature: 29, humidity: 80 },
    { month: 'Dec', rainfall: 40, temperature: 28, humidity: 75 }
  ]

  const marketPrices = [
    { crop: 'Maize', current: 450, previous: 420, change: 7.1, trend: 'up' },
    { crop: 'Rice', current: 380, previous: 400, change: -5.0, trend: 'down' },
    { crop: 'Tomato', current: 320, previous: 280, change: 14.3, trend: 'up' },
    { crop: 'Cassava', current: 120, previous: 110, change: 9.1, trend: 'up' },
    { crop: 'Beans', current: 280, previous: 300, change: -6.7, trend: 'down' }
  ]

  const insights = [
    {
      type: 'success',
      title: 'Best Performing Crop',
      description: 'Rice farming has been your most profitable crop this season in Liberia',
      icon: StarIcon,
      color: 'green',
      value: '+72% profit',
      recommendation: 'Consider expanding rice cultivation to 2 hectares'
    },
    {
      type: 'warning',
      title: 'Weather Alert',
      description: 'Below-average rainfall predicted for next month in West Africa',
      icon: ExclamationTriangleIcon,
      color: 'yellow',
      value: '-25% rainfall',
      recommendation: 'Prepare irrigation systems and water storage'
    },
    {
      type: 'info',
      title: 'Market Opportunity',
      description: 'Cassava prices are expected to rise in Nigeria and Ghana',
      icon: TrendingUpIcon,
      color: 'blue',
      value: '+18% price increase',
      recommendation: 'Consider planting cassava for export to Nigeria'
    },
    {
      type: 'tip',
      title: 'Efficiency Tip',
      description: 'Your palm oil yield could improve with better spacing',
      icon: LightBulbIcon,
      color: 'purple',
      value: '+30% potential yield',
      recommendation: 'Adjust planting density to 9m x 9m spacing'
    },
    {
      type: 'success',
      title: 'Cross-Border Opportunity',
      description: 'High demand for groundnut in Senegal and Mali',
      icon: GlobeAltIcon,
      color: 'orange',
      value: '+22% profit margin',
      recommendation: 'Consider groundnut export to Senegal'
    },
    {
      type: 'info',
      title: 'Seasonal Alert',
      description: 'Planting season approaching for maize in West Africa',
      icon: SunIcon,
      color: 'green',
      value: 'Optimal timing',
      recommendation: 'Prepare maize seeds for March planting'
    }
  ]

  const getTotalYield = () => {
    return farmingCycles
      .filter(cycle => cycle.status === 'completed')
      .reduce((total, cycle) => total + cycle.yield, 0)
  }

  const getTotalProfit = () => {
    return farmingCycles
      .filter(cycle => cycle.status === 'completed')
      .reduce((total, cycle) => total + cycle.profit, 0)
  }

  const getAverageYield = () => {
    const completedCycles = farmingCycles.filter(cycle => cycle.status === 'completed')
    return completedCycles.length > 0 ? getTotalYield() / completedCycles.length : 0
  }

  const getBestCrop = () => {
    const completedCycles = farmingCycles.filter(cycle => cycle.status === 'completed')
    return completedCycles.reduce((best, current) => 
      current.profit > best.profit ? current : best, completedCycles[0]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
                <p className="text-gray-600">Comprehensive farming performance insights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Real-time Toggle */}
              <button
                onClick={() => setRealTimeData(!realTimeData)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  realTimeData 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${realTimeData ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">Live Data</span>
              </button>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh Data"
              >
                <ArrowPathIcon className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                {viewModes.map((mode) => {
                  const Icon = mode.icon
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id as any)}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === mode.id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      title={mode.name}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  )
                })}
              </div>

              {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Filters"
              >
                <FunnelIcon className="w-5 h-5" />
              </button>

              {/* Export */}
              <button
                onClick={() => setShowExport(!showExport)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export Data"
              >
                <DownloadIcon className="w-5 h-5" />
              </button>

              {/* Period Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Search and Filters */}
          {(showFilters || showAdvanced) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search crops, varieties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Crop Filter */}
                <div className="relative">
                  <select
                    multiple
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value)
                      setSelectedCrops(values)
                    }}
                  >
                    <option value="Maize">Maize</option>
                    <option value="Rice">Rice</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Cassava">Cassava</option>
                    <option value="Beans">Beans</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Start Date"
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="End Date"
                  />
                </div>

                {/* Advanced Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <AdjustmentsHorizontalIcon className="w-4 h-4" />
                  <span className="text-sm">Advanced</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Enhanced Key Metrics Dashboard */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            const value = metric.id === 'yield' ? '8.7' :
                         metric.id === 'profit' ? '1,630' :
                         metric.id === 'growth' ? '12.5' :
                         metric.id === 'efficiency' ? '89.2' :
                         metric.id === 'cost' ? '1,250' :
                         '78.5'
            
            return (
              <motion.div
                key={metric.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUpIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">+12%</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{metric.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {metric.id === 'profit' ? '₦' : ''}{value}{metric.unit}
                  </div>
                  <div className="text-sm text-gray-600">This period</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Yield Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Yield Trends</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                  <ShareIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive chart will be displayed here</p>
                <p className="text-sm text-gray-400">Yield data over time</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Stats</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Best Crop</span>
                  <span className="font-medium text-gray-900">Tomato</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Efficiency</span>
                  <span className="font-medium text-gray-900">89.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Weather Impact</span>
                  <span className="font-medium text-gray-900">+15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ROI</span>
                  <span className="font-medium text-green-600">+24.5%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Tomato harvest completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">New crop planted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Weather alert received</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Farming Cycles */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Farming Cycles</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <TableCellsIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <PresentationChartLineIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <MapIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCycles.map((cycle) => (
                <motion.div
                  key={cycle.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">
                        {cycle.crop === 'Maize' && '🌽'}
                        {cycle.crop === 'Rice' && '🌾'}
                        {cycle.crop === 'Tomato' && '🍅'}
                        {cycle.crop === 'Cassava' && '🥔'}
                        {cycle.crop === 'Beans' && '🫘'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{cycle.crop}</h3>
                        <p className="text-sm text-gray-600">{cycle.variety}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cycle.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {cycle.status === 'completed' ? 'Completed' : 'Ongoing'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Yield</p>
                        <p className="font-semibold text-gray-900">{cycle.yield} tons</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Profit</p>
                        <p className="font-semibold text-gray-900">₦{cycle.profit.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Efficiency</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${cycle.efficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{cycle.efficiency}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Quality</p>
                        <p className="font-semibold text-gray-900">{cycle.quality}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{cycle.location}</span>
                        <span>{cycle.area} hectares</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{cycle.notes}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : viewMode === 'list' ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yield</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCycles.map((cycle) => (
                      <tr key={cycle.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">
                              {cycle.crop === 'Maize' && '🌽'}
                              {cycle.crop === 'Rice' && '🌾'}
                              {cycle.crop === 'Tomato' && '🍅'}
                              {cycle.crop === 'Cassava' && '🥔'}
                              {cycle.crop === 'Beans' && '🫘'}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{cycle.crop}</div>
                              <div className="text-sm text-gray-500">{cycle.variety}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {cycle.startDate.toLocaleDateString()} - {cycle.endDate.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {cycle.yield} tons
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₦{cycle.profit.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${cycle.efficiency}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{cycle.efficiency}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            cycle.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {cycle.status === 'completed' ? 'Completed' : 'Ongoing'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <ShareIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PresentationChartLineIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive chart view</p>
                  <p className="text-sm text-gray-400">Farming cycles visualization</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Market Prices */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {marketPrices.map((price, index) => (
              <div key={price.crop} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{price.crop}</h3>
                  <div className={`flex items-center space-x-1 ${
                    price.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {price.trend === 'up' ? (
                      <TrendingUpIcon className="w-4 h-4" />
                    ) : (
                      <TrendingDownIcon className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {price.change > 0 ? '+' : ''}{price.change}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ₦{price.current}/kg
                </div>
                <div className="text-sm text-gray-600">
                  Previous: ₦{price.previous}/kg
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Insights & Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div key={insight.type} className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                  insight.type === 'success' ? 'border-green-500' :
                  insight.type === 'warning' ? 'border-yellow-500' :
                  insight.type === 'info' ? 'border-blue-500' :
                  'border-purple-500'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      insight.type === 'success' ? 'bg-green-100' :
                      insight.type === 'warning' ? 'bg-yellow-100' :
                      insight.type === 'info' ? 'bg-blue-100' :
                      'bg-purple-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        insight.type === 'success' ? 'text-green-600' :
                        insight.type === 'warning' ? 'text-yellow-600' :
                        insight.type === 'info' ? 'text-blue-600' :
                        'text-purple-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {insight.description}
                      </p>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {insight.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {insight.recommendation}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Weather Trends */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">West African Weather Trends</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>🇱🇷 Liberia Focus</span>
              <span>•</span>
              <span>Updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CloudRainIcon className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Rainfall</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                1,250mm
              </div>
              <div className="text-sm text-gray-600">Annual total • Monrovia, Liberia</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <SunIcon className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-900">Temperature</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                27°C
              </div>
              <div className="text-sm text-gray-600">Average • West Africa</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                <span className="font-semibold text-gray-900">Humidity</span>
              </div>
              <div className="text-2xl font-bold text-gray-600 mb-1">
                82%
              </div>
              <div className="text-sm text-gray-600">Average • Coastal regions</div>
            </div>
          </div>
          
          {/* Additional Weather Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Rainy Season Alert</h4>
              <p className="text-sm text-blue-800">Heavy rainfall expected from April to October. Prepare drainage systems.</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Dry Season Notice</h4>
              <p className="text-sm text-yellow-800">November to March: Plan irrigation for dry season crops.</p>
            </div>
          </div>
        </motion.div>

        {/* Export Modal */}
        {showExport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
                  <button
                    onClick={() => setShowExport(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {exportFormats.map((format) => {
                    const Icon = format.icon
                    return (
                      <button
                        key={format.id}
                        onClick={() => handleExport(format.id)}
                        className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{format.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
