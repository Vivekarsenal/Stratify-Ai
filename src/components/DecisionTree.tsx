import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

const DecisionTree: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#0078d4]">Decision Tree Visualization</h2>
      <div className="bg-[#252526] p-6 rounded-lg shadow-md overflow-auto">
        <Tree
          lineWidth={'2px'}
          lineColor={'#444'}
          lineBorderRadius={'10px'}
          label={<div className="bg-[#0078d4] text-white p-2 rounded">Expand Market Share</div>}
        >
          <TreeNode label={<div className="bg-[#107c10] text-white p-2 rounded">New Product Launch</div>}>
            <TreeNode label={<div className="bg-[#d83b01] text-white p-2 rounded">R&D Investment</div>} />
            <TreeNode label={<div className="bg-[#d83b01] text-white p-2 rounded">Market Research</div>} />
          </TreeNode>
          <TreeNode label={<div className="bg-[#107c10] text-white p-2 rounded">Enter New Markets</div>}>
            <TreeNode label={<div className="bg-[#d83b01] text-white p-2 rounded">Geographic Expansion</div>} />
            <TreeNode label={<div className="bg-[#d83b01] text-white p-2 rounded">Partnerships</div>} />
          </TreeNode>
        </Tree>
      </div>
    </div>
  )
}

export default DecisionTree