"use client";

import { useState, useEffect } from "react";
import { Task, Label } from "@/types";
import { taskService } from "@/lib/tasks";
import { labelService } from "@/lib/labels";
import TaskList from "@/components/TaskList";
import TaskFormModal from "@/components/TaskFormModal";
import { Plus, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [tasksData, labelsData] = await Promise.all([
        taskService.getTasks(),
        labelService.getLabels(),
      ]);
      setTasks(tasksData);
      setLabels(labelsData);
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    setShowTaskModal(false);
    setEditingTask(undefined);
    loadData();
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleTaskDelete = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.deleteTask(taskId);
      loadData();
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to delete task");
    }
  };

  const handleTaskToggle = async (taskId: string) => {
    try {
      await taskService.toggleComplete(taskId);
      loadData();
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Failed to update task");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your tasks and stay organized
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTask(undefined);
            setShowTaskModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Task List */}
      <TaskList 
        tasks={tasks} 
        labels={labels} 
        loading={loading}
        onTaskEdit={handleTaskEdit}
        onTaskDelete={handleTaskDelete}
        onTaskToggle={handleTaskToggle}
      />

      {/* Task Form Modal */}
      {showTaskModal && (
        <TaskFormModal
          task={editingTask}
          labels={labels}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(undefined);
          }}
          onSuccess={handleTaskCreated}
        />
      )}
    </div>
  );
}

