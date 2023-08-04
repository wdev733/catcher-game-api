-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "user_name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_name_key" ON "user"("user_name");
