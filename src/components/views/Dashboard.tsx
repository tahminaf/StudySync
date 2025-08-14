import React from 'react';
import { Calendar, Plus, CheckCircle, Circle, Clock } from 'lucide-react';
import { BookOpen, Target, TrendingUp } from 'lucide-react';
import { Task, ScheduleItem, Course } from '../../types';
import { StatsCard } from '../ui/StatsCard';
import { getPriorityColor, getDateString, calculateCompletionPercentage } from '../../utils/helpers';

interface DashboardProps {
  tasks: Task[];
  schedule: ScheduleItem[];
  courses: Course[];
  toggleTask: (id: number) => void;
  onAddTask: () => void;
  onAddSchedule: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  tasks,
  schedule,
  courses,
  toggleTask,
  onAddTask,
  onAddSchedule
}) => {
  const todaySchedule = schedule.filter(item => item.day === 'Monday'); // You can make this dynamic
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back!
          </h1>
          <p className="text-gray-600 mt-2">
            {getDateString(new Date())}
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={onAddTask}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Add Task
          </button>
          <button 
            onClick={onAddSchedule}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Add Class
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Courses"
          value={courses.length}
          icon={BookOpen}
          gradient="from-blue-500 to-blue-600"
          subtitle="Active courses"
        />
        
        <StatsCard
          title="Completed"
          value={completedTasks.length}
          icon={CheckCircle}
          gradient="from-green-500 to-green-600"
          progress={calculateCompletionPercentage(tasks)}
        />
        
        <StatsCard
          title="Pending Tasks"
          value={pendingTasks.length}
          icon={Target}
          gradient="from-orange-500 to-orange-600"
          subtitle={`${tasks.filter(t => !t.completed && t.priority === 'high').length} high priority`}
        />
        
        <StatsCard
          title="Study Streak"
          value="7 days"
          icon={TrendingUp}
          gradient="from-purple-500 to-purple-600"
          subtitle="Keep it up! 🔥"
        />
      </div>

      {/* Schedule & Tasks */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Today's Schedule</h2>
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-4">
            {todaySchedule.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No classes scheduled for today</p>
              </div>
            ) : (
              todaySchedule.map(item => (
                <div key={item.id} className={`p-4 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transform hover:scale-102 transition-all`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-white text-opacity-90">{item.professor}</p>
                      <p className="text-white text-opacity-75 text-sm">{item.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.time}</p>
                      <p className="text-white text-opacity-75 text-sm">{item.duration}min</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Tasks</h2>
            <Plus 
              className="w-6 h-6 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" 
              onClick={onAddTask}
            />
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {pendingTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>All tasks completed! 🎉</p>
              </div>
            ) : (
              pendingTasks.slice(0, 6).map(task => (
                <div key={task.id} className={`p-4 rounded-xl border-l-4 ${getPriorityColor(task.priority)} shadow-md transition-all`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <p className="text-gray-600 text-sm">{task.course}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Due: {new Date(task.due).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-gray-400 hover:text-green-500 transition-colors"
                      >
                        <Circle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};