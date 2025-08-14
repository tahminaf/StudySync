import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  subtitle?: string;
  progress?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  gradient,
  subtitle,
  progress
}) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-opacity-90 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-full p-3">
          <Icon className="w-8 h-8 text-white text-opacity-90" />
        </div>
      </div>
      
      {subtitle && (
        <div className="mt-4">
          <span className="text-white text-opacity-75 text-xs">{subtitle}</span>
        </div>
      )}
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};