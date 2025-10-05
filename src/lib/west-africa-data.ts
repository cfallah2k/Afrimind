// West Africa and Liberia specific farming data
export const westAfricaCrops = {
  liberia: {
    name: 'Liberia',
    flag: '🇱🇷',
    capital: 'Monrovia',
    currency: 'Liberian Dollar (LRD)',
    population: '5.2 million',
    farmingRegions: [
      { name: 'Bong County', crops: ['rice', 'cassava', 'vegetables'], soil: 'clay' },
      { name: 'Lofa County', crops: ['rice', 'cassava', 'coffee'], soil: 'loamy' },
      { name: 'Nimba County', crops: ['rice', 'cassava', 'rubber'], soil: 'sandy' },
      { name: 'Grand Bassa County', crops: ['rice', 'cassava', 'palm oil'], soil: 'clay' },
      { name: 'Maryland County', crops: ['rice', 'cassava', 'cocoa'], soil: 'loamy' }
    ],
    seasons: {
      rainy: { months: 'April-October', description: 'Main growing season' },
      dry: { months: 'November-March', description: 'Harvest and preparation season' }
    },
    commonCrops: [
      { id: 'rice', name: 'Rice', icon: '🌾', importance: 'Staple food', cycle: 120 },
      { id: 'cassava', name: 'Cassava', icon: '🥔', importance: 'Staple food', cycle: 300 },
      { id: 'cocoa', name: 'Cocoa', icon: '🍫', importance: 'Cash crop', cycle: 365 },
      { id: 'coffee', name: 'Coffee', icon: '☕', importance: 'Cash crop', cycle: 365 },
      { id: 'rubber', name: 'Rubber', icon: '🛞', importance: 'Cash crop', cycle: 2555 },
      { id: 'palm_oil', name: 'Palm Oil', icon: '🫒', importance: 'Cash crop', cycle: 365 },
      { id: 'vegetables', name: 'Vegetables', icon: '🥬', importance: 'Food security', cycle: 60 },
      { id: 'maize', name: 'Maize', icon: '🌽', importance: 'Food security', cycle: 90 }
    ]
  },
  nigeria: {
    name: 'Nigeria',
    flag: '🇳🇬',
    capital: 'Abuja',
    currency: 'Naira (NGN)',
    population: '220 million',
    farmingRegions: [
      { name: 'Kano State', crops: ['maize', 'millet', 'sorghum'], soil: 'sandy' },
      { name: 'Kaduna State', crops: ['maize', 'rice', 'cassava'], soil: 'loamy' },
      { name: 'Ogun State', crops: ['cassava', 'cocoa', 'palm oil'], soil: 'clay' },
      { name: 'Benue State', crops: ['yam', 'rice', 'maize'], soil: 'loamy' }
    ],
    seasons: {
      rainy: { months: 'April-October', description: 'Main growing season' },
      dry: { months: 'November-March', description: 'Harvest season' }
    }
  },
  ghana: {
    name: 'Ghana',
    flag: '🇬🇭',
    capital: 'Accra',
    currency: 'Cedi (GHS)',
    population: '32 million',
    farmingRegions: [
      { name: 'Ashanti Region', crops: ['cocoa', 'maize', 'cassava'], soil: 'loamy' },
      { name: 'Northern Region', crops: ['maize', 'rice', 'millet'], soil: 'sandy' },
      { name: 'Volta Region', crops: ['rice', 'cassava', 'vegetables'], soil: 'clay' }
    ],
    seasons: {
      rainy: { months: 'April-October', description: 'Main growing season' },
      dry: { months: 'November-March', description: 'Harmattan season' }
    }
  }
}

