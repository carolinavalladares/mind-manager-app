export interface Task {
  title: string;
  description: string;
  priority: boolean;
  done: boolean;
}

interface List {
  color: string;
  title: string;
  description: string;
  tasks: Task[];
}
