import React from 'react';
import { Home, Calendar, Clock, BookOpen } from 'lucide-react';
import { TabType, Task } from '../../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  tasks: Task[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, tasks }) => {
  const menuItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home, gradient: 'from-blue-500 to-blue-600', hover: 'hover:from-blue-50 hover:to-purple-50' },
    { id: 'weekly' as TabType, label: 'Weekly Schedule', icon: Calendar, gradient: 'from-purple-500 to-purple-600', hover: 'hover:from-purple-50 hover:to-pink-50' },
    { id: 'daily' as TabType, label: 'Daily View', icon: Clock, gradient: 'from-green-500 to-green-600', hover: 'hover:from-green-50 hover:to-blue-50' },
    { id: 'coursework' as TabType, label: 'Coursework', icon: BookOpen, gradient: 'from-orange-500 to-orange-600', hover: 'hover:from-orange-50 hover:to-red-50' }
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
        <h1 className="text-3xl font-bold text-white">StudySync</h1>
      </div>
      
      {/* Navigation */}
      <nav className="mt-8 px-6 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-left transition-all transform hover:scale-105 ${
                isActive 
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                  : `text-gray-700 hover:bg-gradient-to-r ${item.hover}`
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-semibold text-lg">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="absolute bottom-8 left-6 right-6">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 text-white">
          <h3 className="font-semibold mb-3">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Tasks:</span>
              <span className="font-bold">{tasks.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Completed:</span>
              <span className="font-bold text-green-400">{tasks.filter(t => t.completed).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending:</span>
              <span className="font-bold text-orange-400">{tasks.filter(t => !t.completed).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};