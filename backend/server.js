const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// Mock LLM API for demonstration purposes
const mockLLM = async (prompt) => {
  console.log('Generating mock response for prompt:', prompt);
  const responses = {
    'market trends': 'Based on recent market trends, we\'ve observed a 15% increase in demand for sustainable products in your industry. This presents an opportunity to expand your eco-friendly product line and capture a growing market segment.',
    'performance metrics': 'Analyzing your performance metrics, we\'ve noticed that your customer retention rate has dropped by 5% in the last quarter. This could be due to increased competition or changes in customer preferences. Consider implementing a customer feedback program and enhancing your loyalty rewards to address this issue.',
    'business strategies': 'Given your current business position, a potential strategy to explore is vertical integration. By acquiring or partnering with your suppliers, you could reduce costs, improve supply chain efficiency, and gain a competitive advantage in the market.',
  };
  
  const lowerPrompt = prompt.toLowerCase();
  for (const [key, value] of Object.entries(responses)) {
    if (lowerPrompt.includes(key)) {
      return value;
    }
  }
  
  return 'I\'m sorry, I don\'t have enough context to provide a specific insight on that topic. Could you please provide more details or ask about market trends, performance metrics, or business strategies?';
};

// Mock vector database for demonstration purposes
const mockVectorDB = async (query) => {
  console.log('Retrieving mock data for query:', query);
  const data = {
    'revenue': 'Total revenue for the last quarter was $1,234,567, showing a 12% increase year-over-year.',
    'customers': 'Current active customer count is 5,678, with a 3% growth rate month-over-month.',
    'products': 'Top-selling product categories are: 1. Electronics (35%), 2. Home & Garden (25%), 3. Fashion (20%).',
    'competitors': 'Main competitors in the market are CompanyA (30% market share), CompanyB (25% market share), and CompanyC (15% market share).',
  };
  
  const lowerQuery = query.toLowerCase();
  for (const [key, value] of Object.entries(data)) {
    if (lowerQuery.includes(key)) {
      return value;
    }
  }
  
  return 'No specific data found for your query. Try asking about revenue, customers, products, or competitors.';
};

app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Backend is working!' });
});

app.post('/generate_insight', async (req, res) => {
  try {
    const { query } = req.body;
    console.log('Received query for insight:', query);
    const insight = await mockLLM(query);
    console.log('Generated insight:', insight);
    res.json({ insight });
  } catch (error) {
    console.error('Error generating insight:', error);
    res.status(500).json({ error: 'Failed to generate insight' });
  }
});

app.post('/ask_question', async (req, res) => {
  try {
    const { query } = req.body;
    console.log('Received question:', query);
    const answer = await mockLLM(query);
    console.log('Generated answer:', answer);
    res.json({ answer });
  } catch (error) {
    console.error('Error answering question:', error);
    res.status(500).json({ error: 'Failed to answer question' });
  }
});

app.post('/retrieve_data', async (req, res) => {
  try {
    const { query } = req.body;
    console.log('Received data retrieval query:', query);
    const result = await mockVectorDB(query);
    console.log('Retrieved data:', result);
    res.json({ result });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});