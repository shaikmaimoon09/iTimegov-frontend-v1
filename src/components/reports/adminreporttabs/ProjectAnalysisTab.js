import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { ProjectOverviewTab } from './ProjectAnalysistabs/ProjectOverviewTab';
import { MemberCostAnalysisTab } from './ProjectAnalysistabs/MemberCostAnalysisTab';
import { TaskCostAnalysisTab } from './ProjectAnalysistabs/TaskCostAnalysisTab';
import { MonthlyBudgetAnalysisTab } from './ProjectAnalysistabs/MonthlyBudgetAnalysisTab';

export const ProjectAnalysisTab = ({
    projects,
    projectMembers,
    projectTasks,
    projectMonthlyBudget,
    selectedProjectId,
    setSelectedProjectId,
    analysisView,
    setAnalysisView,
    projectChartType,
    setProjectChartType,
    memberChartType,
    setMemberChartType,
    taskChartType,
    setTaskChartType,
    monthlyBudgetChartType,
    setMonthlyBudgetChartType
}) => {
    return (
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
                <ProjectOverviewTab
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    projectChartType={projectChartType}
                    setProjectChartType={setProjectChartType}
                />
            )}

            {analysisView === 'member' && (
                <MemberCostAnalysisTab
                    projects={projects}
                    projectMembers={projectMembers}
                    selectedProjectId={selectedProjectId}
                    memberChartType={memberChartType}
                    setMemberChartType={setMemberChartType}
                />
            )}

            {analysisView === 'task' && (
                <TaskCostAnalysisTab
                    projects={projects}
                    projectTasks={projectTasks}
                    selectedProjectId={selectedProjectId}
                    taskChartType={taskChartType}
                    setTaskChartType={setTaskChartType}
                />
            )}

            {analysisView === 'monthly_budget' && (
                <MonthlyBudgetAnalysisTab
                    projects={projects}
                    projectMonthlyBudget={projectMonthlyBudget}
                    selectedProjectId={selectedProjectId}
                    monthlyBudgetChartType={monthlyBudgetChartType}
                    setMonthlyBudgetChartType={setMonthlyBudgetChartType}
                />
            )}
        </div>
    );
};

export default ProjectAnalysisTab;
