import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export const AdminRoles = () => {
  const { roles } = useApp();
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const rolesList = roles || [];
  const totalPages = Math.ceil(rolesList.length / itemsPerPage);
  const paginatedRoles = rolesList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(paginatedRoles.map(r => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} role(s)?`)) {
      alert('Delete functionality not implemented yet');
      setSelectedRows([]);
    }
  };

  const handleView = () => {
    if (selectedRows.length === 1) {
      const role = rolesList.find(r => r.id === selectedRows[0]);
      alert(`Viewing role: ${role.name}`);
    }
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const role = rolesList.find(r => r.id === selectedRows[0]);
      alert(`Editing role: ${role.name}`);
    }
  };

  return (
    <div className="space-y-6" data-testid="admin-roles-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Roles Management</h2>
              {/* Toolbar */}
              {selectedRows.length > 0 && (
                <div className="flex items-center gap-2 ml-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedRows.length} selected
                  </span>
                  <div className="flex items-center gap-1 ml-2 border-l border-blue-300 pl-2">
                    {selectedRows.length === 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleView}
                          className="h-8 w-8 p-0 hover:bg-blue-100"
                          title="View"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleEdit}
                          className="h-8 w-8 p-0 hover:bg-blue-100"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDelete}
                      className="h-8 w-8 p-0 hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Button data-testid="add-role-btn" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 py-3 px-4">
                    <Checkbox
                      checked={selectedRows.length === paginatedRoles.length && paginatedRoles.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Permissions</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created On</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedRoles.length > 0 ? (
                  paginatedRoles.map((role) => (
                    <tr key={role.id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedRows.includes(role.id)}
                          onCheckedChange={(checked) => handleSelectRow(role.id, checked)}
                        />
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">{role.name}</td>
                      <td className="py-3 px-4 text-sm">{role.description}</td>
                      <td className="py-3 px-4 text-sm">{role.permissions.join(', ')}</td>
                      <td className="py-3 px-4 text-sm">{role.createdOn}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No roles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600 whitespace-nowrap">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, rolesList.length)} of {rolesList.length}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <Select value={itemsPerPage.toString()} onValueChange={(val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};