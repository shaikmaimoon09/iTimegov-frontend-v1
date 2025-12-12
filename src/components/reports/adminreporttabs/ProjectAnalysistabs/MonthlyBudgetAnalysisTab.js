import React from 'react';
import {
    ComposedChart, Line, Bar, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const MonthlyBudgetAnalysisTab = ({
    projects,
    projectMonthlyBudget,
    selectedProjectId,
    monthlyBudgetChartType,
    setMonthlyBudgetChartType
}) => {
    const budgetData = projectMonthlyBudget[selectedProjectId];
    const selectedProject = projects.find(p => p.id === selectedProjectId);

    if (!budgetData) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-gray-600">No monthly budget data available for this project.</p>
                </CardContent>
            </Card>
        );
    }

    const { monthlyBudget, months } = budgetData;
    const totalPV = months.reduce((sum, m) => sum + m.pv, 0);
    const totalAC = months.reduce((sum, m) => sum + m.ac, 0);
    const totalEV = months.reduce((sum, m) => sum + m.ev, 0);

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">Monthly Budget Analysis - {selectedProject?.name}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="opacity-80">Monthly Budget</p>
                            <p className="font-semibold text-2xl">${(monthlyBudget / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                            <p className="opacity-80">Total Planned (PV)</p>
                            <p className="font-semibold text-2xl">${(totalPV / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                            <p className="opacity-80">Total Actual (AC)</p>
                            <p className="font-semibold text-2xl">${(totalAC / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                            <p className="opacity-80">Total Earned (EV)</p>
                            <p className="font-semibold text-2xl">${(totalEV / 1000).toFixed(1)}k</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Monthly Budget Visualization */}
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Monthly Budget Visualization</CardTitle>
                            <p className="text-sm text-gray-600">PV, AC, and EV Trends</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMonthlyBudgetChartType('bar')}
                                className={`p-2 text-sm rounded border ${monthlyBudgetChartType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Bar Chart"
                            >
                                <Activity className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setMonthlyBudgetChartType('line')}
                                className={`p-2 text-sm rounded border ${monthlyBudgetChartType === 'line' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Line Chart"
                            >
                                <TrendingUp className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setMonthlyBudgetChartType('area')}
                                className={`p-2 text-sm rounded border ${monthlyBudgetChartType === 'area' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Area Chart"
                            >
                                <TrendingDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {monthlyBudgetChartType === 'bar' && (
                            <BarChart
                                data={months.map(m => ({
                                    month: m.month,
                                    pv: Number((m.pv / 1000).toFixed(1)),
                                    ac: Number((m.ac / 1000).toFixed(1)),
                                    ev: Number((m.ev / 1000).toFixed(1)),
                                }))}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Legend />
                                <Bar dataKey="pv" fill="#F59E0B" name="Planned Budget (PV)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="ac" fill="#EF4444" name="Actual Cost (AC)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="ev" fill="#10B981" name="Earned Value (EV)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                        {monthlyBudgetChartType === 'line' && (
                            <ComposedChart
                                data={months.map(m => ({
                                    month: m.month,
                                    pv: Number((m.pv / 1000).toFixed(1)),
                                    ac: Number((m.ac / 1000).toFixed(1)),
                                    ev: Number((m.ev / 1000).toFixed(1)),
                                }))}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#F59E0B" strokeWidth={2} name="Planned Budget (PV)" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="ac" stroke="#EF4444" strokeWidth={2} name="Actual Cost (AC)" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="ev" stroke="#10B981" strokeWidth={2} name="Earned Value (EV)" dot={{ r: 5 }} />
                            </ComposedChart>
                        )}
                        {monthlyBudgetChartType === 'area' && (
                            <AreaChart
                                data={months.map(m => ({
                                    month: m.month,
                                    pv: Number((m.pv / 1000).toFixed(1)),
                                    ac: Number((m.ac / 1000).toFixed(1)),
                                    ev: Number((m.ev / 1000).toFixed(1)),
                                }))}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="pv" stroke="#F59E0B" fill="#FCD34D" name="Planned Budget (PV)" />
                                <Area type="monotone" dataKey="ac" stroke="#EF4444" fill="#FCA5A5" name="Actual Cost (AC)" />
                                <Area type="monotone" dataKey="ev" stroke="#10B981" fill="#6EE7B7" name="Earned Value (EV)" />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Monthly Budget Tracking Table */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Monthly Budget Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Month</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Hours</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Budget (PV)</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Hours</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Cost (AC)</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Earned Value (EV)</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Schedule Variance (SV)</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Cost Variance (CV)</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">SPI</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">CPI</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Milestones</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {months.map((month) => {
                                    const sv = month.ev - month.pv;
                                    const cv = month.ev - month.ac;
                                    const spi = Number((month.ev / month.pv).toFixed(2));
                                    const cpi = Number((month.ev / month.ac).toFixed(2));
                                    const status = spi >= 1 && cpi >= 1 ? 'on-track' : spi < 0.8 || cpi < 0.8 ? 'at-risk' : 'warning';

                                    return (
                                        <tr key={month.month} className="border-t hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-blue-600 font-medium whitespace-nowrap">{month.month}</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{month.plannedHours}h</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${(month.pv / 1000).toFixed(1)}k</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">{month.actualHours}h</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${(month.ac / 1000).toFixed(1)}k</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">${(month.ev / 1000).toFixed(1)}k</td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={`font-semibold ${sv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {sv >= 0 ? '+' : ''}${(sv / 1000).toFixed(1)}k
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={`font-semibold ${cv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {cv >= 0 ? '+' : ''}${(cv / 1000).toFixed(1)}k
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={`font-semibold ${spi >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {spi}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                <span className={`font-semibold ${cpi >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {cpi}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                <div className="flex flex-wrap gap-1">
                                                    {month.milestones.length > 0 ? (
                                                        month.milestones.map((milestone, idx) => (
                                                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                                                                {milestone}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                {status === 'on-track' && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-600 text-white whitespace-nowrap">
                                                        On Track
                                                    </span>
                                                )}
                                                {status === 'warning' && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-600 text-white whitespace-nowrap">
                                                        Warning
                                                    </span>
                                                )}
                                                {status === 'at-risk' && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-600 text-white whitespace-nowrap">
                                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                                        At Risk
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

            {/* Spending Analysis */}
            <Card>
                <CardHeader>
                    <CardTitle>Spending Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    {(() => {
                        const avgDailyBurn = totalAC / (months.length * 30);
                        const targetDailyBurn = monthlyBudget / 30;
                        const projectedMonthlySpend = avgDailyBurn * 30;

                        return (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <p className="text-sm text-gray-600">Average Daily Burn</p>
                                    <p className="text-xl font-bold">${avgDailyBurn.toFixed(0)}/day</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Target Daily Burn</p>
                                    <p className="text-xl font-bold">${targetDailyBurn.toFixed(0)}/day</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Burn Rate Status</p>
                                    <p className={`text-xl font-bold ${avgDailyBurn > targetDailyBurn ? 'text-yellow-600' : 'text-green-600'}`}>
                                        {avgDailyBurn > targetDailyBurn ? '🟡' : '🟢'} {Math.round(avgDailyBurn / targetDailyBurn * 100)}% of target
                                    </p>
                                </div>
                            </div>
                        );
                    })()}
                </CardContent>
            </Card>

            {/* Alerts & Recommendations */}
            {(() => {
                const avgCPI = months.reduce((sum, m) => sum + (m.ev / m.ac), 0) / months.length;
                const avgSPI = months.reduce((sum, m) => sum + (m.ev / m.pv), 0) / months.length;
                const overBudgetMonths = months.filter(m => m.ac > m.pv);

                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Alerts & Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {overBudgetMonths.length > 0 && (
                                    <div className="border-l-4 border-yellow-500 pl-4">
                                        <p className="font-semibold text-yellow-600">🟡 ATTENTION: {overBudgetMonths.length} month(s) over budget</p>
                                        <p className="text-sm text-gray-600 mt-1">Review spending patterns and adjust resource allocation</p>
                                    </div>
                                )}
                                {avgCPI >= 1 && (
                                    <div className="border-l-4 border-green-500 pl-4">
                                        <p className="font-semibold text-green-600">✓ POSITIVE: Average CPI of {avgCPI.toFixed(2)} indicates efficient spending</p>
                                    </div>
                                )}
                                {avgSPI < 0.9 && (
                                    <div className="border-l-4 border-red-500 pl-4">
                                        <p className="font-semibold text-red-600">🔴 WARNING: Schedule performance below target (SPI: {avgSPI.toFixed(2)})</p>
                                        <p className="text-sm text-gray-600 mt-1"><strong>Action:</strong> Review task priorities and resource allocation</p>
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

export default MonthlyBudgetAnalysisTab;
