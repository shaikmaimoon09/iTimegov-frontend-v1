import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const VarianceTab = ({ project }) => {
  const baseline = project.baselines && project.baselines.length > 0 ? project.baselines[project.baselines.length - 1] : null;

  const varianceData = (project.tasks || []).map(task => {
    const baselineTask = baseline?.tasks.find(bt => bt.taskId === task.id);
    const plannedHours = parseFloat(baselineTask?.plannedHours || task.estimatedHours || 0);
    const actualHours = parseFloat(task.actualHours || 0);
    const plannedCost = parseFloat(baselineTask?.plannedCost || task.estimatedCost || 0);
    const actualCost = actualHours * (task.costPerHour || 0);
    const hoursVariance = actualHours - plannedHours;
    const costVariance = actualCost - plannedCost;
    const variancePercentage = plannedCost > 0 ? ((costVariance / plannedCost) * 100).toFixed(1) : 0;

    return {
      taskId: task.id,
      taskName: task.name,
      plannedHours,
      actualHours,
      plannedCost,
      actualCost,
      hoursVariance,
      costVariance,
      variancePercentage,
      status: costVariance > 0 ? 'over' : costVariance < 0 ? 'under' : 'on-track'
    };
  });

  const totalPlannedHours = varianceData.reduce((sum, v) => sum + v.plannedHours, 0);
  const totalActualHours = varianceData.reduce((sum, v) => sum + v.actualHours, 0);
  const totalPlannedCost = varianceData.reduce((sum, v) => sum + v.plannedCost, 0);
  const totalActualCost = varianceData.reduce((sum, v) => sum + v.actualCost, 0);

  return (
    <div className="space-y-6" data-testid="variance-tab">
      <h3 className="text-xl font-semibold text-gray-900">Variance Analysis</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Planned Hours</p>
            <p className="text-2xl font-bold text-blue-600">{totalPlannedHours.toFixed(1)}h</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Actual Hours</p>
            <p className="text-2xl font-bold text-green-600">{totalActualHours.toFixed(1)}h</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Planned Cost</p>
            <p className="text-2xl font-bold text-blue-600">${totalPlannedCost.toFixed(0)}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Actual Cost</p>
            <p className="text-2xl font-bold text-green-600">${totalActualCost.toFixed(0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Variance Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Task-Level Variance</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border rounded-lg overflow-hidden overflow-x-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'white #f3f4f6'
            }}
          >
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Hours Variance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Cost Variance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Variance %</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {varianceData.map((row) => (
                  <tr key={row.taskId} className="border-t hover:bg-gray-50" data-testid={`variance-row-${row.taskId}`}>
                    <td className="py-3 px-4 text-sm text-blue-600 font-medium whitespace-nowrap">{row.taskId}</td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">{row.taskName}</td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">{row.plannedHours.toFixed(1)}h</td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">{row.actualHours.toFixed(1)}h</td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">${row.plannedCost.toFixed(0)}</td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">${row.actualCost.toFixed(0)}</td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">
                      <span className={row.hoursVariance > 0 ? 'text-red-600 font-semibold' : row.hoursVariance < 0 ? 'text-green-600 font-semibold' : ''}>
                        {row.hoursVariance > 0 ? '+' : ''}{row.hoursVariance.toFixed(1)}h
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">
                      <span className={row.costVariance > 0 ? 'text-red-600 font-semibold' : row.costVariance < 0 ? 'text-green-600 font-semibold' : ''}>
                        {row.costVariance > 0 ? '+$' : row.costVariance < 0 ? '-$' : '$'}{Math.abs(row.costVariance).toFixed(0)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">
                      <span className={Math.abs(row.variancePercentage) > 10 ? 'text-red-600 font-semibold' : ''}>
                        {row.variancePercentage > 0 ? '+' : ''}{row.variancePercentage}%
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {row.status === 'over' && (
                        <Badge variant="destructive" className="bg-red-600 whitespace-nowrap">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Over Budget
                        </Badge>
                      )}
                      {row.status === 'under' && (
                        <Badge className="bg-green-600 whitespace-nowrap">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          Under Budget
                        </Badge>
                      )}
                      {row.status === 'on-track' && (
                        <Badge className="bg-blue-600 whitespace-nowrap">
                          On Track
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};