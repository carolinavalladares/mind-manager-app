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

export interface LoginType {
  email: string;
  password: string;
}

export interface User {
  email: string;
  username: string;
  id: number;
}
