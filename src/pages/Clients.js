import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Plus, Trash2, Eye, Edit } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';

export const Clients = () => {
  const { clients, setClients, setContacts, contacts, currentUser } = useApp();
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAddIndustryDialog, setShowAddIndustryDialog] = useState(false);
  const [newIndustryType, setNewIndustryType] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [industryTypes, setIndustryTypes] = useState([
    'Technology',
    'Consulting',
    'Finance',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Education'
  ]);
  const [newClient, setNewClient] = useState({
    id: '',
    name: '',
    industry: '',
    status: 'Active',
    contactPerson: '',
    email: '',
    phone: '',
    designation: '', // Added for contact creation
    createdOn: new Date().toISOString().split('T')[0],
    createdBy: currentUser
  });

  // State for multiple contacts
  const [clientContacts, setClientContacts] = useState([
    { name: '', email: '', phone: '', designation: '' }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const paginatedClients = clients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddIndustry = () => {
    if (!newIndustryType.trim()) return;
    if (!industryTypes.includes(newIndustryType)) {
      setIndustryTypes([...industryTypes, newIndustryType]);
      setNewClient({ ...newClient, industry: newIndustryType });
    }
    setShowAddIndustryDialog(false);
    setNewIndustryType('');
  };

  const handleAddClient = () => {
    if (!newClient.name) return;

    // Use the first contact as the primary contact for the client record
    const primaryContact = clientContacts[0] || {};

    // Create Client
    const clientEntry = {
      ...newClient,
      contactPerson: primaryContact.name || '',
      email: primaryContact.email || '',
      phone: primaryContact.phone || '',
      designation: primaryContact.designation || '',
      id: `cl${Date.now()}` // Simple ID generation
    };
    setClients([...clients, clientEntry]);

    // Create Contacts - filter out empty contacts and create entries
    const newContacts = clientContacts
      .filter(c => c.name && c.name.trim() !== '')
      .map((c, index) => ({
        id: `con${Date.now()}-${index}`,
        name: c.name,
        email: c.email || 'N/A',
        phone: c.phone || 'N/A',
        company: newClient.name,
        designation: c.designation || 'N/A',
        status: 'Active'
      }));

    if (newContacts.length > 0) {
      setContacts([...contacts, ...newContacts]);
    }

    setShowAddDialog(false);
    setNewClient({
      id: '',
      name: '',
      industry: '',
      status: 'Active',
      contactPerson: '',
      email: '',
      phone: '',
      designation: '',
      createdOn: new Date().toISOString().split('T')[0],
      createdBy: currentUser
    });
    // Reset contacts to initial state
    setClientContacts([{ name: '', email: '', phone: '', designation: '' }]);
  };

  const handleAddContactRow = () => {
    setClientContacts([...clientContacts, { name: '', email: '', phone: '', designation: '' }]);
  };

  const handleRemoveContactRow = (index) => {
    const updatedContacts = clientContacts.filter((_, i) => i !== index);
    setClientContacts(updatedContacts);
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...clientContacts];
    updatedContacts[index][field] = value;
    setClientContacts(updatedContacts);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(paginatedClients.map(c => c.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (clientId, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, clientId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== clientId));
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} client(s)?`)) {
      setClients(clients.filter(c => !selectedRows.includes(c.id)));
      setSelectedRows([]);
    }
  };

  const handleView = () => {
    if (selectedRows.length === 1) {
      const client = clients.find(c => c.id === selectedRows[0]);
      alert(`Viewing client: ${client.name}`);
    }
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const client = clients.find(c => c.id === selectedRows[0]);
      alert(`Editing client: ${client.name}`);
    }
  };

  return (
    <div className="space-y-6" data-testid="clients-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>

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
                <Button data-testid="add-client-btn" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                </DialogHeader>
                <div
                  className="space-y-4 py-4 overflow-y-auto"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'white #f3f4f6'
                  }}
                >
                  <div>
                    <Label>Client Name *</Label>
                    <Input
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <Select value={newClient.industry} onValueChange={(value) => {
                      if (value === 'add_new') {
                        setShowAddIndustryDialog(true);
                      } else {
                        setNewClient({ ...newClient, industry: value });
                      }
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                        <div className="border-t mt-1 pt-1">
                          <SelectItem value="add_new" className="text-blue-600 font-medium">
                            <div className="flex items-center gap-2">
                              <Plus className="h-4 w-4" />
                              Add Industry Type
                            </div>
                          </SelectItem>
                        </div>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-4 mt-4 max-w-full overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-gray-700">Contact Details (Optional)</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleAddContactRow}
                          className="h-6 w-6 p-0 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                          title="Add another contact"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-xs text-gray-500">Create contact entries for this client</span>
                    </div>

                    <div
                      className="flex overflow-x-auto gap-3 pb-4"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'white #f3f4f6'
                      }}
                    >
                      {clientContacts.map((contact, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg relative group min-w-[250px] flex-shrink-0">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-700">Contact #{index + 1}</h4>
                            {clientContacts.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveContactRow(index)}
                                className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label>Contact Person Name</Label>
                              <Input
                                value={contact.name}
                                onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                                placeholder="e.g. John Doe"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>Email</Label>
                                <Input
                                  type="email"
                                  value={contact.email}
                                  onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                                  placeholder="email@example.com"
                                />
                              </div>
                              <div>
                                <Label>Phone</Label>
                                <Input
                                  value={contact.phone}
                                  onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                                  placeholder="+1234567890"
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Designation</Label>
                              <Input
                                value={contact.designation}
                                onChange={(e) => handleContactChange(index, 'designation', e.target.value)}
                                placeholder="e.g. Manager"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 italic mt-2">
                      * All added contacts will be created automatically. The first contact will be set as the primary contact for the client.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 border-t pt-4 mt-4">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                  <Button onClick={handleAddClient} className="bg-blue-600 hover:bg-blue-700">Save</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add Industry Type Dialog */}
            <Dialog open={showAddIndustryDialog} onOpenChange={setShowAddIndustryDialog}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Industry Type</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Industry Type Name *</Label>
                    <Input
                      value={newIndustryType}
                      onChange={(e) => setNewIndustryType(e.target.value)}
                      placeholder="e.g. Telecommunications"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddIndustry();
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => {
                    setShowAddIndustryDialog(false);
                    setNewIndustryType('');
                  }}>Cancel</Button>
                  <Button onClick={handleAddIndustry} className="bg-blue-600 hover:bg-blue-700">Add</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 py-3 px-4">
                    <Checkbox
                      checked={selectedRows.length === paginatedClients.length && paginatedClients.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Industry</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact Person</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created On</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedClients.map((client) => (
                  <tr key={client.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Checkbox
                        checked={selectedRows.includes(client.id)}
                        onCheckedChange={(checked) => handleSelectRow(client.id, checked)}
                      />
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">
                      <button
                        onClick={() => navigate(`/clients/${client.id}`)}
                        className="text-blue-600 hover:underline focus:outline-none"
                      >
                        {client.name}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-sm">{client.industry}</td>
                    <td className="py-3 px-4 text-sm">{client.contactPerson}</td>
                    <td className="py-3 px-4 text-sm">{client.email}</td>
                    <td className="py-3 px-4 text-sm">{client.phone}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">{client.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{client.createdOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600 whitespace-nowrap">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, clients.length)} of {clients.length}
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
    </div >
  );
};