export const liberiaSpecificData = {
  soilTypes: [
    { id: 'red_soil', name: 'Red Soil (Laterite)', description: 'Common in Bong and Nimba counties', ph: '5.5-6.5' },
    { id: 'clay_soil', name: 'Clay Soil', description: 'Found in Grand Bassa and Maryland counties', ph: '6.0-7.0' },
    { id: 'sandy_soil', name: 'Sandy Soil', description: 'Coastal areas and some inland regions', ph: '6.5-7.5' },
    { id: 'alluvial_soil', name: 'Alluvial Soil', description: 'River valleys and floodplains', ph: '6.0-7.0' }
  ],
  weatherPatterns: {
    rainy_season: {
      months: 'April-October',
      rainfall: '2000-4000mm',
      temperature: '24-28°C',
      humidity: '80-90%',
      challenges: ['Flooding', 'Disease pressure', 'Pest outbreaks'],
      opportunities: ['Optimal growing conditions', 'Reduced irrigation needs']
    },
    dry_season: {
      months: 'November-March',
      rainfall: '50-200mm',
      temperature: '26-32°C',
      humidity: '60-70%',
      challenges: ['Water scarcity', 'Dust storms', 'Crop stress'],
      opportunities: ['Harvest season', 'Land preparation', 'Pest control']
    }
  },
  commonPests: [
    { name: 'Fall Armyworm', crops: ['maize', 'rice'], season: 'rainy', control: 'Neem oil, Bt spray' },
    { name: 'Rice Bug', crops: ['rice'], season: 'rainy', control: 'Early harvesting, resistant varieties' },
    { name: 'Cassava Mealybug', crops: ['cassava'], season: 'dry', control: 'Biological control, resistant varieties' },
    { name: 'Cocoa Pod Borer', crops: ['cocoa'], season: 'rainy', control: 'Sanitation, pheromone traps' }
  ],
  commonDiseases: [
    { name: 'Rice Blast', crops: ['rice'], season: 'rainy', control: 'Resistant varieties, fungicides' },
    { name: 'Cassava Mosaic', crops: ['cassava'], season: 'all', control: 'Clean planting material' },
    { name: 'Cocoa Black Pod', crops: ['cocoa'], season: 'rainy', control: 'Fungicides, pruning' },
    { name: 'Maize Rust', crops: ['maize'], season: 'rainy', control: 'Resistant varieties, crop rotation' }
  ],
  marketPrices: {
    rice: { current: '₦450,000 per ton', projected: '₦480,000 per ton' },
    cassava: { current: '₦120,000 per ton', projected: '₦135,000 per ton' },
    cocoa: { current: '₦1,200,000 per ton', projected: '₦1,350,000 per ton' },
    palm_oil: { current: '₦180,000 per ton', projected: '₦200,000 per ton' }
  },
  farmingChallenges: [
    'Limited access to quality seeds',
    'Inadequate irrigation systems',
    'Post-harvest losses',
    'Limited access to markets',
    'Climate change impacts',
    'Limited extension services'
  ],
  opportunities: [
    'Growing demand for organic produce',
    'Government support for agriculture',
    'Youth engagement in farming',
    'Technology adoption',
    'Export opportunities',
    'Value addition potential'
  ]
}

