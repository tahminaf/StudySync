import React from 'react';
import { CheckCircle, Circle, Edit, Trash2 } from 'lucide-react';
import { Task, ScheduleItem } from '../../types';
import { TIME_SLOTS } from '../../utils/constants';
import { getPriorityColor } from '../../utils/helpers';

interface DailyViewProps {
  tasks: Task[];
  schedule: ScheduleItem[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  toggleTask: (id: number) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onAddTask: () => void;
}

export const DailyView: React.FC<DailyViewProps> = ({
  tasks,
  schedule,
  selectedDate,
  setSelectedDate,
  toggleTask,
  onEditTask,
  onDeleteTask,
  onAddTask
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Daily Planner
        </h1>
        <div className="flex items-center space-x-4">
          <input 
            type="date" 
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md transition-all"
          />
          <button 
            onClick={onAddTask}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Schedule</h2>
          <div className="space-y-3">
            {TIME_SLOTS.map(time => (
              <div key={time} className="flex items-center space-x-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-20 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                  {time}
                </div>
                <div className="flex-1">
                  {schedule
                    .filter(item => item.time === time)
                    .map(item => (
                      <div key={item.id} className={`bg-gradient-to-r ${item.color} text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-102 transition-all`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-white text-opacity-90">{item.professor}</p>
                            <p className="text-white text-opacity-75 text-sm">{item.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-opacity-75 text-sm">{item.duration} min</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tasks for Today</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {tasks.map(task => (
              <div key={task.id} className={`p-4 rounded-xl border-l-4 ${getPriorityColor(task.priority)} shadow-md group`}>
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 hover:text-green-500 transition-colors" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{task.course}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Due: {new Date(task.due).toLocaleDateString()}
                    </p>
                    {task.description && (
                      <p className="text-gray-500 text-xs mt-1">{task.description}</p>
                    )}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                    <button
                      onClick={() => onEditTask(task)}
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};