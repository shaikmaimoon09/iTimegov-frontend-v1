import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { TrendingUp, Clock, Activity, CheckCircle } from 'lucide-react';

export const OverviewTab = ({ taskData, kpis, sCurveData }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI Cards */}
                <Card className="shadow-sm border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Productivity Score</p>
                                <h3 className="text-2xl font-bold text-gray-900">{kpis.productivityScore}</h3>
                            </div>
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="text-xs text-green-600 mt-2">+5% from last period</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Hours Efficiency (CPI)</p>
                                <h3 className="text-2xl font-bold text-gray-900">{kpis.hoursEfficiency}</h3>
                            </div>
                            <Clock className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Cost Performance Index</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Avg Health</p>
                                <h3 className="text-2xl font-bold text-gray-900">{kpis.avgHealth}</h3>
                            </div>
                            <Activity className="h-5 w-5 text-purple-500" />
                        </div>
                        <p className="text-xs text-yellow-600 mt-2">{kpis.avgHealth >= 80 ? 'Excellent' : kpis.avgHealth >= 70 ? 'Good' : 'Needs Attention'}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">On-Time Delivery</p>
                                <h3 className="text-2xl font-bold text-gray-900">{kpis.onTimeDelivery}%</h3>
                            </div>
                            <CheckCircle className="h-5 w-5 text-orange-500" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Last 30 Days</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Actual vs Baseline Hours - Bar Chart */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Actual vs Baseline Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={taskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Bar dataKey="actual" fill="#3B82F6" name="Actual Hours" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="baseline" fill="#94A3B8" name="Baseline Hours" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-center text-gray-500 mt-2">Task-003 is performing best with 3h variance.</p>
                    </CardContent>
                </Card>

                {/* SPI & CPI Comparison - Grouped Bar */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Efficiency Metrics (SPI & CPI)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={taskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} domain={[0, 1.5]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Bar dataKey="spi" fill="#10B981" name="SPI (Schedule)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="cpi" fill="#8B5CF6" name="CPI (Cost)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-center text-gray-500 mt-2">SPI &lt; 1.0 indicates schedule slippage (Tasks 002 & 004)</p>
                    </CardContent>
                </Card>

                {/* Task Health Heatmap (Grid Visualization) */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Task Health Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                            {taskData.map((task) => (
                                <div key={task.id} className="relative group overflow-hidden rounded-xl border p-4 hover:shadow-lg transition-all duration-300">
                                    <div className={`absolute top-0 left-0 w-3 h-full ${task.health >= 80 ? 'bg-green-500' : task.health >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                    <div className="pl-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-gray-700">{task.id}</span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${task.health >= 80 ? 'bg-green-100 text-green-700' : task.health >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                {task.health}% Health
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{task.name}</p>
                                        <div className="mt-2 text-xs text-gray-400">
                                            Baseline: {task.baseline}h | Actual: {task.actual}h
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-4">Visual representation of task health scores.</p>
                    </CardContent>
                </Card>

                {/* S-Curve */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Cumulative Progress (S-Curve)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={sCurveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="label" fontSize={12} />
                                <YAxis fontSize={12} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="planned" stroke="#8884d8" fillOpacity={1} fill="url(#colorPlanned)" name="Planned Hours" />
                                <Area type="monotone" dataKey="actual" stroke="#82ca9d" fillOpacity={1} fill="url(#colorActual)" name="Actual Hours" />
                            </AreaChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-center text-gray-500 mt-2">Tracking slightly behind planned hours curve.</p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};
