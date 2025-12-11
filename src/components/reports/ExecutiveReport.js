import React from 'react';
import {
    ComposedChart, Line, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Area, AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowUp, TrendingUp, ShieldCheck, Target } from 'lucide-react';
import {
    executiveBenchmarkData,
    executivePortfolioMetrics,
    executiveRadarData,
    getExecutiveEVMData
} from '../../data/reportSampleData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const ExecutiveReport = ({ frequency = 'daily', selectedMonth = new Date().toISOString().slice(0, 7) }) => {

    // Get EVM data based on frequency and selected month
    const evmData = getExecutiveEVMData(frequency, selectedMonth);

    // Benchmark Data
    const benchmarkData = executiveBenchmarkData;

    // Portfolio Stacked Bar (SPI/CPI)
    const portfolioMetrics = executivePortfolioMetrics;

    // Health Radar
    const radarData = executiveRadarData;


    return (
        <div className="space-y-6">
            {/* Top Level Portfolio Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
                    <CardContent className="pt-6">
                        <p className="text-sm opacity-90">Planned Value (PV)</p>
                        <h3 className="text-2xl font-bold">$712.5k</h3>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg">
                    <CardContent className="pt-6">
                        <p className="text-sm opacity-90">Earned Value (EV)</p>
                        <h3 className="text-2xl font-bold">$705.2k</h3>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg">
                    <CardContent className="pt-6">
                        <p className="text-sm opacity-90">Cost Performance (CPI)</p>
                        <h3 className="text-2xl font-bold">1.01</h3>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg">
                    <CardContent className="pt-6">
                        <p className="text-sm opacity-90">Variance at Completion</p>
                        <h3 className="text-2xl font-bold">+$7.1k</h3>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Executive S-Curve */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Portfolio Performance Forecast</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={evmData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorEv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="label" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="pv" stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" name="Planned Value" />
                                <Area type="monotone" dataKey="ev" stroke="#82ca9d" fillOpacity={1} fill="url(#colorEv)" name="Earned Value" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Benchmark Comparison */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Industry Benchmarks</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={benchmarkData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="metric" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="industry" fill="#9ca3af" name="Industry Avg" />
                                <Bar dataKey="our" fill="#2563eb" name="Our Performance" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-center text-gray-500 mt-2">Outperforming industry in ROI and On-Time Delivery.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Portfolio Stacked Bar */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Project Health Indicators</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={portfolioMetrics}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="project" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="spi" stackId="a" fill="#10B981" name="SPI" />
                                <Bar dataKey="cpi" stackId="a" fill="#3B82F6" name="CPI" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Health Score Radar */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Portfolio Health Radar</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                <Radar name="Portfolio Health" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Legend />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
