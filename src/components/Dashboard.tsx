import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
]

const customerData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 120 },
  { name: 'Mar', value: 150 },
  { name: 'Apr', value: 180 },
  { name: 'May', value: 200 },
  { name: 'Jun', value: 220 },
]

const productData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#0078d4]">Business Performance Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total Revenue" value="$23,450" icon={<DollarSign />} />
        <MetricCard title="Total Customers" value="1,234" icon={<Users />} />
        <MetricCard title="Total Orders" value="456" icon={<ShoppingCart />} />
        <MetricCard title="Growth Rate" value="15%" icon={<TrendingUp />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartCard title="Revenue Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#cccccc" />
              <YAxis stroke="#cccccc" />
              <Tooltip contentStyle={{ backgroundColor: '#3c3c3c', border: 'none' }} />
              <Line type="monotone" dataKey="value" stroke="#0078d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Customer Growth">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#cccccc" />
              <YAxis stroke="#cccccc" />
              <Tooltip contentStyle={{ backgroundColor: '#3c3c3c', border: 'none' }} />
              <Bar dataKey="value" fill="#0078d4" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Product Performance">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#3c3c3c', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-[#252526] p-4 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-[#cccccc]">{title}</h3>
      <span className="text-[#0078d4]">{icon}</span>
    </div>
    <p className="text-2xl font-bold text-[#0078d4]">{value}</p>
  </div>
)

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#252526] p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4 text-[#cccccc]">{title}</h3>
    {children}
  </div>
)

export default Dashboard