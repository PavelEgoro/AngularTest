export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignees: string[];
}

export enum TaskPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum TaskStatus {
  Open = 'Открыто',
  InProgress = 'Выполняется',
  Completed = 'Выполнено',
  Blocked = 'Заблокировано',
}

export interface FilterValues {
  title?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  [key: string]: string | undefined;
}
