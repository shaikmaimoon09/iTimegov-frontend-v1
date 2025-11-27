import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Plus, Search, Filter, X, Calendar, Download, Upload, List, Trash2, Eye, Edit } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';

export const Projects = () => {
  const navigate = useNavigate();
  const { projects, clients, contacts, addProject, setProjects, currentUser } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    client: '',
    status: '',
    contact: '',
    startDate: '',
    endDate: '',
    createdBy: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newProject, setNewProject] = useState({
    id: '',
    name: '',
    client: '',
    status: 'Active',
    contact: '',
    startDate: '',
    endDate: '',
    createdBy: currentUser,
    createdOn: new Date().toISOString().split('T')[0],
    updatedBy: currentUser
  });

  const filteredProjects = projects.filter(project => {
    if (filters.id && !project.id.toLowerCase().includes(filters.id.toLowerCase())) return false;
    if (filters.name && !project.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
    if (filters.client && project.client !== filters.client) return false;
    if (filters.status && filters.status !== 'all' && project.status !== filters.status) return false;
    if (filters.contact && !project.contact.toLowerCase().includes(filters.contact.toLowerCase())) return false;
    if (filters.startDate && project.startDate < filters.startDate) return false;
    if (filters.endDate && project.endDate > filters.endDate) return false;
    if (filters.createdBy && !project.createdBy.toLowerCase().includes(filters.createdBy.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddProject = () => {
    if (!newProject.id || !newProject.name) return;
    addProject(newProject);
    setShowAddDialog(false);
    setNewProject({
      id: '',
      name: '',
      client: '',
      status: 'Active',
      contact: '',
      startDate: '',
      endDate: '',
      createdBy: currentUser,
      createdOn: new Date().toISOString().split('T')[0],
      updatedBy: currentUser
    });
  };

  const clearFilters = () => {
    setFilters({
      id: '',
      name: '',
      client: '',
      status: '',
      contact: '',
      startDate: '',
      endDate: '',
      createdBy: ''
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(paginatedProjects.map(p => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (projectId, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, projectId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== projectId));
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} project(s)?`)) {
      setProjects(projects.filter(p => !selectedRows.includes(p.id)));
      setSelectedRows([]);
    }
  };

  const handleView = () => {
    if (selectedRows.length === 1) {
      navigate(`/projects/${selectedRows[0]}`);
    }
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const project = projects.find(p => p.id === selectedRows[0]);
      alert(`Editing project: ${project.name}`);
    }
  };

  return (
    <div className="space-y-6" data-testid="projects-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>

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
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={clearFilters} className="text-gray-600 border-gray-300 hover:bg-gray-50" data-testid="clear-filters-btn">
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
              <Button
                data-testid="download-btn"
                variant="outline"
                size="icon"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                data-testid="upload-btn"
                variant="outline"
                size="icon"
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                data-testid="list-view-btn"
                variant="outline"
                size="icon"
                className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              >
                <List className="h-4 w-4" />
              </Button>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button data-testid="add-project-btn" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                      <Label htmlFor="project-id">Project ID *</Label>
                      <Input
                        id="project-id"
                        data-testid="input-project-id"
                        value={newProject.id}
                        onChange={(e) => setNewProject({ ...newProject, id: e.target.value })}
                        placeholder="PRO-00026"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-name">Project Name *</Label>
                      <Input
                        id="project-name"
                        data-testid="input-project-name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        placeholder="Enter project name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="client">Client</Label>
                      <Select value={newProject.client} onValueChange={(value) => setNewProject({ ...newProject, client: value })}>
                        <SelectTrigger data-testid="select-client">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map(client => (
                            <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contact">Contact</Label>
                      <Select value={newProject.contact} onValueChange={(value) => setNewProject({ ...newProject, contact: value })}>
                        <SelectTrigger data-testid="select-contact">
                          <SelectValue placeholder="Select contact" />
                        </SelectTrigger>
                        <SelectContent>
                          {contacts.map(contact => (
                            <SelectItem key={contact.id} value={contact.name}>{contact.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        data-testid="input-start-date"
                        type="date"
                        value={newProject.startDate}
                        onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        data-testid="input-end-date"
                        type="date"
                        value={newProject.endDate}
                        onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={newProject.status} onValueChange={(value) => setNewProject({ ...newProject, status: value })}>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="On Hold">On Hold</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)} data-testid="cancel-btn">Cancel</Button>
                    <Button onClick={handleAddProject} className="bg-blue-600 hover:bg-blue-700" data-testid="save-project-btn">Save</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>


          {/* Projects Table */}
          <div className="border rounded-lg overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 py-3 px-4">
                    <Checkbox
                      checked={selectedRows.length === paginatedProjects.length && paginatedProjects.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(checked)}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Project ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Project Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Start Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">End Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Created By</th>
                </tr>
                {/* Filter Row */}
                <tr className="bg-gray-50">
                  <th className="py-2 px-4"></th>
                  <th className="py-2 px-4">
                    <Input
                      placeholder="Filter ID..."
                      value={filters.id}
                      onChange={(e) => setFilters({ ...filters, id: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </th>
                  <th className="py-2 px-4">
                    <Input
                      placeholder="Filter Name..."
                      value={filters.name}
                      onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </th>
                  <th className="py-2 px-4">
                    <Select value={filters.client} onValueChange={(value) => setFilters({ ...filters, client: value === 'all' ? '' : value })}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {clients.map(client => (
                          <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </th>
                  <th className="py-2 px-4">
                    <Input
                      placeholder="Filter Contact..."
                      value={filters.contact}
                      onChange={(e) => setFilters({ ...filters, contact: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </th>
                  <th className="py-2 px-4">
                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? '' : value })}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </th>
                  <th className="py-2 px-4">
                    <Input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </th>
                  <th className="py-2 px-4">
                    <Input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </th>
                  <th className="py-2 px-4">
                    <Input
                      placeholder="Filter Creator..."
                      value={filters.createdBy}
                      onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project) => (
                    <tr key={project.id} className="border-t hover:bg-gray-50" data-testid={`project-row-${project.id}`}>
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedRows.includes(project.id)}
                          onCheckedChange={(checked) => handleSelectRow(project.id, checked)}
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap" onClick={() => navigate(`/projects/${project.id}`)}>{project.id}</td>
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap" onClick={() => navigate(`/projects/${project.id}`)}>{project.name}</td>
                      <td className="py-3 px-4 text-sm whitespace-nowrap">{project.client}</td>
                      <td className="py-3 px-4 text-sm whitespace-nowrap">{project.contact}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${project.status === 'Completed' ? 'bg-green-500' : project.status === 'On Hold' ? 'bg-yellow-500' : 'bg-blue-500'} text-white whitespace-nowrap`}>{project.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm whitespace-nowrap">{project.startDate}</td>
                      <td className="py-3 px-4 text-sm whitespace-nowrap">{project.endDate}</td>
                      <td className="py-3 px-4 text-sm whitespace-nowrap">{project.createdBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-8 text-gray-500">
                      No projects found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600 whitespace-nowrap">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length}
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