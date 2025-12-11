import React, { useState } from 'react';
import {
    ComposedChart, Line, Bar, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, DollarSign, Calendar, Users, Activity } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
const STATUS_COLORS = {
    'ON_TRACK': '#10B981',
    'AT_RISK': '#F59E0B',
    'CRITICAL': '#EF4444',
    'COMPLETED': '#3B82F6'
};

export const AdminReport = ({ frequency = 'daily', selectedMonth = new Date().toISOString().slice(0, 7) }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [analysisView, setAnalysisView] = useState('project_overview');
    const [chartType, setChartType] = useState('bar');
    const [selectedProjectId, setSelectedProjectId] = useState('PROJ-001');
    const [projectChartType, setProjectChartType] = useState('bar');
    const [memberChartType, setMemberChartType] = useState('bar');
    const [taskChartType, setTaskChartType] = useState('bar');
    const [monthlyBudgetChartType, setMonthlyBudgetChartType] = useState('bar');

    // Sample projects data
    const projects = [
        { id: 'PROJ-001', name: 'Digital Transformation', manager: 'Sarah Johnson', client: 'TechCorp Inc.', startDate: '2024-01-15', endDate: '2025-03-01', budget: 450000, spent: 292500, ev: 301500, status: 'ON_TRACK', progress: 67, health: 82, spi: 0.96, cpi: 1.03, team: 12 },
        { id: 'PROJ-002', name: 'Mobile App Development', manager: 'Mike Chen', client: 'RetailMax LLC', startDate: '2024-03-01', endDate: '2025-01-15', budget: 280000, spent: 196000, ev: 184800, status: 'AT_RISK', progress: 66, health: 68, spi: 0.89, cpi: 0.94, team: 8 },
        { id: 'PROJ-003', name: 'Cloud Migration', manager: 'Emily Davis', client: 'FinanceHub Corp', startDate: '2024-02-10', endDate: '2025-04-30', budget: 520000, spent: 364000, ev: 395200, status: 'ON_TRACK', progress: 76, health: 88, spi: 1.02, cpi: 1.09, team: 15 },
        { id: 'PROJ-004', name: 'Data Analytics Platform', manager: 'James Wilson', client: 'DataVision Inc.', startDate: '2024-04-01', endDate: '2025-02-28', budget: 350000, spent: 280000, ev: 245000, status: 'CRITICAL', progress: 70, health: 55, spi: 0.82, cpi: 0.88, team: 10 },
        { id: 'PROJ-005', name: 'Security Enhancement', manager: 'Lisa Anderson', client: 'SecureNet Ltd.', startDate: '2024-01-01', endDate: '2024-12-15', budget: 180000, spent: 180000, ev: 180000, status: 'COMPLETED', progress: 100, health: 95, spi: 1.0, cpi: 1.0, team: 6 },
    ];

    // Project-specific member data
    const projectMembers = {
        'PROJ-001': [
            { name: 'John Smith', role: 'Senior Developer', plannedHours: 160, actualHours: 145, hourlyCost: 75, billingRate: 120, efficiency: 110 },
            { name: 'Sarah Lee', role: 'UI/UX Designer', plannedHours: 120, actualHours: 130, hourlyCost: 65, billingRate: 100, efficiency: 92 },
            { name: 'Mike Johnson', role: 'Backend Developer', plannedHours: 140, actualHours: 135, hourlyCost: 70, billingRate: 110, efficiency: 104 },
            { name: 'Emily Chen', role: 'QA Engineer', plannedHours: 100, actualHours: 95, hourlyCost: 55, billingRate: 85, efficiency: 105 },
        ],
        'PROJ-002': [
            { name: 'David Park', role: 'Mobile Developer', plannedHours: 150, actualHours: 165, hourlyCost: 80, billingRate: 125, efficiency: 91 },
            { name: 'Lisa Wang', role: 'Product Manager', plannedHours: 80, actualHours: 85, hourlyCost: 90, billingRate: 140, efficiency: 94 },
            { name: 'Tom Anderson', role: 'DevOps Engineer', plannedHours: 110, actualHours: 120, hourlyCost: 75, billingRate: 115, efficiency: 92 },
        ],
        'PROJ-003': [
            { name: 'Robert Taylor', role: 'Cloud Architect', plannedHours: 140, actualHours: 130, hourlyCost: 95, billingRate: 150, efficiency: 108 },
            { name: 'Jennifer Martinez', role: 'Senior Developer', plannedHours: 160, actualHours: 155, hourlyCost: 75, billingRate: 120, efficiency: 103 },
            { name: 'Chris Brown', role: 'Database Admin', plannedHours: 120, actualHours: 115, hourlyCost: 70, billingRate: 110, efficiency: 104 },
            { name: 'Amanda Wilson', role: 'Security Specialist', plannedHours: 100, actualHours: 105, hourlyCost: 85, billingRate: 130, efficiency: 95 },
            { name: 'Kevin Lee', role: 'Network Engineer', plannedHours: 130, actualHours: 140, hourlyCost: 70, billingRate: 105, efficiency: 93 },
        ],
        'PROJ-004': [
            { name: 'Daniel Garcia', role: 'Data Scientist', plannedHours: 150, actualHours: 170, hourlyCost: 90, billingRate: 140, efficiency: 88 },
            { name: 'Michelle Rodriguez', role: 'ML Engineer', plannedHours: 140, actualHours: 160, hourlyCost: 85, billingRate: 135, efficiency: 88 },
            { name: 'James Kim', role: 'Data Engineer', plannedHours: 130, actualHours: 145, hourlyCost: 75, billingRate: 115, efficiency: 90 },
        ],
        'PROJ-005': [
            { name: 'Patricia Davis', role: 'Security Engineer', plannedHours: 120, actualHours: 120, hourlyCost: 80, billingRate: 125, efficiency: 100 },
            { name: 'William Thompson', role: 'Penetration Tester', plannedHours: 100, actualHours: 100, hourlyCost: 85, billingRate: 130, efficiency: 100 },
        ],
    };

    // Project-specific task data
    const projectTasks = {
        'PROJ-001': [
            { id: 'T-001', name: 'Requirements Analysis', assignee: 'John Smith', plannedHours: 80, actualHours: 75, plannedCost: 6000, status: 'COMPLETED', progress: 100, spi: 1.07, cpi: 1.05 },
            { id: 'T-002', name: 'UI/UX Design', assignee: 'Sarah Lee', plannedHours: 120, actualHours: 130, plannedCost: 7800, status: 'COMPLETED', progress: 100, spi: 0.92, cpi: 0.95 },
            { id: 'T-003', name: 'Backend Development', assignee: 'Mike Johnson', plannedHours: 200, actualHours: 185, plannedCost: 14000, status: 'IN_PROGRESS', progress: 85, spi: 1.08, cpi: 1.06 },
            { id: 'T-004', name: 'Frontend Development', assignee: 'John Smith', plannedHours: 180, actualHours: 195, plannedCost: 13500, status: 'IN_PROGRESS', progress: 75, spi: 0.92, cpi: 0.88 },
            { id: 'T-005', name: 'Testing & QA', assignee: 'Emily Chen', plannedHours: 100, actualHours: 60, plannedCost: 5500, status: 'IN_PROGRESS', progress: 60, spi: 1.0, cpi: 1.15 },
        ],
        'PROJ-002': [
            { id: 'T-006', name: 'Mobile App Architecture', assignee: 'David Park', plannedHours: 100, actualHours: 115, plannedCost: 8000, status: 'COMPLETED', progress: 100, spi: 0.87, cpi: 0.90 },
            { id: 'T-007', name: 'iOS Development', assignee: 'David Park', plannedHours: 160, actualHours: 180, plannedCost: 12800, status: 'IN_PROGRESS', progress: 70, spi: 0.89, cpi: 0.85 },
            { id: 'T-008', name: 'Android Development', assignee: 'Tom Anderson', plannedHours: 160, actualHours: 175, plannedCost: 12000, status: 'IN_PROGRESS', progress: 68, spi: 0.88, cpi: 0.87 },
            { id: 'T-009', name: 'API Integration', assignee: 'Tom Anderson', plannedHours: 80, actualHours: 95, plannedCost: 6000, status: 'IN_PROGRESS', progress: 55, spi: 0.84, cpi: 0.82 },
        ],
        'PROJ-003': [
            { id: 'T-010', name: 'Cloud Infrastructure Setup', assignee: 'Robert Taylor', plannedHours: 120, actualHours: 110, plannedCost: 11400, status: 'COMPLETED', progress: 100, spi: 1.09, cpi: 1.12 },
            { id: 'T-011', name: 'Data Migration', assignee: 'Chris Brown', plannedHours: 150, actualHours: 140, plannedCost: 10500, status: 'COMPLETED', progress: 100, spi: 1.07, cpi: 1.08 },
            { id: 'T-012', name: 'Application Migration', assignee: 'Jennifer Martinez', plannedHours: 180, actualHours: 175, plannedCost: 13500, status: 'IN_PROGRESS', progress: 90, spi: 1.03, cpi: 1.04 },
            { id: 'T-013', name: 'Security Configuration', assignee: 'Amanda Wilson', plannedHours: 100, actualHours: 105, plannedCost: 8500, status: 'IN_PROGRESS', progress: 80, spi: 0.95, cpi: 0.93 },
            { id: 'T-014', name: 'Network Optimization', assignee: 'Kevin Lee', plannedHours: 90, actualHours: 100, plannedCost: 6300, status: 'IN_PROGRESS', progress: 70, spi: 0.90, cpi: 0.88 },
        ],
        'PROJ-004': [
            { id: 'T-015', name: 'Data Pipeline Development', assignee: 'Daniel Garcia', plannedHours: 140, actualHours: 165, plannedCost: 12600, status: 'IN_PROGRESS', progress: 75, spi: 0.85, cpi: 0.82 },
            { id: 'T-016', name: 'ML Model Training', assignee: 'Michelle Rodriguez', plannedHours: 160, actualHours: 185, plannedCost: 13600, status: 'IN_PROGRESS', progress: 70, spi: 0.86, cpi: 0.84 },
            { id: 'T-017', name: 'Dashboard Development', assignee: 'James Kim', plannedHours: 120, actualHours: 140, plannedCost: 9000, status: 'IN_PROGRESS', progress: 65, spi: 0.84, cpi: 0.86 },
        ],
        'PROJ-005': [
            { id: 'T-018', name: 'Security Audit', assignee: 'Patricia Davis', plannedHours: 100, actualHours: 100, plannedCost: 8000, status: 'COMPLETED', progress: 100, spi: 1.0, cpi: 1.0 },
            { id: 'T-019', name: 'Penetration Testing', assignee: 'William Thompson', plannedHours: 120, actualHours: 120, plannedCost: 10200, status: 'COMPLETED', progress: 100, spi: 1.0, cpi: 1.0 },
            { id: 'T-020', name: 'Security Implementation', assignee: 'Patricia Davis', plannedHours: 80, actualHours: 80, plannedCost: 6400, status: 'COMPLETED', progress: 100, spi: 1.0, cpi: 1.0 },
        ],
    };

    // Project-specific monthly budget data
    const projectMonthlyBudget = {
        'PROJ-001': {
            monthlyBudget: 37500,
            months: [
                { month: 'Jan 2024', plannedHours: 160, actualHours: 155, pv: 35000, ac: 33500, ev: 36000, milestones: ['Requirements Complete'] },
                { month: 'Feb 2024', plannedHours: 180, actualHours: 175, pv: 38000, ac: 37000, ev: 38500, milestones: ['Design Phase'] },
                { month: 'Mar 2024', plannedHours: 200, actualHours: 195, pv: 40000, ac: 39000, ev: 41000, milestones: ['Development Start'] },
                { month: 'Apr 2024', plannedHours: 190, actualHours: 185, pv: 39000, ac: 38000, ev: 39500, milestones: [] },
                { month: 'May 2024', plannedHours: 210, actualHours: 220, pv: 42000, ac: 44000, ev: 42500, milestones: ['Backend Complete'] },
                { month: 'Jun 2024', plannedHours: 200, actualHours: 195, pv: 40000, ac: 39000, ev: 40500, milestones: [] },
            ]
        },
        'PROJ-002': {
            monthlyBudget: 23333,
            months: [
                { month: 'Mar 2024', plannedHours: 140, actualHours: 150, pv: 22000, ac: 24000, ev: 21500, milestones: ['Architecture'] },
                { month: 'Apr 2024', plannedHours: 160, actualHours: 175, pv: 25000, ac: 28000, ev: 24000, milestones: ['iOS Dev Start'] },
                { month: 'May 2024', plannedHours: 170, actualHours: 180, pv: 27000, ac: 29000, ev: 26500, milestones: [] },
                { month: 'Jun 2024', plannedHours: 160, actualHours: 170, pv: 25000, ac: 27000, ev: 24500, milestones: ['Android Dev Start'] },
                { month: 'Jul 2024', plannedHours: 150, actualHours: 165, pv: 24000, ac: 26500, ev: 23500, milestones: [] },
            ]
        },
        'PROJ-003': {
            monthlyBudget: 43333,
            months: [
                { month: 'Feb 2024', plannedHours: 180, actualHours: 170, pv: 42000, ac: 40000, ev: 43000, milestones: ['Infrastructure Setup'] },
                { month: 'Mar 2024', plannedHours: 200, actualHours: 190, pv: 45000, ac: 43000, ev: 46000, milestones: ['Data Migration'] },
                { month: 'Apr 2024', plannedHours: 220, actualHours: 215, pv: 48000, ac: 47000, ev: 49000, milestones: [] },
                { month: 'May 2024', plannedHours: 210, actualHours: 205, pv: 46000, ac: 45000, ev: 47000, milestones: ['App Migration'] },
                { month: 'Jun 2024', plannedHours: 200, actualHours: 210, pv: 44000, ac: 46000, ev: 45000, milestones: [] },
                { month: 'Jul 2024', plannedHours: 190, actualHours: 185, pv: 42000, ac: 41000, ev: 43000, milestones: ['Security Config'] },
            ]
        },
        'PROJ-004': {
            monthlyBudget: 29167,
            months: [
                { month: 'Apr 2024', plannedHours: 150, actualHours: 170, pv: 27000, ac: 30500, ev: 26000, milestones: ['Data Pipeline'] },
                { month: 'May 2024', plannedHours: 170, actualHours: 190, pv: 30000, ac: 34000, ev: 29000, milestones: [] },
                { month: 'Jun 2024', plannedHours: 160, actualHours: 180, pv: 28000, ac: 32000, ev: 27000, milestones: ['ML Training'] },
                { month: 'Jul 2024', plannedHours: 150, actualHours: 165, pv: 27000, ac: 29500, ev: 26500, milestones: [] },
            ]
        },
        'PROJ-005': {
            monthlyBudget: 15000,
            months: [
                { month: 'Jan 2024', plannedHours: 120, actualHours: 120, pv: 15000, ac: 15000, ev: 15000, milestones: ['Security Audit'] },
                { month: 'Feb 2024', plannedHours: 130, actualHours: 130, pv: 16000, ac: 16000, ev: 16000, milestones: ['Pen Testing'] },
                { month: 'Mar 2024', plannedHours: 110, actualHours: 110, pv: 14000, ac: 14000, ev: 14000, milestones: ['Implementation'] },
            ]
        },
    };

    // Calculate summary metrics
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
    const totalEV = projects.reduce((sum, p) => sum + p.ev, 0);
    const avgHealth = Math.round(projects.reduce((sum, p) => sum + p.health, 0) / projects.length);
    const avgSPI = (projects.reduce((sum, p) => sum + p.spi, 0) / projects.length).toFixed(2);
    const avgCPI = (projects.reduce((sum, p) => sum + p.cpi, 0) / projects.length).toFixed(2);

    // Status distribution
    const statusDistribution = [
        { name: 'On Track', value: projects.filter(p => p.status === 'ON_TRACK').length, color: STATUS_COLORS.ON_TRACK },
        { name: 'At Risk', value: projects.filter(p => p.status === 'AT_RISK').length, color: STATUS_COLORS.AT_RISK },
        { name: 'Critical', value: projects.filter(p => p.status === 'CRITICAL').length, color: STATUS_COLORS.CRITICAL },
        { name: 'Completed', value: projects.filter(p => p.status === 'COMPLETED').length, color: STATUS_COLORS.COMPLETED },
    ];

    return (
        <div className="space-y-6">
            {/* Section Tabs */}
            <div className="flex gap-2 border-b">
                <button
                    onClick={() => setActiveSection('overview')}
                    className={`px-4 py-2 font-medium transition-colors ${activeSection === 'overview'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Projects Overview
                </button>
                <button
                    onClick={() => setActiveSection('analysis')}
                    className={`px-4 py-2 font-medium transition-colors ${activeSection === 'analysis'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Project Analysis
                </button>
            </div>

            {/* PROJECTS OVERVIEW SECTION */}
            {activeSection === 'overview' && (
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
            )}

            {/* PROJECT ANALYSIS SECTION */}
            {activeSection === 'analysis' && (
                <div className="space-y-6">
                    {/* Shared Project Selector */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-gray-700">Select Project:</label>
                                <select
                                    value={selectedProjectId}
                                    onChange={(e) => setSelectedProjectId(e.target.value)}
                                    className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.id} - {project.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Analysis Sub-tabs */}
                    <div className="flex gap-2 border-b">
                        <button
                            onClick={() => setAnalysisView('project_overview')}
                            className={`px-4 py-2 font-medium transition-colors ${analysisView === 'project_overview'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Project Overview
                        </button>
                        <button
                            onClick={() => setAnalysisView('member')}
                            className={`px-4 py-2 font-medium transition-colors ${analysisView === 'member'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Member Cost Analysis
                        </button>
                        <button
                            onClick={() => setAnalysisView('task')}
                            className={`px-4 py-2 font-medium transition-colors ${analysisView === 'task'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Task Cost Analysis
                        </button>
                        <button
                            onClick={() => setAnalysisView('monthly_budget')}
                            className={`px-4 py-2 font-medium transition-colors ${analysisView === 'monthly_budget'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Monthly Budget Analysis
                        </button>
                    </div>

                    {/* Analysis Content */}
                    {analysisView === 'project_overview' && (
                        <div className="space-y-6">

                            {(() => {
                                const selectedProject = projects.find(p => p.id === selectedProjectId);
                                if (!selectedProject) return null;

                                const percentUsed = Math.round((selectedProject.spent / selectedProject.budget) * 100);
                                const variance = selectedProject.ev - selectedProject.spent;
                                const scheduleVariance = selectedProject.ev - (selectedProject.budget * (selectedProject.progress / 100));
                                const costVariance = selectedProject.ev - selectedProject.spent;

                                return (
                                    <>
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
                                    </>
                                );
                            })()}
                        </div>
                    )}

                    {analysisView === 'member' && (
                        <div className="space-y-6">
                            {(() => {
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
                                    <>
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
                                    </>
                                );
                            })()}
                        </div>
                    )}

                    {analysisView === 'task' && (
                        <div className="space-y-6">
                            {(() => {
                                const tasks = projectTasks[selectedProjectId] || [];
                                const selectedProject = projects.find(p => p.id === selectedProjectId);

                                if (tasks.length === 0) {
                                    return (
                                        <Card>
                                            <CardContent className="pt-6">
                                                <p className="text-gray-600">No task data available for this project.</p>
                                            </CardContent>
                                        </Card>
                                    );
                                }

                                const totalPlannedCost = tasks.reduce((sum, t) => sum + t.plannedCost, 0);
                                const totalActualCost = tasks.reduce((sum, t) => sum + (t.actualHours * (t.plannedCost / t.plannedHours)), 0);
                                const avgSPI = tasks.reduce((sum, t) => sum + t.spi, 0) / tasks.length;
                                const avgCPI = tasks.reduce((sum, t) => sum + t.cpi, 0) / tasks.length;

                                return (
                                    <>
                                        {/* Header Card */}
                                        <Card className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                                            <CardContent className="pt-6">
                                                <h2 className="text-2xl font-bold mb-2">Task Cost Analysis - {selectedProject?.name}</h2>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <p className="opacity-80">Total Tasks</p>
                                                        <p className="font-semibold text-2xl">{tasks.length}</p>
                                                    </div>
                                                    <div>
                                                        <p className="opacity-80">Planned Cost</p>
                                                        <p className="font-semibold text-2xl">${(totalPlannedCost / 1000).toFixed(1)}k</p>
                                                    </div>
                                                    <div>
                                                        <p className="opacity-80">Avg SPI</p>
                                                        <p className="font-semibold text-2xl">{avgSPI.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="opacity-80">Avg CPI</p>
                                                        <p className="font-semibold text-2xl">{avgCPI.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Task Performance Chart */}
                                        <Card className="shadow-md">
                                            <CardHeader>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <CardTitle>Task Performance Overview</CardTitle>
                                                        <p className="text-sm text-gray-600">Cost Variance Analysis</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setTaskChartType('bar')}
                                                            className={`p-2 text-sm rounded border ${taskChartType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                                            title="Bar Chart"
                                                        >
                                                            <Activity className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setTaskChartType('line')}
                                                            className={`p-2 text-sm rounded border ${taskChartType === 'line' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                                            title="Line Chart"
                                                        >
                                                            <TrendingUp className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setTaskChartType('area')}
                                                            className={`p-2 text-sm rounded border ${taskChartType === 'area' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                                            title="Area Chart"
                                                        >
                                                            <TrendingDown className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="h-[400px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    {taskChartType === 'bar' && (
                                                        <BarChart
                                                            data={tasks.map((task) => {
                                                                const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                                                                const variance = actualCost - task.plannedCost;
                                                                return {
                                                                    name: task.id,
                                                                    plannedCost: Number((task.plannedCost / 1000).toFixed(1)),
                                                                    actualCost: Number((actualCost / 1000).toFixed(1)),
                                                                    variance: Number((variance / 1000).toFixed(1)),
                                                                };
                                                            })}
                                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                            <XAxis dataKey="name" fontSize={12} />
                                                            <YAxis fontSize={12} />
                                                            <Tooltip
                                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                                formatter={(value) => [`$${value}k`, '']}
                                                            />
                                                            <Legend />
                                                            <Bar dataKey="plannedCost" fill="#3B82F6" name="Planned Cost" radius={[4, 4, 0, 0]} />
                                                            <Bar dataKey="actualCost" fill="#F59E0B" name="Actual Cost" radius={[4, 4, 0, 0]} />
                                                            <Bar dataKey="variance" fill="#EF4444" name="Variance" radius={[4, 4, 0, 0]} />
                                                        </BarChart>
                                                    )}
                                                    {taskChartType === 'line' && (
                                                        <ComposedChart
                                                            data={tasks.map((task) => {
                                                                const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                                                                const variance = actualCost - task.plannedCost;
                                                                return {
                                                                    name: task.id,
                                                                    plannedCost: Number((task.plannedCost / 1000).toFixed(1)),
                                                                    actualCost: Number((actualCost / 1000).toFixed(1)),
                                                                    variance: Number((variance / 1000).toFixed(1)),
                                                                };
                                                            })}
                                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" fontSize={12} />
                                                            <YAxis fontSize={12} />
                                                            <Tooltip
                                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                                formatter={(value) => [`$${value}k`, '']}
                                                            />
                                                            <Legend />
                                                            <Line type="monotone" dataKey="plannedCost" stroke="#3B82F6" strokeWidth={2} name="Planned Cost" dot={{ r: 5 }} />
                                                            <Line type="monotone" dataKey="actualCost" stroke="#F59E0B" strokeWidth={2} name="Actual Cost" dot={{ r: 5 }} />
                                                            <Line type="monotone" dataKey="variance" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Variance" dot={{ r: 5 }} />
                                                        </ComposedChart>
                                                    )}
                                                    {taskChartType === 'area' && (
                                                        <AreaChart
                                                            data={tasks.map((task) => {
                                                                const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                                                                const variance = actualCost - task.plannedCost;
                                                                return {
                                                                    name: task.id,
                                                                    plannedCost: Number((task.plannedCost / 1000).toFixed(1)),
                                                                    actualCost: Number((actualCost / 1000).toFixed(1)),
                                                                    variance: Number((variance / 1000).toFixed(1)),
                                                                };
                                                            })}
                                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" fontSize={12} />
                                                            <YAxis fontSize={12} />
                                                            <Tooltip
                                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                                formatter={(value) => [`$${value}k`, '']}
                                                            />
                                                            <Legend />
                                                            <Area type="monotone" dataKey="plannedCost" stroke="#3B82F6" fill="#BFDBFE" name="Planned Cost" />
                                                            <Area type="monotone" dataKey="actualCost" stroke="#F59E0B" fill="#FDE68A" name="Actual Cost" />
                                                            <Area type="monotone" dataKey="variance" stroke="#EF4444" fill="#FCA5A5" name="Variance" />
                                                        </AreaChart>
                                                    )}
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>

                                        {/* Task-Level Variance Table */}
                                        <Card className="shadow-md">
                                            <CardHeader>
                                                <CardTitle>Task-Level Variance Analysis</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="border rounded-lg overflow-hidden overflow-x-auto">
                                                    <table className="w-full">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task ID</th>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task Name</th>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Assignee</th>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Hours</th>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Hours</th>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Hours Variance</th>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Cost</th>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Cost</th>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Cost Variance</th>
                                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                            {tasks.map((task) => {
                                                                const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                                                                const hoursVariance = task.actualHours - task.plannedHours;
                                                                const costVariance = actualCost - task.plannedCost;
                                                                const variancePercentage = ((costVariance / task.plannedCost) * 100).toFixed(0);
                                                                const status = costVariance > 0 ? 'over' : costVariance < 0 ? 'under' : 'on-track';

                                                                return (
                                                                    <tr key={task.id} className="border-t hover:bg-gray-50">
                                                                        <td className="py-3 px-4 text-sm font-medium text-blue-600 whitespace-nowrap">{task.id}</td>
                                                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{task.name}</td>
                                                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{task.assignee}</td>
                                                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{task.plannedHours}h</td>
                                                                        <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                                            <span className={hoursVariance > 0 ? 'text-red-600 font-semibold' : hoursVariance < 0 ? 'text-green-600 font-semibold' : ''}>
                                                                                {task.actualHours}h
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                                            <span className={`font-semibold ${hoursVariance > 0 ? 'text-red-600' : hoursVariance < 0 ? 'text-green-600' : 'text-gray-600'}`}>
                                                                                {hoursVariance > 0 ? '+' : ''}{hoursVariance}h
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-3 px-4 text-sm whitespace-nowrap">${(task.plannedCost / 1000).toFixed(1)}k</td>
                                                                        <td className="py-3 px-4 text-sm whitespace-nowrap">${(actualCost / 1000).toFixed(1)}k</td>
                                                                        <td className="py-3 px-4 text-sm whitespace-nowrap">
                                                                            <span className={`font-semibold ${costVariance > 0 ? 'text-red-600' : costVariance < 0 ? 'text-green-600' : 'text-gray-600'}`}>
                                                                                {costVariance > 0 ? '+' : ''}${(costVariance / 1000).toFixed(1)}k ({variancePercentage}%)
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

                                        {/* Tasks Requiring Attention */}
                                        {(() => {
                                            const tasksRequiringAttention = tasks
                                                .map((task) => {
                                                    const actualCost = task.actualHours * (task.plannedCost / task.plannedHours);
                                                    const costVariance = actualCost - task.plannedCost;
                                                    const variancePercentage = ((costVariance / task.plannedCost) * 100).toFixed(0);
                                                    const status = costVariance > 0 ? 'over' : costVariance < 0 ? 'under' : 'on-track';
                                                    return {
                                                        ...task,
                                                        actualCost,
                                                        costVariance,
                                                        variancePercentage: Number(variancePercentage),
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
                                                                        ${(tasksRequiringAttention.reduce((sum, task) => sum + task.costVariance, 0) / 1000).toFixed(1)}k
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
                                                                                <p className="font-semibold text-gray-900">{task.id}: {task.name}</p>
                                                                                <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <p className={`text-lg font-bold ${Math.abs(task.variancePercentage) > 20 ? 'text-red-600' : 'text-yellow-600'}`}>
                                                                                    +${(task.costVariance / 1000).toFixed(1)}k
                                                                                </p>
                                                                                <p className="text-xs text-gray-600">{task.variancePercentage}% over budget</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ) : null;
                                        })()}
                                    </>
                                );
                            })()}
                        </div>
                    )}

                    {analysisView === 'monthly_budget' && (
                        <div className="space-y-6">
                            {(() => {
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
                                    <>
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
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
