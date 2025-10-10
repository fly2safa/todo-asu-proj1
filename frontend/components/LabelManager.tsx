'use client';

import { useState, useEffect } from 'react';
import { Label, LabelCreate, LabelUpdate } from '@/types';
import { labelService } from '@/lib/labels';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';

interface LabelManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onLabelsUpdated: () => void;
}

export default function LabelManager({ isOpen, onClose, onLabelsUpdated }: LabelManagerProps) {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingLabel, setEditingLabel] = useState<Label | null>(null);
  const [formData, setFormData] = useState({ name: '', color: '#3B82F6' });
  const [error, setError] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const predefinedColors = [
    '#EF4444', // Red
    '#F59E0B', // Amber
    '#10B981', // Green
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#6B7280', // Gray
    '#14B8A6', // Teal
  ];

  useEffect(() => {
    if (isOpen) {
      fetchLabels();
    }
  }, [isOpen]);

  const fetchLabels = async () => {
    try {
      setLoading(true);
      const data = await labelService.getLabels();
      setLabels(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch labels');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Label name is required');
      return;
    }

    try {
      if (editingLabel) {
        // Update existing label
        const updateData: LabelUpdate = {
          name: formData.name,
          color: formData.color,
        };
        await labelService.updateLabel(editingLabel.id, updateData);
      } else {
        // Create new label
        const createData: LabelCreate = {
          name: formData.name,
          color: formData.color,
        };
        await labelService.createLabel(createData);
      }

      // Reset form
      setFormData({ name: '', color: '#3B82F6' });
      setEditingLabel(null);
      setIsCreating(false);

      // Refresh labels
      await fetchLabels();
      onLabelsUpdated();
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'Failed to save label');
    }
  };

  const handleEdit = (label: Label) => {
    setEditingLabel(label);
    setFormData({ name: label.name, color: label.color });
    setIsCreating(true);
  };

  const handleDelete = async (labelId: string) => {
    try {
      await labelService.deleteLabel(labelId);
      await fetchLabels();
      onLabelsUpdated();
      setDeleteConfirmId(null);
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'Failed to delete label');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', color: '#3B82F6' });
    setEditingLabel(null);
    setIsCreating(false);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Manage Labels</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Create/Edit Form */}
          {isCreating ? (
            <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-semibold mb-4">
                {editingLabel ? 'Edit Label' : 'Create New Label'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="label-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Label Name
                  </label>
                  <input
                    id="label-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field w-full"
                    placeholder="Enter label name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label Color
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2 flex-wrap">
                      {predefinedColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setFormData({ ...formData, color })}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            formData.color === color
                              ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-400'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Preview:</span>
                    <span
                      className="px-3 py-1 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: formData.color }}
                    >
                      {formData.name || 'Label'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="btn-primary">
                    {editingLabel ? 'Update Label' : 'Create Label'}
                  </button>
                  <button type="button" onClick={handleCancel} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="mb-6 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Create New Label</span>
            </button>
          )}

          {/* Labels List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Existing Labels</h3>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : labels.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No labels yet. Create your first label to get started!
              </p>
            ) : (
              <div className="space-y-2">
                {labels.map((label) => (
                  <div
                    key={label.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="px-3 py-1 rounded-full text-white text-sm font-medium"
                        style={{ backgroundColor: label.color }}
                      >
                        {label.name}
                      </span>
                      <span className="text-xs text-gray-500">{label.color}</span>
                    </div>

                    {deleteConfirmId === label.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 mr-2">Delete this label?</span>
                        <button
                          onClick={() => handleDelete(label.id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(label)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit label"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(label.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete label"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button onClick={onClose} className="btn-secondary w-full">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

