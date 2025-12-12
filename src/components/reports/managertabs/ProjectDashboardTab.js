import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

export const ProjectDashboardTab = ({
    evmData,
    spi,
    cpi,
    sv,
    cv,
    bac,
    pv,
    ev,
    ac,
    eac,
    etc,
    vac,
    tcpi,
    totalTasks,
    completedTasks,
    inProgressTasks,
    notStartedTasks,
    teamSize,
    totalHours,
    utilization
}) => {
    return (
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
    );
};

export default ProjectDashboardTab;
