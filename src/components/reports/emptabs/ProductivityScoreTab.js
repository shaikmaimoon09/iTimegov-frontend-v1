import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

export const ProductivityScoreTab = ({ taskData, kpis, selectedMonth }) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">My Productivity Score</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="opacity-80">Employee</p>
                            <p className="font-semibold">John Doe (EMP-2024-001)</p>
                        </div>
                        <div>
                            <p className="opacity-80">Period</p>
                            <p className="font-semibold">{new Date(selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Overall Score</p>
                            <p className="font-semibold text-2xl">{kpis.productivityScore}/100</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Productivity Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle>Productivity Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Overall Productivity Score</p>
                            <div className="relative inline-block">
                                <svg className="w-32 h-32">
                                    <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        fill="none"
                                        stroke="#10B981"
                                        strokeWidth="8"
                                        strokeDasharray={`${(kpis.productivityScore / 100) * 351.86} 351.86`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 64 64)"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl font-bold">{kpis.productivityScore}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                {kpis.productivityScore >= 80 ? 'Excellent' : kpis.productivityScore >= 70 ? 'Good' : kpis.productivityScore >= 60 ? 'Fair' : 'Needs Improvement'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Hours Efficiency</p>
                            <p className="text-3xl font-bold">{kpis.hoursEfficiency}</p>
                            <p className="text-xs text-gray-500">{Math.round((kpis.hoursEfficiency - 1) * 100)}% above baseline</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Task Completion Rate</p>
                            <p className="text-3xl font-bold">{Math.round(taskData.filter(t => t.percent === 100).length / taskData.length * 100)}%</p>
                            <p className="text-xs text-gray-500">{taskData.filter(t => t.percent === 100).length} of {taskData.length} tasks completed</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">On-Time Delivery Rate</p>
                            <p className="text-3xl font-bold">{kpis.onTimeDelivery}%</p>
                            <p className="text-xs text-gray-500">Last 30 Days</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Breakdown Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Metric</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-700">Current</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-700">Target</th>
                                    <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3">Cost Performance (CPI)</td>
                                    <td className="px-4 py-3 text-right font-semibold">{kpis.hoursEfficiency}</td>
                                    <td className="px-4 py-3 text-right">1.00</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${kpis.hoursEfficiency >= 1 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                                            {kpis.hoursEfficiency >= 1 ? '✓ Exceeds' : '✗ Below'}
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3">Schedule Performance</td>
                                    <td className="px-4 py-3 text-right font-semibold">{kpis.avgSPI}</td>
                                    <td className="px-4 py-3 text-right">0.95</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${kpis.avgSPI >= 0.95 ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'}`}>
                                            {kpis.avgSPI >= 0.95 ? '✓ Meets' : '⚠ Below'}
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3">Quality (Health)</td>
                                    <td className="px-4 py-3 text-right font-semibold">{kpis.avgHealth}</td>
                                    <td className="px-4 py-3 text-right">75.0</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${kpis.avgHealth >= 75 ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'}`}>
                                            {kpis.avgHealth >= 75 ? '✓ Meets' : '⚠ Below'}
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3">Hours Utilization</td>
                                    <td className="px-4 py-3 text-right font-semibold">{kpis.totalActual}h</td>
                                    <td className="px-4 py-3 text-right">{kpis.totalBaseline}h</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="px-2 py-1 rounded text-xs font-medium text-blue-600 bg-blue-100">
                                            → On Track
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
