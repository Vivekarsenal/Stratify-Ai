import React, { useState } from 'react'
import axios from 'axios'

const QAInterface: React.FC = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/ask_question', { query: question })
      setAnswer(response.data.answer)
    } catch (error) {
      console.error('Error asking question:', error)
      setAnswer('Failed to get an answer. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#0078d4]">Interactive Q&A Interface</h2>
      <div className="bg-[#252526] p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a business-related question"
            className="w-full p-2 mb-4 rounded bg-[#3c3c3c] text-white border border-[#0078d4] focus:outline-none focus:border-[#0078d4]"
          />
          <button
            type="submit"
            className="bg-[#0078d4] hover:bg-[#006cbd] text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Asking...' : 'Ask Question'}
          </button>
        </form>
        {answer && (
          <div className="mt-4 p-4 bg-[#3c3c3c] rounded">
            <h3 className="font-bold mb-2 text-[#0078d4]">Answer:</h3>
            <p className="text-[#cccccc]">{answer}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QAInterface