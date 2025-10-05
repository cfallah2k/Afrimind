export default function CulturePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900">Culture Hub 🌍</h1>
          <p className="text-sm text-gray-600">West African Heritage & Languages</p>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">West African Culture Hub</h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Discover languages, traditions & heritage
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              West African Culture Hub 🌍
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the rich cultural heritage, languages, and traditions of West Africa. 
              Connect with communities, learn languages, and explore cultural practices.
            </p>
          </div>
        </div>

        {/* Language Translation Tool */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🌐</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Language Translator</h2>
                <p className="text-sm text-gray-600">Translate between West African languages</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter text to translate
                </label>
                <textarea
                  placeholder="Type your message here..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Translation
                </label>
                <div className="w-full h-32 p-3 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Translation will appear here</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="en">English</option>
                <option value="ha">🇳🇬 Hausa (Hausa)</option>
                <option value="yo">🇳🇬 Yoruba (Yorùbá)</option>
                <option value="ig">🇳🇬 Igbo (Igbo)</option>
                <option value="wo">🇸🇳 Wolof (Wolof)</option>
                <option value="ff">🌍 Fulani (Fulfulde)</option>
                <option value="tw">🇬🇭 Twi (Twi)</option>
                <option value="bm">🇲🇱 Bambara (Bamanankan)</option>
                <option value="dy">🇲🇱 Dyula (Dyula)</option>
              </select>
              
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <span>🌐</span>
                <span>Translate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cultural Practices */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cultural Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Traditional Greetings</h3>
              <p className="text-sm text-gray-600">Learn proper greetings in different West African languages</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Music & Dance</h3>
              <p className="text-sm text-gray-600">Explore traditional music, instruments, and dance forms</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cuisine</h3>
              <p className="text-sm text-gray-600">Discover traditional recipes and cooking methods</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Art & Crafts</h3>
              <p className="text-sm text-gray-600">Traditional art forms, textiles, and craftsmanship</p>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">West African Languages</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🇳🇬</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Hausa</h3>
                    <p className="text-sm text-gray-600">Hausa</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Speakers: 50M</div>
                  <div>Countries: Nigeria, Niger</div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🇳🇬</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Yoruba</h3>
                    <p className="text-sm text-gray-600">Yorùbá</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Speakers: 45M</div>
                  <div>Countries: Nigeria, Benin</div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🇳🇬</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Igbo</h3>
                    <p className="text-sm text-gray-600">Igbo</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Speakers: 30M</div>
                  <div>Countries: Nigeria</div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🇸🇳</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Wolof</h3>
                    <p className="text-sm text-gray-600">Wolof</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Speakers: 10M</div>
                  <div>Countries: Senegal, Gambia</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Festivals */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cultural Festivals</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📅</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Eid al-Fitr</h3>
                  <p className="text-sm text-gray-600 mb-3">Islamic celebration marking the end of Ramadan</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div><span className="font-medium">Countries:</span> All Muslim communities</div>
                    <div><span className="font-medium">Date:</span> Varies by lunar calendar</div>
                    <div><span className="font-medium">Significance:</span> Religious and community celebration</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📅</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Yam Festival</h3>
                  <p className="text-sm text-gray-600 mb-3">Traditional harvest celebration</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div><span className="font-medium">Countries:</span> Ghana, Nigeria, Togo</div>
                    <div><span className="font-medium">Date:</span> August-September</div>
                    <div><span className="font-medium">Significance:</span> Agricultural thanksgiving</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Learning */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Join Cultural Learning Community</h2>
              <p className="text-lg mb-6 opacity-90">
                Connect with native speakers, learn traditional practices, and share your cultural knowledge
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
                  <span>👥</span>
                  <span>Join Community</span>
                </button>
                <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2">
                  <span>📚</span>
                  <span>Start Learning</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}