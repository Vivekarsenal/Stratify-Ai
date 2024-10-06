import React, { useState } from 'react'
import axios from 'axios'
import { Brain, Loader } from 'lucide-react'

const BACKEND_URL = 'http://localhost:3000';

const InsightsGenerator: React.FC = () => {
  const [query, setQuery] = useState('')
  const [insight, setInsight] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(`${BACKEND_URL}/generate_insight`, { query })
      setInsight(response.data.insight)
    } catch (error: any) {
      console.error('Error generating insight:', error)
      setError(`Failed to generate insight. ${error.message}`)
      setInsight('')
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#0078d4]">AI Insights Generator</h2>
      <div className="bg-[#252526] p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-[#cccccc]">What do you want to know about your business?</h3>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about market trends, performance metrics, or business strategies..."
            className="w-full p-2 mb-4 rounded bg-[#3c3c3c] text-white border border-[#0078d4] focus:outline-none focus:border-[#0078d4]"
          />
          <button
            type="submit"
            className="bg-[#0078d4] hover:bg-[#006cbd] text-white font-bold py-2 px-4 rounded flex items-center"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin mr-2" /> : <Brain className="mr-2" />}
            {loading ? 'Generating...' : 'Generate Insight'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-[#3c3c3c] rounded text-red-500">
            {error}
          </div>
        )}
        {insight && (
          <div className="mt-4 p-4 bg-[#3c3c3c] rounded">
            <h3 className="font-bold mb-2 text-[#0078d4]">Generated Insight:</h3>
            <p className="text-[#cccccc]">{insight}</p>
            <div className="mt-4">
              <h4 className="font-semibold text-[#0078d4] mb-2">Recommended Actions:</h4>
              <ul className="list-disc list-inside text-[#cccccc]">
                <li>Action item 1 based on the insight</li>
                <li>Action item 2 based on the insight</li>
                <li>Action item 3 based on the insight</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InsightsGenerator