import { ChatModel } from '@/generated/types/chat';
import { ChatMessageModel } from '@/generated/types/chat-message';
import { ChatUserModel } from '@/generated/types/chat-user';
import { NextauthAccountModel } from '@/generated/types/nextauth-account';
import { NextauthSessionModel } from '@/generated/types/nextauth-session';
import { NextauthVerificationTokenModel } from '@/generated/types/nextauth-verification-token';
import { SystemRequestCacheModel } from '@/generated/types/system-request-cache';
import { SystemScheduledJobModel } from '@/generated/types/system-scheduled-job';
import { UserModel } from '@/generated/types/user';
import { UserMemoryModel } from '@/generated/types/user-memory';
import { createInMemoryDatabase } from '@airent/imdb';

declare global {
  var imdb:
    | ReturnType<
        typeof createInMemoryDatabase<{
          chat: ChatModel;
          chatMessage: ChatMessageModel;
          chatUser: ChatUserModel;
          nextauthAccount: NextauthAccountModel;
          nextauthSession: NextauthSessionModel;
          nextauthVerificationToken: NextauthVerificationTokenModel;
          systemRequestCache: SystemRequestCacheModel;
          systemScheduledJob: SystemScheduledJobModel;
          user: UserModel;
          userMemory: UserMemoryModel;
        }>
      >
    | undefined;
}

const imdb =
  global.imdb ??
  createInMemoryDatabase<{
    chat: ChatModel;
    chatMessage: ChatMessageModel;
    chatUser: ChatUserModel;
    nextauthAccount: NextauthAccountModel;
    nextauthSession: NextauthSessionModel;
    nextauthVerificationToken: NextauthVerificationTokenModel;
    systemRequestCache: SystemRequestCacheModel;
    systemScheduledJob: SystemScheduledJobModel;
    user: UserModel;
    userMemory: UserMemoryModel;
  }>({});

global.imdb = imdb;

export default imdb;
