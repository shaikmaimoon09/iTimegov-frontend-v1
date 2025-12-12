import React from 'react';
import {
    ComposedChart, Line, Bar, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, DollarSign, Calendar, Activity } from 'lucide-react';

const STATUS_COLORS = {
    'ON_TRACK': '#10B981',
    'AT_RISK': '#F59E0B',
    'CRITICAL': '#EF4444',
    'COMPLETED': '#3B82F6'
};

export const ProjectsOverviewTab = ({
    projects,
    totalBudget,
    totalSpent,
    avgHealth,
    avgSPI,
    avgCPI,
    chartType,
    setChartType
}) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">Portfolio Overview</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="opacity-80">Total Projects</p>
                            <p className="font-semibold text-2xl">{projects.length}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Active Projects</p>
                            <p className="font-semibold text-2xl">{projects.filter(p => p.status !== 'COMPLETED').length}</p>
                        </div>
                        <div>
                            <p className="opacity-80">Total Budget</p>
                            <p className="font-semibold text-2xl">${(totalBudget / 1000000).toFixed(1)}M</p>
                        </div>
                        <div>
                            <p className="opacity-80">Portfolio Health</p>
                            <p className="font-semibold text-2xl">{avgHealth}/100</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="shadow-sm border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Budget</p>
                                <h3 className="text-2xl font-bold text-gray-900">${(totalBudget / 1000000).toFixed(2)}M</h3>
                            </div>
                            <DollarSign className="h-5 w-5 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                                <h3 className="text-2xl font-bold text-gray-900">${(totalSpent / 1000000).toFixed(2)}M</h3>
                                <p className="text-xs text-gray-500 mt-1">{Math.round(totalSpent / totalBudget * 100)}% of budget</p>
                            </div>
                            <Activity className="h-5 w-5 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Avg CPI</p>
                                <h3 className="text-2xl font-bold text-gray-900">{avgCPI}</h3>
                                <p className="text-xs text-green-600 mt-1">{avgCPI >= 1 ? 'Under budget' : 'Over budget'}</p>
                            </div>
                            <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Avg SPI</p>
                                <h3 className="text-2xl font-bold text-gray-900">{avgSPI}</h3>
                                <p className="text-xs text-yellow-600 mt-1">{avgSPI >= 1 ? 'Ahead' : 'Behind'} schedule</p>
                            </div>
                            <Calendar className="h-5 w-5 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Visualizations */}
            <div className="space-y-6">
                {/* Budget vs Spent Chart - Full Width */}
                <Card className="shadow-md">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Budget vs Actual Spending</CardTitle>
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
                                <BarChart data={projects} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="id" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`$${(value / 1000).toFixed(0)}k`, '']}
                                    />
                                    <Legend />
                                    <Bar dataKey="budget" fill="#3B82F6" name="Budget" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="spent" fill="#F59E0B" name="Spent" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="ev" fill="#10B981" name="Earned Value" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            )}
                            {chartType === 'line' && (
                                <ComposedChart data={projects} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="id" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`$${(value / 1000).toFixed(0)}k`, '']}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="budget" stroke="#3B82F6" strokeWidth={2} name="Budget" dot={{ r: 5 }} />
                                    <Line type="monotone" dataKey="spent" stroke="#F59E0B" strokeWidth={2} name="Spent" dot={{ r: 5 }} />
                                    <Line type="monotone" dataKey="ev" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Earned Value" dot={{ r: 5 }} />
                                </ComposedChart>
                            )}
                            {chartType === 'area' && (
                                <AreaChart data={projects} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="id" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`$${(value / 1000).toFixed(0)}k`, '']}
                                    />
                                    <Legend />
                                    <Area type="monotone" dataKey="budget" stroke="#3B82F6" fill="#BFDBFE" name="Budget" />
                                    <Area type="monotone" dataKey="spent" stroke="#F59E0B" fill="#FCD34D" name="Spent" />
                                    <Area type="monotone" dataKey="ev" stroke="#10B981" fill="#6EE7B7" name="Earned Value" />
                                </AreaChart>
                            )}
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

            </div>

            {/* Projects Table */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>All Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Project ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Project Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Client</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Manager</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Start Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">End Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Budget</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Spent</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">EV</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Progress</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Health</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">SPI</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">CPI</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Team</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-blue-600 font-medium whitespace-nowrap">{project.id}</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{project.name}</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{project.client}</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{project.manager}</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">${(project.budget / 1000).toFixed(0)}k</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">${(project.spent / 1000).toFixed(0)}k</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">${(project.ev / 1000).toFixed(0)}k</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full"
                                                        style={{ width: `${project.progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs">{project.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">
                                            <span className={`font-semibold ${project.health >= 80 ? 'text-green-600' : project.health >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {project.health}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">
                                            <span className={`font-semibold ${project.spi >= 1 ? 'text-green-600' : project.spi >= 0.9 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {project.spi}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">
                                            <span className={`font-semibold ${project.cpi >= 1 ? 'text-green-600' : project.cpi >= 0.9 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {project.cpi}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{project.team}</td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${project.status === 'ON_TRACK' ? 'bg-green-100 text-green-700' :
                                                project.status === 'AT_RISK' ? 'bg-yellow-100 text-yellow-700' :
                                                    project.status === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                {project.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Budget Health and Critical Alerts - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget Health by Project */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Budget Health by Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 #F7FAFC' }}>
                            {projects.filter(p => p.status !== 'COMPLETED').map((project) => {
                                const percentUsed = Math.round((project.spent / project.budget) * 100);
                                const variance = project.ev - project.spent;
                                const forecastVariance = (project.budget - project.spent) - (project.budget - project.ev);
                                const isOverBudget = percentUsed > 90;
                                const isWarning = percentUsed > 80 && percentUsed <= 90;
                                const isGood = percentUsed <= 80;

                                return (
                                    <div key={project.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <span className="text-2xl">
                                            {isGood ? '🟢' : isWarning ? '🟡' : '🔴'}
                                        </span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">{project.name}:</p>
                                            <p className="text-sm text-gray-700 mt-1">
                                                {percentUsed}% used, forecasting {variance >= 0 ? `$${(variance / 1000).toFixed(1)}K savings` : `$${Math.abs(variance / 1000).toFixed(1)}K overrun (${Math.abs(Math.round((variance / project.budget) * 100))}%)`}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Critical Alerts */}
                <Card className="shadow-md border-l-4 border-l-red-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            Critical Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 #F7FAFC' }}>
                            {/* Budget Alerts */}
                            {projects
                                .filter(p => (p.spent / p.budget) > 0.9 && p.status !== 'COMPLETED')
                                .map((project) => {
                                    const percentUsed = Math.round((project.spent / project.budget) * 100);
                                    return (
                                        <div key={`budget-${project.id}`} className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                                            <p className="font-semibold text-red-800">
                                                🔴 BUDGET ALERT: {project.name} approaching budget limit - {percentUsed}% consumed
                                            </p>
                                            <p className="text-sm text-gray-700 mt-2">
                                                <strong>Action:</strong> Review scope and authorize budget increase if needed
                                            </p>
                                        </div>
                                    );
                                })}

                            {/* Schedule Alerts */}
                            {projects
                                .filter(p => p.spi < 0.85 && p.status !== 'COMPLETED')
                                .map((project) => {
                                    return (
                                        <div key={`schedule-${project.id}`} className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
                                            <p className="font-semibold text-yellow-800">
                                                🟡 SCHEDULE ALERT: {project.name} is significantly behind schedule (SPI: {project.spi})
                                            </p>
                                            <p className="text-sm text-gray-700 mt-2">
                                                <strong>Action:</strong> Review project timeline and resource allocation
                                            </p>
                                        </div>
                                    );
                                })}

                            {/* Health Alerts */}
                            {projects
                                .filter(p => p.health < 60 && p.status !== 'COMPLETED')
                                .map((project) => {
                                    return (
                                        <div key={`health-${project.id}`} className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
                                            <p className="font-semibold text-orange-800">
                                                🟠 HEALTH ALERT: {project.name} has poor health score ({project.health}/100)
                                            </p>
                                            <p className="text-sm text-gray-700 mt-2">
                                                <strong>Action:</strong> Conduct immediate project health assessment and address critical issues
                                            </p>
                                        </div>
                                    );
                                })}

                            {/* Critical Status Projects */}
                            {projects
                                .filter(p => p.status === 'CRITICAL')
                                .map((project) => {
                                    return (
                                        <div key={`critical-${project.id}`} className="border-l-4 border-red-600 pl-4 py-2 bg-red-100">
                                            <p className="font-semibold text-red-900">
                                                🚨 CRITICAL: {project.name} requires immediate attention
                                            </p>
                                            <p className="text-sm text-gray-700 mt-2">
                                                <strong>Issues:</strong> SPI: {project.spi} (Behind Schedule), CPI: {project.cpi} (Over Budget), Health: {project.health}/100
                                            </p>
                                            <p className="text-sm text-gray-700 mt-1">
                                                <strong>Action:</strong> Executive intervention required - schedule emergency project review
                                            </p>
                                        </div>
                                    );
                                })}

                            {/* No Alerts Message */}
                            {projects.filter(p =>
                                ((p.spent / p.budget) > 0.9 || p.spi < 0.85 || p.health < 60 || p.status === 'CRITICAL')
                                && p.status !== 'COMPLETED'
                            ).length === 0 && (
                                    <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                                        <p className="font-semibold text-green-800 flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5" />
                                            All projects are healthy - No critical alerts at this time
                                        </p>
                                    </div>
                                )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
