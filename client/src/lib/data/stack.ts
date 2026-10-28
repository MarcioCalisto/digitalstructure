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

/**
 * Mapeia o acento de cada projeto para as classes de gradiente Tailwind.
 * @reutilizavel sim
 */
export const accentClasses: Record<string, string> = {
  violet: "from-violet-500/20 to-indigo-500/20",
  cyan: "from-cyan-400/20 via-teal-400/20 to-emerald-400/20",
  spectrum: "from-amber-400/20 via-rose-400/20 to-cyan-400/20",
};
