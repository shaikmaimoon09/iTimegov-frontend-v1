import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { getManagerTaskMatrix, getManagerEVMData } from '../../data/reportSampleData';
import { ProjectDashboardTab } from './managertabs/ProjectDashboardTab';
import { TaskStatusMatrixTab } from './managertabs/TaskStatusMatrixTab';
import { MonthlyBudgetTab } from './managertabs/MonthlyBudgetTab';
import { MemberStatusMatrixTab } from './managertabs/MemberStatusMatrixTab';

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
                <ProjectDashboardTab
                    evmData={evmData}
                    spi={spi}
                    cpi={cpi}
                    sv={sv}
                    cv={cv}
                    bac={bac}
                    pv={pv}
                    ev={ev}
                    ac={ac}
                    eac={eac}
                    etc={etc}
                    vac={vac}
                    tcpi={tcpi}
                    totalTasks={totalTasks}
                    completedTasks={completedTasks}
                    inProgressTasks={inProgressTasks}
                    notStartedTasks={notStartedTasks}
                    teamSize={teamSize}
                    totalHours={totalHours}
                    utilization={utilization}
                />
            )}

            {/* TASK STATUS MATRIX SECTION */}
            {activeSection === 'tasks' && (
                <TaskStatusMatrixTab
                    taskMatrix={taskMatrix}
                    selectedMonth={selectedMonth}
                    chartType={chartType}
                    setChartType={setChartType}
                />
            )}

            {/* MONTHLY BUDGET SECTION */}
            {activeSection === 'budget' && (
                <MonthlyBudgetTab
                    selectedMonth={selectedMonth}
                    monthlyBudget={monthlyBudget}
                    mtdSpent={mtdSpent}
                    remaining={remaining}
                    daysElapsed={daysElapsed}
                    daysInMonth={daysInMonth}
                    avgDailyBurn={avgDailyBurn}
                    targetDailyBurn={targetDailyBurn}
                    projectedMonthlySpend={projectedMonthlySpend}
                    budgetChartType={budgetChartType}
                    setBudgetChartType={setBudgetChartType}
                    cpi={cpi}
                />
            )}

            {/* MEMBER STATUS MATRIX SECTION */}
            {activeSection === 'variance' && (
                <MemberStatusMatrixTab
                    taskMatrix={taskMatrix}
                    varianceChartType={varianceChartType}
                    setVarianceChartType={setVarianceChartType}
                />
            )}
        </div>
    );
};
