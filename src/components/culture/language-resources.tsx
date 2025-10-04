'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpenIcon,
  SpeakerWaveIcon as VolumeUpIcon,
  StarIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface LanguageResourcesProps {
  language: string
  resourceType: string
}

export function LanguageResources({ language, resourceType }: LanguageResourcesProps) {
  const [resourcesData, setResourcesData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchResourcesData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setResourcesData({
          language,
          resourceType,
          dictionary: {
            basicWords: [
              { word: 'Hello', translation: 'Bawo', pronunciation: 'BAH-woh' },
              { word: 'Thank you', translation: 'E se', pronunciation: 'EH sheh' },
              { word: 'Goodbye', translation: 'O daabo', pronunciation: 'oh DAH-boh' }
            ],
            commonPhrases: [
              { phrase: 'How are you?', translation: 'Bawo ni?', context: 'Greeting' },
              { phrase: 'What is your name?', translation: 'Kini oruko re?', context: 'Introduction' }
            ],
            grammarRules: [
              'Subject-verb-object word order',
              'Tonal variations change meaning',
              'Plural formation rules'
            ]
          },
          grammarGuide: {
            basicGrammar: [
              'Sentence structure',
              'Verb conjugations',
              'Noun classifications',
              'Tone rules'
            ],
            commonPatterns: [
              'Question formation',
              'Negation',
              'Time expressions'
            ],
            difficultyLevel: 'Intermediate',
            estimatedLearningTime: '6-12 months'
          },
          audioResources: [
            {
              type: 'Pronunciation guide',
              url: 'https://example.com/audio/pronunciation.mp3',
              duration: '5 minutes',
              level: 'Beginner'
            },
            {
              type: 'Conversation examples',
              url: 'https://example.com/audio/conversations.mp3',
              duration: '15 minutes',
              level: 'Intermediate'
            }
          ],
          learningTips: [
            'Practice with native speakers',
            'Listen to local music and radio',
            'Watch local TV shows and movies',
            'Use language learning apps',
            'Join language exchange groups'
          ],
          culturalNotes: [
            'Language reflects cultural values',
            'Some concepts are culture-specific',
            'Regional variations exist',
            'Respect for elders in language use'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchResourcesData()
  }, [language, resourceType])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
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
        <BookOpenIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Language Resources</h3>
      </div>

      {/* Basic Words */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Basic Words</h4>
        <div className="space-y-3">
          {resourcesData?.dictionary.basicWords.map((word, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{word.word}</div>
                <div className="text-sm text-gray-600">{word.translation}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{word.pronunciation}</div>
                <button className="mt-1 p-1 text-primary-600 hover:text-primary-700">
                  <VolumeUpIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grammar Guide */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Grammar Guide</h4>
        <div className="p-4 bg-primary-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-2">Basic Grammar:</div>
              <div className="space-y-1">
                {resourcesData?.grammarGuide.basicGrammar.map((grammar, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-3 h-3 text-primary-600" />
                    <span className="text-primary-700">{grammar}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-2">Common Patterns:</div>
              <div className="space-y-1">
                {resourcesData?.grammarGuide.commonPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-3 h-3 text-primary-600" />
                    <span className="text-primary-700">{pattern}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-1">Difficulty:</div>
              <div className="text-primary-700">{resourcesData?.grammarGuide.difficultyLevel}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Learning Time:</div>
              <div className="text-primary-700">{resourcesData?.grammarGuide.estimatedLearningTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Resources */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Audio Resources</h4>
        <div className="space-y-3">
          {resourcesData?.audioResources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{resource.type}</div>
                <div className="text-sm text-gray-600">{resource.duration} • {resource.level}</div>
              </div>
              <button className="p-2 text-primary-600 hover:text-primary-700">
                <VolumeUpIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="mb-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">Learning Tips</h4>
        <div className="space-y-2">
          {resourcesData?.learningTips.map((tip, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <StarIcon className="w-4 h-4 text-success-600" />
              <span className="text-success-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Notes */}
      <div className="p-4 bg-accent-50 rounded-lg">
        <h4 className="font-semibold text-accent-800 mb-3">Cultural Notes</h4>
        <div className="space-y-2">
          {resourcesData?.culturalNotes.map((note, index) => (
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
