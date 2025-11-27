import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export const AdminUsers = () => {
  const { users } = useApp();

  return (
    <div className="space-y-6" data-testid="admin-users-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
            <Button data-testid="add-user-btn" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created On</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{user.username}</td>
                    <td className="py-3 px-4 text-sm">{user.email}</td>
                    <td className="py-3 px-4 text-sm">{user.role}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">{user.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{user.createdOn}</td>
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