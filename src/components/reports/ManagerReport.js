import React, { useState } from 'react';
import {
    ComposedChart, Line, Bar, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, DollarSign, Calendar, Users, Activity } from 'lucide-react';
import { getManagerTaskMatrix, getManagerEVMData } from '../../data/reportSampleData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const STATUS_COLORS = {
    'Normal': '#10B981',
    'Warning': '#F59E0B',
    'Critical': '#EF4444'
};

export const ManagerReport = ({ frequency = 'daily', selectedMonth = new Date().toISOString().slice(0, 7) }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [chartType, setChartType] = useState('bar');
    const [budgetChartType, setBudgetChartType] = useState('bar');
    const [varianceChartType, setVarianceChartType] = useState('bar');


    // Get dynamic data
    const evmData = getManagerEVMData(frequency, selectedMonth);
    const taskMatrix = getManagerTaskMatrix(frequency, selectedMonth);

    // Calculate project metrics
    const latestEVM = evmData[evmData.length - 1];
    const pv = latestEVM.pv;
    const ev = latestEVM.ev;
    const ac = latestEVM.ac;
    const spi = Number((ev / pv).toFixed(2));
    const cpi = Number((ev / ac).toFixed(2));
    const sv = ev - pv;
    const cv = ev - ac;

    const bac = 450000;
    const eac = Math.round(bac / cpi);
    const etc = eac - ac;
    const vac = bac - eac;
    const tcpi = Number(((bac - ev) / (bac - ac)).toFixed(2));

    const totalTasks = 45;
    const completedTasks = 28;
    const inProgressTasks = 14;
    const notStartedTasks = 3;
    const teamSize = 12;
    const totalHours = 3636;
    const baselineHours = 3750;
    const utilization = Math.round((totalHours / baselineHours) * 100);

    // Monthly budget data
    const monthlyBudget = 85000;
    const mtdSpent = 45200;
    const remaining = monthlyBudget - mtdSpent;
    const daysElapsed = 7;
    const daysInMonth = 31;
    const avgDailyBurn = Math.round(mtdSpent / daysElapsed);
    const targetDailyBurn = Math.round(monthlyBudget / daysInMonth);
    const projectedMonthlySpend = avgDailyBurn * daysInMonth;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Normal': return 'text-green-600 bg-green-100';
            case 'Warning': return 'text-yellow-600 bg-yellow-100';
            case 'Critical': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Normal': return <CheckCircle className="h-4 w-4" />;
            case 'Warning': return <AlertTriangle className="h-4 w-4" />;
            case 'Critical': return <AlertTriangle className="h-4 w-4" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Section Tabs */}
            <div className="flex gap-2 border-b">
                <button
                    onClick={() => setActiveSection('dashboard')}
                    className={`px-4 py-2 font-medium transition-colors ${activeSection === 'dashboard'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Project Dashboard
                </button>
                <button
                    onClick={() => setActiveSection('tasks')}
                    className={`px-4 py-2 font-medium transition-colors ${activeSection === 'tasks'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Task Status Matrix
                </button>
                <button
                    onClick={() => setActiveSection('budget')}
                    className={`px-4 py-2 font-medium transition-colors ${activeSection === 'budget'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Monthly Budget
                </button>
                <button
                    onClick={() => setActiveSection('variance')}
                    className={`px-4 py-2 font-medium transition-colors ${activeSection === 'variance'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Member Status Matrix
                </button>
            </div>

            {/* PROJECT DASHBOARD SECTION */}
            {activeSection === 'dashboard' && (
                <div className="space-y-6">
                    {/* Project Header */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-bold mb-2">Digital Transformation Initiative</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="opacity-80">Project ID</p>
                                    <p className="font-semibold">PROJ-2025-001</p>
                                </div>
                                <div>
                                    <p className="opacity-80">Manager</p>
                                    <p className="font-semibold">Sarah Johnson</p>
                                </div>
                                <div>
                                    <p className="opacity-80">Status</p>
                                    <p className="font-semibold">IN_PROGRESS</p>
                                </div>
                                <div>
                                    <p className="opacity-80">Health Score</p>
                                    <p className="font-semibold">82/100</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-gray-600">Project Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Project Health:</span>
                                        <span className="font-semibold text-green-600">GOOD</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Risk Level:</span>
                                        <span className="font-semibold text-yellow-600">MEDIUM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Alert Level:</span>
                                        <span className="font-semibold text-yellow-600">WARNING</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-gray-600">Schedule Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">SPI:</span>
                                        <span className={`font-semibold ${spi >= 1 ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {spi} {spi >= 1 ? '🟢' : '🟡'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Schedule Variance:</span>
                                        <span className={`font-semibold ${sv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            ${(sv / 1000).toFixed(1)}k
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Forecast End:</span>
                                        <span className="text-sm font-medium">Mar 7, 2026 (+7d)</span>
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
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">CPI:</span>
                                        <span className={`font-semibold ${cpi >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                                            {cpi} {cpi >= 1 ? '🟢' : '🔴'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Cost Variance:</span>
                                        <span className={`font-semibold ${cv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            ${(cv / 1000).toFixed(1)}k
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Budget Status:</span>
                                        <span className="text-sm font-medium text-green-600">UNDER_BUDGET</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Progress Metrics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">BAC</p>
                                    <p className="text-xl font-bold">${(bac / 1000).toFixed(0)}k</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Planned Value (PV)</p>
                                    <p className="text-xl font-bold">${(pv / 1000).toFixed(0)}k</p>
                                    <p className="text-xs text-gray-500">70%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Earned Value (EV)</p>
                                    <p className="text-xl font-bold">${(ev / 1000).toFixed(0)}k</p>
                                    <p className="text-xs text-gray-500">67%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Actual Cost (AC)</p>
                                    <p className="text-xl font-bold">${(ac / 1000).toFixed(0)}k</p>
                                    <p className="text-xs text-gray-500">65%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Forecasts */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Forecasts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">EAC</p>
                                    <p className="text-xl font-bold">${(eac / 1000).toFixed(0)}k</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">ETC</p>
                                    <p className="text-xl font-bold">${(etc / 1000).toFixed(0)}k</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">VAC</p>
                                    <p className={`text-xl font-bold ${vac >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {vac >= 0 ? '+' : ''}${(vac / 1000).toFixed(1)}k
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">TCPI</p>
                                    <p className="text-xl font-bold">{tcpi}</p>
                                    <p className="text-xs text-gray-500">{tcpi <= 1 ? 'Achievable' : 'Challenging'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Team & Tasks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Team & Tasks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Total Tasks:</span>
                                        <span className="font-semibold">{totalTasks}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Completed:</span>
                                        <span className="font-semibold text-green-600">{completedTasks} ({Math.round(completedTasks / totalTasks * 100)}%)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">In Progress:</span>
                                        <span className="font-semibold text-blue-600">{inProgressTasks} ({Math.round(inProgressTasks / totalTasks * 100)}%)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Not Started:</span>
                                        <span className="font-semibold text-gray-600">{notStartedTasks} ({Math.round(notStartedTasks / totalTasks * 100)}%)</span>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between">
                                        <span className="text-sm">Team Size:</span>
                                        <span className="font-semibold">{teamSize} members</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Total Hours Logged:</span>
                                        <span className="font-semibold">{totalHours.toLocaleString()}h</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Utilization:</span>
                                        <span className="font-semibold">{utilization}%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Key Indicators</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">🟢</span>
                                        <div>
                                            <p className="font-medium">Cost</p>
                                            <p className="text-sm text-gray-600">Under budget by $17.3K - excellent cost control</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-yellow-600 font-bold">🟡</span>
                                        <div>
                                            <p className="font-medium">Schedule</p>
                                            <p className="text-sm text-gray-600">4% behind - needs attention</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">🟢</span>
                                        <div>
                                            <p className="font-medium">Quality</p>
                                            <p className="text-sm text-gray-600">Health score 82/100 - good</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-yellow-600 font-bold">⚠</span>
                                        <div>
                                            <p className="font-medium">Risk</p>
                                            <p className="text-sm text-gray-600">4 tasks at risk, 1 critical</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* EVM Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Earned Value Management (EVM) Chart</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={evmData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#8884d8" name="Planned Value (PV)" />
                                    <Line type="monotone" dataKey="ev" stroke="#82ca9d" strokeWidth={2} name="Earned Value (EV)" />
                                    <Line type="monotone" dataKey="ac" stroke="#ff7300" strokeWidth={2} name="Actual Cost (AC)" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* TASK STATUS MATRIX SECTION */}
            {
                activeSection === 'tasks' && (
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
                )
            }

            {/* MONTHLY BUDGET SECTION */}
            {
                activeSection === 'budget' && (
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
                )
            }

            {/* MEMBER STATUS MATRIX SECTION */}
            {
                activeSection === 'variance' && (
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
                )
            }
        </div >
    );
};
