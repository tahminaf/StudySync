import { Task, Priority } from '../types';
import { PRIORITY_COLORS, PRIORITY_BADGE_COLORS } from './constants';

export const getPriorityColor = (priority: Priority): string => {
  return PRIORITY_COLORS[priority] || PRIORITY_COLORS.low;
};

export const getPriorityBadgeColor = (priority: Priority): string => {
  return PRIORITY_BADGE_COLORS[priority] || PRIORITY_BADGE_COLORS.low;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getDateString = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const calculateCompletionPercentage = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);
};

export const filterTasksByPriority = (tasks: Task[], priority: Priority): Task[] => {
  return tasks.filter(task => task.priority === priority && !task.completed);
};

export const getTasksByCourse = (tasks: Task[], courseName: string): Task[] => {
  return tasks.filter(task => task.course === courseName);
};

export const generateId = (): number => {
  return Date.now() + Math.random();
};