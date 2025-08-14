export const WEEK_DAYS = [
    'Monday',
    'Tuesday', 
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ] as const;
  
  export const COLOR_OPTIONS = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
    'from-yellow-500 to-yellow-600'
  ] as const;
  
  export const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });
  
  export const PRIORITY_COLORS = {
    high: 'border-l-red-500 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200',
    medium: 'border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200',
    low: 'border-l-green-500 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200'
  } as const;
  
  export const PRIORITY_BADGE_COLORS = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  } as const;