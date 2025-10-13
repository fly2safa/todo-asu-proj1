'use client';

import { Label, Priority } from '@/types';
import { Filter, X, SortAsc } from 'lucide-react';
import { useState } from 'react';

export interface FilterOptions {
  priority: Priority | 'all';
  completed: 'all' | 'completed' | 'incomplete';
  labelIds: string[];
  overdue: 'all' | 'overdue' | 'not_overdue';
  sortBy: 'created_at' | 'deadline' | 'priority';
  sortOrder: 'asc' | 'desc';
}

interface TaskFiltersPanelProps {
  labels: Label[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  taskCount: number;
  filteredCount: number;
}

export default function TaskFiltersPanel({
  labels,
  filters,
  onFiltersChange,
  taskCount,
  filteredCount,
}: TaskFiltersPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleLabelToggle = (labelId: string) => {
    const newLabelIds = filters.labelIds.includes(labelId)
      ? filters.labelIds.filter((id) => id !== labelId)
      : [...filters.labelIds, labelId];
    handleFilterChange('labelIds', newLabelIds);
  };

  const resetFilters = () => {
    onFiltersChange({
      priority: 'all',
      completed: 'all',
      labelIds: [],
      overdue: 'all',
      sortBy: 'created_at',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters =
    filters.priority !== 'all' ||
    filters.completed !== 'all' ||
    filters.labelIds.length > 0 ||
    filters.overdue !== 'all' ||
    filters.sortBy !== 'created_at' ||
    filters.sortOrder !== 'desc';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters & Sort</span>
            </button>
            {hasActiveFilters && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Showing {filteredCount} of {taskCount} tasks
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Reset All
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isExpanded ? (
                <X className="h-5 w-5" />
              ) : (
                <Filter className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value as Priority | 'all')}
                className="input-field w-full"
              >
                <option value="all">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Completion Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.completed}
                onChange={(e) => handleFilterChange('completed', e.target.value)}
                className="input-field w-full"
              >
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>

            {/* Overdue Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <select
                value={filters.overdue}
                onChange={(e) => handleFilterChange('overdue', e.target.value)}
                className="input-field w-full"
              >
                <option value="all">All Tasks</option>
                <option value="overdue">Overdue Only</option>
                <option value="not_overdue">Not Overdue</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SortAsc className="inline h-4 w-4 mr-1" />
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="input-field w-full"
              >
                <option value="created_at">Date Created</option>
                <option value="deadline">Deadline</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                className="input-field w-full"
              >
                <option value="desc">Descending (Newest First)</option>
                <option value="asc">Ascending (Oldest First)</option>
              </select>
            </div>
          </div>

          {/* Labels Filter */}
          {labels.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Labels
              </label>
              <div className="flex flex-wrap gap-2">
                {labels.map((label) => {
                  const isSelected = filters.labelIds.includes(label.id);
                  return (
                    <button
                      key={label.id}
                      onClick={() => handleLabelToggle(label.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-gray-400'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: label.color,
                        color: 'white',
                      }}
                    >
                      {label.name}
                      {isSelected && (
                        <X className="inline-block ml-1 h-3 w-3" />
                      )}
                    </button>
                  );
                })}
              </div>
              {filters.labelIds.length > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  Showing tasks with any of the selected labels
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

