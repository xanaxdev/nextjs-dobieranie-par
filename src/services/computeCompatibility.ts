import { Answer } from "@/lib/db/entities/Answer";

export function computeCompatibility(a1: Answer[], a2: Answer[]): number {
  const map1 = new Map(a1.map((a) => [a.questionId, a.value]));
  const map2 = new Map(a2.map((a) => [a.questionId, a.value]));

  let total = 0;
  let match = 0;

  for (const [qId, val1] of map1) {
    if (map2.has(qId)) {
      total++;
      const val2 = map2.get(qId);
      if (val1 === val2) match++;
    }
  }

  return total > 0 ? Math.round((match / total) * 100) : 0;
}
