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

  // Enhanced farming cycles with more detailed data
  const [farmingCycles] = useState([
    {
      id: 1,
      crop: 'Maize',
      variety: 'Improved Maize',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-15'),
      yield: 2.5,
      profit: 450,
      cost: 280,
      status: 'completed',
      season: 'rainy',
      location: 'Field A',
      area: 2.5,
      weatherImpact: 85,
      efficiency: 92,
      quality: 'A+',
      marketPrice: 180,
      notes: 'Excellent growth with minimal pest issues'
    },
    {
      id: 2,
      crop: 'Rice',
      variety: 'NERICA Rice',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-06-01'),
      yield: 1.8,
      profit: 320,
      cost: 200,
      status: 'completed',
      season: 'rainy',
      location: 'Field B',
      area: 1.8,
      weatherImpact: 78,
      efficiency: 88,
      quality: 'A',
      marketPrice: 220,
      notes: 'Good yield despite heavy rainfall'
    },
    {
      id: 3,
      crop: 'Tomato',
      variety: 'Cherry Tomato',
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-09-15'),
      yield: 3.2,
      profit: 680,
      cost: 350,
      status: 'completed',
      season: 'dry',
      location: 'Greenhouse',
      area: 0.8,
      weatherImpact: 95,
      efficiency: 96,
      quality: 'A+',
      marketPrice: 250,
      notes: 'Premium quality, high market demand'
    },
    {
      id: 4,
      crop: 'Cassava',
      variety: 'TMS Cassava',
      startDate: new Date('2024-08-01'),
      endDate: new Date('2025-05-01'),
      yield: 0,
      profit: 0,
      cost: 150,
      status: 'ongoing',
      season: 'all',
      location: 'Field C',
      area: 3.0,
      weatherImpact: 0,
      efficiency: 0,
      quality: 'N/A',
      marketPrice: 80,
      notes: 'Long-term crop, still growing'
    },
    {
      id: 5,
      crop: 'Beans',
      variety: 'Cowpea',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-11-15'),
      yield: 1.2,
      profit: 180,
      cost: 120,
      status: 'completed',
      season: 'dry',
      location: 'Field D',
      area: 1.5,
      weatherImpact: 90,
      efficiency: 85,
      quality: 'A',
      marketPrice: 150,
      notes: 'Good nitrogen fixation for soil'
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
      description: 'Tomato farming has been your most profitable crop this season',
      icon: StarIcon,
      color: 'green',
      value: '+68% profit',
      recommendation: 'Consider expanding tomato cultivation'
    },
    {
      type: 'warning',
      title: 'Weather Alert',
      description: 'Below-average rainfall predicted for next month',
      icon: ExclamationTriangleIcon,
      color: 'yellow',
      value: '-20% rainfall',
      recommendation: 'Prepare irrigation systems'
    },
    {
      type: 'info',
      title: 'Market Opportunity',
      description: 'Rice prices are expected to rise in the coming weeks',
      icon: TrendingUpIcon,
      color: 'blue',
      value: '+15% price increase',
      recommendation: 'Consider planting rice for next season'
    },
    {
      type: 'tip',
      title: 'Efficiency Tip',
      description: 'Your maize yield could improve with better spacing',
      icon: LightBulbIcon,
      color: 'purple',
      value: '+25% potential yield',
      recommendation: 'Adjust planting density to 30cm spacing'
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
            const value = metric.id === 'yield' ? getTotalYield().toFixed(1) :
                         metric.id === 'profit' ? getTotalProfit().toLocaleString() :
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weather Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CloudRainIcon className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Rainfall</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {weatherData.reduce((sum, month) => sum + month.rainfall, 0)}mm
              </div>
              <div className="text-sm text-gray-600">Annual total</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <SunIcon className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-900">Temperature</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {Math.round(weatherData.reduce((sum, month) => sum + month.temperature, 0) / weatherData.length)}°C
              </div>
              <div className="text-sm text-gray-600">Average</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                <span className="font-semibold text-gray-900">Humidity</span>
              </div>
              <div className="text-2xl font-bold text-gray-600 mb-1">
                {Math.round(weatherData.reduce((sum, month) => sum + month.humidity, 0) / weatherData.length)}%
              </div>
              <div className="text-sm text-gray-600">Average</div>
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
