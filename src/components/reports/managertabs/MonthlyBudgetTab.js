import React from 'react';
import {
    BarChart, Bar, ComposedChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react';

export const MonthlyBudgetTab = ({
    selectedMonth,
    monthlyBudget,
    mtdSpent,
    remaining,
    daysElapsed,
    daysInMonth,
    avgDailyBurn,
    targetDailyBurn,
    projectedMonthlySpend,
    budgetChartType,
    setBudgetChartType,
    cpi
}) => {
    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">Monthly Budget Report</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="opacity-80">Month</p>
                            <p className="font-semibold">{new Date(selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Report Date</p>
                            <p className="font-semibold">Day {daysElapsed} of {daysInMonth}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Budget Health</p>
                            <p className="font-semibold">🟢 HEALTHY</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-gray-600">Allocated Budget</p>
                        <p className="text-2xl font-bold">${(monthlyBudget / 1000).toFixed(0)}k</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-gray-600">Actual Spent (MTD)</p>
                        <p className="text-2xl font-bold">${(mtdSpent / 1000).toFixed(1)}k</p>
                        <p className="text-xs text-gray-500">{Math.round(mtdSpent / monthlyBudget * 100)}% consumed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-gray-600">Remaining Budget</p>
                        <p className="text-2xl font-bold text-green-600">${(remaining / 1000).toFixed(1)}k</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-gray-600">Days Elapsed</p>
                        <p className="text-2xl font-bold">{daysElapsed} days</p>
                        <p className="text-xs text-gray-500">{Math.round(daysElapsed / daysInMonth * 100)}% of month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Budget Visualization with Toggle */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Monthly Budget Performance</CardTitle>
                            <p className="text-sm text-gray-600">Planned Budget (PV) vs Actual Cost (AC) vs Earned Value (EV)</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setBudgetChartType('bar')}
                                className={`p-2 text-sm rounded border ${budgetChartType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Bar Chart"
                            >
                                <Activity className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setBudgetChartType('line')}
                                className={`p-2 text-sm rounded border ${budgetChartType === 'line' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Line Chart"
                            >
                                <TrendingUp className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setBudgetChartType('area')}
                                className={`p-2 text-sm rounded border ${budgetChartType === 'area' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Area Chart"
                            >
                                <TrendingDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {budgetChartType === 'bar' && (
                            <BarChart
                                data={(() => {
                                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                                    return months.map((month, index) => {
                                        const plannedHours = 160 + (index * 20);
                                        const actualHours = plannedHours * 0.95;
                                        const pv = (monthlyBudget / 12) * (index + 1);
                                        const ac = pv * 0.95;
                                        const ev = pv * 0.92;

                                        return {
                                            month,
                                            plannedHours: Number(plannedHours.toFixed(0)),
                                            actualHours: Number(actualHours.toFixed(0)),
                                            plannedBudget: Number((pv / 1000).toFixed(1)),
                                            actualCost: Number((ac / 1000).toFixed(1)),
                                            earnedValue: Number((ev / 1000).toFixed(1))
                                        };
                                    });
                                })()}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => {
                                        if (name.includes('Hours')) return [`${value}h`, name];
                                        return [`$${value}k`, name];
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="plannedHours" fill="#3B82F6" name="Planned Hours" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="actualHours" fill="#60A5FA" name="Actual Hours" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="plannedBudget" fill="#F59E0B" name="Planned Budget (PV)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="actualCost" fill="#EF4444" name="Actual Cost (AC)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="earnedValue" fill="#10B981" name="Earned Value (EV)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                        {budgetChartType === 'line' && (
                            <ComposedChart
                                data={(() => {
                                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                                    return months.map((month, index) => {
                                        const plannedHours = 160 + (index * 20);
                                        const actualHours = plannedHours * 0.95;
                                        const pv = (monthlyBudget / 12) * (index + 1);
                                        const ac = pv * 0.95;
                                        const ev = pv * 0.92;

                                        return {
                                            month,
                                            plannedHours: Number(plannedHours.toFixed(0)),
                                            actualHours: Number(actualHours.toFixed(0)),
                                            plannedBudget: Number((pv / 1000).toFixed(1)),
                                            actualCost: Number((ac / 1000).toFixed(1)),
                                            earnedValue: Number((ev / 1000).toFixed(1))
                                        };
                                    });
                                })()}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => {
                                        if (name.includes('Hours')) return [`${value}h`, name];
                                        return [`$${value}k`, name];
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="plannedHours" stroke="#3B82F6" strokeWidth={2} name="Planned Hours" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="actualHours" stroke="#60A5FA" strokeWidth={2} strokeDasharray="5 5" name="Actual Hours" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="plannedBudget" stroke="#F59E0B" strokeWidth={2} name="Planned Budget (PV)" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="actualCost" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Actual Cost (AC)" dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="earnedValue" stroke="#10B981" strokeWidth={2} name="Earned Value (EV)" dot={{ r: 5 }} />
                            </ComposedChart>
                        )}
                        {budgetChartType === 'area' && (
                            <AreaChart
                                data={(() => {
                                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                                    return months.map((month, index) => {
                                        const plannedHours = 160 + (index * 20);
                                        const actualHours = plannedHours * 0.95;
                                        const pv = (monthlyBudget / 12) * (index + 1);
                                        const ac = pv * 0.95;
                                        const ev = pv * 0.92;

                                        return {
                                            month,
                                            plannedHours: Number(plannedHours.toFixed(0)),
                                            actualHours: Number(actualHours.toFixed(0)),
                                            plannedBudget: Number((pv / 1000).toFixed(1)),
                                            actualCost: Number((ac / 1000).toFixed(1)),
                                            earnedValue: Number((ev / 1000).toFixed(1))
                                        };
                                    });
                                })()}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => {
                                        if (name.includes('Hours')) return [`${value}h`, name];
                                        return [`$${value}k`, name];
                                    }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="plannedHours" stroke="#3B82F6" fill="#BFDBFE" name="Planned Hours" />
                                <Area type="monotone" dataKey="actualHours" stroke="#60A5FA" fill="#DBEAFE" name="Actual Hours" />
                                <Area type="monotone" dataKey="plannedBudget" stroke="#F59E0B" fill="#FCD34D" name="Planned Budget (PV)" />
                                <Area type="monotone" dataKey="actualCost" stroke="#EF4444" fill="#FCA5A5" name="Actual Cost (AC)" />
                                <Area type="monotone" dataKey="earnedValue" stroke="#10B981" fill="#6EE7B7" name="Earned Value (EV)" />
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
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Milestones Included</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {(() => {
                                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
                                    const milestones = ['Milestone 1', 'Milestone 2', 'Milestone 3', 'Milestone 4'];

                                    return months.map((month, index) => {
                                        const plannedHours = 160 + (index * 20);
                                        const actualHours = plannedHours * 0.95;
                                        const pv = (monthlyBudget / 12) * (index + 1);
                                        const ac = pv * 0.95;
                                        const ev = pv * 0.92;
                                        const sv = ev - pv;
                                        const cv = ev - ac;
                                        const spi = Number((ev / pv).toFixed(2));
                                        const cpi = Number((ev / ac).toFixed(2));
                                        const status = spi >= 1 && cpi >= 1 ? 'on-track' : spi < 0.8 || cpi < 0.8 ? 'at-risk' : 'warning';

                                        // Assign milestones to months (example: 2 milestones per month for first 4 months)
                                        const monthMilestones = index < 4 ? [milestones[index]] : [];

                                        return (
                                            <tr key={month} className="border-t hover:bg-gray-50">
                                                <td className="py-3 px-4 text-sm text-blue-600 font-medium whitespace-nowrap">{month}</td>
                                                <td className="py-3 px-4 text-sm whitespace-nowrap">{plannedHours.toFixed(0)}h</td>
                                                <td className="py-3 px-4 text-sm whitespace-nowrap">${pv.toFixed(0)}</td>
                                                <td className="py-3 px-4 text-sm whitespace-nowrap">{actualHours.toFixed(0)}h</td>
                                                <td className="py-3 px-4 text-sm whitespace-nowrap">${ac.toFixed(0)}</td>
                                                <td className="py-3 px-4 text-sm whitespace-nowrap">${ev.toFixed(0)}</td>
                                                <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                    <span className={sv >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                                        {sv >= 0 ? '+' : ''}${sv.toFixed(0)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                    <span className={cv >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                                        {cv >= 0 ? '+' : ''}${cv.toFixed(0)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                    <span className={spi >= 1 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                                        {spi}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                    <span className={cpi >= 1 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                                        {cpi}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm">
                                                    <div className="flex flex-wrap gap-1">
                                                        {monthMilestones.length > 0 ? (
                                                            monthMilestones.map((milestone, idx) => (
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
                                    });
                                })()}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-600">Average Daily Burn</p>
                            <p className="text-xl font-bold">${avgDailyBurn.toLocaleString()}/day</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Target Daily Burn</p>
                            <p className="text-xl font-bold">${targetDailyBurn.toLocaleString()}/day</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Burn Rate Status</p>
                            <p className="text-xl font-bold text-yellow-600">
                                🟡 {Math.round(avgDailyBurn / targetDailyBurn * 100)}% of target
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-600">Projected Monthly Spend</p>
                            <p className="text-xl font-bold">${(projectedMonthlySpend / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Projected Overage</p>
                            <p className={`text-xl font-bold ${projectedMonthlySpend > monthlyBudget ? 'text-red-600' : 'text-green-600'}`}>
                                ${((projectedMonthlySpend - monthlyBudget) / 1000).toFixed(1)}k ({Math.round((projectedMonthlySpend - monthlyBudget) / monthlyBudget * 100)}%)
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Alerts & Recommendations */}
            <Card>
                <CardHeader>
                    <CardTitle>Alerts & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="border-l-4 border-yellow-500 pl-4">
                            <p className="font-semibold text-yellow-600">🟡 ATTENTION: Burn rate 136% higher than planned</p>
                            <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                <li><strong>Reason:</strong> Upfront software license purchases ($4,500)</li>
                                <li><strong>Impact:</strong> Expected to normalize in weeks 2-3</li>
                            </ul>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <p className="font-semibold text-green-600">✓ POSITIVE: CPI of {cpi} indicates efficient spending</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                            <p className="font-semibold text-blue-600">📊 WATCH: Monitor burn rate next 7 days</p>
                            <p className="text-sm text-gray-600 mt-1"><strong>Action:</strong> Review if daily burn stays above $3,500</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MonthlyBudgetTab;
