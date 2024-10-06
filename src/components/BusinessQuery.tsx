import React, { useState } from 'react'

const BusinessQuery: React.FC = () => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the query to your backend or process it
    console.log('Business query submitted:', query)
    // Reset the input field after submission
    setQuery('')
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-[#0078d4]">What do you want to know about your business?</h2>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about your business..."
          className="flex-grow p-2 rounded-l bg-[#3c3c3c] text-white border border-[#0078d4] focus:outline-none focus:border-[#0078d4]"
        />
        <button
          type="submit"
          className="bg-[#0078d4] hover:bg-[#006cbd] text-white font-bold py-2 px-4 rounded-r"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default BusinessQuery