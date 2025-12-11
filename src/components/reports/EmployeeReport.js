import React, { useState } from 'react';
import { getEmployeeTaskData, getEmployeeSCurveData } from '../../data/reportSampleData';
import { OverviewTab } from './emptabs/OverviewTab';
import { TaskPerformanceTab } from './emptabs/TaskPerformanceTab';
import { ProductivityScoreTab } from './emptabs/ProductivityScoreTab';

export const EmployeeReport = ({ frequency = 'daily', selectedMonth = new Date().toISOString().slice(0, 7) }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [chartType, setChartType] = useState('bar');

    // Use dynamic data from centralized source
    const { tasks: taskData, kpis } = getEmployeeTaskData(frequency, selectedMonth);

    // Get S-Curve data based on frequency and selected month
    const sCurveData = getEmployeeSCurveData(frequency, selectedMonth);

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
                    Overview
                </button>
                <button
                    onClick={() => setActiveSection('performance')}
                    className={`px-4 py-2 font-medium transition-colors ${activeSection === 'performance'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    My Task Performance
                </button>
                <button
                    onClick={() => setActiveSection('productivity')}
                    className={`px-4 py-2 font-medium transition-colors ${activeSection === 'productivity'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    My Productivity Score
                </button>
            </div>

            {/* Tab Content */}
            {activeSection === 'overview' && (
                <OverviewTab taskData={taskData} kpis={kpis} sCurveData={sCurveData} />
            )}

            {activeSection === 'performance' && (
                <TaskPerformanceTab
                    taskData={taskData}
                    kpis={kpis}
                    selectedMonth={selectedMonth}
                    chartType={chartType}
                    setChartType={setChartType}
                />
            )}

            {activeSection === 'productivity' && (
                <ProductivityScoreTab
                    taskData={taskData}
                    kpis={kpis}
                    selectedMonth={selectedMonth}
                />
            )}
        </div>
    );
};
