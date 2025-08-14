import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { ScheduleItem, NewScheduleItem } from '../../types';
import { WEEK_DAYS, COLOR_OPTIONS } from '../../utils/constants';

interface ScheduleFormProps {
  scheduleItem?: ScheduleItem | null;
  onSubmit: (item: NewScheduleItem) => void;
  onCancel: () => void;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ scheduleItem, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<NewScheduleItem>({
    title: '',
    time: '09:00',
    duration: 60,
    day: 'Monday',
    color: 'from-blue-500 to-blue-600',
    location: '',
    professor: ''
  });

  useEffect(() => {
    if (scheduleItem) {
      setFormData({
        title: scheduleItem.title,
        time: scheduleItem.time,
        duration: scheduleItem.duration,
        day: scheduleItem.day,
        color: scheduleItem.color,
        location: scheduleItem.location,
        professor: scheduleItem.professor
      });
    }
  }, [scheduleItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter class name"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
          <select
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {WEEK_DAYS.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 60 })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="60"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professor</label>
        <input
          type="text"
          value={formData.professor}
          onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Professor name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Room number or location"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
        <div className="grid grid-cols-4 gap-2">
          {COLOR_OPTIONS.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => setFormData({ ...formData, color })}
              className={`h-10 rounded-lg bg-gradient-to-r ${color} ${
                formData.color === color ? 'ring-2 ring-gray-900' : ''
              } hover:scale-105 transition-transform`}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
        >
          <Save className="w-4 h-4 inline mr-2" />
          {scheduleItem ? 'Update Class' : 'Add Class'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};