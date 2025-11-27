import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Trash2, Eye, Edit } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { format } from 'date-fns';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

export const LabourCategory = () => {
    const { labourCategories, addLabourCategory, currentUser } = useApp();
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showAddCategoryTypeDialog, setShowAddCategoryTypeDialog] = useState(false);
    const [newCategoryType, setNewCategoryType] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [categoryTypes, setCategoryTypes] = useState([
        'Project Manager',
        'Senior Developer',
        'Developer',
        'Junior Developer',
        'Designer',
        'QA Engineer',
        'DevOps Engineer',
        'Business Analyst',
        'Architect'
    ]);
    const [newCategory, setNewCategory] = useState({
        name: '',
        hourlyCost: '',
        billingRate: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalPages = Math.ceil(labourCategories.length / itemsPerPage);
    const paginatedCategories = labourCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleAddCategoryType = () => {
        if (!newCategoryType.trim()) return;
        if (!categoryTypes.includes(newCategoryType)) {
            setCategoryTypes([...categoryTypes, newCategoryType]);
            setNewCategory({ ...newCategory, name: newCategoryType });
        }
        setShowAddCategoryTypeDialog(false);
        setNewCategoryType('');
    };

    const handleAddCategory = () => {
        if (!newCategory.name || !newCategory.hourlyCost || !newCategory.billingRate) return;

        const category = {
            id: `lc${Date.now()}`,
            ...newCategory,
            hourlyCost: Number(newCategory.hourlyCost),
            billingRate: Number(newCategory.billingRate),
            createdOn: new Date().toISOString().split('T')[0],
            createdBy: currentUser
        };

        addLabourCategory(category);
        setShowAddDialog(false);
        setNewCategory({ name: '', hourlyCost: '', billingRate: '' });
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(paginatedCategories.map(c => c.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id, checked) => {
        if (checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter(i => i !== id));
        }
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedRows.length} labour category(s)?`)) {
            alert('Delete functionality needs updateProject in context');
            setSelectedRows([]);
        }
    };

    const handleView = () => {
        if (selectedRows.length === 1) {
            const cat = labourCategories.find(c => c.id === selectedRows[0]);
            alert(`Viewing category: ${cat.name}`);
        }
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const cat = labourCategories.find(c => c.id === selectedRows[0]);
            alert(`Editing category: ${cat.name}`);
        }
    };

    return (
        <div className="space-y-6" data-testid="labour-category-tab">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h3 className="text-xl font-semibold text-gray-900">Labour Categories</h3>

                    {/* Toolbar - appears when rows are selected (placed beside title) */}
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
                        <Button className="bg-blue-600 hover:bg-blue-700" data-testid="add-category-btn">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Labour Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add Labour Category</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="category-name">Labour Category Name *</Label>
                                <Select value={newCategory.name} onValueChange={(value) => {
                                    if (value === 'add_new') {
                                        setShowAddCategoryTypeDialog(true);
                                    } else {
                                        setNewCategory({ ...newCategory, name: value });
                                    }
                                }}>
                                    <SelectTrigger data-testid="select-category-name">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoryTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                        <div className="border-t mt-1 pt-1">
                                            <SelectItem value="add_new" className="text-blue-600 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Plus className="h-4 w-4" />
                                                    Add Category Type
                                                </div>
                                            </SelectItem>
                                        </div>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="hourly-cost">Hourly Labour Cost *</Label>
                                <Input
                                    id="hourly-cost"
                                    type="number"
                                    value={newCategory.hourlyCost}
                                    onChange={(e) => setNewCategory({ ...newCategory, hourlyCost: e.target.value })}
                                    placeholder="0"
                                    data-testid="input-hourly-cost"
                                />
                            </div>
                            <div>
                                <Label htmlFor="billing-rate">Client Billing Rate *</Label>
                                <Input
                                    id="billing-rate"
                                    type="number"
                                    value={newCategory.billingRate}
                                    onChange={(e) => setNewCategory({ ...newCategory, billingRate: e.target.value })}
                                    placeholder="0"
                                    data-testid="input-billing-rate"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowAddDialog(false)} data-testid="cancel-category-btn">Cancel</Button>
                            <Button onClick={handleAddCategory} className="bg-blue-600 hover:bg-blue-700" data-testid="save-category-btn">Save</Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Add Category Type Dialog */}
                <Dialog open={showAddCategoryTypeDialog} onOpenChange={setShowAddCategoryTypeDialog}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Category Type</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <Label>Category Type Name *</Label>
                                <Input
                                    value={newCategoryType}
                                    onChange={(e) => setNewCategoryType(e.target.value)}
                                    placeholder="e.g. Tech Lead"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddCategoryType();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => {
                                setShowAddCategoryTypeDialog(false);
                                setNewCategoryType('');
                            }}>Cancel</Button>
                            <Button onClick={handleAddCategoryType} className="bg-blue-600 hover:bg-blue-700">Add</Button>
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
                                    checked={selectedRows.length === paginatedCategories.length && paginatedCategories.length > 0}
                                    onCheckedChange={(checked) => handleSelectAll(checked)}
                                />
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Labour Category Name</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hourly Labour Cost</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client Billing Rate</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created On</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created By</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {paginatedCategories.length > 0 ? (
                            paginatedCategories.map((category) => (
                                <tr key={category.id} className="border-t hover:bg-gray-50" data-testid={`category-row-${category.id}`}>
                                    <td className="py-3 px-4">
                                        <Checkbox
                                            checked={selectedRows.includes(category.id)}
                                            onCheckedChange={(checked) => handleSelectRow(category.id, checked)}
                                        />
                                    </td>
                                    <td className="py-3 px-4 text-sm font-medium">{category.name}</td>
                                    <td className="py-3 px-4 text-sm">${category.hourlyCost}/hr</td>
                                    <td className="py-3 px-4 text-sm">${category.billingRate}/hr</td>
                                    <td className="py-3 px-4 text-sm">{category.createdOn}</td>
                                    <td className="py-3 px-4 text-sm">{category.createdBy}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">
                                    No labour categories found. Click "Add Labour Category" to create one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600 whitespace-nowrap">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, labourCategories.length)} of {labourCategories.length}
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
        </div >
    );
};
