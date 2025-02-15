export interface Task {
  id: string;
  title: string;
  description: string;
  priority: number;
  deadline: string | null;
  created: string;
  updated: string;
  completed: boolean;
}

export const TaskPriority: { [key: number]: string } = {
  1: "Very High",
  2: "High",
  3: "Medium",
  4: "Low",
  5: "Very Low",
} as const;

export type TaskPriorityType = keyof typeof TaskPriority;

export interface QueryOptions {
  page: number;
  sort: "updated" | "deadline" | "priority";
  order: "asc" | "desc";
  searchQuery: string;
}

interface FetchedTaskList {
  tasks: Task[];
  total_count: number;
}

export interface FetchedData {
  success: boolean;
  data?: Task | FetchedTaskList;
  status: number;
}
