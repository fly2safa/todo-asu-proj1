"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Task, Label, Priority, TaskCreate, TaskUpdate } from "@/types";
import { taskService } from "@/lib/tasks";
import { X, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface TaskFormModalProps {
  task?: Task;
  labels: Label[];
  onClose: () => void;
  onSuccess: () => void;
}

interface TaskFormData {
  title: string;
  description?: string;
  priority: Priority;
  deadline: string;
  label_ids: string[];
}

export default function TaskFormModal({
  task,
  labels,
  onClose,
  onSuccess,
}: TaskFormModalProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TaskFormData>({
    defaultValues: task
      ? {
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          deadline: format(new Date(task.deadline), "yyyy-MM-dd"),
          label_ids: task.label_ids,
        }
      : {
          title: "",
          description: "",
          priority: Priority.MEDIUM,
          deadline: format(new Date(), "yyyy-MM-dd"),
          label_ids: [],
        },
  });

  const selectedLabels = watch("label_ids") || [];

  const toggleLabel = (labelId: string) => {
    const newLabels = selectedLabels.includes(labelId)
      ? selectedLabels.filter((id) => id !== labelId)
      : [...selectedLabels, labelId];
    setValue("label_ids", newLabels);
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      setError("");
      setLoading(true);

      if (task) {
        // Update existing task
        const updateData: TaskUpdate = {
          ...data,
          label_ids: data.label_ids.length > 0 ? data.label_ids : undefined,
        };
        await taskService.updateTask(task.id, updateData);
      } else {
        // Create new task
        const createData: TaskCreate = {
          ...data,
          label_ids: data.label_ids.length > 0 ? data.label_ids : undefined,
        };
        await taskService.createTask(createData);
      }

      onSuccess();
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(
        error.response?.data?.detail ||
          `Failed to ${task ? "update" : "create"} task`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input-field"
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={3}
              className="input-field resize-none"
              placeholder="Enter task description (optional)"
            />
          </div>

          {/* Priority and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                {...register("priority", { required: "Priority is required" })}
                className="input-field"
              >
                <option value={Priority.HIGH}>High</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.LOW}>Low</option>
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                id="deadline"
                type="date"
                {...register("deadline", { required: "Deadline is required" })}
                className="input-field"
              />
              {errors.deadline && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labels
            </label>
            {labels.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                No labels available. Create labels in the Label Manager.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {labels.map((label) => {
                  const isSelected = selectedLabels.includes(label.id);
                  return (
                    <button
                      key={label.id}
                      type="button"
                      onClick={() => toggleLabel(label.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isSelected
                          ? "ring-2 ring-offset-1"
                          : "hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? `${label.color}30`
                          : `${label.color}15`,
                        color: label.color,
                        borderColor: label.color,
                        borderWidth: "1px",
                      }}
                    >
                      {label.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary"
            >
              {loading
                ? task
                  ? "Updating..."
                  : "Creating..."
                : task
                ? "Update Task"
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

