export interface ITask {
  [key: string]: number | string | null;
  id: number;
  name: string;
  deadline: string | null;
  priority: string | null;
  Description :string | null;
}
