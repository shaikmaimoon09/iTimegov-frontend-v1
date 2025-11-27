import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, BarChart3, DollarSign, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Reports = () => {
  const navigate = useNavigate();

  const reportCategories = [
    { title: 'Project Reports', icon: FileText, path: '/reports/project', color: 'bg-blue-500' },
    { title: 'Timesheet Reports', icon: FileText, path: '/reports/timesheet', color: 'bg-green-500' },
    { title: 'Member Cost Reports', icon: DollarSign, path: '/reports/member-cost', color: 'bg-purple-500' },
    { title: 'Task Cost Reports', icon: DollarSign, path: '/reports/task-cost', color: 'bg-orange-500' },
    { title: 'Budget Reports', icon: BarChart3, path: '/reports/budget', color: 'bg-indigo-500' },
    { title: 'Milestone Performance', icon: TrendingUp, path: '/reports/milestone', color: 'bg-pink-500' },
    { title: 'Variance Analysis', icon: BarChart3, path: '/reports/variance', color: 'bg-red-500' },
    { title: 'Earned Value Reports', icon: TrendingUp, path: '/reports/evm', color: 'bg-teal-500' },
    { title: 'Baseline History Reports', icon: FileText, path: '/reports/baseline', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6" data-testid="reports-page">
      <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card 
              key={index} 
              className="shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(report.path)}
              data-testid={`report-${report.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`${report.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  View detailed {report.title.toLowerCase()} for all projects and activities.
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};