import React from 'react';
import {
    ComposedChart, Line, Bar, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

export const MemberCostAnalysisTab = ({
    projects,
    projectMembers,
    selectedProjectId,
    memberChartType,
    setMemberChartType
}) => {
    const members = projectMembers[selectedProjectId] || [];
    const selectedProject = projects.find(p => p.id === selectedProjectId);

    if (members.length === 0) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-gray-600">No member data available for this project.</p>
                </CardContent>
            </Card>
        );
    }

    const totalActualCost = members.reduce((sum, m) => sum + (m.actualHours * m.hourlyCost), 0);
    const totalRevenue = members.reduce((sum, m) => sum + (m.actualHours * m.billingRate), 0);
    const totalProfit = totalRevenue - totalActualCost;
    const avgEfficiency = members.reduce((sum, m) => sum + m.efficiency, 0) / members.length;

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">Member Cost Analysis - {selectedProject?.name}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="opacity-80">Total Members</p>
                            <p className="font-semibold text-2xl">{members.length}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Total Cost</p>
                            <p className="font-semibold text-2xl">${(totalActualCost / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                            <p className="opacity-80">Total Revenue</p>
                            <p className="font-semibold text-2xl">${(totalRevenue / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                            <p className="opacity-80">Avg Efficiency</p>
                            <p className="font-semibold text-2xl">{avgEfficiency.toFixed(0)}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Member Performance Chart */}
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Member Performance Overview</CardTitle>
                            <p className="text-sm text-gray-600">Cost, Revenue, and Profit Analysis</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMemberChartType('bar')}
                                className={`p-2 text-sm rounded border ${memberChartType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Bar Chart"
                            >
                                <Activity className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setMemberChartType('line')}
                                className={`p-2 text-sm rounded border ${memberChartType === 'line' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Line Chart"
                            >
                                <TrendingUp className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setMemberChartType('area')}
                                className={`p-2 text-sm rounded border ${memberChartType === 'area' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Area Chart"
                            >
                                <TrendingDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {memberChartType === 'bar' && (
                            <BarChart
                                data={members.map((member) => ({
                                    name: member.name,
                                    actualCost: Number(((member.actualHours * member.hourlyCost) / 1000).toFixed(1)),
                                    revenue: Number(((member.actualHours * member.billingRate) / 1000).toFixed(1)),
                                    profit: Number((((member.actualHours * member.billingRate) - (member.actualHours * member.hourlyCost)) / 1000).toFixed(1)),
                                }))}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} angle={-15} textAnchor="end" height={80} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Legend />
                                <Bar dataKey="actualCost" fill="#EF4444" name="Actual Cost" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="revenue" fill="#10B981" name="Revenue" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="profit" fill="#3B82F6" name="Profit" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                        {memberChartType === 'line' && (
                            <ComposedChart
                                data={members.map((member) => ({
                                    name: member.name,
                                    actualCost: Number(((member.actualHours * member.hourlyCost) / 1000).toFixed(1)),
                                    revenue: Number(((member.actualHours * member.billingRate) / 1000).toFixed(1)),
                                    profit: Number((((member.actualHours * member.billingRate) - (member.actualHours * member.hourlyCost)) / 1000).toFixed(1)),
                                }))}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} angle={-15} textAnchor="end" height={80} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="actualCost" stroke="#EF4444" strokeWidth={2} name="Actual Cost" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name="Profit" dot={{ r: 5 }} />
                            </ComposedChart>
                        )}
                        {memberChartType === 'area' && (
                            <AreaChart
                                data={members.map((member) => ({
                                    name: member.name,
                                    actualCost: Number(((member.actualHours * member.hourlyCost) / 1000).toFixed(1)),
                                    revenue: Number(((member.actualHours * member.billingRate) / 1000).toFixed(1)),
                                    profit: Number((((member.actualHours * member.billingRate) - (member.actualHours * member.hourlyCost)) / 1000).toFixed(1)),
                                }))}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} angle={-15} textAnchor="end" height={80} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="actualCost" stroke="#EF4444" fill="#FCA5A5" name="Actual Cost" />
                                <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#6EE7B7" name="Revenue" />
                                <Area type="monotone" dataKey="profit" stroke="#3B82F6" fill="#BFDBFE" name="Profit" />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Member Cost Analysis Table */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Detailed Member Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Member</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Role</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Hours</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Hours</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Hourly Cost</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Billing Rate</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Cost</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Revenue</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Profit</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Efficiency</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {members.map((member, index) => {
                                    const actualCost = member.actualHours * member.hourlyCost;
                                    const revenue = member.actualHours * member.billingRate;
                                    const profit = revenue - actualCost;

                                    return (
                                        <tr key={index} className="border-t hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm font-medium whitespace-nowrap">{member.name}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{member.role}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{member.plannedHours}h</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={member.actualHours > member.plannedHours ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                                                    {member.actualHours}h
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${member.hourlyCost}/hr</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${member.billingRate}/hr</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${(actualCost / 1000).toFixed(1)}k</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${(revenue / 1000).toFixed(1)}k</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={`font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    ${(profit / 1000).toFixed(1)}k
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={`font-semibold ${member.efficiency >= 100 ? 'text-green-600' : member.efficiency >= 90 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {member.efficiency}%
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {/* Summary Row */}
                                <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
                                    <td className="py-3 px-4 text-sm" colSpan="6">TOTAL</td>
                                    <td className="py-3 px-4 text-sm whitespace-nowrap">${(totalActualCost / 1000).toFixed(1)}k</td>
                                    <td className="py-3 px-4 text-sm whitespace-nowrap">${(totalRevenue / 1000).toFixed(1)}k</td>
                                    <td className="py-3 px-4 text-sm whitespace-nowrap">
                                        <span className={`${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            ${(totalProfit / 1000).toFixed(1)}k
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm whitespace-nowrap">{avgEfficiency.toFixed(0)}%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Alerts & Recommendations */}
            {(() => {
                const lowEfficiencyMembers = members.filter(m => m.efficiency < 90);
                const overHoursMembers = members.filter(m => m.actualHours > m.plannedHours);
                const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Alerts & Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {lowEfficiencyMembers.length > 0 && (
                                    <div className="border-l-4 border-yellow-500 pl-4">
                                        <p className="font-semibold text-yellow-600">🟡 ATTENTION: {lowEfficiencyMembers.length} member(s) with efficiency below 90%</p>
                                        <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                            {lowEfficiencyMembers.map((m, idx) => (
                                                <li key={idx}><strong>{m.name}:</strong> {m.efficiency}% efficiency - Review workload and task allocation</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {overHoursMembers.length > 0 && (
                                    <div className="border-l-4 border-red-500 pl-4">
                                        <p className="font-semibold text-red-600">🔴 WARNING: {overHoursMembers.length} member(s) exceeded planned hours</p>
                                        <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                            {overHoursMembers.map((m, idx) => (
                                                <li key={idx}><strong>{m.name}:</strong> {m.actualHours - m.plannedHours}h over ({((m.actualHours / m.plannedHours - 1) * 100).toFixed(0)}%)</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {totalProfit >= 0 && (
                                    <div className="border-l-4 border-green-500 pl-4">
                                        <p className="font-semibold text-green-600">✓ POSITIVE: Profit margin of {profitMargin}% indicates healthy team profitability</p>
                                    </div>
                                )}
                                {avgEfficiency >= 100 && (
                                    <div className="border-l-4 border-green-500 pl-4">
                                        <p className="font-semibold text-green-600">✓ EXCELLENT: Average team efficiency of {avgEfficiency.toFixed(0)}% exceeds target</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })()}
        </div>
    );
};

export default MemberCostAnalysisTab;
