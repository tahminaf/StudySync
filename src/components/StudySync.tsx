import React, { useState } from 'react';
import { TabType, Task, ScheduleItem, NewTask, NewScheduleItem } from '../types';
import { useTasks } from '../hooks/useTasks';
import { Sidebar } from './ui/Sidebar';
import { Modal } from './ui/Modal';
import { TaskForm } from './forms/TaskForm';
import { ScheduleForm } from './forms/ScheduleForm';
import { Dashboard } from './views/Dashboard';
import { WeeklyView } from './views/WeeklyView';
import { DailyView } from './views/DailyView';
import { CourseworkView } from './views/CourseworkView';

export const StudySync: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);

  const {
    tasks,
    schedule,
    courses,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem
  } = useTasks();

  // Task handlers
  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleTaskSubmit = (taskData: NewTask) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...taskData });
    } else {
      addTask(taskData);
    }
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleTaskCancel = () => {
    setShowTaskModal(false);
    setEditingTask(null);
  };

  // Schedule handlers
  const handleAddSchedule = () => {
    setEditingSchedule(null);
    setShowScheduleModal(true);
  };

  const handleEditSchedule = (scheduleItem: ScheduleItem) => {
    setEditingSchedule(scheduleItem);
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = (scheduleData: NewScheduleItem) => {
    if (editingSchedule) {
      updateScheduleItem({ ...editingSchedule, ...scheduleData });
    } else {
      addScheduleItem(scheduleData);
    }
    setShowScheduleModal(false);
    setEditingSchedule(null);
  };

  const handleScheduleCancel = () => {
    setShowScheduleModal(false);
    setEditingSchedule(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Custom Styles */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tasks={tasks}
      />

      {/* Main Content */}
      <div className="ml-72 p-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            tasks={tasks}
            schedule={schedule}
            courses={courses}
            toggleTask={toggleTask}
            onAddTask={handleAddTask}
            onAddSchedule={handleAddSchedule}
          />
        )}
        
        {activeTab === 'weekly' && (
          <WeeklyView
            schedule={schedule}
            onAddSchedule={handleAddSchedule}
            onEditSchedule={handleEditSchedule}
            onDeleteSchedule={deleteScheduleItem}
          />
        )}
        
        {activeTab === 'daily' && (
          <DailyView
            tasks={tasks}
            schedule={schedule}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            toggleTask={toggleTask}
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            onAddTask={handleAddTask}
          />
        )}
        
        {activeTab === 'coursework' && (
          <CourseworkView
            tasks={tasks}
            courses={courses}
            toggleTask={toggleTask}
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            onAddTask={handleAddTask}
          />
        )}
      </div>

      {/* Task Modal */}
      <Modal
        show={showTaskModal}
        onClose={handleTaskCancel}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <TaskForm
          task={editingTask}
          courses={courses}
          onSubmit={handleTaskSubmit}
          onCancel={handleTaskCancel}
        />
      </Modal>

      {/* Schedule Modal */}
      <Modal
        show={showScheduleModal}
        onClose={handleScheduleCancel}
        title={editingSchedule ? 'Edit Class' : 'Add New Class'}
      >
        <ScheduleForm
          scheduleItem={editingSchedule}
          onSubmit={handleScheduleSubmit}
          onCancel={handleScheduleCancel}
        />
      </Modal>
    </div>
  );
};