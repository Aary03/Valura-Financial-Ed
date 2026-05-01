-- Migration: simplify_user_model
-- Changes:
--   • Remove phoneE164 column (and its unique index) from User
--   • Add hasSeenIntro column (Boolean, default false) to User
--
-- Run automatically by: npx prisma migrate dev
-- Or manually against a live DB when ready.

-- Drop phone unique index (if it exists from a prior manual apply)
DROP INDEX IF EXISTS "User_phoneE164_key";

-- Remove phoneE164 column
ALTER TABLE "User" DROP COLUMN IF EXISTS "phone_e164";

-- Some environments may have the camelCase column name instead
ALTER TABLE "User" DROP COLUMN IF EXISTS "phoneE164";

-- Add hasSeenIntro
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "hasSeenIntro" BOOLEAN NOT NULL DEFAULT false;
