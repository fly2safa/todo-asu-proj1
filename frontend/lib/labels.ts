import api from "./api";
import { Label, LabelCreate, LabelUpdate } from "@/types";

export const labelService = {
  async getLabels(): Promise<Label[]> {
    const response = await api.get<Label[]>("/api/labels");
    return response.data;
  },

  async getLabel(id: string): Promise<Label> {
    const response = await api.get<Label>(`/api/labels/${id}`);
    return response.data;
  },

  async createLabel(data: LabelCreate): Promise<Label> {
    const response = await api.post<Label>("/api/labels", data);
    return response.data;
  },

  async updateLabel(id: string, data: LabelUpdate): Promise<Label> {
    const response = await api.put<Label>(`/api/labels/${id}`, data);
    return response.data;
  },

  async deleteLabel(id: string): Promise<void> {
    await api.delete(`/api/labels/${id}`);
  },
};

