import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const EVMTab = ({ project }) => {
  const budgetData = project.budget || [];
  
  const totalPV = budgetData.reduce((sum, b) => sum + b.plannedBudget, 0);
  const totalEV = budgetData.reduce((sum, b) => sum + b.ev, 0);
  const totalAC = budgetData.reduce((sum, b) => sum + b.actualCost, 0);
  const totalSV = totalEV - totalPV;
  const totalCV = totalEV - totalAC;
  const avgSPI = totalPV > 0 ? (totalEV / totalPV) : 0;
  const avgCPI = totalAC > 0 ? (totalEV / totalAC) : 0;

  return (
    <div className="space-y-6" data-testid="evm-tab">
      <h3 className="text-xl font-semibold text-gray-900">Earned Value Management (EVM)</h3>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Planned Value (PV)</p>
            <p className="text-2xl font-bold text-blue-600">${totalPV.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Earned Value (EV)</p>
            <p className="text-2xl font-bold text-green-600">${totalEV.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Actual Cost (AC)</p>
            <p className="text-2xl font-bold text-orange-600">${totalAC.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Budget at Completion (BAC)</p>
            <p className="text-2xl font-bold text-purple-600">${totalPV.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Variance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Schedule Variance (SV)</p>
            <p className={`text-2xl font-bold ${totalSV >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totalSV.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">{totalSV >= 0 ? 'Ahead of Schedule' : 'Behind Schedule'}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Cost Variance (CV)</p>
            <p className={`text-2xl font-bold ${totalCV >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totalCV.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">{totalCV >= 0 ? 'Under Budget' : 'Over Budget'}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Schedule Performance Index (SPI)</p>
            <p className={`text-2xl font-bold ${avgSPI >= 1 ? 'text-green-600' : 'text-red-600'}`}>
              {avgSPI.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">{avgSPI >= 1 ? 'Good Performance' : 'Poor Performance'}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Cost Performance Index (CPI)</p>
            <p className={`text-2xl font-bold ${avgCPI >= 1 ? 'text-green-600' : 'text-red-600'}`}>
              {avgCPI.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">{avgCPI >= 1 ? 'Good Performance' : 'Poor Performance'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Monthly EVM Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Month</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">PV</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">EV</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">AC</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">SV</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">CV</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">SPI</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">CPI</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {budgetData.length > 0 ? (
                  budgetData.map((row, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50" data-testid={`evm-row-${row.month}`}>
                      <td className="py-3 px-4 text-sm font-medium">{row.month}</td>
                      <td className="py-3 px-4 text-sm">${row.plannedBudget.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">${row.ev.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">${row.actualCost.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={row.sv >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                          ${row.sv.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={row.cv >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                          ${row.cv.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={row.spi >= 1 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                          {row.spi.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={row.cpi >= 1 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                          {row.cpi.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-gray-500">
                      No EVM data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* EVM Interpretation */}
      <Card className="shadow-md bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg">EVM Interpretation Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>SPI &gt; 1:</strong> Project is ahead of schedule</p>
          <p><strong>SPI &lt; 1:</strong> Project is behind schedule</p>
          <p><strong>CPI &gt; 1:</strong> Project is under budget</p>
          <p><strong>CPI &lt; 1:</strong> Project is over budget</p>
          <p className="pt-2 border-t"><strong>Current Status:</strong> {avgSPI >= 1 ? '✓ On Schedule' : '✗ Behind Schedule'}, {avgCPI >= 1 ? '✓ Under Budget' : '✗ Over Budget'}</p>
        </CardContent>
      </Card>
    </div>
  );
};