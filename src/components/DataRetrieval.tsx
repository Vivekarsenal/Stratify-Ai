import React, { useState } from 'react'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:3000';

const DataRetrieval: React.FC = () => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(`${BACKEND_URL}/retrieve_data`, { query })
      setData(response.data.result)
    } catch (error: any) {
      console.error('Error retrieving data:', error)
      setError(`Failed to retrieve data. ${error.message}`)
      setData('')
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#0078d4]">Data Retrieval Mechanism</h2>
      <div className="bg-[#252526] p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-[#cccccc]">Retrieve domain-specific knowledge</h3>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your data retrieval query..."
            className="w-full p-2 mb-4 rounded bg-[#3c3c3c] text-white border border-[#0078d4] focus:outline-none focus:border-[#0078d4]"
          />
          <button
            type="submit"
            className="bg-[#0078d4] hover:bg-[#006cbd] text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Retrieving...' : 'Retrieve Data'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-[#3c3c3c] rounded text-red-500">
            {error}
          </div>
        )}
        {data && (
          <div className="mt-4 p-4 bg-[#3c3c3c] rounded">
            <h3 className="font-bold mb-2 text-[#0078d4]">Retrieved Data:</h3>
            <p className="text-[#cccccc]">{data}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DataRetrieval