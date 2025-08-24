export type Task = {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  label?: string;
  createdAt: string;
  column: string;
};
