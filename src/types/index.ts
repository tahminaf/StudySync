export interface Task {
    id: number;
    title: string;
    course: string;
    due: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    description: string;
  }
  
  export interface ScheduleItem {
    id: number;
    title: string;
    time: string;
    duration: number;
    day: string;
    color: string;
    location: string;
    professor: string;
  }
  
  export interface Course {
    id: number;
    name: string;
    color: string;
    credits: number;
    professor: string;
  }
  
  export type Priority = 'low' | 'medium' | 'high';
  export type TabType = 'dashboard' | 'weekly' | 'daily' | 'coursework';
  
  export interface NewTask {
    title: string;
    course: string;
    due: string;
    priority: Priority;
    description: string;
  }
  
  export interface NewScheduleItem {
    title: string;
    time: string;
    duration: number;
    day: string;
    color: string;
    location: string;
    professor: string;
  }