import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Clock,
  CheckCircle,
  FolderKanban,
  Building2,
  Users,
  UserCircle2,
  BarChart3,
  Settings,
  ChevronDown,
  LogOut,
  Menu
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export const Layout = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useApp();
  const [adminOpen, setAdminOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/track', label: 'Track', icon: Clock },
    { path: '/approvals', label: 'Approvals', icon: CheckCircle },
    { path: '/projects', label: 'Projects', icon: FolderKanban },
    { path: '/clients', label: 'Clients', icon: Building2 },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ];

  const adminItems = [
    { path: '/admin/roles', label: 'Roles' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/lookups', label: 'Lookups' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 flex flex-col shadow-lg`}>
        <div className="p-4 flex items-center justify-between border-b border-blue-500">
          {sidebarOpen && <h1 className="text-2xl font-bold">TimeTracker</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-blue-500"
            data-testid="sidebar-toggle-btn"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-blue-50 hover:bg-blue-500'
                  }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}



          {/* Admin Management Collapsible */}
          <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
            <CollapsibleTrigger
              data-testid="nav-admin-toggle"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-50 hover:bg-blue-500 w-full transition-all"
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="font-medium flex-1 text-left">Admin Manage...</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${adminOpen ? 'rotate-180' : ''}`} />
                </>
              )}
            </CollapsibleTrigger>
            {sidebarOpen && (
              <CollapsibleContent className="ml-4 mt-2 space-y-1">
                {adminItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    className={`block px-4 py-2 rounded-lg text-sm ${isActive(item.path)
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-blue-100 hover:bg-blue-500'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800" data-testid="page-title">
              {location.pathname === '/' ? 'Dashboard' :
                location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1)}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 font-medium" data-testid="current-user">{currentUser}</span>
            <Avatar data-testid="user-avatar">
              <AvatarFallback className="bg-blue-600 text-white">SN</AvatarFallback>
            </Avatar>
            <Button
              data-testid="logout-btn"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Log Out
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>Help</span>
            <span>© {new Date().getFullYear()} TimeTracker. All rights reserved.</span>
            <span>Last logged in at {new Date().toLocaleString()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};