"use client";

import { Task, Label, Priority } from "@/types";
import { format } from "date-fns";
import { Calendar, AlertCircle, CheckCircle2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  labels: Label[];
}

export default function TaskCard({ task, labels }: TaskCardProps) {
  const taskLabels = labels.filter((label) =>
    task.label_ids.includes(label.id)
  );

  const priorityColors = {
    [Priority.HIGH]: "bg-red-100 text-red-800 border-red-200",
    [Priority.MEDIUM]: "bg-yellow-100 text-yellow-800 border-yellow-200",
    [Priority.LOW]: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <div
      className={`card p-4 hover:shadow-lg transition-shadow ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="mt-1 flex-shrink-0">
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1 text-sm text-gray-600">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>

            {/* Deadline */}
            <div
              className={`inline-flex items-center gap-1 text-xs ${
                task.is_overdue && !task.completed
                  ? "text-red-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {task.is_overdue && !task.completed ? (
                <AlertCircle className="w-3.5 h-3.5" />
              ) : (
                <Calendar className="w-3.5 h-3.5" />
              )}
              <span>
                {task.is_overdue && !task.completed && "Overdue: "}
                {format(new Date(task.deadline), "MMM d, yyyy")}
              </span>
            </div>

            {/* Labels */}
            {taskLabels.map((label) => (
              <span
                key={label.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${label.color}20`,
                  color: label.color,
                  borderColor: `${label.color}40`,
                  borderWidth: "1px",
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