export const westAfricaPredictions = {
  westAfrica: {
    rice: {
      weather: {
        title: 'West Africa Weather Forecast',
        prediction: 'Heavy rainfall expected in 3-5 days',
        confidence: 88,
        recommendation: 'Prepare drainage systems. Monitor for flooding in low-lying areas.',
        impact: 'Positive for rice growth, but watch for waterlogging'
      },
      growth: {
        title: 'Rice Growth Prediction',
        prediction: 'Expected to reach 30cm height in 3 weeks',
        confidence: 85,
        recommendation: 'Apply first dose of nitrogen fertilizer. Monitor for blast disease.',
        timeline: 'Germination: 5-7 days, Tillering: 21-28 days, Flowering: 60-70 days'
      },
      harvest: {
        title: 'Harvest Prediction',
        prediction: 'Ready for harvest in 110-120 days',
        confidence: 82,
        recommendation: 'Start preparing storage facilities. Monitor grain moisture content.',
        yield: 'Expected yield: 2-3 tons per hectare (Liberia average)'
      },
      market: {
        title: 'West Africa Market Price Forecast',
        prediction: 'Rice prices expected to increase 8-12% by harvest',
        confidence: 75,
        recommendation: 'Good time to enter market. Consider selling to local markets first.',
        currentPrice: '₦450,000 per ton',
        projectedPrice: '₦480,000 per ton'
      },
      risks: {
        title: 'West Africa Risk Assessment',
        prediction: 'Moderate risk due to heavy rainfall',
        confidence: 80,
        recommendation: 'Monitor for rice blast disease. Apply fungicide if needed.',
        risks: ['Pest pressure: Low', 'Disease risk: Moderate', 'Weather risk: High']
      }
    },
    cassava: {
      weather: {
        title: 'Liberia Weather Forecast',
        prediction: 'Consistent rainfall expected for next 2 weeks',
        confidence: 85,
        recommendation: 'Ideal conditions for cassava growth. Monitor soil moisture.',
        impact: 'Excellent for root development'
      },
      growth: {
        title: 'Cassava Growth Prediction',
        prediction: 'Expected to reach 60cm height in 2 months',
        confidence: 90,
        recommendation: 'Apply first weeding in 4-6 weeks. Monitor for mealybug.',
        timeline: 'Sprouting: 7-10 days, First leaves: 14-21 days, Root development: 3-4 months'
      },
      harvest: {
        title: 'Harvest Prediction',
        prediction: 'Ready for harvest in 8-10 months',
        confidence: 88,
        recommendation: 'Long-term crop. Plan for extended growing period.',
        yield: 'Expected yield: 12-18 tons per hectare (Liberia average)'
      },
      market: {
        title: 'Liberia Market Price Forecast',
        prediction: 'Cassava prices stable with slight upward trend',
        confidence: 80,
        recommendation: 'Good for local consumption and processing.',
        currentPrice: '₦120,000 per ton',
        projectedPrice: '₦135,000 per ton'
      },
      risks: {
        title: 'West Africa Risk Assessment',
        prediction: 'Low risk, hardy crop',
        confidence: 85,
        recommendation: 'Monitor for cassava mosaic disease. Use clean planting material.',
        risks: ['Pest pressure: Low', 'Disease risk: Low', 'Weather risk: Low']
      }
    },
    cocoa: {
      weather: {
        title: 'Liberia Weather Forecast',
        prediction: 'Heavy rainfall and high humidity expected',
        confidence: 90,
        recommendation: 'Monitor for black pod disease. Ensure good drainage.',
        impact: 'High humidity increases disease risk'
      },
      growth: {
        title: 'Cocoa Growth Prediction',
        prediction: 'Expected flowering in 2-3 months',
        confidence: 85,
        recommendation: 'Apply potassium fertilizer. Monitor for pod borer.',
        timeline: 'Flowering: 2-3 months, Pod development: 4-5 months, Harvest: 6-7 months'
      },
      harvest: {
        title: 'Harvest Prediction',
        prediction: 'First harvest in 6-8 months',
        confidence: 80,
        recommendation: 'Prepare for main harvest season. Plan processing facilities.',
        yield: 'Expected yield: 400-600kg per hectare (Liberia average)'
      },
      market: {
        title: 'Liberia Market Price Forecast',
        prediction: 'Cocoa prices expected to increase 15-20%',
        confidence: 85,
        recommendation: 'Excellent export opportunity. Focus on quality.',
        currentPrice: '₦1,200,000 per ton',
        projectedPrice: '₦1,350,000 per ton'
      },
      risks: {
        title: 'West Africa Risk Assessment',
        prediction: 'Moderate risk due to high humidity',
        confidence: 75,
        recommendation: 'Monitor for black pod disease. Apply fungicides preventively.',
        risks: ['Pest pressure: Moderate', 'Disease risk: High', 'Weather risk: Moderate']
      }
    }
  }
}

export const liberiaFarmingTips = [
  {
    category: 'Soil Management',
    tips: [
      'Test soil pH regularly - Liberia soils are often acidic',
      'Add lime to raise pH for better crop growth',
      'Use organic matter to improve soil structure',
      'Practice crop rotation to maintain soil fertility'
    ]
  },
  {
    category: 'Water Management',
    tips: [
      'Build proper drainage systems for rainy season',
      'Store water during dry season for irrigation',
      'Use mulching to retain soil moisture',
      'Monitor water levels in rice paddies'
    ]
  },
  {
    category: 'Pest Control',
    tips: [
      'Use neem oil for natural pest control',
      'Practice integrated pest management',
      'Monitor crops regularly for early detection',
      'Use resistant varieties when available'
    ]
  },
  {
    category: 'Market Access',
    tips: [
      'Join farmer cooperatives for better market access',
      'Focus on quality to command better prices',
      'Consider value addition (processing)',
      'Build relationships with local buyers'
    ]
  }
]

export const liberiaGovernmentSupport = {
  programs: [
    {
      name: 'Liberia Agriculture Commercialization Fund (LACF)',
      description: 'Financial support for smallholder farmers',
      contact: 'Ministry of Agriculture',
      benefits: ['Low-interest loans', 'Technical assistance', 'Market linkages']
    },
    {
      name: 'Smallholder Agriculture Development Program',
      description: 'Support for rice and cassava farmers',
      contact: 'World Bank/Government of Liberia',
      benefits: ['Improved seeds', 'Farming equipment', 'Training programs']
    },
    {
      name: 'Liberia Cocoa Sector Improvement Program',
      description: 'Support for cocoa farmers',
      contact: 'Ministry of Agriculture',
      benefits: ['Quality planting material', 'Processing facilities', 'Export support']
    }
  ],
  contacts: {
    ministry: 'Ministry of Agriculture, Republic of Liberia',
    phone: '+231-XXX-XXXX',
    email: 'info@moa.gov.lr',
    address: 'Monrovia, Liberia'
  }
}
