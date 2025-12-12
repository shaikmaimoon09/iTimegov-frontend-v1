import React from 'react';
import {
    ComposedChart, Line, Bar, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const TaskCostAnalysisTab = ({
    projects,
    projectTasks,
    selectedProjectId,
    taskChartType,
    setTaskChartType
}) => {
    const tasks = projectTasks[selectedProjectId] || [];
    const selectedProject = projects.find(p => p.id === selectedProjectId);

    if (tasks.length === 0) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-gray-600">No task data available for this project.</p>
                </CardContent>
            </Card>
        );
    }

    const totalPlannedCost = tasks.reduce((sum, t) => sum + t.plannedCost, 0);
    const totalActualCost = tasks.reduce((sum, t) => sum + (t.actualHours * (t.plannedCost / t.plannedHours)), 0);
    const avgSPI = tasks.reduce((sum, t) => sum + t.spi, 0) / tasks.length;
    const avgCPI = tasks.reduce((sum, t) => sum + t.cpi, 0) / tasks.length;

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">Task Cost Analysis - {selectedProject?.name}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="opacity-80">Total Tasks</p>
                            <p className="font-semibold text-2xl">{tasks.length}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Planned Cost</p>
                            <p className="font-semibold text-2xl">${(totalPlannedCost / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                            <p className="opacity-80">Avg SPI</p>
                            <p className="font-semibold text-2xl">{avgSPI.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Avg CPI</p>
                            <p className="font-semibold text-2xl">{avgCPI.toFixed(2)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Task Performance Chart */}
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Task Performance Overview</CardTitle>
                            <p className="text-sm text-gray-600">Cost Variance Analysis</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setTaskChartType('bar')}
                                className={`p-2 text-sm rounded border ${taskChartType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Bar Chart"
                            >
                                <Activity className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setTaskChartType('line')}
                                className={`p-2 text-sm rounded border ${taskChartType === 'line' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Line Chart"
                            >
                                <TrendingUp className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setTaskChartType('area')}
                                className={`p-2 text-sm rounded border ${taskChartType === 'area' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Area Chart"
                            >
                                <TrendingDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {taskChartType === 'bar' && (
                            <BarChart
                                data={tasks.map((task) => {
                                    const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                                    const variance = actualCost - task.plannedCost;
                                    return {
                                        name: task.id,
                                        plannedCost: Number((task.plannedCost / 1000).toFixed(1)),
                                        actualCost: Number((actualCost / 1000).toFixed(1)),
                                        variance: Number((variance / 1000).toFixed(1)),
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Legend />
                                <Bar dataKey="plannedCost" fill="#3B82F6" name="Planned Cost" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="actualCost" fill="#F59E0B" name="Actual Cost" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="variance" fill="#EF4444" name="Variance" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                        {taskChartType === 'line' && (
                            <ComposedChart
                                data={tasks.map((task) => {
                                    const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                                    const variance = actualCost - task.plannedCost;
                                    return {
                                        name: task.id,
                                        plannedCost: Number((task.plannedCost / 1000).toFixed(1)),
                                        actualCost: Number((actualCost / 1000).toFixed(1)),
                                        variance: Number((variance / 1000).toFixed(1)),
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="plannedCost" stroke="#3B82F6" strokeWidth={2} name="Planned Cost" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="actualCost" stroke="#F59E0B" strokeWidth={2} name="Actual Cost" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="variance" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Variance" dot={{ r: 5 }} />
                            </ComposedChart>
                        )}
                        {taskChartType === 'area' && (
                            <AreaChart
                                data={tasks.map((task) => {
                                    const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                                    const variance = actualCost - task.plannedCost;
                                    return {
                                        name: task.id,
                                        plannedCost: Number((task.plannedCost / 1000).toFixed(1)),
                                        actualCost: Number((actualCost / 1000).toFixed(1)),
                                        variance: Number((variance / 1000).toFixed(1)),
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="plannedCost" stroke="#3B82F6" fill="#BFDBFE" name="Planned Cost" />
                                <Area type="monotone" dataKey="actualCost" stroke="#F59E0B" fill="#FDE68A" name="Actual Cost" />
                                <Area type="monotone" dataKey="variance" stroke="#EF4444" fill="#FCA5A5" name="Variance" />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Task-Level Variance Table */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Task-Level Variance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Assignee</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Hours</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Hours</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Hours Variance</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Cost</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Cost</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Cost Variance</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {tasks.map((task) => {
                                    const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                                    const hoursVariance = task.actualHours - task.plannedHours;
                                    const costVariance = actualCost - task.plannedCost;
                                    const variancePercentage = ((costVariance / task.plannedCost) * 100).toFixed(0);
                                    const status = costVariance > 0 ? 'over' : costVariance < 0 ? 'under' : 'on-track';

                                    return (
                                        <tr key={task.id} className="border-t hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm font-medium text-blue-600 whitespace-nowrap">{task.id}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{task.name}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{task.assignee}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{task.plannedHours}h</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={hoursVariance > 0 ? 'text-red-600 font-semibold' : hoursVariance < 0 ? 'text-green-600 font-semibold' : ''}>
                                                    {task.actualHours}h
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={`font-semibold ${hoursVariance > 0 ? 'text-red-600' : hoursVariance < 0 ? 'text-green-600' : 'text-gray-600'}`}>
                                                    {hoursVariance > 0 ? '+' : ''}{hoursVariance}h
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${(task.plannedCost / 1000).toFixed(1)}k</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${(actualCost / 1000).toFixed(1)}k</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={`font-semibold ${costVariance > 0 ? 'text-red-600' : costVariance < 0 ? 'text-green-600' : 'text-gray-600'}`}>
                                                    {costVariance > 0 ? '+' : ''}${(costVariance / 1000).toFixed(1)}k ({variancePercentage}%)
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

            {/* Tasks Requiring Attention */}
            {(() => {
                const tasksRequiringAttention = tasks
                    .map((task) => {
                        const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                        const costVariance = actualCost - task.plannedCost;
                        const variancePercentage = ((costVariance / task.plannedCost) * 100).toFixed(0);
                        const status = costVariance > 0 ? 'over' : costVariance < 0 ? 'under' : 'on-track';
                        return {
                            ...task,
                            actualCost,
                            costVariance,
                            variancePercentage: Number(variancePercentage),
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
                                            ${(tasksRequiringAttention.reduce((sum, task) => sum + task.costVariance, 0) / 1000).toFixed(1)}k
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
                                                    <p className="font-semibold text-gray-900">{task.id}: {task.name}</p>
                                                    <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-lg font-bold ${Math.abs(task.variancePercentage) > 20 ? 'text-red-600' : 'text-yellow-600'}`}>
                                                        +${(task.costVariance / 1000).toFixed(1)}k
                                                    </p>
                                                    <p className="text-xs text-gray-600">{task.variancePercentage}% over budget</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : null;
            })()}
        </div>
    );
};

export default TaskCostAnalysisTab;
