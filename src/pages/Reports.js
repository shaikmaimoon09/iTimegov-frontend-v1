import React, { useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Download, Calendar } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EmployeeReport } from '../components/reports/EmployeeReport';
import { ManagerReport } from '../components/reports/ManagerReport';
import { AdminReport } from '../components/reports/AdminReport';

import { toast } from 'sonner';

export const Reports = () => {
  const reportRef = useRef(null);
  const [frequency, setFrequency] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    const loadingToast = toast.loading('Generating PDF report...');

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`TimeTracker_Report_${new Date().toISOString().split('T')[0]}.pdf`);

      toast.dismiss(loadingToast);
      toast.success("Report downloaded successfully!");

    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to generate PDF.");
    }
  };

  return (
    <div className="space-y-6" data-testid="reports-page">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-500">Enterprise project performance and insights.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Global Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          {/* Frequency Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">View:</label>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setFrequency('daily')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${frequency === 'daily'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Daily
              </button>
              <button
                onClick={() => setFrequency('weekly')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${frequency === 'weekly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setFrequency('monthly')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${frequency === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Month Picker */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              <Calendar className="h-4 w-4 inline mr-1" />
              Month:
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="ml-auto text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      <div ref={reportRef} className="p-4 bg-white rounded-xl">
        <Tabs defaultValue="employee" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] p-1 bg-gray-100/80">
            <TabsTrigger value="employee" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Employee</TabsTrigger>
            <TabsTrigger value="manager" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Manager</TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Admin</TabsTrigger>

          </TabsList>

          <TabsContent value="employee" className="space-y-4 animate-in fade-in-50 duration-500">
            <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">My Task Performance</h3>
              <EmployeeReport frequency={frequency} selectedMonth={selectedMonth} />
            </div>
          </TabsContent>

          <TabsContent value="manager" className="space-y-4 animate-in fade-in-50 duration-500">
            <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Project Dashboard</h3>
              <ManagerReport frequency={frequency} selectedMonth={selectedMonth} />
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4 animate-in fade-in-50 duration-500">
            <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
              {/* <h3 className="text-xl font-semibold mb-4 text-purple-700">Budget & Allocations</h3> */}
              <AdminReport frequency={frequency} selectedMonth={selectedMonth} />
            </div>
          </TabsContent>


        </Tabs>
      </div>
    </div>
  );
};