"use client";

import { Task, Label } from "@/types";
import TaskCard from "./TaskCard";
import { Loader2, CheckCircle2 } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  labels: Label[];
  loading: boolean;
}

export default function TaskList({ tasks, labels, loading }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 card p-8">
        <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-600">
          Get started by creating your first task!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} labels={labels} />
      ))}
    </div>
  );
}

