-- Social layer: Friendship redesign, weekly XP, boosts, majlis invite codes, pseudonym onboarding

-- Drop legacy symmetric friendship (if present)
DROP TABLE IF EXISTS "Friendship" CASCADE;

CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "addresseeId" TEXT NOT NULL,
    "status" "FriendshipStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Friendship_requesterId_addresseeId_key" ON "Friendship"("requesterId", "addresseeId");
CREATE INDEX "Friendship_addresseeId_status_idx" ON "Friendship"("addresseeId", "status");
CREATE INDEX "Friendship_requesterId_status_idx" ON "Friendship"("requesterId", "status");

ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_addresseeId_fkey" FOREIGN KEY ("addresseeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "UserWeeklyXp" (
    "userId" TEXT NOT NULL,
    "weekIso" TEXT NOT NULL,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "UserWeeklyXp_pkey" PRIMARY KEY ("userId", "weekIso")
);

ALTER TABLE "UserWeeklyXp" ADD CONSTRAINT "UserWeeklyXp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX "UserWeeklyXp_weekIso_xpEarned_idx" ON "UserWeeklyXp"("weekIso", "xpEarned" DESC);

CREATE TABLE "FriendBoost" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "stickerKey" TEXT NOT NULL,
    "coins" INTEGER NOT NULL,
    "weekIso" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FriendBoost_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "FriendBoost" ADD CONSTRAINT "FriendBoost_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FriendBoost" ADD CONSTRAINT "FriendBoost_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX "FriendBoost_senderId_weekIso_idx" ON "FriendBoost"("senderId", "weekIso");
CREATE INDEX "FriendBoost_recipientId_idx" ON "FriendBoost"("recipientId");

CREATE TABLE "BoostNotification" (
    "id" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "stickerKey" TEXT NOT NULL,
    "coins" INTEGER NOT NULL,
    "senderName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consumedAt" TIMESTAMP(3),
    CONSTRAINT "BoostNotification_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "BoostNotification" ADD CONSTRAINT "BoostNotification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX "BoostNotification_recipientId_consumedAt_idx" ON "BoostNotification"("recipientId", "consumedAt");

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "pseudonymChosenAt" TIMESTAMP(3);
-- Existing accounts skip pseudonym picker
UPDATE "User" SET "pseudonymChosenAt" = COALESCE("createdAt", CURRENT_TIMESTAMP) WHERE "pseudonymChosenAt" IS NULL;

ALTER TABLE "FamilyGroup" ADD COLUMN IF NOT EXISTS "inviteCode" VARCHAR(6);
UPDATE "FamilyGroup" SET "inviteCode" = UPPER(SUBSTRING(MD5(RANDOM()::TEXT || "id") FROM 1 FOR 6)) WHERE "inviteCode" IS NULL;
ALTER TABLE "FamilyGroup" ALTER COLUMN "inviteCode" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "FamilyGroup_inviteCode_key" ON "FamilyGroup"("inviteCode");

ALTER TABLE "FamilyGroup" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "FamilyMembership" ADD COLUMN IF NOT EXISTS "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
