import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { ScheduleItem } from '../../types';
import { WEEK_DAYS, TIME_SLOTS } from '../../utils/constants';

interface WeeklyViewProps {
  schedule: ScheduleItem[];
  onAddSchedule: () => void;
  onEditSchedule: (item: ScheduleItem) => void;
  onDeleteSchedule: (id: number) => void;
}

export const WeeklyView: React.FC<WeeklyViewProps> = ({
  schedule,
  onAddSchedule,
  onEditSchedule,
  onDeleteSchedule
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Weekly Schedule
        </h1>
        <button 
          onClick={onAddSchedule}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Add Class
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-r border-gray-200">
            <span className="font-semibold text-gray-700">Time</span>
          </div>
          {WEEK_DAYS.map(day => (
            <div key={day} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-r border-gray-200 last:border-r-0 text-center">
              <span className="font-semibold text-gray-700">{day}</span>
            </div>
          ))}
        </div>

        <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
          {TIME_SLOTS.map(time => (
            <div key={time} className="grid grid-cols-8 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="p-4 border-r border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <span className="text-sm font-medium text-gray-600">{time}</span>
              </div>
              {WEEK_DAYS.map(day => (
                <div key={day} className="p-2 border-r border-gray-100 last:border-r-0 min-h-20 relative">
                  {schedule
                    .filter(item => item.day === day && item.time === time)
                    .map(item => (
                      <div key={item.id} className={`bg-gradient-to-r ${item.color} text-white p-3 rounded-lg text-xs font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all group cursor-pointer`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="opacity-90">{item.location}</p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => onEditSchedule(item)}
                              className="text-white hover:text-gray-200 mr-1"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onDeleteSchedule(item.id)}
                              className="text-white hover:text-red-200"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};