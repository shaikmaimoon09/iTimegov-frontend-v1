import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';

export const AdminRoles = () => {
  const { roles } = useApp();

  return (
    <div className="space-y-6" data-testid="admin-roles-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Roles Management</h2>
            <Button data-testid="add-role-btn" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Permissions</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created On</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {roles.map((role) => (
                  <tr key={role.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{role.name}</td>
                    <td className="py-3 px-4 text-sm">{role.description}</td>
                    <td className="py-3 px-4 text-sm">{role.permissions.join(', ')}</td>
                    <td className="py-3 px-4 text-sm">{role.createdOn}</td>
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