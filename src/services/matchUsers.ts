import { AppDataSource } from "@/lib/db/connection";
import { Match } from "@/lib/db/entities/Match";
import { User } from "@/lib/db/entities/User";
import { computeCompatibility } from "./computeCompatibility";

export async function matchUsers() {
  const userRepo = AppDataSource.getRepository(User);
  const matchRepo = AppDataSource.getRepository(Match);

  const users = await userRepo.find({ relations: ["answers"] });

  await matchRepo.clear();

  const matchedIds = new Set<number>();
  const pairs: [User, User, number][] = [];

  // Wszystkie możliwe pary
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const u1 = users[i];
      const u2 = users[j];

      if (u1.id === u2.id) continue;

      const score = computeCompatibility(u1.answers, u2.answers);
      pairs.push([u1, u2, score]);
    }
  }

  pairs.sort((a, b) => b[2] - a[2]);

  const finalMatches: Match[] = [];

  for (const [userA, userB, score] of pairs) {
    if (matchedIds.has(userA.id) || matchedIds.has(userB.id)) continue;

    const match = matchRepo.create({ userA, userB, compatibilityScore: score });
    finalMatches.push(match);

    matchedIds.add(userA.id);
    matchedIds.add(userB.id);
  }

  // Jeśli została jedna osoba
  const unmatched = users.filter((u) => !matchedIds.has(u.id));

  if (unmatched.length === 1) {
    const lonely = unmatched[0];

    let bestGroup: { match: Match; avgScore: number } | null = null;

    for (const m of finalMatches) {
      const scoreA = computeCompatibility(lonely.answers, m.userA.answers);
      const scoreB = computeCompatibility(lonely.answers, m.userB.answers);
      const avg = Math.round((scoreA + scoreB) / 2);

      if (!bestGroup || avg > bestGroup.avgScore) {
        bestGroup = { match: m, avgScore: avg };
      }
    }

    if (bestGroup) {
      bestGroup.match.userC = lonely;
    }

    matchedIds.add(lonely.id);
  }

  await matchRepo.save(finalMatches);
}
