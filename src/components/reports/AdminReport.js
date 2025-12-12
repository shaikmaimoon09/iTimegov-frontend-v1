import React, { useState } from 'react';
import { ProjectsOverviewTab } from './adminreporttabs/ProjectsOverviewTab';
import { ProjectAnalysisTab } from './adminreporttabs/ProjectAnalysisTab';

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
                <ProjectsOverviewTab
                    projects={projects}
                    totalBudget={totalBudget}
                    totalSpent={totalSpent}
                    avgHealth={avgHealth}
                    avgSPI={avgSPI}
                    avgCPI={avgCPI}
                    chartType={chartType}
                    setChartType={setChartType}
                />
            )}

            {/* PROJECT ANALYSIS SECTION */}
            {activeSection === 'analysis' && (
                <ProjectAnalysisTab
                    projects={projects}
                    projectMembers={projectMembers}
                    projectTasks={projectTasks}
                    projectMonthlyBudget={projectMonthlyBudget}
                    selectedProjectId={selectedProjectId}
                    setSelectedProjectId={setSelectedProjectId}
                    analysisView={analysisView}
                    setAnalysisView={setAnalysisView}
                    projectChartType={projectChartType}
                    setProjectChartType={setProjectChartType}
                    memberChartType={memberChartType}
                    setMemberChartType={setMemberChartType}
                    taskChartType={taskChartType}
                    setTaskChartType={setTaskChartType}
                    monthlyBudgetChartType={monthlyBudgetChartType}
                    setMonthlyBudgetChartType={setMonthlyBudgetChartType}
                />
            )}
        </div>
    );
};
