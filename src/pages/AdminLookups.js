import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';

export const AdminLookups = () => {
  return (
    <div className="space-y-6" data-testid="admin-lookups-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Lookups Management</h2>
            <Button data-testid="add-lookup-btn" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Lookup
            </Button>
          </div>

          <div className="text-center py-12 text-gray-500">
            <p>Lookup management coming soon...</p>
            <p className="text-sm mt-2">Configure system-wide lookup values and dropdown options</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};