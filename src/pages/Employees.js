import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export const Employees = () => {
  const { employees } = useApp();

  return (
    <div className="space-y-6" data-testid="employees-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
            <Button data-testid="add-employee-btn" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Designation</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hourly Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Billing Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Allocation %</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{emp.username}</td>
                    <td className="py-3 px-4 text-sm">{emp.email}</td>
                    <td className="py-3 px-4 text-sm">{emp.designation}</td>
                    <td className="py-3 px-4 text-sm">${emp.hourlyRate}/hr</td>
                    <td className="py-3 px-4 text-sm">${emp.billingRate}/hr</td>
                    <td className="py-3 px-4 text-sm">{emp.allocation}%</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">{emp.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};