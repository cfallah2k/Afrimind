'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LanguageIcon,
  ArrowRightIcon,
  SpeakerWaveIcon as VolumeUpIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface LanguageTranslationProps {
  language: string
  country: string
}

export function LanguageTranslation({ language, country }: LanguageTranslationProps) {
  const [translationData, setTranslationData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  useEffect(() => {
    // Simulate API call
    const fetchTranslationData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setTranslationData({
          language,
          country,
          basicWords: [
            { word: 'Hello', translation: 'Bawo', pronunciation: 'BAH-woh' },
            { word: 'Thank you', translation: 'E se', pronunciation: 'EH sheh' },
            { word: 'Goodbye', translation: 'O daabo', pronunciation: 'oh DAH-boh' },
            { word: 'How are you?', translation: 'Bawo ni?', pronunciation: 'BAH-woh nee' },
            { word: 'What is your name?', translation: 'Kini oruko re?', pronunciation: 'KEE-nee oh-ROO-koh reh' }
          ],
          commonPhrases: [
            { phrase: 'Good morning', translation: 'E kaaro', context: 'Greeting' },
            { phrase: 'Good afternoon', translation: 'E kaasan', context: 'Greeting' },
            { phrase: 'Good evening', translation: 'E ku irole', context: 'Greeting' },
            { phrase: 'Please', translation: 'Jowo', context: 'Politeness' },
            { phrase: 'Excuse me', translation: 'E ma binu', context: 'Apology' }
          ],
          culturalNotes: [
            'Yoruba is a tonal language - tone changes meaning',
            'Respect for elders is very important in Yoruba culture',
            'Greetings are essential in Yoruba social interaction',
            'Some concepts may not have direct English equivalents'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchTranslationData()
  }, [language, country])

  const handleTranslate = () => {
    if (inputText.trim()) {
      // Mock translation - in production, this would be a real API call
      setTranslatedText(`[Translated to ${language}: ${inputText}]`)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-soft"
    >
      <div className="flex items-center space-x-2 mb-6">
        <LanguageIcon className="w-6 h-6 text-accent-600" />
        <h3 className="text-lg font-semibold text-gray-900">Language Translation</h3>
      </div>

      {/* Translation Interface */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              English Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language} Translation
            </label>
            <div className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50">
              {translatedText || 'Translation will appear here...'}
            </div>
          </div>
        </div>
        <button
          onClick={handleTranslate}
          className="mt-4 btn btn-primary btn-md"
        >
          Translate
        </button>
      </div>

      {/* Basic Words */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Basic Words</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {translationData?.basicWords.map((word, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{word.word}</div>
                <div className="text-sm text-gray-600">{word.translation}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{word.pronunciation}</div>
                <button className="mt-1 p-1 text-accent-600 hover:text-accent-700">
                  <VolumeUpIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Phrases */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Common Phrases</h4>
        <div className="space-y-3">
          {translationData?.commonPhrases.map((phrase, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{phrase.phrase}</div>
                <div className="text-sm text-gray-600">{phrase.translation}</div>
                <div className="text-xs text-gray-500">{phrase.context}</div>
              </div>
              <button className="p-1 text-accent-600 hover:text-accent-700">
                <VolumeUpIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Notes */}
      <div className="p-4 bg-accent-50 rounded-lg">
        <h4 className="font-semibold text-accent-800 mb-3">Cultural Notes</h4>
        <div className="space-y-2">
          {translationData?.culturalNotes.map((note, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm">
              <InformationCircleIcon className="w-4 h-4 text-accent-600 mt-0.5 flex-shrink-0" />
              <span className="text-accent-700">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
