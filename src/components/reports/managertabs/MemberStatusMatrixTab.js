import React from 'react';
import {
    BarChart, Bar, ComposedChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

export const MemberStatusMatrixTab = ({
    taskMatrix,
    varianceChartType,
    setVarianceChartType
}) => {
    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">Member Status Matrix</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="opacity-80">Total Members</p>
                            <p className="font-semibold">{taskMatrix.length} Active</p>
                        </div>
                        <div>
                            <p className="opacity-80">Average Efficiency</p>
                            <p className="font-semibold">
                                {(() => {
                                    const avgEff = taskMatrix.reduce((sum, task, index) => {
                                        const plannedHours = 100 + index * 20;
                                        const actualHours = plannedHours * (2 - task.cpi);
                                        const efficiency = (plannedHours / actualHours) * 100;
                                        return sum + efficiency;
                                    }, 0) / taskMatrix.length;
                                    return `${avgEff.toFixed(0)}%`;
                                })()}
                            </p>
                        </div>
                        <div>
                            <p className="opacity-80">Total Profit</p>
                            <p className="font-semibold">
                                ${(() => {
                                    const totalProfit = taskMatrix.reduce((sum, task, index) => {
                                        const plannedHours = 100 + index * 20;
                                        const actualHours = plannedHours * (2 - task.cpi);
                                        const hourlyCost = 50 + (index * 5);
                                        const billingRate = hourlyCost * 1.5;
                                        const actualCost = actualHours * hourlyCost;
                                        const revenue = actualHours * billingRate;
                                        const profit = revenue - actualCost;
                                        return sum + profit;
                                    }, 0);
                                    return (totalProfit / 1000).toFixed(1);
                                })()}k
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Member Performance Visualization with Toggle */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Member Performance Overview</CardTitle>
                            <p className="text-sm text-gray-600">Cost, Revenue, and Efficiency Analysis</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setVarianceChartType('bar')}
                                className={`p-2 text-sm rounded border ${varianceChartType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Bar Chart"
                            >
                                <Activity className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setVarianceChartType('line')}
                                className={`p-2 text-sm rounded border ${varianceChartType === 'line' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Line Chart"
                            >
                                <TrendingUp className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setVarianceChartType('area')}
                                className={`p-2 text-sm rounded border ${varianceChartType === 'area' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Area Chart"
                            >
                                <TrendingDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {varianceChartType === 'bar' && (
                            <BarChart
                                data={taskMatrix.map((task, index) => {
                                    const plannedHours = 100 + index * 20;
                                    const actualHours = plannedHours * (2 - task.cpi);
                                    const hourlyCost = 50 + (index * 5);
                                    const billingRate = hourlyCost * 1.5;
                                    const actualCost = actualHours * hourlyCost;
                                    const revenue = actualHours * billingRate;
                                    const profit = revenue - actualCost;

                                    return {
                                        member: `Member ${index + 1}`,
                                        actualCost: Number((actualCost / 1000).toFixed(1)),
                                        revenue: Number((revenue / 1000).toFixed(1)),
                                        profit: Number((profit / 1000).toFixed(1)),
                                        efficiency: Number(((plannedHours / actualHours) * 100).toFixed(0))
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="member" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => {
                                        if (name === 'efficiency') return [`${value}%`, name];
                                        return [`$${value}k`, name];
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="actualCost" fill="#EF4444" name="Actual Cost" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="revenue" fill="#10B981" name="Revenue" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="profit" fill="#3B82F6" name="Profit" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                        {varianceChartType === 'line' && (
                            <ComposedChart
                                data={taskMatrix.map((task, index) => {
                                    const plannedHours = 100 + index * 20;
                                    const actualHours = plannedHours * (2 - task.cpi);
                                    const hourlyCost = 50 + (index * 5);
                                    const billingRate = hourlyCost * 1.5;
                                    const actualCost = actualHours * hourlyCost;
                                    const revenue = actualHours * billingRate;
                                    const profit = revenue - actualCost;

                                    return {
                                        member: `Member ${index + 1}`,
                                        actualCost: Number((actualCost / 1000).toFixed(1)),
                                        revenue: Number((revenue / 1000).toFixed(1)),
                                        profit: Number((profit / 1000).toFixed(1)),
                                        efficiency: Number(((plannedHours / actualHours) * 100).toFixed(0))
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="member" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => {
                                        if (name === 'efficiency') return [`${value}%`, name];
                                        return [`$${value}k`, name];
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="actualCost" stroke="#EF4444" strokeWidth={2} name="Actual Cost" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name="Profit" dot={{ r: 5 }} />
                            </ComposedChart>
                        )}
                        {varianceChartType === 'area' && (
                            <AreaChart
                                data={taskMatrix.map((task, index) => {
                                    const plannedHours = 100 + index * 20;
                                    const actualHours = plannedHours * (2 - task.cpi);
                                    const hourlyCost = 50 + (index * 5);
                                    const billingRate = hourlyCost * 1.5;
                                    const actualCost = actualHours * hourlyCost;
                                    const revenue = actualHours * billingRate;
                                    const profit = revenue - actualCost;

                                    return {
                                        member: `Member ${index + 1}`,
                                        actualCost: Number((actualCost / 1000).toFixed(1)),
                                        revenue: Number((revenue / 1000).toFixed(1)),
                                        profit: Number((profit / 1000).toFixed(1)),
                                        efficiency: Number(((plannedHours / actualHours) * 100).toFixed(0))
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="member" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => {
                                        if (name === 'efficiency') return [`${value}%`, name];
                                        return [`$${value}k`, name];
                                    }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="actualCost" stroke="#EF4444" fill="#FCA5A5" name="Actual Cost" />
                                <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#6EE7B7" name="Revenue" />
                                <Area type="monotone" dataKey="profit" stroke="#3B82F6" fill="#93C5FD" name="Profit" />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Member Cost Analysis Table */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Member Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden overflow-x-auto"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'white #f3f4f6'
                        }}
                    >
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Member</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Hourly Labour Cost</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Billing Rate</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Allocated Hours</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Hours</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Cost</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Revenue</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Profit</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Efficiency %</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {taskMatrix.map((task, index) => {
                                    const plannedHours = 100 + index * 20;
                                    const actualHours = plannedHours * (2 - task.cpi);
                                    const hourlyCost = 50 + (index * 5);
                                    const billingRate = hourlyCost * 1.5;
                                    const actualCost = actualHours * hourlyCost;
                                    const revenue = actualHours * billingRate;
                                    const profit = revenue - actualCost;
                                    const efficiency = ((plannedHours / actualHours) * 100).toFixed(0);

                                    return (
                                        <tr key={index} className="border-t hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm font-medium text-blue-600">Member {index + 1}</td>
                                            <td className="py-3 px-4 text-sm">${hourlyCost}/hr</td>
                                            <td className="py-3 px-4 text-sm">${billingRate.toFixed(0)}/hr</td>
                                            <td className="py-3 px-4 text-sm">{plannedHours.toFixed(1)}h</td>
                                            <td className="py-3 px-4 text-sm">{actualHours.toFixed(1)}h</td>
                                            <td className="py-3 px-4 text-sm">${actualCost.toFixed(0)}</td>
                                            <td className="py-3 px-4 text-sm">${revenue.toFixed(0)}</td>
                                            <td className="py-3 px-4 text-sm">
                                                <span className={profit >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                                    ${profit.toFixed(0)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                <span className={efficiency > 100 ? 'text-red-600 font-semibold' : efficiency < 80 ? 'text-yellow-600 font-semibold' : 'text-green-600 font-semibold'}>
                                                    {efficiency}%
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MemberStatusMatrixTab;
