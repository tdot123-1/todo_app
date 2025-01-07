export interface Task {
  id: string;
  title: string;
  description: string;
  priority: number;
  deadline: string | null;
  created: string;
  updated: string;
}

export const TaskPriority: { [key: number]: string} = {
  1: "Very High",
  2: "High",
  3: "Medium",
  4: "Low",
  5: "Very Low",
} as const;

export type TaskPriorityType = keyof typeof TaskPriority;
