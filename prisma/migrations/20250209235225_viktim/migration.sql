-- CreateTable
CREATE TABLE "ViktimActivity" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ViktimActivity_pkey" PRIMARY KEY ("id")
);
