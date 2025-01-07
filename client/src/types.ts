export interface Task {
    id: string;
    title: string;
    description: string;
    priority: number;
    deadline: string | null;
    created: string;
    updated: string;
}