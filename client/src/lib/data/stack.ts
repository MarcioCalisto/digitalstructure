export type StackItem = {
  id: number;
  name: string;
  category: string;
};

export const stack: StackItem[] = [
  { id: 1, name: "React", category: "Framework" },
  { id: 2, name: "TypeScript", category: "Linguagem" },
  { id: 3, name: "Node.js", category: "Runtime" },
  { id: 4, name: "Tailwind CSS", category: "Styling" },
];
