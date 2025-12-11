import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, ComposedChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const TaskPerformanceTab = ({ taskData, kpis, selectedMonth, chartType, setChartType }) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">My Task Performance Report</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="opacity-80">Employee</p>
                            <p className="font-semibold">John Doe (EMP-2024-001)</p>
                        </div>
                        <div>
                            <p className="opacity-80">Report Date</p>
                            <p className="font-semibold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Total Tasks</p>
                            <p className="font-semibold">{taskData.length}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Task Performance Visualization with Toggle */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>My Task Performance Visualization</CardTitle>
                            <p className="text-sm text-gray-600">Planned vs Actual Hours and Costs</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setChartType('bar')}
                                className={`px-3 py-1 text-sm rounded ${chartType === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Bar Chart
                            </button>
                            <button
                                onClick={() => setChartType('line')}
                                className={`px-3 py-1 text-sm rounded ${chartType === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Line Chart
                            </button>
                            <button
                                onClick={() => setChartType('area')}
                                className={`px-3 py-1 text-sm rounded ${chartType === 'area' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Area Chart
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'bar' && (
                            <BarChart
                                data={taskData.map((task) => {
                                    const plannedHours = task.baseline;
                                    const actualHours = task.actual;
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
                                data={taskData.map((task) => {
                                    const plannedHours = task.baseline;
                                    const actualHours = task.actual;
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
                            <ComposedChart
                                data={taskData.map((task) => {
                                    const plannedHours = task.baseline;
                                    const actualHours = task.actual;
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
                                <defs>
                                    <linearGradient id="colorPlannedHoursEmp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorActualHoursEmp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPlannedCostEmp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                <Bar dataKey="plannedHours" fill="url(#colorPlannedHoursEmp)" name="Planned Hours" />
                                <Bar dataKey="actualHours" fill="url(#colorActualHoursEmp)" name="Actual Hours" />
                                <Line type="monotone" dataKey="plannedCost" stroke="#F59E0B" strokeWidth={2} name="Planned Cost ($k)" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="actualCost" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Actual Cost ($k)" dot={{ r: 5 }} />
                            </ComposedChart>
                        )}
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Task Performance Matrix Table */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>My Task Performance Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'white #f3f4f6' }}>
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
                                {taskData.map((task, index) => {
                                    const plannedHours = task.baseline;
                                    const actualHours = task.actual;
                                    const plannedCost = plannedHours * 75;
                                    const actualCost = actualHours * 75;
                                    const hoursVariance = actualHours - plannedHours;
                                    const costVariance = actualCost - plannedCost;
                                    const variancePercentage = plannedCost > 0 ? ((costVariance / plannedCost) * 100).toFixed(0) : 0;
                                    const status = costVariance > 0 ? 'over' : costVariance < 0 ? 'under' : 'on-track';

                                    return (
                                        <tr key={task.id} className="border-t hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-blue-600 font-medium whitespace-nowrap">{task.id}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{task.name}</td>
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


            {/* Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Total Hours Logged</p>
                            <p className="text-xl font-bold">{kpis.totalActual} hours</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Average Efficiency (CPI)</p>
                            <p className={`text-xl font-bold ${kpis.hoursEfficiency >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                                {kpis.hoursEfficiency}
                            </p>
                            <p className="text-xs text-gray-500">
                                {kpis.hoursEfficiency >= 1 ? `${Math.round((kpis.hoursEfficiency - 1) * 100)}% more efficient` : `${Math.round((1 - kpis.hoursEfficiency) * 100)}% less efficient`}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Average Schedule (SPI)</p>
                            <p className={`text-xl font-bold ${kpis.avgSPI >= 1 ? 'text-green-600' : 'text-yellow-600'}`}>
                                {kpis.avgSPI}
                            </p>
                            <p className="text-xs text-gray-500">
                                {kpis.avgSPI >= 1 ? `${Math.round((kpis.avgSPI - 1) * 100)}% ahead` : `${Math.round((1 - kpis.avgSPI) * 100)}% behind`}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Average Health Score</p>
                            <p className="text-xl font-bold">{kpis.avgHealth}/100</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Tasks On Track</p>
                            <p className="text-xl font-bold text-green-600">
                                {taskData.filter(t => t.status === 'Normal').length} ({Math.round(taskData.filter(t => t.status === 'Normal').length / taskData.length * 100)}%)
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Tasks At Risk</p>
                            <p className="text-xl font-bold text-yellow-600">
                                {taskData.filter(t => t.status !== 'Normal').length} ({Math.round(taskData.filter(t => t.status !== 'Normal').length / taskData.length * 100)}%)
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Key Insights */}
            <Card>
                <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {taskData.filter(t => t.cpi > 1.1).map(t => (
                            <div key={t.id} className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <p className="text-sm">Excellent cost efficiency on {t.name} ({Math.round((t.cpi - 1) * 100)}% under budget)</p>
                            </div>
                        ))}
                        {taskData.filter(t => t.percent === 100).map(t => (
                            <div key={t.id} className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <p className="text-sm">{t.name} completed {t.spi >= 1 ? 'ahead of schedule' : 'successfully'}</p>
                            </div>
                        ))}
                        {taskData.filter(t => t.spi < 0.9 || t.cpi < 0.9).map(t => (
                            <div key={t.id} className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold">⚠</span>
                                <p className="text-sm">{t.name} needs attention - {t.spi < 0.9 ? 'behind schedule' : ''} {t.spi < 0.9 && t.cpi < 0.9 ? 'and' : ''} {t.cpi < 0.9 ? 'over budget' : ''}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
