import React from 'react';
import {
    BarChart, Bar, ComposedChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const TaskStatusMatrixTab = ({
    taskMatrix,
    selectedMonth,
    chartType,
    setChartType
}) => {
    return (
        <div className="space-y-6">
            {/* Visual Charts with Toggle */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Task Performance Visualization</CardTitle>
                            <p className="text-sm text-gray-600">Digital Transformation Initiative - {new Date(selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setChartType('bar')}
                                className={`p-2 text-sm rounded border ${chartType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Bar Chart"
                            >
                                <Activity className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setChartType('line')}
                                className={`p-2 text-sm rounded border ${chartType === 'line' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Line Chart"
                            >
                                <TrendingUp className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setChartType('area')}
                                className={`p-2 text-sm rounded border ${chartType === 'area' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Area Chart"
                            >
                                <TrendingDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'bar' && (
                            <BarChart
                                data={taskMatrix.map((task, index) => {
                                    const plannedHours = 100 + index * 20;
                                    const actualHours = plannedHours * (2 - task.cpi);
                                    const plannedCost = plannedHours * 75;
                                    const actualCost = actualHours * 75;
                                    return {
                                        id: task.id,
                                        plannedHours: Number(plannedHours.toFixed(1)),
                                        actualHours: Number(actualHours.toFixed(1)),
                                        plannedCost: Number((plannedCost / 1000).toFixed(1)),
                                        actualCost: Number((actualCost / 1000).toFixed(1))
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="id" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => {
                                        if (name.includes('Cost')) return [`$${value}k`, name];
                                        return [`${value}h`, name];
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="plannedHours" fill="#3B82F6" name="Planned Hours" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="actualHours" fill="#60A5FA" name="Actual Hours" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="plannedCost" fill="#F59E0B" name="Planned Cost ($k)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="actualCost" fill="#EF4444" name="Actual Cost ($k)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                        {chartType === 'line' && (
                            <ComposedChart
                                data={taskMatrix.map((task, index) => {
                                    const plannedHours = 100 + index * 20;
                                    const actualHours = plannedHours * (2 - task.cpi);
                                    const plannedCost = plannedHours * 75;
                                    const actualCost = actualHours * 75;
                                    return {
                                        id: task.id,
                                        plannedHours: Number(plannedHours.toFixed(1)),
                                        actualHours: Number(actualHours.toFixed(1)),
                                        plannedCost: Number((plannedCost / 1000).toFixed(1)),
                                        actualCost: Number((actualCost / 1000).toFixed(1))
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="id" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => {
                                        if (name.includes('Cost')) return [`$${value}k`, name];
                                        return [`${value}h`, name];
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="plannedHours" stroke="#3B82F6" strokeWidth={2} name="Planned Hours" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="actualHours" stroke="#60A5FA" strokeWidth={2} strokeDasharray="5 5" name="Actual Hours" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="plannedCost" stroke="#F59E0B" strokeWidth={2} name="Planned Cost ($k)" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="actualCost" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Actual Cost ($k)" dot={{ r: 5 }} />
                            </ComposedChart>
                        )}
                        {chartType === 'area' && (
                            <AreaChart
                                data={taskMatrix.map((task, index) => {
                                    const plannedHours = 100 + index * 20;
                                    const actualHours = plannedHours * (2 - task.cpi);
                                    const plannedCost = plannedHours * 75;
                                    const actualCost = actualHours * 75;
                                    return {
                                        id: task.id,
                                        plannedHours: Number(plannedHours.toFixed(1)),
                                        actualHours: Number(actualHours.toFixed(1)),
                                        plannedCost: Number((plannedCost / 1000).toFixed(1)),
                                        actualCost: Number((actualCost / 1000).toFixed(1))
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="id" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => {
                                        if (name.includes('Cost')) return [`$${value}k`, name];
                                        return [`${value}h`, name];
                                    }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="plannedHours" stroke="#3B82F6" fill="#BFDBFE" name="Planned Hours" />
                                <Area type="monotone" dataKey="actualHours" stroke="#60A5FA" fill="#DBEAFE" name="Actual Hours" />
                                <Area type="monotone" dataKey="plannedCost" stroke="#F59E0B" fill="#FCD34D" name="Planned Cost ($k)" />
                                <Area type="monotone" dataKey="actualCost" stroke="#EF4444" fill="#FCA5A5" name="Actual Cost ($k)" />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Task-Level Variance Table */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Task Status Matrix</CardTitle>
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
                                {taskMatrix.map((task, index) => {
                                    const plannedHours = 100 + index * 20;
                                    const actualHours = plannedHours * (2 - task.cpi);
                                    const plannedCost = plannedHours * 75;
                                    const actualCost = actualHours * 75;
                                    const hoursVariance = actualHours - plannedHours;
                                    const costVariance = actualCost - plannedCost;
                                    const variancePercentage = ((costVariance / plannedCost) * 100).toFixed(0);
                                    const status = costVariance > 0 ? 'over' : costVariance < 0 ? 'under' : 'on-track';

                                    return (
                                        <tr key={task.id} className="border-t hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-blue-600 font-medium whitespace-nowrap">{task.id}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">Task {task.id}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{plannedHours.toFixed(1)}h</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{actualHours.toFixed(1)}h</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${plannedCost.toFixed(0)}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${actualCost.toFixed(0)}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={hoursVariance > 0 ? 'text-red-600 font-semibold' : hoursVariance < 0 ? 'text-green-600 font-semibold' : ''}>
                                                    {hoursVariance > 0 ? '+' : ''}{hoursVariance.toFixed(1)}h
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={costVariance > 0 ? 'text-red-600 font-semibold' : costVariance < 0 ? 'text-green-600 font-semibold' : ''}>
                                                    {costVariance > 0 ? '+$' : costVariance < 0 ? '-$' : '$'}{Math.abs(costVariance).toFixed(0)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={Math.abs(variancePercentage) > 10 ? 'text-red-600 font-semibold' : ''}>
                                                    {variancePercentage > 0 ? '+' : ''}{variancePercentage}%
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                {status === 'over' && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-600 text-white whitespace-nowrap">
                                                        <TrendingUp className="h-3 w-3 mr-1" />
                                                        Over Budget
                                                    </span>
                                                )}
                                                {status === 'under' && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-600 text-white whitespace-nowrap">
                                                        <TrendingDown className="h-3 w-3 mr-1" />
                                                        Under Budget
                                                    </span>
                                                )}
                                                {status === 'on-track' && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-600 text-white whitespace-nowrap">
                                                        On Track
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Tasks Requiring Attention Summary */}
            {(() => {
                const tasksRequiringAttention = taskMatrix
                    .map((task, index) => {
                        const plannedHours = 100 + index * 20;
                        const actualHours = plannedHours * (2 - task.cpi);
                        const plannedCost = plannedHours * 75;
                        const actualCost = actualHours * 75;
                        const hoursVariance = actualHours - plannedHours;
                        const costVariance = actualCost - plannedCost;
                        const variancePercentage = ((costVariance / plannedCost) * 100).toFixed(0);
                        const status = costVariance > 0 ? 'over' : costVariance < 0 ? 'under' : 'on-track';

                        return {
                            ...task,
                            plannedHours,
                            actualHours,
                            plannedCost,
                            actualCost,
                            hoursVariance,
                            costVariance,
                            variancePercentage,
                            status
                        };
                    })
                    .filter(task => task.status === 'over')
                    .sort((a, b) => Math.abs(b.variancePercentage) - Math.abs(a.variancePercentage));

                const criticalTasks = tasksRequiringAttention.filter(task => Math.abs(task.variancePercentage) > 20);
                const warningTasks = tasksRequiringAttention.filter(task => Math.abs(task.variancePercentage) > 10 && Math.abs(task.variancePercentage) <= 20);

                return tasksRequiringAttention.length > 0 ? (
                    <Card className="border-l-4 border-l-red-500 shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                Tasks Requiring Attention
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                                {tasksRequiringAttention.length} task{tasksRequiringAttention.length > 1 ? 's are' : ' is'} over budget
                                {criticalTasks.length > 0 && ` (${criticalTasks.length} critical)`}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Summary Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-red-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Over Budget</p>
                                        <p className="text-xl font-bold text-red-600">
                                            ${tasksRequiringAttention.reduce((sum, task) => sum + task.costVariance, 0).toFixed(0)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Critical Tasks (&gt;20%)</p>
                                        <p className="text-xl font-bold text-red-600">{criticalTasks.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Warning Tasks (10-20%)</p>
                                        <p className="text-xl font-bold text-yellow-600">{warningTasks.length}</p>
                                    </div>
                                </div>

                                {/* Task Details */}
                                <div className="space-y-3">
                                    {tasksRequiringAttention.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`border-l-4 pl-4 py-2 ${Math.abs(task.variancePercentage) > 20
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-yellow-500 bg-yellow-50'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className={`font-semibold ${Math.abs(task.variancePercentage) > 20
                                                        ? 'text-red-600'
                                                        : 'text-yellow-600'
                                                        }`}>
                                                        {Math.abs(task.variancePercentage) > 20 ? '🔴' : '🟡'} {task.id}: Task {task.id}
                                                        {Math.abs(task.variancePercentage) > 20 && ' (CRITICAL)'}
                                                    </p>
                                                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                                                        <li>
                                                            • <strong>Cost Variance:</strong> +${task.costVariance.toFixed(0)}
                                                            <span className="text-red-600 font-semibold"> (+{task.variancePercentage}%)</span>
                                                        </li>
                                                        <li>
                                                            • <strong>Hours Variance:</strong> +{task.hoursVariance.toFixed(1)}h
                                                            <span className="text-gray-600">
                                                                ({task.actualHours.toFixed(1)}h actual vs {task.plannedHours.toFixed(1)}h planned)
                                                            </span>
                                                        </li>
                                                        <li>
                                                            • <strong>Performance:</strong> CPI: {task.cpi} | SPI: {task.spi} | Health: {task.health}
                                                        </li>
                                                        <li className="mt-2">
                                                            • <strong>Recommended Action:</strong>
                                                            <span className="text-gray-800">
                                                                {Math.abs(task.variancePercentage) > 20
                                                                    ? ' Immediate review required - reassess scope and resources'
                                                                    : ' Monitor closely and optimize resource allocation'}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-l-4 border-l-green-500 shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                All Tasks On Track
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                ✓ All tasks are currently within budget or under budget. No immediate attention required.
                            </p>
                        </CardContent>
                    </Card>
                );
            })()}

        </div>
    );
};

export default TaskStatusMatrixTab;
