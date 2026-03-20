-- CreateTable
CREATE TABLE "Chat" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "summary" STRING,
    "summarizedAt" TIMESTAMP(3),

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatId" STRING NOT NULL,
    "userId" STRING,
    "content" JSONB NOT NULL DEFAULT '{}',
    "attachments" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatUser" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatId" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "ChatUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NextauthAccount" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refreshToken" STRING,
    "accessToken" STRING,
    "expiresAt" INT4,
    "tokenType" STRING,
    "scope" STRING,
    "idToken" STRING,
    "sessionState" STRING,

    CONSTRAINT "NextauthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NextauthSession" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NextauthSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NextauthVerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "SystemRequestCache" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "request" JSONB,
    "response" JSONB,

    CONSTRAINT "SystemRequestCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemScheduledJob" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "runsAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "type" STRING NOT NULL,
    "data" JSONB NOT NULL,
    "executions" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "SystemScheduledJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "imageUrl" STRING,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMemory" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,

    CONSTRAINT "UserMemory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatMessage_chatId_userId_idx" ON "ChatMessage"("chatId", "userId");

-- CreateIndex
CREATE INDEX "ChatUser_chatId_userId_idx" ON "ChatUser"("chatId", "userId");

-- CreateIndex
CREATE INDEX "NextauthAccount_userId_idx" ON "NextauthAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NextauthAccount_provider_providerAccountId_key" ON "NextauthAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "NextauthSession_sessionToken_key" ON "NextauthSession"("sessionToken");

-- CreateIndex
CREATE INDEX "NextauthSession_userId_idx" ON "NextauthSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NextauthVerificationToken_identifier_token_key" ON "NextauthVerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "SystemRequestCache_createdAt_idx" ON "SystemRequestCache"("createdAt");

-- CreateIndex
CREATE INDEX "SystemScheduledJob_runsAt_type_idx" ON "SystemScheduledJob"("runsAt", "type");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserMemory_userId_type_idx" ON "UserMemory"("userId", "type");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NextauthAccount" ADD CONSTRAINT "NextauthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NextauthSession" ADD CONSTRAINT "NextauthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMemory" ADD CONSTRAINT "UserMemory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

