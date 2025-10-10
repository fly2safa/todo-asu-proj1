import api from "./api";
import { Task, TaskCreate, TaskUpdate, TaskFilters } from "@/types";

export const taskService = {
  async getTasks(filters?: TaskFilters): Promise<Task[]> {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.priority) params.append("priority", filters.priority);
      if (filters.completed !== undefined)
        params.append("completed", String(filters.completed));
      if (filters.labels) params.append("labels", filters.labels);
      if (filters.overdue !== undefined)
        params.append("overdue", String(filters.overdue));
      if (filters.sort_by) params.append("sort_by", filters.sort_by);
      if (filters.order) params.append("order", filters.order);
    }

    const response = await api.get<Task[]>(`/api/tasks?${params.toString()}`);
    return response.data;
  },

  async getTask(id: string): Promise<Task> {
    const response = await api.get<Task>(`/api/tasks/${id}`);
    return response.data;
  },

  async createTask(data: TaskCreate): Promise<Task> {
    const response = await api.post<Task>("/api/tasks", data);
    return response.data;
  },

  async updateTask(id: string, data: TaskUpdate): Promise<Task> {
    const response = await api.put<Task>(`/api/tasks/${id}`, data);
    return response.data;
  },

  async toggleComplete(id: string): Promise<Task> {
    const response = await api.patch<Task>(`/api/tasks/${id}/complete`);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/api/tasks/${id}`);
  },
};

