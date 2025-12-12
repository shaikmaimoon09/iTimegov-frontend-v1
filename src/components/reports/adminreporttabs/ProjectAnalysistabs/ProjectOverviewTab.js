import React from 'react';
import {
    ComposedChart, Line, Bar, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

export const ProjectOverviewTab = ({
    projects,
    selectedProjectId,
    projectChartType,
    setProjectChartType
}) => {
    const selectedProject = projects.find(p => p.id === selectedProjectId);
    if (!selectedProject) return null;

    const percentUsed = Math.round((selectedProject.spent / selectedProject.budget) * 100);
    const variance = selectedProject.ev - selectedProject.spent;
    const scheduleVariance = selectedProject.ev - (selectedProject.budget * (selectedProject.progress / 100));
    const costVariance = selectedProject.ev - selectedProject.spent;

    return (
        <div className="space-y-6">
            {/* Project Header */}
            <Card className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">{selectedProject.name}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="opacity-80">Project ID</p>
                            <p className="font-semibold">{selectedProject.id}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Client</p>
                            <p className="font-semibold">{selectedProject.client}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Manager</p>
                            <p className="font-semibold">{selectedProject.manager}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Status</p>
                            <p className="font-semibold">{selectedProject.status.replace('_', ' ')}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="shadow-sm border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <p className="text-sm font-medium text-gray-500">Budget</p>
                        <h3 className="text-2xl font-bold text-gray-900">${(selectedProject.budget / 1000).toFixed(0)}k</h3>
                        <p className="text-xs text-gray-500 mt-1">{percentUsed}% used</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                        <p className="text-sm font-medium text-gray-500">Spent</p>
                        <h3 className="text-2xl font-bold text-gray-900">${(selectedProject.spent / 1000).toFixed(0)}k</h3>
                        <p className="text-xs text-gray-500 mt-1">Actual cost</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <p className="text-sm font-medium text-gray-500">Earned Value</p>
                        <h3 className="text-2xl font-bold text-gray-900">${(selectedProject.ev / 1000).toFixed(0)}k</h3>
                        <p className={`text-xs mt-1 ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {variance >= 0 ? '+' : ''}{(variance / 1000).toFixed(1)}k variance
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <p className="text-sm font-medium text-gray-500">Progress</p>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedProject.progress}%</h3>
                        <p className="text-xs text-gray-500 mt-1">Complete</p>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Schedule Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm">SPI:</span>
                                <span className={`font-semibold ${selectedProject.spi >= 1 ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {selectedProject.spi}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Start Date:</span>
                                <span className="text-sm font-medium">
                                    {new Date(selectedProject.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">End Date:</span>
                                <span className="text-sm font-medium">
                                    {new Date(selectedProject.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Cost Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm">CPI:</span>
                                <span className={`font-semibold ${selectedProject.cpi >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                                    {selectedProject.cpi}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Cost Variance:</span>
                                <span className={`font-semibold ${costVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ${(costVariance / 1000).toFixed(1)}k
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Remaining:</span>
                                <span className="text-sm font-medium">
                                    ${((selectedProject.budget - selectedProject.spent) / 1000).toFixed(0)}k
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-600">Project Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm">Health Score:</span>
                                <span className={`font-semibold ${selectedProject.health >= 80 ? 'text-green-600' : selectedProject.health >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {selectedProject.health}/100
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Team Size:</span>
                                <span className="text-sm font-medium">{selectedProject.team} members</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Status:</span>
                                <span className={`text-xs px-2 py-1 rounded font-medium ${selectedProject.status === 'ON_TRACK' ? 'bg-green-100 text-green-700' :
                                    selectedProject.status === 'AT_RISK' ? 'bg-yellow-100 text-yellow-700' :
                                        selectedProject.status === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {selectedProject.status.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Budget Breakdown Chart with Toggle */}
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Budget Breakdown</CardTitle>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setProjectChartType('bar')}
                                className={`p-2 text-sm rounded border ${projectChartType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Bar Chart"
                            >
                                <Activity className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setProjectChartType('line')}
                                className={`p-2 text-sm rounded border ${projectChartType === 'line' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Line Chart"
                            >
                                <TrendingUp className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setProjectChartType('area')}
                                className={`p-2 text-sm rounded border ${projectChartType === 'area' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                title="Area Chart"
                            >
                                <TrendingDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {projectChartType === 'bar' && (
                            <BarChart
                                data={[
                                    { name: 'Budget', value: selectedProject.budget / 1000 },
                                    { name: 'Spent', value: selectedProject.spent / 1000 },
                                    { name: 'Earned Value', value: selectedProject.ev / 1000 },
                                    { name: 'Remaining', value: (selectedProject.budget - selectedProject.spent) / 1000 },
                                ]}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                        {projectChartType === 'line' && (
                            <ComposedChart
                                data={[
                                    { name: 'Budget', value: selectedProject.budget / 1000 },
                                    { name: 'Spent', value: selectedProject.spent / 1000 },
                                    { name: 'Earned Value', value: selectedProject.ev / 1000 },
                                    { name: 'Remaining', value: (selectedProject.budget - selectedProject.spent) / 1000 },
                                ]}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6 }} />
                            </ComposedChart>
                        )}
                        {projectChartType === 'area' && (
                            <AreaChart
                                data={[
                                    { name: 'Budget', value: selectedProject.budget / 1000 },
                                    { name: 'Spent', value: selectedProject.spent / 1000 },
                                    { name: 'Earned Value', value: selectedProject.ev / 1000 },
                                    { name: 'Remaining', value: (selectedProject.budget - selectedProject.spent) / 1000 },
                                ]}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, '']}
                                />
                                <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#BFDBFE" />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Project Metrics Table */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Project Metrics Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Metric</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Value</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Details</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium">Budget</td>
                                    <td className="py-3 px-4 text-sm">${(selectedProject.budget / 1000).toFixed(0)}k</td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                            Allocated
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{percentUsed}% consumed</td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium">Actual Cost (AC)</td>
                                    <td className="py-3 px-4 text-sm">${(selectedProject.spent / 1000).toFixed(0)}k</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${percentUsed > 90 ? 'bg-red-100 text-red-700' : percentUsed > 75 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                            {percentUsed > 90 ? 'Critical' : percentUsed > 75 ? 'Warning' : 'Good'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">Total spent to date</td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium">Earned Value (EV)</td>
                                    <td className="py-3 px-4 text-sm">${(selectedProject.ev / 1000).toFixed(0)}k</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${variance >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {variance >= 0 ? 'Positive' : 'Negative'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {variance >= 0 ? '+' : ''}{(variance / 1000).toFixed(1)}k variance
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium">Remaining Budget</td>
                                    <td className="py-3 px-4 text-sm">${((selectedProject.budget - selectedProject.spent) / 1000).toFixed(0)}k</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${(selectedProject.budget - selectedProject.spent) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {(selectedProject.budget - selectedProject.spent) > 0 ? 'Available' : 'Overrun'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {Math.round((selectedProject.budget - selectedProject.spent) / selectedProject.budget * 100)}% of budget
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium">Schedule Performance Index (SPI)</td>
                                    <td className="py-3 px-4 text-sm font-semibold">{selectedProject.spi}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${selectedProject.spi >= 1 ? 'bg-green-100 text-green-700' : selectedProject.spi >= 0.9 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                            {selectedProject.spi >= 1 ? 'On Track' : selectedProject.spi >= 0.9 ? 'At Risk' : 'Behind'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {selectedProject.spi >= 1 ? 'Ahead of schedule' : 'Behind schedule'}
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium">Cost Performance Index (CPI)</td>
                                    <td className="py-3 px-4 text-sm font-semibold">{selectedProject.cpi}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${selectedProject.cpi >= 1 ? 'bg-green-100 text-green-700' : selectedProject.cpi >= 0.9 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                            {selectedProject.cpi >= 1 ? 'Under Budget' : selectedProject.cpi >= 0.9 ? 'At Risk' : 'Over Budget'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {selectedProject.cpi >= 1 ? 'Cost efficient' : 'Cost overrun'}
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium">Project Health</td>
                                    <td className="py-3 px-4 text-sm font-semibold">{selectedProject.health}/100</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${selectedProject.health >= 80 ? 'bg-green-100 text-green-700' : selectedProject.health >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                            {selectedProject.health >= 80 ? 'Excellent' : selectedProject.health >= 60 ? 'Fair' : 'Poor'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">Overall project health score</td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium">Progress</td>
                                    <td className="py-3 px-4 text-sm">{selectedProject.progress}%</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: `${selectedProject.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">Work completed</td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium">Team Size</td>
                                    <td className="py-3 px-4 text-sm">{selectedProject.team} members</td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                                            Active
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">Current team allocation</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Project Insights */}
            <Card>
                <CardHeader>
                    <CardTitle>Project Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {selectedProject.cpi >= 1 && (
                            <div className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <p className="text-sm">
                                    Excellent cost efficiency - project is {Math.round((selectedProject.cpi - 1) * 100)}% under budget
                                </p>
                            </div>
                        )}
                        {selectedProject.cpi < 1 && (
                            <div className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">✗</span>
                                <p className="text-sm">
                                    Cost overrun detected - project is {Math.round((1 - selectedProject.cpi) * 100)}% over budget
                                </p>
                            </div>
                        )}
                        {selectedProject.spi >= 1 && (
                            <div className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <p className="text-sm">
                                    Schedule is on track - project is {Math.round((selectedProject.spi - 1) * 100)}% ahead of schedule
                                </p>
                            </div>
                        )}
                        {selectedProject.spi < 1 && (
                            <div className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold">⚠</span>
                                <p className="text-sm">
                                    Schedule delay - project is {Math.round((1 - selectedProject.spi) * 100)}% behind schedule
                                </p>
                            </div>
                        )}
                        {selectedProject.health >= 80 && (
                            <div className="flex items-start gap-2">
                                <span className="text-green-600 font-bold">✓</span>
                                <p className="text-sm">
                                    Project health is excellent ({selectedProject.health}/100)
                                </p>
                            </div>
                        )}
                        {selectedProject.health < 60 && (
                            <div className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">✗</span>
                                <p className="text-sm">
                                    Poor project health ({selectedProject.health}/100) - immediate attention required
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProjectOverviewTab;
