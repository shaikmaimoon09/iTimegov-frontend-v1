import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const CostAnalysisTab = ({ project }) => {
  // Member Cost Analysis
  const memberCostData = (project.members || []).map(member => {
    const memberTasks = (project.tasks || []).filter(t => t.assignedTo === member.username);
    const allocatedHours = memberTasks.reduce((sum, t) => sum + parseFloat(t.estimatedHours || 0), 0);
    const actualHours = memberTasks.reduce((sum, t) => sum + parseFloat(t.actualHours || 0), 0);
    const actualCost = actualHours * member.hourlyCostRate;
    const revenue = actualHours * member.clientBillingRate;
    const profit = revenue - actualCost;
    const efficiency = allocatedHours > 0 ? ((actualHours / allocatedHours) * 100).toFixed(1) : 0;

    return {
      member: member.username,
      hourlyCostRate: member.hourlyCostRate,
      billingRate: member.clientBillingRate,
      allocatedHours,
      actualHours,
      actualCost,
      revenue,
      profit,
      efficiency
    };
  });

  // Task Cost Analysis
  const taskCostData = (project.tasks || []).map(task => {
    const estimatedCost = parseFloat(task.estimatedCost || 0);
    const actualCost = parseFloat(task.actualHours || 0) * (task.costPerHour || 0);
    const costVariance = ((actualCost - estimatedCost) / estimatedCost * 100).toFixed(1);

    return {
      taskId: task.id,
      taskName: task.name,
      estimatedHours: task.estimatedHours,
      estimatedCost,
      actualHours: task.actualHours || 0,
      actualCost,
      costVariance,
      status: actualCost > estimatedCost ? 'over' : actualCost < estimatedCost ? 'under' : 'on-target'
    };
  });

  return (
    <div className="space-y-6" data-testid="cost-analysis-tab">
      <h3 className="text-xl font-semibold text-gray-900">Cost Analysis</h3>

      {/* Member Cost Analysis */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Member Cost Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Member</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hourly Labour Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Billing Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Allocated Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actual Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actual Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Profit</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Efficiency %</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {memberCostData.length > 0 ? (
                  memberCostData.map((row, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50" data-testid={`member-cost-row-${row.member}`}>
                      <td className="py-3 px-4 text-sm font-medium">{row.member}</td>
                      <td className="py-3 px-4 text-sm">${row.hourlyCostRate}/hr</td>
                      <td className="py-3 px-4 text-sm">${row.billingRate}/hr</td>
                      <td className="py-3 px-4 text-sm">{row.allocatedHours.toFixed(1)}h</td>
                      <td className="py-3 px-4 text-sm">{row.actualHours.toFixed(1)}h</td>
                      <td className="py-3 px-4 text-sm">${row.actualCost.toFixed(0)}</td>
                      <td className="py-3 px-4 text-sm">${row.revenue.toFixed(0)}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={row.profit >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                          ${row.profit.toFixed(0)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={row.efficiency > 100 ? 'text-red-600' : row.efficiency < 80 ? 'text-yellow-600' : 'text-green-600'}>
                          {row.efficiency}%
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-8 text-gray-500">
                      No member data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Task Cost Analysis */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Task Cost Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estimated Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estimated Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actual Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actual Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cost Variance %</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {taskCostData.length > 0 ? (
                  taskCostData.map((row) => (
                    <tr key={row.taskId} className="border-t hover:bg-gray-50" data-testid={`task-cost-row-${row.taskId}`}>
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium">{row.taskId}</td>
                      <td className="py-3 px-4 text-sm">{row.taskName}</td>
                      <td className="py-3 px-4 text-sm">{row.estimatedHours}h</td>
                      <td className="py-3 px-4 text-sm">${row.estimatedCost.toFixed(0)}</td>
                      <td className="py-3 px-4 text-sm">{row.actualHours.toFixed(1)}h</td>
                      <td className="py-3 px-4 text-sm">${row.actualCost.toFixed(0)}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={Math.abs(row.costVariance) > 10 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                          {row.costVariance > 0 ? '+' : ''}{row.costVariance}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.status === 'over' ? 'bg-red-100 text-red-800' :
                          row.status === 'under' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {row.status === 'over' ? 'Over Budget' : row.status === 'under' ? 'Under Budget' : 'On Target'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-gray-500">
                      No task data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Actual Cost</p>
            <p className="text-2xl font-bold text-blue-600">
              ${memberCostData.reduce((sum, m) => sum + m.actualCost, 0).toFixed(0)}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">
              ${memberCostData.reduce((sum, m) => sum + m.revenue, 0).toFixed(0)}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Profit</p>
            <p className="text-2xl font-bold text-purple-600">
              ${memberCostData.reduce((sum, m) => sum + m.profit, 0).toFixed(0)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};