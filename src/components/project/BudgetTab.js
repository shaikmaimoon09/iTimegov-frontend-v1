import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { isWithinInterval, parseISO } from 'date-fns';

export const BudgetTab = ({ project }) => {
  const { addMonthlyBudget } = useApp();
  const budgetData = project.budget || [];
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState({});
  const [newBudget, setNewBudget] = useState({
    month: '',
    plannedHours: '',
    plannedBudget: '',
    associatedMilestones: [],
    notes: ''
  });

  // Added state for milestone dropdown and selections
  const [milestoneDropdownOpen, setMilestoneDropdownOpen] = useState(false);
  const [selectedMilestoneIds, setSelectedMilestoneIds] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleAddBudget = () => {
    if (!newBudget.month || !newBudget.plannedHours || !newBudget.plannedBudget) return;

    const budgetItem = {
      month: newBudget.month,
      plannedHours: Number(newBudget.plannedHours),
      plannedBudget: Number(newBudget.plannedBudget),
      associatedMilestones: selectedMilestoneIds,
      notes: newBudget.notes,
      actualHours: 0,
      actualCost: 0,
      ev: 0,
      sv: -Number(newBudget.plannedBudget),
      cv: 0,
      spi: 0,
      cpi: 0
    };

    addMonthlyBudget(project.id, budgetItem);
    setShowAddDialog(false);
    setSelectedMilestoneIds([]);
    setMilestoneDropdownOpen(false);
    setNewBudget({ month: '', plannedHours: '', plannedBudget: '', associatedMilestones: [], notes: '' });
  };

  const toggleMilestoneSelection = (milestoneId) => {
    setSelectedMilestoneIds(prev =>
      prev.includes(milestoneId) ? prev.filter(id => id !== milestoneId) : [...prev, milestoneId]
    );
  };

  const toggleMonth = (month) => {
    setExpandedMonths(prev => ({ ...prev, [month]: !prev[month] }));
  };

  const getMilestonesForMonth = (monthName) => {
    if (!project.milestones) return [];

    const monthIndex = months.indexOf(monthName);
    if (monthIndex === -1) return [];

    // Create a date range for the selected month in the current year (assuming 2025 for now based on context)
    const year = 2025;
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    return project.milestones.filter(m => {
      const mStart = parseISO(m.startDate);
      const mEnd = parseISO(m.endDate);

      // Check if milestone overlaps with the month
      return (
        isWithinInterval(mStart, { start: startDate, end: endDate }) ||
        isWithinInterval(mEnd, { start: startDate, end: endDate }) ||
        (mStart < startDate && mEnd > endDate)
      );
    });
  };

  return (
    <div className="space-y-6" data-testid="budget-tab">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Contract Budget (Monthly PV/EV/AC)</h3>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700" data-testid="add-budget-btn">
              <Plus className="h-4 w-4 mr-2" />
              Add Monthly Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Monthly Budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="month">Month *</Label>
                <Select value={newBudget.month} onValueChange={(value) => setNewBudget({ ...newBudget, month: value })}>
                  <SelectTrigger data-testid="select-budget-month">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="planned-hours">Planned Hours *</Label>
                <Input
                  id="planned-hours"
                  type="number"
                  value={newBudget.plannedHours}
                  onChange={(e) => setNewBudget({ ...newBudget, plannedHours: e.target.value })}
                  placeholder="0"
                  data-testid="input-planned-hours"
                />
              </div>
              <div>
                <Label htmlFor="planned-budget">Planned Budget (PV) *</Label>
                <Input
                  id="planned-budget"
                  type="number"
                  value={newBudget.plannedBudget}
                  onChange={(e) => setNewBudget({ ...newBudget, plannedBudget: e.target.value })}
                  placeholder="0"
                  data-testid="input-planned-budget"
                />
              </div>
              <div>
                <Label>Associated Milestones (Multi-select)</Label>
                <div className="relative">
                  <button
                    type="button"
                    data-testid="milestone-dropdown-btn"
                    onClick={() => setMilestoneDropdownOpen(open => !open)}
                    className="w-full text-left border rounded px-3 py-2 flex items-center justify-between bg-white"
                  >
                    <div className="flex-1 min-w-0 flex items-center flex-wrap gap-1">
                      {selectedMilestoneIds.length === 0 ? (
                        <span className="text-sm text-gray-500">Select milestones...</span>
                      ) : (
                        (project.milestones || [])
                          .filter(m => selectedMilestoneIds.includes(m.id))
                          .map(milestone => (
                            <span
                              key={milestone.id}
                              className="inline-flex items-center bg-gray-100 text-sm text-gray-800 rounded-full px-2 py-0.5 mr-1"
                              data-testid={`selected-milestone-token-${milestone.id}`}
                            >
                              <span className="truncate max-w-[8rem] block">{milestone.name}</span>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); toggleMilestoneSelection(milestone.id); }}
                                className="ml-2 text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={`Remove ${milestone.name}`}
                              >
                                ×
                              </button>
                            </span>
                          ))
                      )}
                    </div>
                    <svg className="h-4 w-4 text-gray-500 ml-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {milestoneDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
                      {(project.milestones && project.milestones.length > 0) ? (
                        (project.milestones || []).map(milestone => (
                          <label key={milestone.id} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              data-testid={`milestone-option-${milestone.id}`}
                              checked={selectedMilestoneIds.includes(milestone.id)}
                              onChange={() => toggleMilestoneSelection(milestone.id)}
                              className="mr-3"
                            />
                            <div className="text-sm">
                              <div className="font-medium text-gray-800">{milestone.name}</div>
                              <div className="text-xs text-gray-500">{milestone.startDate} - {milestone.endDate}</div>
                            </div>
                          </label>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">No milestones available</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newBudget.notes}
                  onChange={(e) => setNewBudget({ ...newBudget, notes: e.target.value })}
                  placeholder="Optional notes..."
                  className="resize-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setShowAddDialog(false); setSelectedMilestoneIds([]); setMilestoneDropdownOpen(false); }} data-testid="cancel-budget-btn">Cancel</Button>
                <Button onClick={handleAddBudget} className="bg-blue-600 hover:bg-blue-700" data-testid="save-budget-btn">Save</Button>
              </div>

            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Monthly Budget Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border rounded-lg overflow-hidden overflow-x-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'white #f3f4f6'
            }}
          >
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Month</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Planned Budget (PV)</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actual Cost (AC)</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Earned Value (EV)</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Schedule Variance (SV)</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Cost Variance (CV)</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">SPI</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">CPI</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Milestones Included</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {budgetData.length > 0 ? (
                  budgetData.map((row, index) => {
                    // Use associatedMilestones if available, otherwise fallback to date-based (or empty)
                    let milestones = [];
                    if (row.associatedMilestones && row.associatedMilestones.length > 0) {
                      milestones = row.associatedMilestones.map(mid => project.milestones?.find(pm => pm.id === mid)).filter(Boolean);
                    } else {
                      milestones = getMilestonesForMonth(row.month);
                    }

                    const isExpanded = expandedMonths[row.month];

                    return (
                      <React.Fragment key={index}>
                        <tr className="border-t hover:bg-gray-50" data-testid={`budget-row-${row.month}`}>
                          <td className="py-3 px-4 text-sm font-medium whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {milestones.length > 0 && (
                                <button onClick={() => toggleMonth(row.month)} className="text-gray-500 hover:text-gray-700">
                                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </button>
                              )}
                              {row.month}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">{row.plannedHours}h</td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">${row.plannedBudget.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">{row.actualHours}h</td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">${row.actualCost.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">${row.ev.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">
                            <span className={row.sv < 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                              ${row.sv.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">
                            <span className={row.cv < 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                              ${row.cv.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">
                            <span className={row.spi < 1 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                              {row.spi.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm whitespace-nowrap">
                            <span className={row.cpi < 1 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                              {row.cpi.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex flex-wrap gap-1">
                              {row.associatedMilestones && row.associatedMilestones.length > 0 ? (
                                row.associatedMilestones.map(mid => {
                                  const m = project.milestones?.find(pm => pm.id === mid);
                                  return m ? (
                                    <Badge key={mid} variant="outline" className="text-xs whitespace-nowrap">
                                      {m.name}
                                    </Badge>
                                  ) : null;
                                })
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <Badge
                              className={`${row.spi >= 1 && row.cpi >= 1 ? 'bg-green-600' :
                                row.spi < 0.8 || row.cpi < 0.8 ? 'bg-red-600' :
                                  'bg-yellow-600'
                                } text-white whitespace-nowrap`}
                            >
                              {row.spi >= 1 && row.cpi >= 1 ? 'On Track' :
                                row.spi < 0.8 || row.cpi < 0.8 ? 'At Risk' :
                                  'Warning'}
                            </Badge>
                          </td>
                        </tr>
                        {isExpanded && milestones.length > 0 && (
                          <tr className="bg-gray-50">
                            <td colSpan="12" className="p-4">
                              <div className="text-sm font-semibold mb-2 text-gray-700">Milestones in {row.month}:</div>
                              <table className="w-full bg-white border rounded-md">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Milestone Name</th>
                                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Start Date</th>
                                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">End Date</th>
                                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {milestones.map(m => (
                                    <tr key={m.id} className="border-t">
                                      <td className="py-2 px-3 text-xs">{m.name}</td>
                                      <td className="py-2 px-3 text-xs">{m.startDate}</td>
                                      <td className="py-2 px-3 text-xs">{m.endDate}</td>
                                      <td className="py-2 px-3 text-xs">
                                        <Badge variant="outline" className="text-xs">{m.status}</Badge>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center py-8 text-gray-500">
                      No budget data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      {
        budgetData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-1">Total Planned Budget</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${budgetData.reduce((sum, b) => sum + b.plannedBudget, 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-1">Total Actual Cost</p>
                <p className="text-2xl font-bold text-green-600">
                  ${budgetData.reduce((sum, b) => sum + b.actualCost, 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-1">Total Earned Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${budgetData.reduce((sum, b) => sum + b.ev, 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
        )
      }
    </div >
  );
};