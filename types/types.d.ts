export interface Task {
  title: string;
  description: string;
  priority: boolean;
  done: boolean;
}

interface ListData {
  color: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface LoginDataType {
  email: string;
  password: string;
}

export interface User {
  email: string;
  username: string;
  id: number;
}

export interface RegisterDataType {
  email: string;
  username: string;
  password: string;
}

export interface List {
  color: string;
  title: string;
  description: string;
  tasks: string;
  authorId: number;
  id: number;
}
