import React, { useState } from 'react'
import { Brain, BarChart2, MessageSquare, GitBranch, Database } from 'lucide-react'
import Dashboard from './components/Dashboard'
import InsightsGenerator from './components/InsightsGenerator'
import QAInterface from './components/QAInterface'
import DecisionTree from './components/DecisionTree'
import DataRetrieval from './components/DataRetrieval'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#252526] shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-[#0078d4]">Stratify AI</h1>
        </div>
        <nav className="mt-6">
          <a
            className={`flex items-center py-2 px-4 cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-[#37373d] text-[#0078d4]' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart2 className="mr-3" />
            Dashboard
          </a>
          <a
            className={`flex items-center py-2 px-4 cursor-pointer ${
              activeTab === 'insights' ? 'bg-[#37373d] text-[#0078d4]' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
            }`}
            onClick={() => setActiveTab('insights')}
          >
            <Brain className="mr-3" />
            Insights Generator
          </a>
          <a
            className={`flex items-center py-2 px-4 cursor-pointer ${
              activeTab === 'qa' ? 'bg-[#37373d] text-[#0078d4]' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
            }`}
            onClick={() => setActiveTab('qa')}
          >
            <MessageSquare className="mr-3" />
            Q&A Interface
          </a>
          <a
            className={`flex items-center py-2 px-4 cursor-pointer ${
              activeTab === 'decisiontree' ? 'bg-[#37373d] text-[#0078d4]' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
            }`}
            onClick={() => setActiveTab('decisiontree')}
          >
            <GitBranch className="mr-3" />
            Decision Tree
          </a>
          <a
            className={`flex items-center py-2 px-4 cursor-pointer ${
              activeTab === 'dataretrieval' ? 'bg-[#37373d] text-[#0078d4]' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
            }`}
            onClick={() => setActiveTab('dataretrieval')}
          >
            <Database className="mr-3" />
            Data Retrieval
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'insights' && <InsightsGenerator />}
        {activeTab === 'qa' && <QAInterface />}
        {activeTab === 'decisiontree' && <DecisionTree />}
        {activeTab === 'dataretrieval' && <DataRetrieval />}
      </div>
    </div>
  )
}

export default App