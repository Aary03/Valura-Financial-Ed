/**
 * Valura UAE — Prisma Seed Runner
 *
 * Usage:  npm run db:seed
 *         (or: prisma db seed — configured in package.json)
 *
 * Strategy: deterministic IDs for all curriculum rows so the script is
 * fully idempotent — running it twice produces no duplicates.
 *
 *   World   id = slug                         e.g. "marina-mile"
 *   Node    id = "{worldId}-n{orderIndex:02}" e.g. "marina-mile-n02"
 *   Question id = "{nodeId}-q{orderIndex:02}" e.g. "marina-mile-n02-q01"
 *   Choice  id = "{questionId}-c{1..4}"       e.g. "marina-mile-n02-q01-c1"
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { WORLDS } from "./seedData";

const prisma = new PrismaClient();

// ── Helpers ───────────────────────────────────────────────────────────────────

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱  Seeding Valura curriculum…");
  console.log(`    ${WORLDS.length} worlds to process`);

  let nodeCount     = 0;
  let questionCount = 0;
  let choiceCount   = 0;

  for (const world of WORLDS) {
    const { nodes: nodeSeedData, ...worldCore } = world;

    // ── World ──────────────────────────────────────────────────────
    await prisma.world.upsert({
      where:  { id: worldCore.id },
      update: {
        orderIndex:    worldCore.orderIndex,
        nameEn:        worldCore.nameEn,
        nameAr:        worldCore.nameAr,
        themeKey:      worldCore.themeKey,
        descriptionEn: worldCore.descriptionEn,
        descriptionAr: worldCore.descriptionAr,
        isLocked:      worldCore.isLocked,
      },
      create: { ...worldCore },
    });

    // ── Nodes ──────────────────────────────────────────────────────
    for (const ns of nodeSeedData) {
      const nodeId = `${world.id}-n${pad(ns.orderIndex)}`;
      const { questions: questionSeedData, ...nodeCore } = ns;

      await prisma.node.upsert({
        where:  { id: nodeId },
        update: {
          orderIndex: nodeCore.orderIndex,
          kind:       nodeCore.kind as import("@prisma/client").NodeKind,
          titleEn:    nodeCore.titleEn,
          titleAr:    nodeCore.titleAr,
        },
        create: {
          id:         nodeId,
          worldId:    world.id,
          orderIndex: nodeCore.orderIndex,
          kind:       nodeCore.kind as import("@prisma/client").NodeKind,
          titleEn:    nodeCore.titleEn,
          titleAr:    nodeCore.titleAr,
        },
      });
      nodeCount++;

      // ── Questions ────────────────────────────────────────────────
      for (const qs of questionSeedData) {
        const qId = `${nodeId}-q${pad(qs.orderIndex)}`;
        const { choices: choiceSeedData, ...qCore } = qs;

        await prisma.question.upsert({
          where:  { id: qId },
          update: {
            orderIndex:    qCore.orderIndex,
            kind:          qCore.kind as import("@prisma/client").QuestionKind,
            promptEn:      qCore.promptEn,
            promptAr:      qCore.promptAr,
            explanationEn: qCore.explanationEn,
            explanationAr: qCore.explanationAr,
            contentTrack:  qCore.contentTrack as import("@prisma/client").ContentTrack,
          },
          create: {
            id:            qId,
            nodeId:        nodeId,
            orderIndex:    qCore.orderIndex,
            kind:          qCore.kind as import("@prisma/client").QuestionKind,
            promptEn:      qCore.promptEn,
            promptAr:      qCore.promptAr,
            explanationEn: qCore.explanationEn,
            explanationAr: qCore.explanationAr,
            contentTrack:  qCore.contentTrack as import("@prisma/client").ContentTrack,
          },
        });
        questionCount++;

        // ── Choices ────────────────────────────────────────────────
        for (let ci = 0; ci < choiceSeedData.length; ci++) {
          const cs       = choiceSeedData[ci];
          const choiceId = `${qId}-c${ci + 1}`;

          await prisma.choice.upsert({
            where:  { id: choiceId },
            update: {
              textEn:    cs.textEn,
              textAr:    cs.textAr,
              isCorrect: cs.isCorrect,
            },
            create: {
              id:         choiceId,
              questionId: qId,
              textEn:     cs.textEn,
              textAr:     cs.textAr,
              isCorrect:  cs.isCorrect,
            },
          });
          choiceCount++;
        }
      }
    }

    console.log(`    ✓  ${world.nameEn}`);
  }

  console.log("");
  console.log("✅  Seed complete");
  console.log(`    Worlds:    ${WORLDS.length}`);
  console.log(`    Nodes:     ${nodeCount}`);
  console.log(`    Questions: ${questionCount}`);
  console.log(`    Choices:   ${choiceCount}`);
}

main()
  .catch((err) => {
    console.error("❌  Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
