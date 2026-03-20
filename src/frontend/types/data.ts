export const GetOneChatFieldRequest = {
  id: true,
  createdAt: true,
  updatedAt: true,
  summary: true,
  summarizedAt: true,
};

export const GetManyChatMessagesFieldRequest = {
  id: true,
  createdAt: true,
  chatId: true,
  userId: true,
  text: true,
  attachments: true,
};
export const GetOneChatMessageFieldRequest = {};

export const CommonChatMessageFieldRequest = {
  id: true,
  text: true,
  chatId: true,
  userId: true,
  createdAt: true,
  attachments: true,
};

export const GetManyUsersFieldRequest = {
  id: true,
  name: true,
  imageUrl: true,
  isAdmin: true,
};
export const GetOneUserFieldRequest = { id: true, name: true, imageUrl: true };

export const GetOneUserMemoryFieldRequest = { userId: true, type: true };

export const GetOneNextauthVerificationTokenFieldRequest = {};

export const SearchUsersFieldRequest = { id: true, name: true, imageUrl: true };

export const GetManyNextauthAccountsFieldRequest = {
  userId: true,
  type: true,
  provider: true,
  scope: true,
};

export const GetManyChatUsersFieldRequest = {
  id: true,
  createdAt: true,
  chatId: true,
  userId: true,
};
