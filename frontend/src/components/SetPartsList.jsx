import React from 'react';

function SetPartsList({ parts = [] }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        📦 Complete Parts List
        <span className="text-sm font-normal text-gray-500">({parts?.length ?? 0} unique parts)</span>
      </h3>
      <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-200">
            <tr className="text-left border-b-2 border-gray-300">
              <th className="py-3 px-3 font-semibold">Part #</th>
              <th className="py-3 px-3 font-semibold">Part Name</th>
              <th className="py-3 px-3 font-semibold">Color</th>
              <th className="py-3 px-3 text-right font-semibold">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {parts?.map((part, idx) => (
              <tr key={idx} className="border-b hover:bg-white transition">
                <td className="py-3 px-3 font-mono text-xs text-blue-600">{part.part_num}</td>
                <td className="py-3 px-3 font-medium">{part.part_name}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded border-2 border-gray-400 shadow-sm"
                      style={{ backgroundColor: part.rgb ? `#${part.rgb}` : undefined }}
                      title={part.rgb ? `RGB: #${part.rgb}` : undefined}
                    />
                    <span className="text-sm">{part.color_name}</span>
                    {part.is_trans && <span className="text-xs text-purple-600">(transparent)</span>}
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="font-bold text-lg">{part.quantity}×</span>
                  {part.is_spare && <span className="text-xs text-green-600 ml-2">(spare)</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-xs text-gray-500 text-center">
        This data demonstrates SQL JOINs across multiple tables (sets → inventories → inventory_parts → parts → colors)
      </div>
    </div>
  );
}

export default SetPartsList;
