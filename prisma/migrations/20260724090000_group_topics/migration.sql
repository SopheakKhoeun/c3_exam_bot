-- CreateTable
CREATE TABLE "GroupTopic" (
    "id" SERIAL NOT NULL,
    "chatId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "threadId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupTopic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GroupTopic_chatId_idx" ON "GroupTopic"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupTopic_chatId_name_key" ON "GroupTopic"("chatId", "name");
