import { useState } from 'react';
import { Task, ScheduleItem, Course, NewTask, NewScheduleItem } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/helpers';

const DEFAULT_TASKS: Task[] = [
];

const DEFAULT_SCHEDULE: ScheduleItem[] = [
];

const DEFAULT_COURSES: Course[] = [
];

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('studysync-tasks', DEFAULT_TASKS);
  const [schedule, setSchedule] = useLocalStorage<ScheduleItem[]>('studysync-schedule', DEFAULT_SCHEDULE);
  const [courses, setCourses] = useLocalStorage<Course[]>('studysync-courses', DEFAULT_COURSES);

  // Task functions
  const addTask = (newTask: NewTask) => {
    const task: Task = {
      id: generateId(),
      ...newTask,
      completed: false
    };
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Schedule functions
  const addScheduleItem = (newScheduleItem: NewScheduleItem) => {
    const scheduleItem: ScheduleItem = {
      id: generateId(),
      ...newScheduleItem
    };
    setSchedule([...schedule, scheduleItem]);
  };

  const updateScheduleItem = (updatedScheduleItem: ScheduleItem) => {
    setSchedule(schedule.map(item => 
      item.id === updatedScheduleItem.id ? updatedScheduleItem : item
    ));
  };

  const deleteScheduleItem = (id: number) => {
    setSchedule(schedule.filter(item => item.id !== id));
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      id: generateId(),
      ...course
    };
    setCourses([...courses, newCourse]);
  };

  return {
    tasks,
    schedule,
    courses,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem,
    addCourse
  };
};