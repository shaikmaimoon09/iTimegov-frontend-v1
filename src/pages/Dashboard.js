import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FolderKanban, Clock, CheckCircle, Users, DollarSign, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  const { projects, timesheets, employees, approvals } = useApp();

  const stats = [
    { 
      title: 'Total Projects', 
      value: projects.length, 
      icon: FolderKanban, 
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    { 
      title: 'Active Tasks', 
      value: projects.reduce((acc, p) => acc + (p.tasks?.filter(t => t.status === 'Active' || t.status === 'In Progress').length || 0), 0), 
      icon: CheckCircle, 
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    { 
      title: 'Total Timesheets', 
      value: timesheets.length, 
      icon: Clock, 
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    { 
      title: 'Total Employees', 
      value: employees.length, 
      icon: Users, 
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    { 
      title: 'Pending Approvals', 
      value: approvals.timesheets.filter(a => a.status === 'Pending').length + approvals.taskRequests.filter(a => a.status === 'Pending').length, 
      icon: CheckCircle, 
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    { 
      title: 'Total Budget', 
      value: '$' + projects.reduce((acc, p) => acc + (p.budget?.reduce((sum, b) => sum + b.plannedBudget, 0) || 0), 0).toLocaleString(), 
      icon: DollarSign, 
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600'
    },
  ];

  const recentProjects = projects.slice(0, 5);

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow" data-testid={`stat-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-full`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Projects */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Project ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Project Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Start Date</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50" data-testid={`project-row-${project.id}`}>
                    <td className="py-3 px-4 text-sm text-blue-600 font-medium">{project.id}</td>
                    <td className="py-3 px-4 text-sm">{project.name}</td>
                    <td className="py-3 px-4 text-sm">{project.client}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{project.startDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Project Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => {
                const totalPlanned = project.budget?.reduce((sum, b) => sum + b.plannedHours, 0) || 0;
                const totalActual = project.budget?.reduce((sum, b) => sum + b.actualHours, 0) || 0;
                const percentage = totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0;
                
                return (
                  <div key={project.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{project.name}</span>
                      <span className="text-sm text-gray-600">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all" 
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Timesheet Approvals</p>
                  <p className="text-xs text-gray-600">Requires your attention</p>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{approvals.timesheets.filter(a => a.status === 'Pending').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Task Requests</p>
                  <p className="text-xs text-gray-600">Deadline extension requests</p>
                </div>
                <span className="text-2xl font-bold text-orange-600">{approvals.taskRequests.filter(a => a.status === 'Pending').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Baseline Requests</p>
                  <p className="text-xs text-gray-600">Change requests pending</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">{approvals.baselineRequests.filter(a => a.finalStatus === 'Pending').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};