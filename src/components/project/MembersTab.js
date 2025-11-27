import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Trash2, Eye, Edit } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import '../CSSFILES/MembersTab.css';

export const MembersTab = ({ project }) => {
  const { addMember, employees, currentUser, labourCategories } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newMember, setNewMember] = useState({
    username: '',
    email: '',
    designation: '',
    role: '',
    labourCategory: '',
    hourlyCostRate: '',
    clientBillingRate: '',
    status: 'Active',
    assignedDate: new Date().toISOString().split('T')[0],
    assignedBy: currentUser
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const members = project.members || [];
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const paginatedMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleUsernameChange = (value) => {
    const employee = employees.find(e => e.username === value);
    if (employee) {
      setNewMember({
        ...newMember,
        username: value,
        email: employee.email,
        designation: employee.designation,
        hourlyCostRate: employee.hourlyRate,
        clientBillingRate: employee.billingRate
      });
    }
  }


  const handleLabourCategoryChange = (value) => {
    const category = labourCategories.find(c => c.name === value);
    if (category) {
      setNewMember({
        ...newMember,
        labourCategory: value,
        hourlyCostRate: category.hourlyCost,
        clientBillingRate: category.billingRate
      });
    } else {
      setNewMember({ ...newMember, labourCategory: value });
    }
  };

  const handleAddMember = () => {
    if (!newMember.username) return;
    addMember(project.id, newMember);
    setShowAddDialog(false);
    setNewMember({
      username: '',
      email: '',
      designation: '',
      role: '',
      labourCategory: '',
      hourlyCostRate: '',
      clientBillingRate: '',
      status: 'Active',
      assignedDate: new Date().toISOString().split('T')[0],
      assignedBy: currentUser
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(paginatedMembers.map(m => m.username));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (username, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, username]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== username));
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} member(s)?`)) {
      alert('Delete functionality needs updateProject in context');
      setSelectedRows([]);
    }
  };

  const handleView = () => {
    if (selectedRows.length === 1) {
      const member = project.members.find(m => m.username === selectedRows[0]);
      alert(`Viewing member: ${member.username}`);
    }
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const member = project.members.find(m => m.username === selectedRows[0]);
      alert(`Editing member: ${member.username}`);
    }
  };

  return (
    <div className="space-y-6" data-testid="members-tab">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-900">Members of Project {project.name}</h3>

          {/* Toolbar - appears when rows are selected */}
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
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button data-testid="add-member-btn" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Member to Project</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="username">Username *</Label>
                <Select value={newMember.username} onValueChange={handleUsernameChange}>
                  <SelectTrigger data-testid="select-member-username">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.username}>{emp.username}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={newMember.email}
                  disabled
                  placeholder="Auto-filled"
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={newMember.designation}
                  disabled
                  placeholder="Auto-filled"
                />
              </div>
              <div>
                <Label htmlFor="role">Project Role *</Label>
                <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                  <SelectTrigger data-testid="select-member-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="labour-category">Labour Category</Label>
                <Select value={newMember.labourCategory} onValueChange={handleLabourCategoryChange}>
                  <SelectTrigger data-testid="select-labour-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {labourCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hourly-cost">Hourly Labour Cost</Label>
                <Input
                  id="hourly-cost"
                  type="number"
                  value={newMember.hourlyCostRate}
                  onChange={(e) => setNewMember({ ...newMember, hourlyCostRate: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="billing-rate">Client Billing Rate</Label>
                <Input
                  id="billing-rate"
                  type="number"
                  value={newMember.clientBillingRate}
                  onChange={(e) => setNewMember({ ...newMember, clientBillingRate: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newMember.status} onValueChange={(value) => setNewMember({ ...newMember, status: value })}>
                  <SelectTrigger data-testid="select-member-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)} data-testid="cancel-member-btn">Cancel</Button>
              <Button onClick={handleAddMember} className="bg-blue-600 hover:bg-blue-700" data-testid="save-member-btn">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Members Table */}
      <div className="border rounded-lg overflow-hidden shadow-sm overflow-x-auto" style={{ scrollbarColor: '#ffffff #f1f1f1', scrollbarWidth: 'thin' }}>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 py-3 px-4">
                <Checkbox
                  checked={selectedRows.length === paginatedMembers.length && paginatedMembers.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(checked)}
                />
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Username</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Email</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Designation</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Role</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Labour Category</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Hourly Cost Rate</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Client Billing Rate</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Assigned Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Assigned By</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedMembers.length > 0 ? (
              paginatedMembers.map((member, index) => (
                <tr key={index} className="border-t hover:bg-gray-50" data-testid={`member-row-${member.username}`}>
                  <td className="py-3 px-4">
                    <Checkbox
                      checked={selectedRows.includes(member.username)}
                      onCheckedChange={(checked) => handleSelectRow(member.username, checked)}
                    />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium whitespace-nowrap">{member.username}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{member.email}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{member.designation}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{member.role}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{member.labourCategory || '-'}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">${member.hourlyCostRate}/hr</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">${member.clientBillingRate}/hr</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800">{member.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{member.assignedDate}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{member.assignedBy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center py-8 text-gray-500 whitespace-nowrap">
                  No members found. Click "Add Member" to assign team members.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600 whitespace-nowrap">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, members.length)} of {members.length}
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
    </div>
  );
};