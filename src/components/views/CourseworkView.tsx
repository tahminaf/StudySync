import React from 'react';
import { CheckCircle, Circle, Star, Edit, Trash2 } from 'lucide-react';
import { Task, Course } from '../../types';
import {
  getPriorityColor,
  getPriorityBadgeColor,
  calculateCompletionPercentage,
  filterTasksByPriority,
  getTasksByCourse
} from '../../utils/helpers';

interface CourseworkViewProps {
  tasks: Task[];
  courses: Course[];
  toggleTask: (id: number) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onAddTask: () => void;
}

export const CourseworkView: React.FC<CourseworkViewProps> = ({
  tasks,
  courses,
  toggleTask,
  onEditTask,
  onDeleteTask,
  onAddTask
}) => {
  const completionPercentage = calculateCompletionPercentage(tasks);
  const highPriorityTasks = filterTasksByPriority(tasks, 'high');
  const mediumPriorityTasks = filterTasksByPriority(tasks, 'medium');
  const lowPriorityTasks = filterTasksByPriority(tasks, 'low');

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Coursework Manager
        </h1>
        <button 
          onClick={onAddTask}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Add Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {tasks.map(task => (
            <div key={task.id} className={`bg-white rounded-2xl shadow-xl p-6 border-l-4 ${getPriorityColor(task.priority)} group hover:shadow-2xl transition-all`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-1"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors" />
                    )}
                  </button>
                  <div>
                    <h2 className="text-xl font-semibold">{task.title}</h2>
                    <p className="text-gray-500">{task.description}</p>
                    <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${getPriorityBadgeColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => onEditTask(task)} className="text-blue-500 hover:text-blue-700">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => onDeleteTask(task.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold mb-2">Completion</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">{completionPercentage}% completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
