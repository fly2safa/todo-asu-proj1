// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export interface UserRegister {
  email: string;
  username: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

// Auth Types
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

// Task Types
export enum Priority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  deadline: string;
  completed: boolean;
  label_ids: string[];
  is_overdue: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority: Priority;
  deadline: string;
  label_ids?: string[];
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  priority?: Priority;
  deadline?: string;
  completed?: boolean;
  label_ids?: string[];
}

// Label Types
export interface Label {
  id: string;
  name: string;
  color: string;
  user_id: string;
  created_at: string;
}

export interface LabelCreate {
  name: string;
  color: string;
}

export interface LabelUpdate {
  name?: string;
  color?: string;
}

// Filter Types
export interface TaskFilters {
  priority?: Priority;
  completed?: boolean;
  labels?: string;
  overdue?: boolean;
  sort_by?: string;
  order?: "asc" | "desc";
}

