export interface ITask {
  [key: string]: number | string | boolean | null;
  id: number;
  name: string;
  deadline: string | null;
  priority: string | null;
  description: string | null;
  completed: boolean ;
}
